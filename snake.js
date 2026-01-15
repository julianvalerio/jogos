//const canvas = document.getElementById('game'); INSERI NO START
//const ctx = canvas.getContext('2d');
//const statusEl = document.getElementById('status-snake');
let canvas, ctx, statusSnakeEl;
const size = 20; //tamanho dos quadrados

let snake, food, dx, dy, gameLoop;

function openModalSnake(){
    //modal.style.display = 'flex';
    document.getElementById('modal-snake').style.display = 'flex';
    startGame();
}

function closeModalSnake(e){
    if(e.target.id === 'modal-snake'){
        document.getElementById('modal-snake').style.display = 'none';
        clearInterval(gameLoop);
    }
}

function startGame(){
    //alterei
    canvas = document.getElementById('game');
    ctx = canvas.getContext('2d');
    statusSnakeEl = document.getElementById('status-snake');

    snake = [{ x: 140, y: 140}]; //posição inicial
    food = randomPosition(); //posição da comida
    dx = size; //movimento horizontal
    dy = 0;

    statusSnakeEl.textContent = 'Pontuação: 0';
    clearInterval(gameLoop);
    gameLoop = setInterval(update, 150);
}

//Atualização do jogo
function update(){
    const head = { x: snake[0].x + dx, y: snake[0].y + dy};
    //colisão com a parede
    if(head.x <0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height){
        return gameOver();
    }
    //colisão com o próprio corpo
    for(let part of snake){
        if (part.x === head.x && part.y === head.y){
            return gameOver();
        }
    }
    snake.unshift(head); //adiciona nova cabeça
    //comeu a comida?
    if (head.x === food.x && head.y === food.y) {
        food = randomPosition();
        statusSnakeEl.textContent = 'Pontuação: '+(snake.length - 1);
    } else {
        snake.pop(); //remove cauda se não comer
    }
    draw();
}

//Desenho
function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // desenhar snake
    ctx.fillStyle = 'green';
    for(let part of snake){
        ctx.fillRect(part.x, part.y, size, size);
    }
    //desenha a comida
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, size, size);
}
//Comandos do teclado
document.addEventListener('keydown', e => {
    if(e.key === 'ArrowUp' && dy === 0) { dx = 0; dy = -size; }
    if(e.key === 'ArrowDown' && dy === 0) {dx = 0; dy = size; }
    if(e.key === 'ArrowLeft' && dx === 0) {dx = -size; dy = 0;}
    if(e.key === 'ArrowRight' && dx === 0) { dx = size; dy = 0;}
}); 
//Funções Auxiliares
function randomPosition(){
    return{
        x: Math.floor(Math.random() * (canvas.width / size)) * size,
        y: Math.floor(Math.random() * (canvas.height / size)) * size
    };
}

function gameOver(){
    clearInterval(gameLoop);
    statusSnakeEl.textContent += '- Fim de jogo';
}