class BankStatement {
  constructor (_clientTransactions) {
    this.clientTransactions = _clientTransactions
  }

  statement () {
    let state = '\n' + 'date        || credit || debit  || balance' + '\n'
    for (let n of this.clientTransactions) {
      if (n.type === 'deposit') {
        state += `${n.date} || ${String(n.amount.toFixed(2)).padEnd(7, ' ')}||        || ${n.balance.toFixed(2)}` + '\n'
      } else {
        state += `${n.date} ||        || ${String(n.amount.toFixed(2)).padEnd(7, ' ')}|| ${n.balance.toFixed(2)}` + '\n'
      }
    } return state
  }
}

module.exports = BankStatement
