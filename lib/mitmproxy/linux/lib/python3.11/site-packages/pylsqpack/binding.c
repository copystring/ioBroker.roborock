#define PY_SSIZE_T_CLEAN

#include <Python.h>
#include "lsqpack.h"

#define MODULE_NAME "pylsqpack._binding"

#define DEC_BUF_SZ 4096
#define ENC_BUF_SZ 4096
#define HDR_BUF_SZ 4096
#define PREFIX_MAX_SIZE 16

static PyObject *DecompressionFailed;
static PyObject *DecoderStreamError;
static PyObject *EncoderStreamError;
static PyObject *StreamBlocked;

struct header_block {
    STAILQ_ENTRY(header_block) entries;

    int blocked:1;
    unsigned char *data;
    size_t data_len;
    const unsigned char *data_ptr;
    struct lsqpack_header_list *hlist;
    uint64_t stream_id;
};

static struct header_block *header_block_new(size_t stream_id, const unsigned char *data, size_t data_len)
{
    struct header_block *hblock = malloc(sizeof(struct header_block));
    memset(hblock, 0, sizeof(*hblock));
    hblock->data = malloc(data_len);
    hblock->data_len = data_len;
    hblock->data_ptr = hblock->data;
    memcpy(hblock->data, data, data_len);
    hblock->stream_id = stream_id;
    return hblock;
}

static void header_block_free(struct header_block *hblock)
{
    free(hblock->data);
    hblock->data = 0;
    hblock->data_ptr = 0;
    if (hblock->hlist) {
        lsqpack_dec_destroy_header_list(hblock->hlist);
        hblock->hlist = 0;
    }
    free(hblock);
}

static PyObject *hlist_to_headers(struct lsqpack_header_list *hlist)
{
    PyObject *list, *tuple, *name, *value;
    struct lsqpack_header *header;

    list = PyList_New(hlist->qhl_count);
    for (size_t i = 0; i < hlist->qhl_count; ++i) {
        header = hlist->qhl_headers[i];
        name = PyBytes_FromStringAndSize(header->qh_name, header->qh_name_len);
        value = PyBytes_FromStringAndSize(header->qh_value, header->qh_value_len);
        tuple = PyTuple_Pack(2, name, value);
        Py_DECREF(name);
        Py_DECREF(value);
        PyList_SET_ITEM(list, i, tuple);
    }
    return list;
}

static void header_unblocked(void *opaque) {
    struct header_block *hblock = opaque;
    hblock->blocked = 0;
}

// DECODER

typedef struct {
    PyObject_HEAD
    struct lsqpack_dec dec;
    unsigned char dec_buf[DEC_BUF_SZ];
    STAILQ_HEAD(, header_block) pending_blocks;
} DecoderObject;

static int
Decoder_init(DecoderObject *self, PyObject *args, PyObject *kwargs)
{
    char *kwlist[] = {"max_table_capacity", "blocked_streams", NULL};
    unsigned max_table_capacity, blocked_streams;
    if (!PyArg_ParseTupleAndKeywords(args, kwargs, "II", kwlist, &max_table_capacity, &blocked_streams))
        return -1;

    lsqpack_dec_init(&self->dec, NULL, max_table_capacity, blocked_streams, header_unblocked);

    STAILQ_INIT(&self->pending_blocks);

    return 0;
}

static void
Decoder_dealloc(DecoderObject *self)
{
    struct header_block *hblock;

    lsqpack_dec_cleanup(&self->dec);

    while (!STAILQ_EMPTY(&self->pending_blocks)) {
        hblock = STAILQ_FIRST(&self->pending_blocks);
        STAILQ_REMOVE_HEAD(&self->pending_blocks, entries);
        header_block_free(hblock);
    }

    Py_TYPE(self)->tp_free((PyObject *) self);
}

