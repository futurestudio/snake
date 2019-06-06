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
    this.currentDirection = null

    this._createDirectionListener()
  }

  _createDirectionListener () {
    document.addEventListener('keydown', (event) => {
      this._handleDirection(event)
    })
  }

  _handleDirection ({ keyCode }) {
    if (this._isKeyLeft(keyCode) && this.isNotRight()) {
      this.setLeft()
    }

    if (this._isKeyUp(keyCode) && this.isNotDown()) {
      this.setUp()
    }

    if (this._isKeyRight(keyCode) && this.isNotLeft()) {
      this.setRight()
    }

    if (this._isKeyDown(keyCode) && this.isNotUp()) {
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
    this.currentDirection = Direction.LEFT
  }

  setRight () {
    this.currentDirection = Direction.RIGHT
  }

  setUp () {
    this.currentDirection = Direction.UP
  }

  setDown () {
    this.currentDirection = Direction.DOWN
  }
}

window.Direction = Direction
