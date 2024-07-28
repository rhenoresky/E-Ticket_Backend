class PaymentMidtrans {
  constructor(snap) {
    this._snap = snap;
  }

  async createTransaction(param) {
    try {
      return await this._snap.createTransaction(param);
    } catch (err) {
      console.log(err);
    }
  }

  async notification(notif) {
    try {
      return await this._snap.transaction.notification(notif);
    } catch (err) {
      console.log(err);
    }
  }
}

export default PaymentMidtrans;