static PyObject*
Decoder_feed_encoder(DecoderObject *self, PyObject *args, PyObject *kwargs)
{
    char *kwlist[] = {"data", NULL};
    const unsigned char *data;
    Py_ssize_t data_len;
    PyObject *list, *value;
    struct header_block *hblock;

    if (!PyArg_ParseTupleAndKeywords(args, kwargs, "y#", kwlist, &data, &data_len))
        return NULL;

    if (lsqpack_dec_enc_in(&self->dec, data, data_len) < 0) {
        PyErr_SetString(EncoderStreamError, "lsqpack_dec_enc_in failed");
        return NULL;
    }

    list = PyList_New(0);
    STAILQ_FOREACH(hblock, &self->pending_blocks, entries) {
        if (!hblock->blocked) {
            value = PyLong_FromUnsignedLongLong(hblock->stream_id);
            PyList_Append(list, value);
            Py_DECREF(value);
        }
    }
    return list;
}

PyDoc_STRVAR(Decoder_feed_encoder__doc__,
    "feed_encoder(data: bytes) -> List[int]\n\n"
    "Feed data from the encoder stream.\n\n"
    "If processing the data unblocked any streams, their IDs are returned, "
    "and :meth:`resume_header()` must be called for each stream ID.\n\n"
    "If the data cannot be processed, :class:`EncoderStreamError` is raised.\n\n"
    ":param data: the encoder stream data\n");

static PyObject*
Decoder_feed_header(DecoderObject *self, PyObject *args, PyObject *kwargs)
{
    char *kwlist[] = {"stream_id", "data", NULL};
    uint64_t stream_id;
    const unsigned char *data;
    Py_ssize_t data_len;
    PyObject *control, *headers, *tuple;
    size_t dec_len = DEC_BUF_SZ;
    enum lsqpack_read_header_status status;
    struct header_block *hblock;

    if (!PyArg_ParseTupleAndKeywords(args, kwargs, "Ky#", kwlist, &stream_id, &data, &data_len))
        return NULL;

    // check there is no header block for the stream
    STAILQ_FOREACH(hblock, &self->pending_blocks, entries) {
        if (hblock->stream_id == stream_id) {
            PyErr_Format(PyExc_ValueError, "a header block for stream %d already exists", stream_id);
            return NULL;
        }
    }
    hblock = header_block_new(stream_id, data, data_len);

    status = lsqpack_dec_header_in(
        &self->dec,
        hblock,
        stream_id,
        hblock->data_len,
        &hblock->data_ptr,
        hblock->data_len,
        &hblock->hlist,
        self->dec_buf,
        &dec_len
    );

    if (status == LQRHS_BLOCKED || status == LQRHS_NEED) {
        hblock->blocked = 1;
        STAILQ_INSERT_TAIL(&self->pending_blocks, hblock, entries);
        PyErr_Format(StreamBlocked, "stream %d is blocked", stream_id);
        return NULL;
    } else if (status != LQRHS_DONE) {
        PyErr_Format(DecompressionFailed, "lsqpack_dec_header_in for stream %d failed", stream_id);
        header_block_free(hblock);
        return NULL;
    }

    control = PyBytes_FromStringAndSize((const char*)self->dec_buf, dec_len);
    headers = hlist_to_headers(hblock->hlist);
    header_block_free(hblock);

    tuple = PyTuple_Pack(2, control, headers);
    Py_DECREF(control);
    Py_DECREF(headers);

    return tuple;
}

PyDoc_STRVAR(Decoder_feed_header__doc__,
    "feed_header(stream_id: int, data: bytes) -> Tuple[bytes, List[Tuple[bytes, bytes]]]\n\n"
    "Decode a header block and return control data and headers.\n\n"
    "If the stream is blocked, :class:`StreamBlocked` is raised.\n\n"
    "If the data cannot be processed, :class:`DecompressionFailed` is raised.\n\n"
    ":param stream_id: the ID of the stream\n"
    ":param data: the header block data\n");

