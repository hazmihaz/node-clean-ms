import { EventEmitter } from 'events'

class EventBus {
    eventEmitter = new EventEmitter()

    emit(event, data) {
        this.eventEmitter.emit(event, data)
    }

    on(event, cb) {
        this.eventEmitter.on(event, cb)
    }

    USER_REGISTER = 'USER_REGISTER'
}

export default EventBus
