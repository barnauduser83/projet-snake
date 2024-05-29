import "./style.scss";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const speed = 800;

let direction = 'o';


const gridElem = 40; // 20 x 20
const snake =[[9,9], [8,9], [7,9]];

const apple = [5, 5];

const drawMap = () => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 800, 800);
};

const drawSnake = () => {
    ctx.fillStyle = "green";
    for(let body of snake) {
        ctx.fillRect(body[0] * gridElem, body[1] * gridElem, gridElem, gridElem)
    }
};
const drawApple = () => {
    ctx.fillStyle = "red";
    ctx.fillRect(apple[0] * gridElem, apple[1] * gridElem, gridElem, gridElem );
};
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowRight': {
            direction ='e'
            break;
        }
        case 'ArrowLeft': {
            direction = 'o'
            break;
        }
        case 'ArrowUp': {
            direction = 'n'  
            break;
        }
        case 'ArrowDown': {
            direction = 's' 
            break;
        }
    }
    console.log(event);
});

drawMap();
drawSnake();
drawApple();

const gameover = () => {
    if (snake [0][0] > 19 ||
         snake [0][0] < 0 ||
         snake [0][1] > 19 ||
         snake [0][1] < 0
    ) {
        return true ;
    }

}

const updateSnakePosition = () => {
    let head;
    switch (direction) {
        case 'e': {
            head = [snake[0][0] + 1, snake[0][1]];
            break;
        }
        case 'o': {
            head = [snake[0][0] - 1, snake[0][1]];
            break;
        }
        case 'n': {
            head = [snake[0][0] , snake[0][1] - 1];
            break;
        }
        case 's': {
            head = [snake[0][0] , snake[0][1] + 1];
            break;
        }
    }
    
    snake.unshift(head);

    snake.pop();
    return gameover();
}

const move = () => {
    if (!updateSnakePosition()) {
        drawMap();
        drawSnake();
        drawApple();
        setTimeout(() => {
            requestAnimationFrame(move);
            }, 1000 - speed);
        } else {
            alert('Perdu !')
        }

    };
   

requestAnimationFrame(move);