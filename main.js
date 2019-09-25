//переменный 

const score = document.querySelector('.score'),
	start = document.querySelector('.start'),
	gameArea = document.querySelector('.gameArea'),
	car = document.createElement('div');

car.classList.add('car');

const keys = {
	ArrowUp: false,
	ArrowDown: false,
	ArrowRight: false,
	ArrowLeft: false
}
const setting = {
	start: false,
	score: 0,
	speed: 3,	
	traffic: 3
}
 // эвенты
start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

//функции
function startGame() {
	start.classList.add('hide');
	gameArea.innerHTML = '';
	car.style.left = '125px';
	car.style.top = 'auto';
	car.style.bottom = '10px';
	for(let i = 0; i < getQuantityElements(100) + 1; i++){
		const line = document.createElement('div');
		line.classList.add('line');
		line.style.top = (i * 100) + 'px';
		line.y = i * 100;
		gameArea.appendChild(line);
	}
	for(let i = 0; i < getQuantityElements(100 * setting.traffic);i++){
		const enemy = document.createElement('div');
		enemy.classList.add('enemy');
		enemy.y = -100 * setting.traffic * (i + 1);
		enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
		enemy.style.top = enemy.y + 'px';
		enemy.style.background = 'transparent url("./image/enemy.png") center / cover no-repeat';
		gameArea.appendChild(enemy);
	}
	
	setting.start = true;
	setting.score = 0;
	gameArea.appendChild(car);
	setting.x = car.offsetLeft;
	setting.y = car.offsetTop;
	requestAnimationFrame(playGame);
};
function playGame(){
	console.log("playGame");
	if (setting.start) {
		setting.score += setting.speed;
		score.innerHTML= 'score<br>' + setting.score;
		moveRoad();
		moveEnemy();
		if (keys.ArrowLeft && setting.x > 0) {
			setting.x -= setting.speed;
		}
		if (keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)) {
			setting.x += setting.speed;
		}
		if (keys.ArrowUp && setting.y > 0) {
			setting.y -= setting.speed;
		}
		if (keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)) {
			setting.y += setting.speed;
		}
		car.style.left = setting.x + 'px';
		car.style.top = setting.y + 'px';
		requestAnimationFrame(playGame);
	}
	
}
function startRun(event){
	event.preventDefault();
	keys[event.key] = true;
}
function stopRun(event) {
	event.preventDefault();
	keys[event.key] = false;
}
function moveRoad() {

	let lines = document.querySelectorAll('.line');
	lines.forEach(function(line){
		line.y += setting.speed;
		line.style.top = line.y + 'px';

		if (line.y >= document.documentElement.clientHeight){
			line.y = -100;
		}
	});
}
function moveEnemy(){
	let enemy = document.querySelectorAll('.enemy');
	enemy.forEach(function(item){
		let carRect = car.getBoundingClientRect();
		let enemyRect = item.getBoundingClientRect();
		
		
		/* дополнение в условие по 7 пикселей по всерху и снизу,
		 *  и по 5 пикселя слева и справа. 
		 * Машинка меньше всего изображения 
		 */
		if (carRect.top + 14 <= enemyRect.bottom && 
		carRect.left + 10 <= enemyRect.right &&
		carRect.right - 10 >= enemyRect.left &&
		carRect.bottom  - 14 >= enemyRect.top){
			setting.start = false;
			start.classList.remove('hide');
			start.style.top = score.offsetHeight;
		}
		item.y += setting.speed / 2;
		item.style.top = item.y + 'px';

		if (item.y >= document.documentElement.clientHeight){
			item.y = -100 * setting.traffic;
			item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
		}
		
	});
}
function getQuantityElements(height) {
	return Math.ceil(document.documentElement.clientHeight / height + 1);
}
