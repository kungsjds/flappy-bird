// Get size and define contex
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

// Load images
let ground = new Image();
ground.src = "images/ground.png";

let botPipe = new Image();
botPipe.src = "images/botPipe.png";

let topPipe = new Image();
topPipe.src = "images/topPipe.png";

let bg = new Image();
bg.src = "images/bg.png";

let bird = new Image();
bird.src = "images/bird.png";


// 100px space between the pipes.
let sbpipe = 100;

let constant;
let birdX = 33;
let birdY = 200;
let gravity = 1.4;
let score = 0;

// Defines a list of pipes
let pipes = [];

// At position 0 receives an object with position X and Y. Beginning at the end of the screen (x)
pipes[0] = {
    x : canvas.width,
    y : 0
};

// Load sounds
let fly = new Audio();
fly.src = "sounds/fly.mp3";
let score_sound = new Audio();
score_sound.src = "sounds/score.mp3";


document.addEventListener("keyup", flight);

function flight() {

    let old_y = birdY;

    birdY -= 30;

    if (birdY <= 0) {
        birdY = old_y;
    };
    
    fly.play();

};

function jogo() {

    // Draw background image, position x y
    context.drawImage(bg, 0, 0);

    for (let i = 0; i < pipes.length; i++) {

        // For the botPipe vertical position
        constant = topPipe.height + sbpipe;

        // Drawing the top pipe
        context.drawImage(topPipe, pipes[i].x, pipes[i].y);

        // Drawing the bot pipe
        context.drawImage(botPipe, pipes[i].x, pipes[i].y+constant);

        // Moving the pipes to the left
        pipes[i].x -= 1;        

        // Create a new pipe at the end of the screen but with a new random Y(vertical) position
        if (pipes[i].x == 125) {

            pipes.push({
                x : canvas.width,
                y : Math.floor(Math.random()*topPipe.height)-topPipe.height 
                // Math.floor = returns the smallest integer value between an interval
                // Math.random = returns a pseudorandom number from an interval (Math.random()*topPipe.height = returns from 0 to the topPipe height)
            })

        };

        // The bird is between the edge of the pipes
        if (birdX+bird.width >= pipes[i].x && birdX <= pipes[i].x+topPipe.width
            // The bird collided with the top or bot pipe
            && (birdY <= pipes[i].y+topPipe.height || birdY+bird.height >= pipes[i].y+constant)
            // The bird collided with the ground
            || birdY+bird.height >= canvas.height - ground.height) {

            // Reset the game
            location.reload();
            
        };

        if (pipes[i].x == 5) {

            score += 1;
            score_sound.play();

        };

        // Delete the pipe in the first position that left the screen
        if (pipes[i].x+topPipe.width <= -160) {

            pipes.shift();

        };

    };

    // Draw ground image, position x y
    context.drawImage(ground, 0, canvas.height - ground.height);

    // Draw bird, poistion x y
    context.drawImage(bird, birdX, birdY);
    // Push the bird down
    birdY += gravity; 

    context.fillStyle = "#000";
    context.font = "20px Verdana";
    context.fillText("Score: " + score, 10, canvas.height - 20);

    // Start frame loop
    requestAnimationFrame(jogo);

};

jogo();
