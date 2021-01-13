var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;

var gameState = "play";
 
var particles;
var plinkos = [];
var divisions = [];

var divisionHeight=300;

var score = 0;

var turn = 0;

var chances = 5;

function setup() {
  createCanvas(800, 800);

  engine = Engine.create();
  world = engine.world;

  ground = new Ground(width/2,height,width,20);

  particles = new Particle(mouseX, 1000, 10);


   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }


    for (var j = 40; j <= width-40; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 15; j <= width; j=j+55) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 40; j <= width - 40; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 15; j <= width; j=j+55) 
    {
    
       plinkos.push(new Plinko(j,375));
    }
       
}
 


function draw() {
  background("black");
  textSize(20)
  //text("Score : "+score,20,30);
  Engine.update(engine);
 
  fill("pink");
  textSize(20);
  text("Score : " + score, 10, 30);
  text("Chances : " + chances, 680, 30);

  text(500, 25, 520);
  text(500, 745, 520);
  text(250, 105, 520);
  text(250, 665, 520);
  text(100, 180, 520);
  text(100, 583, 520);
  text(50, 270, 520);
  text(50, 510, 520);
  text(10, 350, 520);
  text(10, 430, 520);

  if(gameState === "play"){
    if(particles!=null){
      if(particles.body.position.y > 750){
        var pos = particles.body.position;
        particles = null;
          if(turn >= 5){
              gameState = "end";

        }
        if(pos.x > 0 && pos.x < 80 || pos.x > 720 && pos.x < 800){
          score = score + 500;
        }
        if(pos.x > 80 && pos.x < 160 || pos.x > 640 && pos.x < 720){
          score = score + 250;
        }
        if(pos.x > 160 && pos.x < 240 || pos.x > 560 && pos.x < 640){
          score = score + 100;
        }
        if(pos.x > 240 && pos.x < 320 || pos.x > 480 && pos.x < 560){
          score = score + 50;
        }
        if(pos.x > 320 && pos.x < 400 || pos.x > 400 && pos.x < 480){
          score = score + 10;
        }
      }
    }
  }
  
    for (var i = 0; i < plinkos.length; i++) {
     
      plinkos[i].display();
     
    }
    if(particles != null){
      particles.display();
    }
    for (var k = 0; k < divisions.length; k++) {
      divisions[k].display();

    }

    if(gameState === "end"){
      textSize(30);
      fill("lightblue");
      text("GaMeOvEr!", 320, 350);
      text("Out of chances!", 300, 420);
    }

}

function mousePressed(){
  if(particles === null && turn <= 5){
    particles = new Particle(mouseX, 1000, 10);
    
  }
 
  if(gameState === "play" && particles.body.position.y > 750){
    particles = new Particle(mouseX, 10, 10, 10);
    turn++;
    chances = chances - 1;

 }

}
