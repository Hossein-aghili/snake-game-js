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
const update = () => {
    if (dirction.x === 0 && dirction.y === 0) return
    const newHead = {
        x: snake[0].x + dirction.x,
        y: snake[0].y + dirction.y
    }
    if (newHead.x < 0 || newHead.x >= cols || newHead.y < 0 || newHead.y >= rows) {
        gameOver()
        return
    }
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === newHead.x && snake[i].y === newHead.y) {
            gameOver()
            return
        }
    }
    snake.unshift(newHead)
    if (food && food.x === newHead.x && food.y === newHead.y) {
        spawnFood()
    } else {
        snake.pop()
    }
}

const draw = () => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeigtht)

    if (snake.length === 1) {
        // وقتی مار فقط یک خانه داره، دایره بکش
        ctx.beginPath()
        ctx.fillStyle = "#0f0"
        ctx.arc(
            snake[0].x * gridSize + gridSize / 2,
            snake[0].y * gridSize + gridSize / 2,
            gridSize / 2 - 2,
            0,
            Math.PI * 2
        )
        ctx.fill()
    } else {
        // مار با طول بیشتر، خط بکش
        ctx.beginPath()
        ctx.lineWidth = gridSize - 4
        ctx.lineJoin = "round"
        ctx.lineCap = "round"
        ctx.strokeStyle = "#0f0"

        ctx.moveTo(
            snake[0].x * gridSize + gridSize / 2,
            snake[0].y * gridSize + gridSize / 2
        )

        for (let i = 1; i < snake.length; i++) {
            ctx.lineTo(
                snake[i].x * gridSize + gridSize / 2,
                snake[i].y * gridSize + gridSize / 2
            )
        }
        ctx.stroke()
    }

    // غذا (دایره قرمز)
    if (food) {
        ctx.beginPath()
        ctx.fillStyle = "#f00"
        ctx.arc(
            food.x * gridSize + gridSize / 2,
            food.y * gridSize + gridSize / 2,
            gridSize / 2 - 3,
            0,
            Math.PI * 2
        )
        ctx.fill()
    }
}
const gameLoop = () => {
    update()
    draw()
}

document.addEventListener('keydown', (e) => {
    switch (e.code) {
        case "ArrowUp":
            if (dirction.y === 1) return
            dirction = { x: 0, y: -1 }
            break
        case "ArrowDown":
            if (dirction.y === -1) return
            dirction = { x: 0, y: 1 }
            break
        case "ArrowLeft":
            if (dirction.x === 1) return
            dirction = { x: -1, y: 0 }
            break
        case "ArrowRight":
            if (dirction.x === -1) return
            dirction = { x: 1, y: 0 }
    }
})
spawnFood()
gameInterVarl = setInterval(gameLoop, speed)