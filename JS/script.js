//Selecionando o canvas e gerando o contexto 2D
let canvas = document.getElementById('game');
let contexto_canvas = canvas.getContext("2d");

//Incluido imagens
//background
let background_ready = false;
let background_image = new Image();

background_image.onload = function(){
    background_ready = true;
}
background_image.src = "IMG/background.png";

//hero
let hero_ready = false;
let hero_image = new Image();

hero_image.onload = function(){
    hero_ready = true;
}
hero_image.src = "IMG/hero.png";

//monster
let monster_ready = false;
let monster_image = new Image();

monster_image.onload = function(){
    monster_ready = true;
}
monster_image.src = "IMG/monster.png";

//Objetos do jogo
let hero = {
    speed: 256, //px por s
    x: 0,
    y: 0
}
let monster = {
    x: 0,
    y: 0
}
let monster_caught = 0;

//Player input
//teclado
var keys_down = {};

addEventListener("keydown", function(e){
    //keys_down[e.keyCode] = true;
    keys_down[e.key] = true;
}, false);

addEventListener("keyup", function(e){
    //delete keys_down[e.keyCode];
    delete keys_down[e.key];
}, false);

//Novo jogo
//reseta o jogo quando player pega um monstro
let reset = function(){
    //colocar o jogador no meio do canvas
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2; 

    //coloca o monstro em uma posição aleatória
    monster.x = 32 + (Math.random() * canvas.width - 64);
    monster.y = 32 + (Math.random() * canvas.height - 64);
}

//Atualizar canvas
let update = function(modifier){
    /*if (38 in keys_down) { // Player holding up
		hero.y -= hero.speed * modifier;
	}
	if (40 in keys_down) { // Player holding down
		hero.y += hero.speed * modifier;
	}
	if (37 in keys_down) { // Player holding left
		hero.x -= hero.speed * modifier;
	}
	if (39 in keys_down) { // Player holding right
		hero.x += hero.speed * modifier;
	}*/

    if (keys_down.hasOwnProperty('ArrowUp')) { // Player holding up
		hero.y -= hero.speed * modifier;
	}
	if (keys_down.hasOwnProperty('ArrowDown')) { // Player holding down
		hero.y += hero.speed * modifier;
	}
	if (keys_down.hasOwnProperty('ArrowLeft')) { // Player holding left
		hero.x -= hero.speed * modifier;
	}
	if (keys_down.hasOwnProperty('ArrowRight')) { // Player holding right
		hero.x += hero.speed * modifier;
	}

    //verificar se jogador encosta no monstro
	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		++monster_caught;
		reset();
	}
}

//Desenhando no canvas
let render = function(){
    if(background_ready){
        contexto_canvas.drawImage(background_image,0,0);
    }
    if(hero_ready){
        contexto_canvas.drawImage(hero_image, hero.x, hero.y);
    }
    if(monster_ready){
        contexto_canvas.drawImage(monster_image, monster.x, monster.y);
    }

    //score
    contexto_canvas.fillStyle = "rgb(250,250,250)";
    contexto_canvas.font = "24px Helvetica";
    contexto_canvas.textAlign = "left";
    contexto_canvas.textBaseline = "top";
    contexto_canvas.fillText("Monsterrs caught: " + monster_caught, 32,32);
}

//main game loop
let main = function(){
    let now = Date.now();
    let delta = now - then;

    update(delta/1000);
    render();

    then = now;

    //requisitar o desenho desse frame
    requestAnimationFrame(main);
}

// Cross-browser support for requestAnimationFrame
let w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Iniciar jogo
let then = Date.now();
reset();
main();

console.log(keys_down);