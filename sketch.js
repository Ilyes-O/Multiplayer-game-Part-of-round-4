const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var canvas, backgroundImage;
var rand;

var gameState = "intermission3";
var playerCount;
var allPlayers;
var engine, world
var s1, s2
var block2 = []
var slingCounter = 0;
var const1;
var circles = [];


var s1_dead, s1_shooting, s2_dead, s2_shooting;
var jet1, jet1Img, jet2Img, heliImg;
var jetGroup, jet2Group;
var score;
var bullet1, bullet2, bullet1Img, bullet2Img, bomb1, bomb2, bom1Img, bomb2Img;
var fire;
var music1, music2, music3, music4
var stand1

function preload() {
  bg = loadImage("images/sky.jpg");
  s1_shooting = loadImage("images/shooting_1.png");
  s1_dead = loadImage("images/destroyed_1.png");
  s2_shooting = loadImage("images/shooting_2.png");
  s2_dead = loadImage("images/falling_2.png");
  jet1Img = loadImage("images/jet (2).png")
  jet2Img = loadImage("images/jet (3).png");
  heli1Img = loadImage("images/helicopter.png")
  heli2Img = loadImage("images/helic.png");
  bullet1Img = loadImage("images/bullet_1.png");
  bullet2Img = loadImage("images/bullet_2.png");
  tankImg = loadImage("images/tank.png")
  fire = loadSound("sounds/machine_gun.mp3");
  swing = loadSound("sounds/axe_swing.mp3");
  explosion = loadSound("sounds/explosion.mp3");
  music1 = loadSound("sounds/war_music.mp3");
  blockImg  = loadImage("images/block.png");
  portalImg = loadImage("images/portal.png")
}
function setup() {
  engine = Engine.create();
  world = engine.world
  canvas = createCanvas(1550, 800);

  var prev = null;

  soldier1 = createSprite(300, 570);
  soldier1.addImage(s1_shooting)
  soldier1.scale = .15

  stand1 = new Stand(400, 340, 250, 10);
  stand2 = new Stand(1300, 340, 250, 10);
  bomb1 = new Bomb1(400, 400, 60, 60);
  sling1 = new Slingshot2({ x: 400, y: 450 }, bomb1.body);

  for (var i = 800; i < 1000; i += 20) {
    var circle = new Circle(i, 140, 20);
    circles.push(circle);
    Matter.Body.setStatic(circles[0].body, true);
    if (prev) {
      var options = {
        bodyA: circle.body,
        bodyB: prev.body,
        length: 40,
        stiffness: 0.4
      }
      var constraint = Constraint.create(options);
      World.add(world, constraint);
    }
    prev = circle;
  }

  //These are for level two
  for (var j = 1200; j <= 1400; j = j + 45) {
    block2.push(new Block2(j, 330,s2_shooting));
  }

  for (var j = 1220; j <= 1400; j = j + 45) {
    block2.push(new Block2(j, 300,s2_shooting));
  }

  //These are for level three
  for (var j = 300; j <= 500; j = j + 45) {
    block2.push(new Block2(j, 330,s2_shooting));
  }

  for (var j = 320; j <= 520; j = j + 45) {
    block2.push(new Block2(j, 300,s2_shooting));
  }

  jetGroup = new Group();
  jet2Group = new Group();

  heliGroup = new Group();
  heli2Group = new Group();

  bullet1Group = new Group();
  bullet2Group = new Group();

  score = 0;
}


