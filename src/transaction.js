class Transaction {
  constructor (typeOfTrans, _amount, id, _balance) {
    this.date = Date().substring(4, 15)
    this.type = typeOfTrans
    this.amount = _amount
    this.client = id
    this.balance = _balance
  }
}

module.exports = Transaction
