
function Arcfour() {
	this.i = 0;
	this.j = 0;
	this.S = new Array();
}

function ARC4init(key) {
	var i,
	j,
	t;

	for (i = 0; i < 256; ++i) {
		this.S[i] = i;
	}

	j = 0;

	for (i = 0; i < 256; ++i) {
		j = j + this.S[i] + key[i % key.length] & 255;
		t = this.S[i];
		this.S[i] = this.S[j];
		this.S[j] = t;
	}

	this.i = 0;
	this.j = 0;
}

function ARC4next() {
	var t;
	this.i = this.i + 1 & 255;
	this.j = this.j + this.S[this.i] & 255;
	t = this.S[this.i];
	this.S[this.i] = this.S[this.j];
	this.S[this.j] = t;
	return this.S[t + this.S[this.i] & 255];
}

Arcfour.prototype.init = ARC4init;
Arcfour.prototype.next = ARC4next;

function prng_newstate() {
	return new Arcfour();
}

var rng_psize = 256;
var rng_state;
var rng_pool;
var rng_pptr;

function rng_seed_int(x) {
	rng_pool[rng_pptr++] ^= x & 255;
	rng_pool[rng_pptr++] ^= x >> 8 & 255;
	rng_pool[rng_pptr++] ^= x >> 16 & 255;
	rng_pool[rng_pptr++] ^= x >> 24 & 255;
	if (rng_pptr >= rng_psize)
		rng_pptr -= rng_psize;
}

function rng_seed_time() {
	rng_seed_int(new Date().getTime());
}

if (rng_pool == null) {
	rng_pool = new Array();
	rng_pptr = 0;
	var t;

	if (typeof window !== 'undefined') {
		if (window.crypto && window.crypto.getRandomValues) {
			var ua = new Uint8Array(32);
			window.crypto.getRandomValues(ua);

			for (t = 0; t < 32; ++t) {
				rng_pool[rng_pptr++] = ua[t];
			}
		}

		if (navigator.appName == "Netscape" && navigator.appVersion < "5" && window.crypto) {
			var z = window.crypto.random(32);

			for (t = 0; t < z.length; ++t) {
				rng_pool[rng_pptr++] = z.charCodeAt(t) & 255;
			}
		}
	} else {}
	while (rng_pptr < rng_psize) {
		t = Math.floor(65536 * Math.random());
		rng_pool[rng_pptr++] = t >>> 8;
		rng_pool[rng_pptr++] = t & 255;
	}

	rng_pptr = 0;
	rng_seed_time();
}

function rng_get_byte() {
	if (rng_state == null) {
		rng_seed_time();
		rng_state = prng_newstate();
		rng_state.init(rng_pool);

		for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr) {
			rng_pool[rng_pptr] = 0;
		}

		rng_pptr = 0;
	}

	return rng_state.next();
}

function rng_get_bytes(ba) {
	var i;

	for (i = 0; i < ba.length; ++i) {
		ba[i] = rng_get_byte();
	}
}

function SecureRandom() {}

SecureRandom.prototype.nextBytes = rng_get_bytes;
module.exports = SecureRandom;
