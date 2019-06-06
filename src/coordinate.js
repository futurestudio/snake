'use strict'

class Coordinate {
  constructor ({ x, y }) {
    this.x = x
    this.y = y
  }

  equals ({ x, y }) {
    return this.x === x && this.y === y
  }
}

window.Coordinate = Coordinate
