var jungle, jimg, monkey, mimg, stone, simg, banana, bimg;
var invisible;
var count=0;
var Bananagroup,Stonegroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload() {
  

  mimg = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png")

  simg = loadImage("stone.png");
  bimg = loadImage("banana.png");
  jimg = loadImage("jungle.jpg");
}


function setup() {
  createCanvas(520, 400);

  jungle = createSprite(200, 200, 0, 0);
  jungle.addImage(jimg);
  jungle.x = jungle.width / 2;
  jungle.velocityX = -6;

  monkey = createSprite(100, 330, 0, 0);
  monkey.addAnimation("mimage",mimg);
  monkey.scale = 0.2;

  invisible=createSprite(260,380,520,10);
   invisible.visible = false;

  Stonegroup = new Group();
  Bananagroup = new Group();
}         

function draw2 (){
  
  if(Bananagroup.isTouching(monkey)) 
    destroy();
}


function draw() {

  background(220);
   
      
  if (gameState===PLAY) {
   //Setting jungle velocity
       jungle.velocityX=-6;
       
  //Jumping monkey when space key is pressed
   if (keyDown("space")&& monkey.y >= 240) {
       monkey.velocityY=-15;
      
   }   
  
   //Adding gravity
  monkey.velocityY= monkey.velocityY+0.8;
  
  //Scoring System
   count=count+Math.round(getFrameRate()/8);
   
  //Setting jungle back if it crosses screen from left
  if (jungle.x<0) {
    jungle.x = jungle.width /2;
  }
  //Ending the game when monkey touches the stone
   if (Stonegroup.isTouching(monkey)) {
    gameState=END;
   
  }
  
  //Spawning bananas at different y positions 
    spawnbananas();
  //Spawning stones at different y positions 
    spawnstones();
  //adding 10 to score when monkey eats banana
  if (Bananagroup.isTouching(monkey)) {
      count=count+10;
      Bananagroup.destroyEach();
     
    }
    
    if(Stonegroup.isTouching(monkey)){
    monkey.scale=0.2;
  }
    
       }
   
  else  if (gameState===END) {
  //Setting banana,stone and jungle velocity to zero
   Bananagroup.setVelocityXEach(0);
   Stonegroup.setVelocityXEach(0);
   jungle.velocityX=0;
   monkey.velocityX=0;
   Bananagroup.setLifetimeEach(-1);
    Stonegroup.setLifetimeEach(-1);
    
  //Restarting the game when r key is pressed
   if (keyDown("r")) {
     reset();
   }     
   
      }

  var rand =Math.round( random(10,40));
  switch (count) {
    case 10 : monkey.scale = 0.2;
              break;
    case 20 : monkey.scale = 0.4;
              break;
    case 30 : monkey.scale = 0.6;
              break;
    case 40 : monkey.scale = 0.8;
              break;
    default : break;

    r
  }
  
   monkey.collide(invisible);
 
  

  
  
  
    
    
  
  
  drawSprites();
  
  text("Score :"+count, 350, 70);
 

 
}




function spawnstones() {

  if (frameCount % 200 === 0) {
    var stone = createSprite(600, 400, 0, 0);
    stone.y = Math.round(random(350, 390));
    stone.addImage("simage", simg);
    stone.scale = 0.25;
    stone.velocityX = -2;

    //assign lifetime to the variable
    stone.lifetime = 200;

    Stonegroup.add(stone);
  }
}

function spawnbananas() {

  if (frameCount % 80 === 0) {
    var banana = createSprite(200, 200, 40, 10);
    banana.y = Math.round(random(80, 120));
    banana.addImage("bimage", bimg);
    banana.scale = 0.10;
    banana.velocityX = -4;
    
    //assign lifetime to the variable
    banana.lifetime = 50;
    
     Bananagroup.add(banana);
    
  }

}




function reset(){
  gameState=PLAY;
  Bananagroup.destroyEach();
  Stonegroup.destroyEach();
  count=0;
  
}




