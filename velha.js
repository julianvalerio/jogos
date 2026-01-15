let board = Array(9).fill('');
let player = 'X';
const boardEl = document.getElementById('board');
const statusEl = document.getElementById('status');
//inserir no modal no jogo da velha
const modal = document.getElementById('modal');

function openModal(){
    modal.style.display ='flex';
    reset();
} 
function closeModal(e){
    if(e.target.id === 'modal') modal.style.display = 'none';
}
function reset(){
    board.fill('');
    player = 'X';
    statusEl.textContent = 'Vez do jogador X';
    boardEl.innerHTML = '';
    board.forEach((_, i)=> {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.onclick = () => play(i, cell);
        boardEl.appendChild(cell);
    });
}

function play(i, cell){
    if (board[i]) return;
    board[i] = player;
    cell.textContent = player;
    if (check()) return;
    player = player === 'X' ? '0' : 'X';
    statusEl.textContent = 'Vez do jogador ' + player;
}

function check(){
    const wins=[
        [0,1,2], [3,4,5,], [6,7,8], [0,3,6], [1,4,7],
        [2,5,8], [0,4,8], [2,4,6]
    ];
    for (let w of wins){
        if(w.every(i => board[i] === player)){
            statusEl.textContent = 'Jogador ' + player +    ' Venceu!'; 
            return true;
        }
    }
    if (board.every(c => c)) {
        statusEl.textContent = 'Empate!';
        return true;
    }
}