static PyObject*
Decoder_resume_header(DecoderObject *self, PyObject *args, PyObject *kwargs)
{
    char *kwlist[] = {"stream_id", NULL};
    uint64_t stream_id;
    PyObject *control, *headers, *tuple;
    size_t dec_len = DEC_BUF_SZ;
    enum lsqpack_read_header_status status;
    struct header_block *hblock;
    int found = 0;

    if (!PyArg_ParseTupleAndKeywords(args, kwargs, "K", kwlist, &stream_id))
        return NULL;

    // find the header block for the stream
    STAILQ_FOREACH(hblock, &self->pending_blocks, entries) {
        if (hblock->stream_id == stream_id) {
            found = 1;
            break;
        }
    }
    if (!found) {
        PyErr_Format(PyExc_ValueError, "no pending header block for stream %d", stream_id);
        return NULL;
    }

    if (hblock->blocked) {
        status = LQRHS_BLOCKED;
    } else {
        status = lsqpack_dec_header_read(
            &self->dec,
            hblock,
            &hblock->data_ptr,
            hblock->data_len - (hblock->data_ptr - hblock->data),
            &hblock->hlist,
            self->dec_buf,
            &dec_len
        );
    }

    if (status == LQRHS_BLOCKED || status == LQRHS_NEED) {
        hblock->blocked = 1;
        PyErr_Format(StreamBlocked, "stream %d is blocked", stream_id);
        return NULL;
    } else if (status != LQRHS_DONE) {
        PyErr_Format(DecompressionFailed, "lsqpack_dec_header_read for stream %d failed (%d)", stream_id, status);
        STAILQ_REMOVE(&self->pending_blocks, hblock, header_block, entries);
        header_block_free(hblock);
        return NULL;
    }

    control = PyBytes_FromStringAndSize((const char*)self->dec_buf, dec_len);
    headers = hlist_to_headers(hblock->hlist);
    STAILQ_REMOVE(&self->pending_blocks, hblock, header_block, entries);
    header_block_free(hblock);

    tuple = PyTuple_Pack(2, control, headers);
    Py_DECREF(control);
    Py_DECREF(headers);

    return tuple;
}

PyDoc_STRVAR(Decoder_resume_header__doc__,
    "resume_header(stream_id: int) -> Tuple[bytes, List[Tuple[bytes, bytes]]]\n\n"
    "Continue decoding a header block and return control data and headers.\n\n"
    "This method should be called only when :meth:`feed_encoder` indicates "
    "that a stream has become unblocked\n\n"
    ":param stream_id: the ID of the stream\n");

static PyMethodDef Decoder_methods[] = {
    {"feed_encoder", (PyCFunction)Decoder_feed_encoder, METH_VARARGS | METH_KEYWORDS, Decoder_feed_encoder__doc__},
    {"feed_header", (PyCFunction)Decoder_feed_header, METH_VARARGS | METH_KEYWORDS, Decoder_feed_header__doc__},
    {"resume_header", (PyCFunction)Decoder_resume_header, METH_VARARGS | METH_KEYWORDS, Decoder_resume_header__doc__},
    {NULL}
};

PyDoc_STRVAR(Decoder__doc__,
    "Decoder(max_table_capacity: int, blocked_streams: int)\n\n"
    "QPACK decoder.\n\n"
    ":param max_table_capacity: the maximum size in bytes of the dynamic table\n"
    ":param blocked_streams: the maximum number of streams that could be blocked\n");

