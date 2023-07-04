var module4 = require('./4');

class n {
  constructor(s) {
    module4(this, n);
    this.subscriber = s;
  }

  remove() {
    this.subscriber.removeSubscription(this);
  }
}

module.exports = n;
