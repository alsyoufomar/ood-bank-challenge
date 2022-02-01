const Client = require('./client')
const Transaction = require('./transaction')
const BankStatement = require('./bankStatement')
const error1 = 'client already exist'
const error2 = 'Client not found'
const error3 = 'This balance is not available'

class Bank {
  #clientList
  #transactions
  constructor () {
    this.#clientList = []
    this.#transactions = []
  }

  get clientList () {
    return this.#clientList.filter(x => x)
  }
  get transactions () {
    return this.#transactions.filter(x => x)
  }

  openAccount (id) {
    const client = new Client(id)
    if (this.#clientList.find(x => x.id === id)) return error1
    this.#clientList.push(client)
    return client
  }

  deposit (_amount, id) {
    const client = this.#clientList.find(x => x.id === id)
    if (!client) return error2
    client.currentBalance += _amount
    const transaction = new Transaction('deposit', _amount, id, client.currentBalance)
    this.#transactions.push(transaction)
  }

  withdrawal (_amount, id) {
    const client = this.#clientList.find(x => x.id === id)
    if (!client) return error2
    if (client.currentBalance < _amount) return error3
    client.currentBalance -= _amount
    const transaction = new Transaction('withdrawal', _amount, id, client.currentBalance)
    this.#transactions.push(transaction)
  }

  printState (client) {
    const allTrans = this.#transactions.filter(x => x.client === client)
    const statement = new BankStatement(allTrans)
    return statement.statement()
  }
}

module.exports = Bank
