module.exports = (emitter, countIterator) => {
    let numberOfCompleted = 0
    for (let i = 0; i < countIterator; i++) {
        emitter.on(`test${i}`, x => numberOfCompleted++)
    }

    for (let i = 0; i < countIterator; i++) {
        emitter.emit(`test${i}`, 1)
    }
    return numberOfCompleted === countIterator;
}