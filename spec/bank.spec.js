const Bank = require('../src/bank')
const Client = require('../src/client')
const Transaction = require('../src/transaction')

describe('the bank', () => {
  let bank
  beforeEach(() => {
    bank = new Bank()
  })

  it('can add clients to the bank', () => {
    //setup
    const expected = new Client(1)
    //execute
    bank.openAccount(1)
    const result = bank.clientList[0]
    //verify
    expect(result).toEqual(expected)
  })

  it('the bank accepts many clients', () => {
    //setup
    const c1 = new Client(1)
    const c2 = new Client(2)
    const c3 = new Client(3)
    const c4 = new Client(4)
    const expected = [c1, c2, c3, c4]
    bank.openAccount(1)
    bank.openAccount(2)
    bank.openAccount(3)
    bank.openAccount(4)
    //execute
    const result = bank.clientList
    //verify
    expect(result).toEqual(expected)
  })

  it('the bank does not add the same client more than once', () => {
    //setup
    const expected = 'client already exist'
    //execute
    bank.openAccount(30)
    const result = bank.openAccount(30)
    //verify
    expect(result).toEqual(expected)
  })

  it('deposit some money in an existing account', () => {
    //setup
    const expected = new Transaction('deposit', 400, 1, 400)
    //execute
    bank.openAccount(1)
    bank.deposit(400, 1)
    const result = bank.transactions[0]
    //verify
    expect(result).toEqual(expected)
  })

  it('return error when deposit in unexisting account', () => {
    //setup
    const expected = 'Client not found'
    //execute
    bank.openAccount(1)
    const result = bank.deposit(1000, 2)
    //verify
    expect(result).toEqual(expected)
  })

  it('withdrawal some money from an existing account', () => {
    //setup
    const expected = new Transaction('withdrawal', 100, 1, 400)
    //execute
    bank.openAccount(1)
    bank.deposit(500, 1)
    bank.withdrawal(100, 1)
    const result = bank.transactions[1]
    //vefiry
    expect(result).toEqual(expected)
  })

  it('return error when withdrawal from an existing account', () => {
    //setup
    const expected = 'Client not found'
    //execute
    bank.openAccount(1)
    bank.deposit(500, 1)
    const result = bank.withdrawal(100, 2)
    //vefiry
    expect(result).toEqual(expected)
  })

  it('return error when withdrawal more the available balance', () => {
    //setup
    const expected = 'This balance is not available'
    //execute
    bank.openAccount(1)
    bank.deposit(50, 1)
    const result = bank.withdrawal(100, 1)
    //vefiry
    expect(result).toEqual(expected)
  })
})
