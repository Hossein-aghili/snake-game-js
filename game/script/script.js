let canvas = document.getElementById('CanvasGame')
let ctx = canvas.getContext('2d')
const gridSize =20

const canvasWidth = canvas.width 
const canvasHeigtht = canvas.height

const cols = canvasWidth / gridSize
const rows = canvasHeigtht / gridSize

let snake =[{x:Math.floor(cols / 2),y:Math.floor(rows / 2)}]

let dirction = {x:0,y:0}

let food = null
let speed = 200
let gameInterVar = null

const spawnFood = ()=>{
    food = {
        x:Math.floor(Math.random() * cols),
        y:Math.floor(Math.random() * rows)
    }
    for(cell of snake){
        if(cell.x === food.x && cell.y === food.y){
            spawnFood()
            break
        }
    }
}