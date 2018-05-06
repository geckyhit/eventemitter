class EventEmitter {
    constructor() {
        this._id = EventEmitter.id++;
        this.events = {}
    }

    on(evName, f) {
        if (!this.events[evName])
            this.events[evName] = []

        this.events[evName].push(f)
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
            _on(event, observeFn)
            this.on(event, (arg) => {
                observeFn(mapFn(arg))
            })
        }
        return emitter2
    }

    filter(filterFn) {
        let emitter2 = new EventEmitter()
        let _on = emitter2.on.bind(emitter2)
        emitter2.on = (event, observeFn) => {
            _on(event, observeFn)
            this.on(event, (arg) => {
                if (filterFn(arg))
                    observeFn(arg)
            })
        }
        return emitter2
    }

    scan(scanFn, initialValue) {

        let emitter2 = new EventEmitter()
        let _on = emitter2.on.bind(emitter2)

        let value = initialValue;

        emitter2.on = (event, observeFn) => {
            _on(event, observeFn)
            this.on(event, (arg) => {
                value = scanFn(value, arg);
                observeFn(value);
            })
        }
        return emitter2
    }
}

EventEmitter.id = 1;

module.exports = EventEmitter