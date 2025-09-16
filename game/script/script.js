let canvas = document.getElementById('CanvasGame')
let ctx = canvas.getContext('2d')
const gridSize =20

const canvasWidth = canvas.width 
const canvasHeigtht = canvas.height

const cols = canvasWidth / gridSize
const rows = canvasHeigtht / gridSize

let snake =[{x:Math.floor(cols / 2),y:Math.floor(rows / 2)}]

