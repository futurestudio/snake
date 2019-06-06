'use strict'

class Game {
  constructor () {
    this.timer = null
    this.isPaused = false
    this.playingField = new window.PlayingField()
  }

  start () {
    this._createTreat()
    this._createDirectionListener()
    this._startTimer()
  }

  stop () {
    this._stopTimer()
  }

  _createTreat () {
    this.playingField._createTreat()
  }

  _createDirectionListener () {
    document.addEventListener('keydown', (event) => {
      this._handleDirection(event)
    })
  }

  _handleDirection ({ keyCode }) {
    if (this._pressedSpace(keyCode)) {
      return this._togglePaused()
    }

    if (this._isKeyLeft(keyCode) && this.playingField.getSnake().isNotMovingRight()) {
      this.playingField.getSnake().setDirection('LEFT')
    }

    if (this._isKeyUp(keyCode) && this.playingField.getSnake().isNotMovingDown()) {
      this.playingField.getSnake().setDirection('UP')
    }

    if (this._isKeyRight(keyCode) && this.playingField.getSnake().isNotMovingLeft()) {
      this.playingField.getSnake().setDirection('RIGHT')
    }

    if (this._isKeyDown(keyCode) && this.playingField.getSnake().isNotMovingUp()) {
      this.playingField.getSnake().setDirection('DOWN')
    }
  }

  _togglePaused () {
    this.isPaused = !this.isPaused
  }

  _pressedSpace (keyCode) {
    return keyCode === 32
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

  _startTimer () {
    this.timer = setInterval(() => this.nextTick(), 100)
  }

  _stopTimer () {
    clearInterval(this.timer)
    this.timer = null
  }

  nextTick () {
    if (this.isPaused) {
      return
    }

    try {
      this._ensureNotGameOver()
      this._moveSnake()
      this._renderPlayingField()
    } catch (error) {
      console.error(error)

      this.stop()
      this._showError(error)
    }
  }

  _showError (error) {
    document.getElementById('error').textContent = error.message
  }

  _ensureNotGameOver () {
    this.playingField.ensureSnakeInsidePlayingField()
    this.playingField.ensureSnakeNotEatingItself()
  }

  _moveSnake () {
    this.playingField.moveSnake()
  }

  _renderPlayingField () {
    this.playingField.render()
  }
}

window.Game = Game
