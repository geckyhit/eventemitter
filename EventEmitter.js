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
        this.events[evName].forEach(f => f(data));
    }

    /*
let map = (mapFn, emitter) => {
  let emitter2 = new EventEmitter()
  emitter2.on = (event, observeFn) => {
    emitter.on(event, (arg) => {
      observeFn(mapFn(arg))
    })
  }
  return emitter2
}
    */
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
}

let e1 = new EventEmitter()


e1.on("data", x => console.log("e1.0:", x))
e1.on("data", x => console.log("e1.1:", x))
e1.on("data", x => console.log("e1.2:", x))
e1.on("data", x => console.log("e1.3:", x))

e1.emit("data", 1)

let e2 = e1.map(x => {
    return x * 2
})

console.log('after the emit')

e1.on("data", x => console.log("e1.4:", x))
e1.on("data", x => console.log("e1.5:", x))
e1.on("data", x => console.log("e1.6:", x))
e1.on("data", x => console.log("e1.7:", x))
e2.on('data', x => console.log('e2.0:', x))
e1.on("data", x => console.log("e1.4:", x))
e1.on("data", x => console.log("e1.5:", x))
e1.on("data", x => console.log("e1.6:", x))
e1.on("data", x => console.log("e1.7:", x))
e2.on('data', x => console.log('e2.0:', x))

e1.emit("data", 1)