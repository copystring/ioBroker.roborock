/* eslint-disable */
var BigInteger = require('./jsbn');

var SecureRandom = require('./rng');

function parseBigInt(str, r) {
	return new BigInteger(str, r);
}

function linebrk(s, n) {
	var ret = "";
	var i = 0;
	while (i + n < s.length) {
		ret += s.substring(i, i + n) + "\n";
		i += n;
	}

	return ret + s.substring(i, s.length);
}

function byte2Hex(b) {
	if (b < 0x10)
		return "0" + b.toString(16);
	else
		return b.toString(16);
}

function pkcs1pad2(s, n) {
	if (n < s.length + 11) {
		console.log("Message too long for RSA");
		return null;
	}

	var ba = new Array();
	var i = s.length - 1;
	while (i >= 0 && n > 0) {
		var c = s.charCodeAt(i--);

		if (c < 128) {
			ba[--n] = c;
		} else if (c > 127 && c < 2048) {
			ba[--n] = c & 63 | 128;
			ba[--n] = c >> 6 | 192;
		} else {
			ba[--n] = c & 63 | 128;
			ba[--n] = c >> 6 & 63 | 128;
			ba[--n] = c >> 12 | 224;
		}
	}

	ba[--n] = 0;
	var rng = new SecureRandom();
	var x = new Array();
	while (n > 2) {
		x[0] = 0;
		while (x[0] == 0) {
			rng.nextBytes(x);
		}

		ba[--n] = x[0];
	}

	ba[--n] = 2;
	ba[--n] = 0;
	return new BigInteger(ba);
}

function RSAKey() {
	this.n = null;
	this.e = 0;
	this.d = null;
	this.p = null;
	this.q = null;
	this.dmp1 = null;
	this.dmq1 = null;
	this.coeff = null;
}

function RSAGetPublicString() {
	var exportObj = {
		n: this.n.toString(16),
		e: this.e.toString(16)
	};

	if (exportObj.n.length % 2 == 1) {
		exportObj.n = '0' + exportObj.n;
	}

	return JSON.stringify(exportObj);
}

function RSAGetPrivateString() {
	var privateKeys = ['n', 'e', 'd', 'p', 'q', 'dmp1', 'dmq1', 'coeff'];
	var ret = {};
	var that = this;
	privateKeys.forEach(function (key) {
		ret[key] = that[key] && that[key].toString(16);

		if (key != 'e' && ret[key].length % 2 == 1) {
			ret[key] = '0' + ret[key];
		}
	});
	return JSON.stringify(ret);
}

function RSASetPrivateString(privateStr) {
	var privateObj = JSON.parse(privateStr);
	return this.setPrivateEx(privateObj);
}

function RSASetPublic(N, E) {
	if (N != null && E != null && N.length > 0 && E.length > 0) {
		this.n = parseBigInt(N, 16);
		this.e = parseInt(E, 16);
	} else
		console.log("Invalid RSA public key");
}

function RSASetPublicString(publicStr) {
	var publicObj = JSON.parse(publicStr);
	return this.setPublic(publicObj.n, publicObj.e);
}

function RSADoPublic(x) {
	return x.modPowInt(this.e, this.n);
}

function RSAEncrypt(text) {
	var m = pkcs1pad2(text, this.n.bitLength() + 7 >> 3);
	if (m == null)
		return null;
	var c = this.doPublic(m);
	if (c == null)
		return null;
	var h = c.toString(16);
	if ((h.length & 1) == 0)
		return h;
	else
		return "0" + h;
}

RSAKey.prototype.doPublic = RSADoPublic;
RSAKey.prototype.setPublic = RSASetPublic;
RSAKey.prototype.encrypt = RSAEncrypt;

function pkcs1unpad2(d, n) {
    var b = d.toByteArray();
    console.warn('bytes length is :' + b.length);
    console.warn('n: ' + n);
    var i = 0;
    while (i < b.length && b[i] == 0) {
        ++i;
    }
    if (b.length - i != n - 1) {
        console.log("b.length - i " + (b.length - i));
        console.log("n - 1 " + (n - 1));
        console.log("Incorrect length");
        return null;
    }
    if (b[i] != 2) {
        console.log("Missing initial 2");
        return null;
    }
    ++i;
    while (b[i] != 0) {
        if (++i >= b.length) {
            console.log("Missing zero byte after 2");
            return null;
        }
    }
    var ret = [];
    while (++i < b.length) {
        var c = b[i] & 255;
        ret.push(c);
    }
    if (ret.length === 0) {
        console.log("No data after zero byte");
    }
    return ret;
}