function draw() {
  Engine.update(engine)
  background(bg);

  fill("Black")
  textSize(20)
  text("Score:" + score, width - 400, 50);

  if (gameState === "start") {
    textSize(20);
    fill("red");
    text("Press 'S' to start", 700, 200);
    text("Reach a score of 5 quickly!", 700, 250);
    //music1.play();
  }
  if (keyDown("s") && gameState === "start") {
    gameState = "play";
  }
  if (gameState === "play") {
    if (keyDown("1") && frameCount % 15 === 0) {
      spawnBullet1();
      fire.play();
    }
    //music1.play();

    bullet1Group.collide(jetGroup, jetHit);
    bullet1Group.collide(heliGroup, heliHit);
    //destroys bullets going out of screen
    for (var p = 0; p < bullet1Group.length; p++) {
      if (bullet1Group[p].y < 0) {
        bullet1Group[p].destroy();
        p--;
      }
    }

    if (bullet1Group.isTouching(heliGroup)) {
      bullet1Group.destroyEach();
      heliGroup.destroyEach();
      score = score + 1
    }
    if (keyDown(RIGHT_ARROW)) {
      soldier1.x = soldier1.x + 10
    }
    if (keyDown(LEFT_ARROW)) {
      soldier1.x = soldier1.x - 10
    }
    if (frameCount >= 5000) {
      gameState = "start";
    }
    spawnObs();
    if (score === 5) {
      gameState = "intermission";
    }

  }
  if (gameState === "intermission") {
    jetGroup.destroyEach();
    heliGroup.destroyEach();

    music1.stop();

    fill("red");
    textSize(20)
    text("ROUND 2", 700, 200)
    text("Press R to start", 700, 250)
    text("In level 2, destroy the stacks within a certain amount of swings", 700, 300);
  }
  if (keyDown("R") && gameState === "intermission") {
    gameState = "round2"
  }
  if (gameState === "round2") {
    bomb1.display();
    stand2.display();
    sling1.display();

    for (var i = 0; i < block2.length; i++) {
      block2[i].display();
      block2[i].score();
    }
    for (var i = 0; i < block2.length; i++) {
      block2[i].display();
      block2[i].score();
    }
    // if (keyDown(RIGHT_ARROW)) {
    //   soldier1.x = soldier1.x + 10
    // }
    // if (keyDown(LEFT_ARROW)) {
    //   soldier1.x = soldier1.x - 10
    // }

    if (slingCounter > 4) {
      gameState = "fail1"
    }
    if (score === 38) {
      gameState = "intermission2"
    }
  }

  if (gameState === "fail1") {
    text("You passed four swings, you failed the level!", 700, 200)
    text("Press 'F' to continue", 700, 250);

    if (keyDown("F")) {
      gameState = "play"
      score = 0
    }
  }

  if (gameState === "intermission2") {
    //World.remove(world,block2)
    World.remove(world, bomb1.body)

    fill("red");
    textSize(20)
    text("ROUND 3", 700, 200)
    text("Press L to start", 700, 250)
    text("In level 3, destroy the stack of constraints without surpassing the time limit", 700, 300);
    if (keyDown(L)) {
      gameState = "round3"
    }
  }

  if (gameState === "round3") {
    stand2.display();
    stand1.display();
    for (var i = 0; i < block2.length; i++) {
      block2[i].display();
      block2[i].score();
    }
    for (var i = 0; i < block2.length; i++) {
      block2[i].display();
      block2[i].score();
    }



    for (var i = 0; i < circles.length; i++) {
      circles[i].display();
    }
    if (keyDown(RIGHT_ARROW)) {
      Matter.Body.applyForce(circles[circles.length / 2 - 1].body, { x: 0, y: 0 }, { x: 0.05, y: 0 });
    }
    if (keyDown(LEFT_ARROW)) {
      Matter.Body.applyForce(circles[circles.length / 2 - 1].body, { x: -.05, y: 0 }, { x: -0.05, y: 0 });
    }
    if (score >=60) {
      gameState = "intermission3"
    }

  }

  if (gameState === "intermission3") {
    score = 0
    fill("red");
    textSize(20)
    text("ROUND 4", 700, 200)
    text("Press 4 to start", 700, 250)
    text("In level 4, elude and destroy the homing enemies, and get to the portal before it disappears", 700, 300);
    if (keyDown('4')) {
      gameState = "round4"
    }
  }
  if(gameState === "round4"){
    if(frameCount%200==0){
    portal = createSprite(Math.round(random(50,1500),Math.round(random(200,700))),35,35)
    portal.addImage(portalImg)
    portal.scale = .3
  }
  if(frameCount%250==0){
    portal.destroy();
  }
  }

  drawSprites();
}


function spawnObs() {
  if (frameCount % 250 === 0) {
    jet1 = createSprite(-50, 250, 100);
    jet1.y = Math.round(random(0, 300))
    jet1.addImage(jet1Img)
    jet1.scale = .5
    jet1.velocityX = 3;
    jetGroup.add(jet1);
  }
  if (frameCount % 200 === 0) {
    heli1 = createSprite(1600, 250, 100);
    heli1.y = Math.round(random(0, 300));
    heli1.addImage(heli1Img);
    heli1.velocityX = -(4 + score / 2);
    heli1.scale = .3
    heliGroup.add(heli1)
  }

}



function spawnBullet1() {
  bullet1 = createSprite(300, 570);
  bullet1.x = soldier1.x + 20
  bullet1.y = soldier1.y - 10
  bullet1.addImage(bullet1Img);
  bullet1.scale = .08
  bullet1.setVelocity(4, -4);
  bullet1.rotation = 60
  bullet1Group.add(bullet1)
}

function jetHit(bullet1, jet1) {
  jet1.destroy();
  score = score + 1
  explosion.play();
}

function heliHit(bullet1, heli2) {
  heli2.destroy();
  score = score + 1;
  explosion.play();
}

function mouseDragged() {
  // Matter.Body.setPosition(bomb2.body, {x: mouseX , y: mouseY});
  Matter.Body.setPosition(bomb1.body, { x: mouseX, y: mouseY });
}

function mouseReleased() {
  sling1.fly();
  swing.play();
  slingCounter++;
}

function keyPressed() {
  if (keyCode === 32) {
    Matter.Body.setPosition(bomb1.body, { x: 400, y: 400 })
    sling1.attach(bomb1.body)
  }
}
