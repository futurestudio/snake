'use strict'

class Game {
  constructor () {
    this.timer = null
    this.isPaused = false
    this.playingField = new window.PlayingField()
  }

  start () {
    this._createPauseListener()
    this._createInitialTreat()
    this._startTimer()
  }

  stop () {
    this._stopTimer()
  }

  _createPauseListener () {
    document.addEventListener('keydown', (event) => {
      this._handleKeypress(event)
    })
  }

  _handleKeypress ({ keyCode }) {
    if (this._pressedSpace(keyCode)) {
      return this._togglePaused()
    }
  }

  _pressedSpace (keyCode) {
    return keyCode === 32
  }

  _togglePaused () {
    this.isPaused = !this.isPaused
  }

  _createInitialTreat () {
    this.playingField._createTreat()
  }

  _startTimer () {
    this.timer = setInterval(() => this._nextTick(), 100)
  }

  _stopTimer () {
    clearInterval(this.timer)
    this.timer = null
  }

  _nextTick () {
    if (this.isPaused) {
      return
    }

    try {
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

  _renderPlayingField () {
    this.playingField.render()
  }
}

window.Game = Game
