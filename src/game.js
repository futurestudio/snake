'use strict'

class Game {
  static get SPEED_SLOW () {
    return 200
  }

  static get SPEED_MEDIUM () {
    return 150
  }

  static get SPEED_FAST () {
    return 100
  }

  constructor () {
    this.timer = null
    this.isPaused = false
    this.speed = Game.SPEED_FAST
    this.playingField = new window.PlayingField()

    this._initializeSpeedButtonsListener()
  }

  start () {
    this._createPauseListener()
    this._createInitialTreat()
    this._startTimer()
  }

  stop () {
    this._stopTimer()
  }

  _initializeSpeedButtonsListener () {
    this._initializeSlowSpeedListener()
    this._initializeMediumSpeedListener()
    this._initializeFastSpeedListener()
  }

  _initializeSlowSpeedListener () {
    document.getElementById('speed-slow').addEventListener('click', () => {
      this.speed = Game.SPEED_SLOW
      this._restartTimer()
    })
  }

  _initializeMediumSpeedListener () {
    document.getElementById('speed-medium').addEventListener('click', () => {
      this.speed = Game.SPEED_MEDIUM
      this._restartTimer()
    })
  }

  _initializeFastSpeedListener () {
    document.getElementById('speed-fast').addEventListener('click', () => {
      this.speed = Game.SPEED_FAST
      this._restartTimer()
    })
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
    this.timer = setInterval(() => this._nextTick(), this.speed)
  }

  _stopTimer () {
    clearInterval(this.timer)
    this.timer = null
  }

  _restartTimer () {
    this._stopTimer()
    this._startTimer()
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
