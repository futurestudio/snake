'use strict'

class Game {
  constructor () {
    this.box = 25
    this.treat = null
    this.timer = null
    this.changedDirection = false
    this.snake = new window.Snake({ box: this.box })

    this.playingField = document.getElementById('snake').getContext('2d')
    this.playingField.strokeStyle = `rgb(224, 229, 219)`
    this.playingField.fillStyle = `rgb(154, 172, 146)`
  }

  start () {
    this._createTreat()
    this._createDirectionListener()
    this.timer = setInterval(() => this.nextTick(), 130)
  }

  stop () {
    clearInterval(this.timer)
    this.timer = null
  }

  nextTick () {
    this.changedDirection = false
    try {
      this._ensureNotGameOver()
      this._moveSnake()
      this._renderPlayingField()
    } catch (error) {
      this.stop()
      throw error
    }
  }

  _createDirectionListener () {
    document.addEventListener('keydown', (event) => {
      this._handleDirection(event)
    })
  }

  _handleDirection ({ keyCode }) {
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

  _createTreat () {
    this.treat = new window.Coordinate({
      x: Math.floor(Math.random() * 18 + 1) * this.box,
      y: Math.floor(Math.random() * 16 + 3) * this.box
    })
  }

  _renderPlayingField () {
    this._clearPlayingField()
    this._renderTreat()
    this._renderSnake()
  }

  _clearPlayingField () {
    this.playingField.clearRect(0, 0, 475, 475)
  }

  _renderTreat () {
    this._fillCoordinate(this.treat)
  }

  _renderSnake () {
    this.snake.getCoordinates().forEach(coordinate => this._fillCoordinate(coordinate))
  }

  _fillCoordinate ({ x, y }) {
    this.playingField.fillRect(x, y, this.box, this.box)
    // this.playingField.strokeRect(x, y, this.box, this.box)
  }

  _moveSnake () {
    this.snake.move()

    if (this.snake.isEating(this.treat)) {
      this._createTreat()
      this._renderTreat()
    } else {
      this.snake.removeTail()
    }
  }

  _ensureNotGameOver () {
    this.snake.ensureInsidePlayingField()
    this.snake.ensureNotEatingItself()
  }
}

window.Game = Game
