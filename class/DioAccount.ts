export abstract class DioAccount {
    name: string
    accountNumber: number
    balance: number = 0

    constructor(name: string, accountNumber: number) {
        this.name = name
        this.accountNumber = accountNumber
    }

    deposit = (): void => {
        console.log('Voce depositou')
    }

    withdraw = (): void => {
        console.log('Voce sacou')
    }

    getBalance = (): void => {
        console.log(this.balance)
    }
}