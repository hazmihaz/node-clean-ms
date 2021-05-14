import { EventEmitter } from 'events'

const eventEmitter = new EventEmitter()

const emit = (event, data) => {
    eventEmitter.emit(event, data)
}

const on = (event, cb) => {
    eventEmitter.on(event, cb)
}

export default { emit, on }
