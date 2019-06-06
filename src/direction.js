'use strict'

class Direction {
  constructor () {
    this.direction = null
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
    return !!this.direction
  }

  isLeft () {
    return this.direction === 'LEFT'
  }

  isNotLeft () {
    return !this.isLeft()
  }

  isRight () {
    return this.direction === 'RIGHT'
  }

  isNotRight () {
    return !this.isRight()
  }

  isUp () {
    return this.direction === 'UP'
  }

  isNotUp () {
    return !this.isUp()
  }

  isDown () {
    return this.direction === 'DOWN'
  }

  isNotDown () {
    return !this.isDown()
  }

  setLeft () {
    this.direction = 'LEFT'
  }

  setRight () {
    this.direction = 'RIGHT'
  }

  setUp () {
    this.direction = 'UP'
  }

  setDown () {
    this.direction = 'DOWN'
  }
}

window.Direction = Direction