static PyTypeObject DecoderType = {
    PyVarObject_HEAD_INIT(NULL, 0)
    MODULE_NAME ".Decoder",             /* tp_name */
    sizeof(DecoderObject),              /* tp_basicsize */
    0,                                  /* tp_itemsize */
    (destructor)Decoder_dealloc,        /* tp_dealloc */
    0,                                  /* tp_print */
    0,                                  /* tp_getattr */
    0,                                  /* tp_setattr */
    0,                                  /* tp_reserved */
    0,                                  /* tp_repr */
    0,                                  /* tp_as_number */
    0,                                  /* tp_as_sequence */
    0,                                  /* tp_as_mapping */
    0,                                  /* tp_hash  */
    0,                                  /* tp_call */
    0,                                  /* tp_str */
    0,                                  /* tp_getattro */
    0,                                  /* tp_setattro */
    0,                                  /* tp_as_buffer */
    Py_TPFLAGS_DEFAULT,                 /* tp_flags */
    Decoder__doc__,                     /* tp_doc */
    0,                                  /* tp_traverse */
    0,                                  /* tp_clear */
    0,                                  /* tp_richcompare */
    0,                                  /* tp_weaklistoffset */
    0,                                  /* tp_iter */
    0,                                  /* tp_iternext */
    Decoder_methods,                    /* tp_methods */
    0,                                  /* tp_members */
    0,                                  /* tp_getset */
    0,                                  /* tp_base */
    0,                                  /* tp_dict */
    0,                                  /* tp_descr_get */
    0,                                  /* tp_descr_set */
    0,                                  /* tp_dictoffset */
    (initproc)Decoder_init,             /* tp_init */
    0,                                  /* tp_alloc */
};

// ENCODER

typedef struct {
    PyObject_HEAD
    struct lsqpack_enc enc;
    unsigned char hdr_buf[HDR_BUF_SZ];
    unsigned char enc_buf[ENC_BUF_SZ];
    unsigned char pfx_buf[PREFIX_MAX_SIZE];
} EncoderObject;

static int
Encoder_init(EncoderObject *self, PyObject *args, PyObject *kwargs)
{
    lsqpack_enc_preinit(&self->enc, NULL);
    return 0;
}

static void
Encoder_dealloc(EncoderObject *self)
{
    lsqpack_enc_cleanup(&self->enc);
    Py_TYPE(self)->tp_free((PyObject *) self);
}

static PyObject*
Encoder_apply_settings(EncoderObject *self, PyObject *args, PyObject *kwargs)
{
    char *kwlist[] = {"max_table_capacity", "blocked_streams", NULL};
    unsigned max_table_capacity, blocked_streams;
    unsigned char tsu_buf[LSQPACK_LONGEST_SDTC];
    size_t tsu_len = sizeof(tsu_buf);

    if (!PyArg_ParseTupleAndKeywords(args, kwargs, "II", kwlist, &max_table_capacity, &blocked_streams))
        return NULL;

    if (lsqpack_enc_init(&self->enc, NULL, max_table_capacity, max_table_capacity, blocked_streams,
                         LSQPACK_ENC_OPT_STAGE_2, tsu_buf, &tsu_len) != 0) {
        PyErr_SetString(PyExc_RuntimeError, "lsqpack_enc_init failed");
        return NULL;
    }

    return PyBytes_FromStringAndSize((const char*)tsu_buf, tsu_len);
}

PyDoc_STRVAR(Encoder_apply_settings__doc__,
    "apply_settings(max_table_capacity: int, blocked_streams: int) -> bytes\n\n"
    "Apply the settings received from the encoder.\n\n"
    ":param max_table_capacity: the maximum size in bytes of the dynamic table\n"
    ":param blocked_streams: the maximum number of streams that could be blocked\n");

