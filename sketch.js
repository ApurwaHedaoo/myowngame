const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world;
var box1, bomb1,bomb2;
var backgroundImg,platform;
var rocket, slingshot;

var gameState = "onSling";
var bg = "asset/bg1.png";
var score =0;

function preload() {
  getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1200,400);
   engine = Engine.create();
   world = engine.world;

   ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    bomb1 = new Bomb(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    bomb2 = new Bomb(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    rocket = new Rocket(200,50);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(rocket.body,{x:200, y:50});

}

function draw(){
   if(backgroundImg)
   background(backgroundImg);
    
        noStroke();
        textSize(35)
        fill("white")
        text("Score  " + score, width-300, 50)
    
    Engine.update(engine);
    //strokeWeight(4);

    box1.display();
    box2.display();
    ground.display();
    bomb1.display();
    bomb1.score();
    log1.display();

    box3.display();
    box4.display();
    bomb2.display();
    bomb2.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    rocket.display();
    platform.display();
    //log6.display();
    slingshot.display();    
}

function mouseDragged(){
    //if (gameState!=="launched"){
        Matter.Body.setPosition(rocket.body, {x: mouseX , y: mouseY});
    //}
}


function mouseReleased(){
    slingshot.fly();
    gameState ="launched";
    
}

function keyPressed(){
    if(keyCode ===32){
        rocket.trajectory=[];
        slingshot.attach(rocket.body);
    }
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=0600 && hour<=1900){
        bg = "asset/bg1.png";
    }
    else{
        bg = "asset/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}
