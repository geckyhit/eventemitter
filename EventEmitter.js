class EventEmitter {
    constructor() {
        this._id = EventEmitter.id++;
        this.events = {}
    }

    on(evName, f) {
        if (!this.events[evName])
            this.events[evName] = []


        // if (typeof f === 'function')
        //     f()

        this.events[evName].push(f)
        console.log('on', this._id, this.events)
    }

    once(evName, f) {
        const handler = (data) => {
            this.off(evName, handler)
            f(data)
        }
        this.on(evName, handler)

        return handler;
    }

    off(evName, f) {
        const indexF = this.events[evName].indexOf(f)
        if (indexF < 0) return

        this.events[evName] = [
            ...this.events[evName].slice(0, indexF),
            ...this.events[evName].slice(indexF + 1)
        ]
    }

    emit(evName, data) {
        if (!this.events[evName]) throw new Error('Non-existent event')
        this.events[evName].forEach(f => f(data));
    }

    map(mapFn) {
        let emitter2 = new EventEmitter()
        let _on = emitter2.on.bind(emitter2)
        emitter2.on = (event, observeFn) => {
            console.log('on in map', this._id);
            _on(event, observeFn)
            this.on(event, (arg) => {
                observeFn(mapFn(arg))
            })
        }
        return emitter2
    }
}

EventEmitter.id = 1;

module.exports = EventEmitter