static PyObject*
Encoder_encode(EncoderObject *self, PyObject *args, PyObject *kwargs)
{
    char *kwlist[] = {"stream_id", "headers", NULL};
    uint64_t stream_id;
    unsigned seqno = 0;
    PyObject *list, *tuple, *name, *value;
    size_t enc_len, hdr_len, pfx_len;
    size_t enc_off = 0, hdr_off = PREFIX_MAX_SIZE, pfx_off = 0;

    if (!PyArg_ParseTupleAndKeywords(args, kwargs, "KO", kwlist, &stream_id, &list))
        return NULL;

    if (!PyList_Check(list)) {
        PyErr_SetString(PyExc_ValueError, "headers must be a list");
        return NULL;
    }

    if (lsqpack_enc_start_header(&self->enc, stream_id, seqno) != 0) {
        PyErr_SetString(PyExc_RuntimeError, "lsqpack_enc_start_header failed");
        return NULL;
    }

    for (Py_ssize_t i = 0; i < PyList_Size(list); ++i) {
        tuple = PyList_GetItem(list, i);
        if (!PyTuple_Check(tuple) || PyTuple_Size(tuple) != 2) {
            PyErr_SetString(PyExc_ValueError, "the header must be a two-tuple");
            return NULL;
        }
        name = PyTuple_GetItem(tuple, 0);
        value = PyTuple_GetItem(tuple, 1);
        if (!PyBytes_Check(name) || !PyBytes_Check(value)) {
            PyErr_SetString(PyExc_ValueError, "the header's name and value must be bytes");
            return NULL;
        }

        enc_len = ENC_BUF_SZ - enc_off;
        hdr_len = HDR_BUF_SZ - hdr_off;
        if (lsqpack_enc_encode(&self->enc,
                               self->enc_buf + enc_off, &enc_len,
                               self->hdr_buf + hdr_off, &hdr_len,
                               PyBytes_AsString(name), PyBytes_Size(name),
                               PyBytes_AsString(value), PyBytes_Size(value),
                               0) != LQES_OK) {
            PyErr_SetString(PyExc_RuntimeError, "lsqpack_enc_encode failed");
            return NULL;
        }
        enc_off += enc_len;
        hdr_off += hdr_len;
    }

    pfx_len = lsqpack_enc_end_header(&self->enc, self->pfx_buf, PREFIX_MAX_SIZE, NULL);
    if (pfx_len <= 0) {
        PyErr_SetString(PyExc_RuntimeError, "lsqpack_enc_start_header failed");
        return NULL;
    }
    pfx_off = PREFIX_MAX_SIZE - pfx_len;
    memcpy(self->hdr_buf + pfx_off, self->pfx_buf, pfx_len);

    name = PyBytes_FromStringAndSize((const char*)self->enc_buf, enc_off);
    value = PyBytes_FromStringAndSize((const char*)self->hdr_buf + pfx_off, hdr_off - pfx_off);
    tuple = PyTuple_Pack(2, name, value);
    Py_DECREF(name);
    Py_DECREF(value);

    return tuple;
}

PyDoc_STRVAR(Encoder_encode__doc__,
    "encode(stream_id: int, headers: List[Tuple[bytes, bytes]]) -> Tuple[bytes, bytes]\n\n"
    "Encode a list of headers.\n\n"
    "A tuple is returned containing two bytestrings: the encoder stream data "
    " and the encoded header block.\n\n"
    ":param stream_id: the stream ID\n"
    ":param headers: a list of header tuples\n");

static PyObject*
Encoder_feed_decoder(EncoderObject *self, PyObject *args, PyObject *kwargs)
{
    char *kwlist[] = {"data", NULL};
    const unsigned char *data;
    Py_ssize_t data_len;

    if (!PyArg_ParseTupleAndKeywords(args, kwargs, "y#", kwlist, &data, &data_len))
        return NULL;

    if (lsqpack_enc_decoder_in(&self->enc, data, data_len) < 0) {
        PyErr_SetString(DecoderStreamError, "lsqpack_enc_decoder_in failed");
        return NULL;
    }

    Py_RETURN_NONE;
}

PyDoc_STRVAR(Encoder_feed_decoder__doc__,
    "feed_decoder(data: bytes) -> None\n\n"
    "Feed data from the decoder stream.\n\n"
    "If the data cannot be processed, :class:`DecoderStreamError` is raised.\n\n"
    ":param data: the decoder stream data\n");

static PyMethodDef Encoder_methods[] = {
    {"apply_settings", (PyCFunction)Encoder_apply_settings, METH_VARARGS | METH_KEYWORDS, Encoder_apply_settings__doc__},
    {"encode", (PyCFunction)Encoder_encode, METH_VARARGS | METH_KEYWORDS, Encoder_encode__doc__},
    {"feed_decoder", (PyCFunction)Encoder_feed_decoder, METH_VARARGS | METH_KEYWORDS, Encoder_feed_decoder__doc__},
    {NULL}
};

