let canvas = document.getElementById('CanvasGame')
let ctx = canvas.getContext('2d')
const gridSize = 20

const canvasWidth = canvas.width
const canvasHeigtht = canvas.height

const cols = canvasWidth / gridSize
const rows = canvasHeigtht / gridSize

let snake = [{ x: Math.floor(cols / 2), y: Math.floor(rows / 2) }]

let dirction = { x: 0, y: 0 }

let food = null
let speed = 200
let gameInterVarl = null

const spawnFood = () => {
    food = {
        x: Math.floor(Math.random() * cols),
        y: Math.floor(Math.random() * rows)
    }
    for (cell of snake) {
        if (cell.x === food.x && cell.y === food.y) {
            spawnFood()
            break
        }
    }
}
const gameOver = () => {
    clearInterval(gameInterVarl)
    alert('GameOver')
    document.location.reload()
}

const draw = () => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeigtht)
    for (cell of snake) {
        ctx.fillStyle('green')
        ctx.fillRect(cell.x * gridSize, cell.y * gridSize, gridSize - 1, gridSize - 1)
    }
    if (food) {
        ctx.fillStyle('red')
        ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 1, gridSize - 1)
    }
}
