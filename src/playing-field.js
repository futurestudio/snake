'use strict'

class PlayingField {
  constructor () {
    this.box = 25
    this.score = 0
    this.treat = null
    this.snake = new window.Snake({ box: this.box })
    this.playingField = document.getElementById('snake').getContext('2d')
  }

  getSnake () {
    return this.snake
  }

  _moveSnake () {
    this.snake.move()

    if (this.snake.isEating(this.treat)) {
      this.score += 1
      return this._createTreat()
    }

    this.snake.removeTail()
  }

  render () {
    this._moveSnake()

    this._clearPlayingField()
    this._renderScore()
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

  _createTreat () {
    this.treat = new window.Coordinate({
      x: Math.floor(Math.random() * 18) * this.box,
      y: Math.floor(Math.random() * 18) * this.box
    })
  }
}

window.PlayingField = PlayingField
