'use strict'

class Direction {
  static get LEFT () {
    return 'LEFT'
  }

  static get RIGHT () {
    return 'RIGHT'
  }

  static get UP () {
    return 'UP'
  }

  static get DOWN () {
    return 'DOWN'
  }

  constructor () {
    this.newDirection = null
    this.currentDirection = null

    this._createDirectionListener()
  }

  _createDirectionListener () {
    document.addEventListener('keydown', (event) => {
      this._handleDirection(event)
    })
  }

  _handleDirection ({ keyCode }) {
    if (this._isKeyLeft(keyCode)) {
      this.setLeft()
    }

    if (this._isKeyUp(keyCode)) {
      this.setUp()
    }

    if (this._isKeyRight(keyCode)) {
      this.setRight()
    }

    if (this._isKeyDown(keyCode)) {
      this.setDown()
    }
  }

  _isKeyLeft (keyCode) {
    return keyCode === 37
  }

  _isKeyRight (keyCode) {
    return keyCode === 39
  }

  _isKeyUp (keyCode) {
    return keyCode === 38
  }

  _isKeyDown (keyCode) {
    return keyCode === 40
  }

  hasDirection () {
    return !!this.currentDirection
  }

  ensureNewDirection () {
    this.currentDirection = this.newDirection
  }

  isLeft () {
    return this.currentDirection === Direction.LEFT
  }

  isNotLeft () {
    return !this.isLeft()
  }

  isRight () {
    return this.currentDirection === Direction.RIGHT
  }

  isNotRight () {
    return !this.isRight()
  }

  isUp () {
    return this.currentDirection === Direction.UP
  }

  isNotUp () {
    return !this.isUp()
  }

  isDown () {
    return this.currentDirection === Direction.DOWN
  }

  isNotDown () {
    return !this.isDown()
  }

  setLeft () {
    if (this.isNotRight()) {
      this.newDirection = Direction.LEFT
    }
  }

  setRight () {
    if (this.isNotLeft()) {
      this.newDirection = Direction.RIGHT
    }
  }

  setUp () {
    if (this.isNotDown()) {
      this.newDirection = Direction.UP
    }
  }

  setDown () {
    if (this.isNotUp()) {
      this.newDirection = Direction.DOWN
    }
  }
}

window.Direction = Direction