function RSASetPrivate(N, E, D) {
	if (N != null && E != null && N.length > 0 && E.length > 0) {
		this.n = parseBigInt(N, 16);
		this.e = parseInt(E, 16);
		this.d = parseBigInt(D, 16);
	} else
		console.log("Invalid RSA private key");
}

function RSASetPrivateEx(N, E, D, P, Q, DP, DQ, C) {
	var params = {};

	if (typeof N == 'object') {
		params = N;
	} else {
		params.n = N;
		params.e = E;
		params.d = D;
		params.p = P;
		params.q = Q;
		params.dmp1 = DP;
		params.dmq1 = DQ;
		params.coeff = C;
	}

	if (params.n != null && params.e != null && params.n.length > 0 && params.e.length > 0) {
		this.n = parseBigInt(params.n, 16);
		this.e = parseInt(params.e, 16);
		this.d = parseBigInt(params.d, 16);
		this.p = parseBigInt(params.p, 16);
		this.q = parseBigInt(params.q, 16);
		this.dmp1 = parseBigInt(params.dmp1, 16);
		this.dmq1 = parseBigInt(params.dmq1, 16);
		this.coeff = parseBigInt(params.coeff, 16);
	} else
		console.log("Invalid RSA private key");
}

function RSAGenerate(B, E) {
	var rng = new SecureRandom();
	var qs = B >> 1;
	this.e = parseInt(E, 16);
	var ee = new BigInteger(E, 16);

	for (; ; ) {
		for (; ; ) {
			this.p = new BigInteger(B - qs, 1, rng);
			if (this.p.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE) == 0 && this.p.isProbablePrime(10))
				break;
		}

		for (; ; ) {
			this.q = new BigInteger(qs, 1, rng);
			if (this.q.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE) == 0 && this.q.isProbablePrime(10))
				break;
		}

		if (this.p.compareTo(this.q) <= 0) {
			var t = this.p;
			this.p = this.q;
			this.q = t;
		}

		var p1 = this.p.subtract(BigInteger.ONE);
		var q1 = this.q.subtract(BigInteger.ONE);
		var phi = p1.multiply(q1);

		if (phi.gcd(ee).compareTo(BigInteger.ONE) == 0) {
			this.n = this.p.multiply(this.q);
			this.d = ee.modInverse(phi);
			this.dmp1 = this.d.mod(p1);
			this.dmq1 = this.d.mod(q1);
			this.coeff = this.q.modInverse(this.p);
			break;
		}
	}
}

function RSADoPrivate(x) {
	if (this.p == null || this.q == null)
		return x.modPow(this.d, this.n);
	var xp = x.mod(this.p).modPow(this.dmp1, this.p);
	var xq = x.mod(this.q).modPow(this.dmq1, this.q);
	while (xp.compareTo(xq) < 0) {
		xp = xp.add(this.p);
	}

	return xp.subtract(xq).multiply(this.coeff).mod(this.p).multiply(this.q).add(xq);
}

function RSADecrypt(ctext) {
	var c = parseBigInt(ctext, 16);

	var m = this.doPrivate(c);

	if (m == null) {
		return null;
	}


	return pkcs1unpad2(m, this.n.bitLength() + 7 >> 3);
}

RSAKey.prototype.doPrivate = RSADoPrivate;
RSAKey.prototype.setPrivateEx = RSASetPrivateEx;
RSAKey.prototype.generate = RSAGenerate;
RSAKey.prototype.decrypt = RSADecrypt;
RSAKey.prototype.getPublicString = RSAGetPublicString;
RSAKey.prototype.setPublicString = RSASetPublicString;
RSAKey.prototype.getPrivateString = RSAGetPrivateString;
RSAKey.prototype.setPrivateString = RSASetPrivateString;
RSAKey.prototype.linebrk = linebrk;
module.exports = RSAKey;
