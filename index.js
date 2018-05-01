class EventEmitter {
    constructor() {
        this.events = {}
    }

    on(evName, f) {
        if (!this.events[evName])
            this.events[evName] = [];

        this.events[evName].push(f);
    }

    once(evName, f) {
        const handler = (data) => {
            this.off(evName, handler);
            f(data);
        }
        this.on(evName, handler);

        return handler;
    }

    off(evName, f) {
        const indexF = this.events[evName].indexOf(f);
        if (indexF < 0) return;

        this.events[evName] = [
            ...this.events[evName].slice(0, indexF),
            ...this.events[evName].slice(indexF + 1)
        ];
    }

    emit(evName, data) {
        this.events[evName].forEach(f => f(data));
    }

    map(modF) {

        const parentEE = this;
        const newEE = new EventEmitter();

        const on = newEE.on;
        newEE.on = (evName, f) => {

            parentEE.on(evName, (data) =>
                newEE.emit(evName, modF(data)
                ))

            on.call(newEE, evName, f);
        }

        const emit = newEE.emit;
        newEE.emit = (evName, data) =>
            emit.call(newEE, evName, modF(data))


        return newEE;
    }
}


const e1 = new EventEmitter();
const e2 = e1.map(x => {
    return x * 2
});

e1.on('data', x => console.log('e1:', x));
e2.on('data', x => console.log('e2:', x));

e1.emit('data', 1);
e1.emit('data', 2);
