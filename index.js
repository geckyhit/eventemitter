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

        return () => this.off(evName, handler);
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

    map(f) {

    }
}


const EE = new EventEmitter();
const cancelOnce = EE.once('test', b);
cancelOnce();
EE.emit('test', '5');
EE.emit('test', 5)