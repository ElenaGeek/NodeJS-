//import EventEmitter from "events";
const EventEmitter = require("events");

const requestTypes = [
    {
        type: 'send',
        payload: 'to send a document'
    },
    {
        type: 'receive',
        payload: 'to receive a document'
    },
    {
        type: 'sign',
        payload: 'to sign a document'
    },
]

class Customer {
    constructor(params) {
        this.type = params.type
        this.payload = params.payload
    }
}

// generate
const generateIntInRange = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)

    return Math.floor(Math.random() * (max - min)) + min;
}

const delay = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms)
    })
}

const generateNewCustomer = () => {
    const intervelValue = generateIntInRange(1, 5) * 1000
    const params = requestTypes[generateIntInRange(0, 2)]

    return delay(intervelValue).then(() => new Customer(params))
}

class Handler {
    static send(payload) {
        console.log('Send request')
        console.log(`Customer need ${payload}`)
    }
    static receive(payload) {
        console.log('Receive request')
        console.log(`Customer need ${payload}`)
    }
    static sign(payload) {
        console.log('Sign request')
        console.log(`Customer need ${payload}`)
    }
}

const emmitter = new class extends EventEmitter {}

emmitter.on('error', console.log)
emmitter.on('send', Handler.send)
emmitter.on('receive', () => {emmitter.emit('error', 'Receive operation - Employee got sick!!!')})
emmitter.on('sign', Handler.sign)

const run = async () => {
    const customer = await generateNewCustomer()
    emmitter.emit(customer.type, customer.payload)

    run()
}
run()