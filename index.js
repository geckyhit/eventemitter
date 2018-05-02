const EventEmitter = require('./EventEmitter');
const testEmitter = require('./testEmitter');

const e1 = new EventEmitter();

testEmitter(e1, 5000)

e2 = e1.map(x => x * 2)

console.log(testEmitter(e1, 5000) ? 'ok' : 'bad');