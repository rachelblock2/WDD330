let turn = 0
let squares = document.querySelector('#board').children;

const squaresArray = Array.from(squares)
squaresArray.forEach(
    square => {
        square.addEventListener('touchend', (e) => {
            if (turn === 0) {
                square.innerHTML = '<h3>O</h3>';
                turn = 1;
            } else if (turn === 1) {
                square.innerHTML = '<h3>X</h3>';
                turn = 0;
            }
        })
});

const button = document.querySelector('button')
button.addEventListener('touchend', (e) => {
    squaresArray.forEach(
        square => {
            square.textContent = ''
        }
    )
})