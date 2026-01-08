let board = Array(9).fill('');
let player = 'X';
const boardEl = document.getElementById('board');
const statusEl = document.getElementById('status');
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
        cell.onclick = () => player(i, cell);
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
