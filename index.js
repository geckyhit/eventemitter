const EventEmitter = require('./EventEmitter');
const testEmitter = require('./testEmitter');

var e1 = new EventEmitter()
let e2 = e1.map(x => x * 2)
let e3 = e2.map(x => x * 2)
let e4 = e3.map(x => x * 2)

e4.on('data', (x) => console.log('e4:', x))

e1.emit('data', 2)