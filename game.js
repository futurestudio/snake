'use strict'

class Game {
  constructor () {
    this.box = 25
    this.score = 0
    this.treat = null
    this.timer = null
    this.isPaused = false
    this.snake = new window.Snake({ box: this.box })
    this.playingField = document.getElementById('snake').getContext('2d')
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
    this.treat = new window.Coordinate({
      x: Math.floor(Math.random() * 18 + 1) * this.box,
      y: Math.floor(Math.random() * 16 + 3) * this.box
    })
  }

  _createDirectionListener () {
    document.addEventListener('keydown', (event) => {
      this._handleDirection(event)
    })
  }

  _handleDirection ({ keyCode }) {
    if (keyCode === 32) {
      return this._togglePaused()
    }

    if (keyCode === 37 && this.snake.getDirection() !== 'RIGHT') {
      this.snake.setDirection('LEFT')
    }

    if (keyCode === 38 && this.snake.getDirection() !== 'DOWN') {
      this.snake.setDirection('UP')
    }

    if (keyCode === 39 && this.snake.getDirection() !== 'LEFT') {
      this.snake.setDirection('RIGHT')
    }

    if (keyCode === 40 && this.snake.getDirection() !== 'UP') {
      this.snake.setDirection('DOWN')
    }
  }

  _togglePaused () {
    this.isPaused = !this.isPaused
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
      this.stop()
      this._showError(error)
    }
  }

  _showError (error) {
    document.getElementById('error').textContent = error.message
  }

  _ensureNotGameOver () {
    this.snake.ensureInsidePlayingField()
    this.snake.ensureNotEatingItself()
  }

  _moveSnake () {
    this.snake.move()

    if (this.snake.isEating(this.treat)) {
      this.score += 1
      return this._createTreat()
    }

    this.snake.removeTail()
  }

  _renderPlayingField () {
    this._renderScore()
    this._clearPlayingField()
    this._renderSnake()
    this._renderTreat()
  }

  _renderScore () {
    document.getElementById('score').textContent = this.score
  }

  _clearPlayingField () {
    this.playingField.clearRect(0, 0, 475, 475)
  }

  _renderSnake () {
    this.playingField.fillStyle = `#9ae6b4`

    this.snake.getCoordinates().forEach(coordinate => this._fillCoordinate(coordinate))
  }

  _renderTreat () {
    this.playingField.fillStyle = `#f0fff4`

    this._fillCoordinate(this.treat)
  }

  _fillCoordinate ({ x, y }) {
    this.playingField.fillRect(x, y, this.box, this.box)
  }
}

window.Game = Game
