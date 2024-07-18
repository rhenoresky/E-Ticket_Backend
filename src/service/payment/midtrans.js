class PaymentMidtrans {
  constructor(snap) {
    this._snap = snap;
  }

  async createTransaction(param) {
    try {
      const transaction = await this._snap.createTransaction(param);
      console.log(transaction);
    } catch (err) {
      console.log(err);
    }
  }

  async notification(notifJson) {
    try {
      const transaction = await this._snap.transaction.notification(notifJson);
      console.log(transaction);
    } catch (err) {
      console.log(err);
    }
  }
}

export default PaymentMidtrans;