PyDoc_STRVAR(Encoder__doc__,
    "Encoder()\n\n"
    "QPACK encoder.\n");

static PyTypeObject EncoderType = {
    PyVarObject_HEAD_INIT(NULL, 0)
    MODULE_NAME ".Encoder",             /* tp_name */
    sizeof(EncoderObject),              /* tp_basicsize */
    0,                                  /* tp_itemsize */
    (destructor)Encoder_dealloc,        /* tp_dealloc */
    0,                                  /* tp_print */
    0,                                  /* tp_getattr */
    0,                                  /* tp_setattr */
    0,                                  /* tp_reserved */
    0,                                  /* tp_repr */
    0,                                  /* tp_as_number */
    0,                                  /* tp_as_sequence */
    0,                                  /* tp_as_mapping */
    0,                                  /* tp_hash  */
    0,                                  /* tp_call */
    0,                                  /* tp_str */
    0,                                  /* tp_getattro */
    0,                                  /* tp_setattro */
    0,                                  /* tp_as_buffer */
    Py_TPFLAGS_DEFAULT,                 /* tp_flags */
    Encoder__doc__,                     /* tp_doc */
    0,                                  /* tp_traverse */
    0,                                  /* tp_clear */
    0,                                  /* tp_richcompare */
    0,                                  /* tp_weaklistoffset */
    0,                                  /* tp_iter */
    0,                                  /* tp_iternext */
    Encoder_methods,                    /* tp_methods */
    0,                                  /* tp_members */
    0,                                  /* tp_getset */
    0,                                  /* tp_base */
    0,                                  /* tp_dict */
    0,                                  /* tp_descr_get */
    0,                                  /* tp_descr_set */
    0,                                  /* tp_dictoffset */
    (initproc)Encoder_init,             /* tp_init */
    0,                                  /* tp_alloc */
};

// MODULE

static struct PyModuleDef moduledef = {
    PyModuleDef_HEAD_INIT,
    MODULE_NAME,                        /* m_name */
    "Bindings for ls-qpack.",           /* m_doc */
    -1,                                 /* m_size */
    NULL,                               /* m_methods */
    NULL,                               /* m_reload */
    NULL,                               /* m_traverse */
    NULL,                               /* m_clear */
    NULL,                               /* m_free */
};

PyMODINIT_FUNC
PyInit__binding(void)
{
    PyObject* m;

    m = PyModule_Create(&moduledef);
    if (m == NULL)
        return NULL;

    DecompressionFailed = PyErr_NewException(MODULE_NAME ".DecompressionFailed", PyExc_ValueError, NULL);
    Py_INCREF(DecompressionFailed);
    PyModule_AddObject(m, "DecompressionFailed", DecompressionFailed);

    DecoderStreamError = PyErr_NewException(MODULE_NAME ".DecoderStreamError", PyExc_ValueError, NULL);
    Py_INCREF(DecoderStreamError);
    PyModule_AddObject(m, "DecoderStreamError", DecoderStreamError);

    EncoderStreamError = PyErr_NewException(MODULE_NAME ".EncoderStreamError", PyExc_ValueError, NULL);
    Py_INCREF(EncoderStreamError);
    PyModule_AddObject(m, "EncoderStreamError", EncoderStreamError);

    StreamBlocked = PyErr_NewException(MODULE_NAME ".StreamBlocked", PyExc_ValueError, NULL);
    Py_INCREF(StreamBlocked);
    PyModule_AddObject(m, "StreamBlocked", StreamBlocked);

    DecoderType.tp_new = PyType_GenericNew;
    if (PyType_Ready(&DecoderType) < 0)
        return NULL;
    Py_INCREF(&DecoderType);
    PyModule_AddObject(m, "Decoder", (PyObject *)&DecoderType);

    EncoderType.tp_new = PyType_GenericNew;
    if (PyType_Ready(&EncoderType) < 0)
        return NULL;
    Py_INCREF(&EncoderType);
    PyModule_AddObject(m, "Encoder", (PyObject *)&EncoderType);

    return m;
}
