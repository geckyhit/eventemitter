const EventEmitter = require('./EventEmitter');
const testEmitter = require('./testEmitter');

var e1 = new EventEmitter()
let e2 = e1.scan((acc, curr) => acc + curr, 0);

e2.on('data', (x) => console.log('e2:', x)) // !!! используется ли тут реально e2?

e1.emit('data', 2)
e1.emit('data', 2)
//e2: --2--4-->