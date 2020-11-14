var tower,tower_moving;
var door,door_image,door_Group;
var climber,climber_image,climber_Group;
var invisible_block,invisible_Group;
var Ghost,Ghost_Image;
var gameState = "play";
var Sound;

function preload(){
  tower_moving=loadImage("tower.png");
  door_image=loadImage("door.png");
  climber_image=loadImage("climber.png");
  Ghost_Image=loadImage("ghost-standing.png");
  Sound=loadSound("spooky.wav");
}


function setup(){
  createCanvas(600,600);
  
  Sound.loop();
  
  tower=createSprite(300,300);
  tower.addImage("moving",tower_moving);
  tower.velocityY=1;
  
  door_Group=new Group();
  climber_Group=new Group();
  invisible_Group=new Group();
  
  Ghost=createSprite(300,300);
  Ghost.addImage("Image",Ghost_Image);
  Ghost.scale=0.3;

}

function draw(){
  background(0);
  if(gameState==="play"){
    
  if(tower.y>400){
    tower.y=300;
  }
  if(keyDown("left_arrow")){
    Ghost.x=Ghost.x-3;
  }
  
  if(keyDown("right_arrow")){
    Ghost.x=Ghost.x+3;
  }
  
  if(keyDown("space")){
    Ghost.velocityY=-10;
  }
  
  
  Ghost.velocityY=Ghost.velocityY+0.8;
  spawn_door();
  
    if(climber_Group.isTouching(Ghost)){
      Ghost.velocityY=0;
    }
    
    if(Ghost.isTouching(invisible_Group)||Ghost.y>600){
      Ghost.destroy();
      gameState="end";
      
    }
    
  drawSprites();
  }
  else if(gameState==="end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("GameOver",230,300);
  }
  
  
}

function spawn_door(){
  if(frameCount % 250=== 0){
  door=createSprite(200,-50);
  door.addImage("image",door_image)
  door.velocityY=1;
  door.x=Math.round(random(120,400));
    
  climber=createSprite(200,10);
  climber.addImage("Image",climber_image);
  climber.velocityY=1;
  climber.x = door.x;
    
  invisible_block=createSprite(200,15,110,10);
  invisible_block.velocityY=1;  
  invisible_block.x=door.x;  
  //invisible_block.visible=false;
  invisible_block.debug=true;  
 
 Ghost.depth=door.depth;
 Ghost.depth +=1;   
    
   door_Group.add(door);
   climber_Group.add(climber);
   invisible_Group.add(invisible_block); 
    
   door.lifetime=600;
    climber.lifetime=600;
    invisible_block.lifetime=600;
  
    
}
}
