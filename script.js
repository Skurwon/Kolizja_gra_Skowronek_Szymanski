//WLASCIWOSCI OBIEKTU
class FlyingObject {
    constructor(controlKeys, color, initialXPercentage) {
        this.x = window.innerWidth * initialXPercentage;
        this.y = window.innerHeight * 0.5;
        this.size = 20;
        this.defaultSpeed = 5;
        this.speed = this.defaultSpeed;
        this.controlKeys = controlKeys;
        this.color = color;
        this.flyingObject = null;
        this.keysPressed = {};
        this.canMove = true;
        this.init();
    }

    init() {
        this.flyingObject = document.createElement('div');
        this.flyingObject.style.position = 'absolute';
        this.flyingObject.style.width = `${this.size * 2}px`;
        this.flyingObject.style.height = `${this.size * 2}px`;
        this.flyingObject.style.backgroundColor = this.color;
        this.flyingObject.style.borderRadius = '50%';
        document.querySelector('.game-container').appendChild(this.flyingObject);
        this.updatePosition();

        document.addEventListener('keydown', (event) => this.handleKeyPress(event));
        document.addEventListener('keyup', (event) => this.handleKeyRelease(event));

        this.update();
    }

    handleKeyPress(event) {
        if (this.controlKeys && this.canMove) {
            this.keysPressed[event.key] = true;
        }
    }

    handleKeyRelease(event) {
        if (this.controlKeys && this.canMove) {
            this.keysPressed[event.key] = false;
        }
    }

    resetKeys() {
        this.keysPressed = {};
    }

    moveObject() {
        if (!this.canMove) return;

        let dx = 0;
        let dy = 0;

        if (this.keysPressed[this.controlKeys.up]) dy -= this.speed;
        if (this.keysPressed[this.controlKeys.down]) dy += this.speed;
        if (this.keysPressed[this.controlKeys.left]) dx -= this.speed;
        if (this.keysPressed[this.controlKeys.right]) dx += this.speed;

        const gameContainer = document.querySelector('.game-container');
        const gameContainerWidth = gameContainer.offsetWidth;
        const gameContainerHeight = gameContainer.offsetHeight;

        this.x = Math.max(this.size, Math.min(gameContainerWidth - this.size * 2, this.x + dx));
        this.y = Math.max(this.size, Math.min(gameContainerHeight - this.size * 2, this.y + dy));

        this.updatePosition();
    }

    updatePosition() {
        this.flyingObject.style.left = `${this.x - this.size}px`;
        this.flyingObject.style.top = `${this.y - this.size}px`;
    }

    update() {
        this.moveObject();
        requestAnimationFrame(() => this.update());
    }
}
//WLASCIWOSCI OBIEKTU


//TIMER
let timer = 0;
let timerInterval;

function startTimer() {
    const gameTime = document.getElementById('gameTime');
    timer = 0;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timer += 0.1;
        gameTime.textContent = `Czas: ${timer.toFixed(1)}s`;
    }, 100);
}

function stopTimer() {
    clearInterval(timerInterval);
}
//TIMER


//KOLIZJA
function checkCollisions() {
    if (checkCollision(flyingObject1, flyingObject2)) {
        stopTimer();
        flyingObject1.canMove = false;
        flyingObject2.canMove = false;
        showEndScreen(`Gracz goniący wygrał w ${timer.toFixed(1)}s!`);
        return;
    }

    requestAnimationFrame(checkCollisions);
}

function checkCollision(obj1, obj2) {
    const dx = obj1.x - obj2.x;
    const dy = obj1.y - obj2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < obj1.size + obj2.size;
}
//KOLIZJA


//GRA PONOWNA
function showEndScreen(message) {
    const endScreen = document.createElement('div');
    endScreen.id = 'endScreen';
    endScreen.style.position = 'absolute';
    endScreen.style.top = '50%';
    endScreen.style.left = '50%';
    endScreen.style.transform = 'translate(-50%, -50%)';
    endScreen.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    endScreen.style.color = 'white';
    endScreen.style.padding = '20px';
    endScreen.style.textAlign = 'center';
    endScreen.style.borderRadius = '10px';
    endScreen.innerHTML = `<p>${message}</p><button onclick="restartGame()">Zagraj ponownie</button>`;
    document.body.appendChild(endScreen);
}
//GRA PONOWNA


//RESET GRY
function restartGame() {
    document.getElementById('endScreen').remove();
    flyingObject1.x = window.innerWidth * 0.33;
    flyingObject1.y = window.innerHeight * 0.5;
    flyingObject2.x = window.innerWidth * 0.66;
    flyingObject2.y = window.innerHeight * 0.5;
    flyingObject1.resetKeys();
    flyingObject2.resetKeys();
    flyingObject1.canMove = true;
    flyingObject2.canMove = true;
    flyingObject1.updatePosition();
    flyingObject2.updatePosition();
    startTimer();
    checkCollisions();
}
//RESET GRY


//TWORENIE OBIEKTOW I PRZYPISYWANIE DO NICH KONTROLEK, ROZMIARU ORAZ PREDKOSCI
const flyingObject1 = new FlyingObject({ up: 'w', down: 's', left: 'a', right: 'd' }, 'red', 0.33);
const flyingObject2 = new FlyingObject({ up: 'ArrowUp', down: 'ArrowDown', left: 'ArrowLeft', right: 'ArrowRight' }, 'blue', 0.66);
flyingObject2.size = 25;
flyingObject2.flyingObject.style.width = `${flyingObject2.size * 2}px`;
flyingObject2.flyingObject.style.height = `${flyingObject2.size * 2}px`;
flyingObject2.defaultSpeed = 4;
flyingObject2.speed = 4;
//TWORENIE OBIEKTOW I PRZYPISYWANIE DO NICH KONTROLEK, ROZMIARU ORAZ PREDKOSCI


//START TIMERA I OBSEWACJA KOLIZJI
startTimer();
checkCollisions();
//START TIMERA I OBSEWACJA KOLIZJI
