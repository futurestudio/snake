'use strict'

class Snake {
  constructor ({ box }) {
    this.box = box
    this.direction = new window.Direction()
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
    return this.direction.hasDirection()
  }

  move () {
    this._setNewHead()
  }

  _setNewHead () {
    if (this.isMoving()) {
      this.coordinates.unshift(this._newHead())
    }
  }

  _newHead () {
    let { x, y } = this._head()

    if (this.direction.isLeft()) x -= this.box
    if (this.direction.isUp()) y -= this.box
    if (this.direction.isRight()) x += this.box
    if (this.direction.isDown()) y += this.box

    return new window.Coordinate({ x, y })
  }

  _head () {
    return this.coordinates[0]
  }

  getCoordinates () {
    return this.coordinates
  }

  removeTail () {
    if (this.isMoving()) {
      this.coordinates.pop()
    }
  }

  ensureInsidePlayingField () {
    if (this._outOfBounds()) {
      throw new Error('Oh no! Your snake hit the wall')
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
      throw new Error('Oh no! Your snake is eating itself')
    }
  }

  isEating (treat) {
    return this._head().equals(treat)
  }
}

window.Snake = Snake
