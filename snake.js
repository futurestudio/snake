'use strict'

class Snake {
  constructor ({ box }) {
    this.box = box
    this.direction = null
    this.coordinates = this._initialState()
  }

  _initialState () {
    return [
      new window.Coordinate({ x: 10 * this.box, y: 10 * this.box }),
      new window.Coordinate({ x: 9 * this.box, y: 10 * this.box }),
      new window.Coordinate({ x: 8 * this.box, y: 10 * this.box })
    ]
  }

  isMoving () {
    return !!this.direction
  }

  move () {
    this._setNewHead()
  }

  _head () {
    return this.coordinates[0]
  }

  _newHead () {
    let { x, y } = this.coordinates[0]

    if (this.direction === 'LEFT') x -= this.box
    if (this.direction === 'UP') y -= this.box
    if (this.direction === 'RIGHT') x += this.box
    if (this.direction === 'DOWN') y += this.box

    return new window.Coordinate({ x, y })
  }

  getCoordinates () {
    return this.coordinates
  }

  getDirection () {
    return this.direction
  }

  setDirection (direction) {
    this.direction = direction
  }

  _setNewHead () {
    if (this.isMoving()) {
      this.coordinates.unshift(this._newHead())
    }
  }

  removeTail () {
    if (this.isMoving()) {
      this.coordinates.pop()
    }
  }

  ensureInsidePlayingField () {
    if (this._outOfBounds()) {
      throw new Error('Snake hit the wall')
    }
  }

  _outOfBounds () {
    return this._isOutsideX() || this._isOutsideY()
  }

  _isOutsideX () {
    const { x } = this._newHead()

    return x < 0 || x > this.box * 18
  }

  _isOutsideY () {
    const { y } = this._newHead()

    return y < 0 || y > this.box * 18
  }

  ensureNotEatingItself () {
    if (!this.isMoving()) {
      return
    }

    const item = this.coordinates.find(coordinate => {
      return this._newHead().equals(coordinate)
    })

    if (item) {
      throw new Error('Snake is eating itself')
    }
  }

  isEating (treat) {
    return this._head().equals(treat)
  }
}

window.Snake = Snake
