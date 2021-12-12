var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie,zombieGroup,zombieImage,zombieImage2,zombieImage3;
var bullet,bulletImage;
var bulletGroup;
var zombieGroup;
var score=0,life=500;
function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombieImage = loadImage("assets/zombie.png");
  bgImg = loadImage("assets/bg.jpeg")
  zombieImage2 = loadImage("assets/zombie2.png");
  zombieImage3 = loadImage("assets/zombie3.png");
  bulletImage = loadImage("assets/bullet.png");
  
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  bg.addImage(bgImg)
  bg.scale = 1.1

  
  

//creating the player sprite
   player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
   player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

   bulletGroup=new Group ()
   zombieGroup=new Group ()
  
}

function draw() {
  background(0); 
  
  



  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
  createBullet();
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
    createZombie();
    if(bulletGroup.isTouching(zombieGroup)){
     // console.log("hi")
      zombie.destroy();
      bulletGroup.destroyEach();
      score=score+5
   //  zombie.lifetime=0;
    }
    if(zombieGroup.isTouching(player)) {
      life=life-5

    }
  drawSprites();
  textSize(20);
  fill("black")
  text("Score="+score,width-300,30);
  text("Life="+life,width-300,60);

}

function createZombie()
{
  if(frameCount%260===0){
    zombie=createSprite(width,random(300,height-50),30,30);
    var rand= Math.round(random(1,3));
    console.log(rand);
    switch(rand){
      case 1:
        zombie.addImage("zombie",zombieImage);
        break;
      case 2:
        zombie.addImage("zombie",zombieImage2);
        break;
      case 3:
        zombie.addImage("zombie",zombieImage3);
        zombie.scale=2.5;
        break;
      default:
          zombie.addImage("zombie",zombieImage);
    }
    zombie.lifetime=600;



    
    zombie.scale=0.2;
    zombie.velocityX=-80
    zombieGroup.add(zombie);
  }
  
    

}

  function createBullet(){
    var bullet= createSprite(player.x+50,player.y-25,10,10);
    bullet.addImage("bullet",bulletImage);
    bullet.velocityX=10;
    bullet.scale=0.1;
    bulletGroup.add(bullet)
  }