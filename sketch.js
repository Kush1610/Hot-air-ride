var Start=0
var Play=1

var Gamestate=Start

var score

var balloon,balloonImage1,balloonImage2;
// create database and position variable here

function preload(){
   bg =loadImage("bg3.jpg");
   bg2 =loadImage("bg2.webp");

   balloonImage1=loadAnimation("hotairballoon1.png");
   boyImg=loadAnimation("boy2.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
   fisherImg=loadAnimation("fisher/B-0.png","fisher/B-1.png","fisher/B-2.png","fisher/B-3.png");
   birdImg=loadAnimation("birds/e-0.png","birds/e-1.png","birds/e-0.png");
   boatImg=loadAnimation("boat/V-0.png","boat/V-1.png","boat/V-2.png","boat/V-3.png","boat/V-4.png","boat/V-5.png","boat/V-6.png","boat/V-7.png","boat/V-8.png","boat/V-9.png","boat/V-10.png","boat/V-11.png","boat/V-12.png","boat/V-13.png","boat/V-14.png")
   boat1Img=loadAnimation("boat1.png")
   boat2Img=loadAnimation("boat3.png")
   fishImg=loadAnimation("fish/E-0.png","fish/E-1.png","fish/E-2.png","fish/E-3.png","fish/E-4.png","fish/E-5.png","fish/E-6.png","fish/E-7.png","fish/E-8.png");
   iconImg=loadAnimation("food/6-9.png","food/6-10.png","food/6-11.png","food/6-12.png","food/6-13.png","food/6-14.png","food/6-15.png","food/6-16.png","food/6-17.png","food/6-18.png","food/6-19.png","food/6-20.png","food/6-21.png","food/6-22.png")
   foodImg=loadAnimation("food.png")

}

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1200,700);

  fisher=createSprite(920,500,150,150);
  fisher.addAnimation("sun",fisherImg);
  fisher.scale=0.7;

  bird=createSprite(1300,100,150,150);
  bird.addAnimation("sun",birdImg);
  bird.scale=0.5;

  boat1=createSprite(0,500,150,150);
  boat1.addAnimation("sun",boat1Img);
  boat1.scale=1;
  boat1.velocityX=2.5

  boat2=createSprite(2100,570,150,150);
  boat2.addAnimation("sun",boat2Img);
  boat2.scale=0.6;
  boat2.velocityX=-2

  icon=createSprite(1050,50,150,150);
  icon.addAnimation("sun",iconImg);
  icon.scale=0.2;

  boat=createSprite(1300,600,150,150);
  boat.addAnimation("sun",boatImg);
  boat.scale=0.6;
  boat.velocityX=-3
  boy=createSprite(1300,620,150,150);
  boy.addAnimation("sun",boyImg);
  boy.scale=0.2;
  boy.velocityX=-3


  balloon=createSprite(250,300,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;
  var balloonpos = database.ref('ballon/position'); 
  balloonpos.on("value", readPosition, showError); 
  balloon.y=251


  fish=createSprite(600,550,150,150);
  fish.addAnimation("sun",fishImg);
  fish.scale=0.3;

  fish2=createSprite(550,630,150,150);
  fish2.addAnimation("sun",fishImg);
  fish2.scale=0.3;

  fish3=createSprite(500,600,150,150);
  fish3.addAnimation("sun",fishImg);
  fish3.scale=0.3;

  fish4=createSprite(640,600,150,150);
  fish4.addAnimation("sun",fishImg);
  fish4.scale=0.3;

  fish5=createSprite(700,600,150,150);
  fish5.addAnimation("sun",fishImg);
  fish5.scale=0.3;


  fish.visible=false
  fish2.visible=false
  fish3.visible=false
  fish4.visible=false
  fish5.visible=false

  textSize(20); 



}

// function to display UI
function draw() {

if(Gamestate===Start)
{  
  background(bg2)
}
  if (Gamestate===Play)
  {
    console.log(score)
    boy.x=boat.x
  background(bg);



  fish5.x=balloon.x
  fish4.x=balloon.x-100
  fish3.x=balloon.x+100
  fish2.x=balloon.x
  fish.x=balloon.x

  bird.velocityX=-3


  if(bird.x<=-10)
  {
    bird.x=1300
  }

  if(boat.x<=-1250)
  {
    boat.x=1300
  }

  if(boat2.x<=-250)
  {
    boat2.x=1300
  }

  if(boat1.x>=1350)
  {
    boat1.x=0
  }

   if(mousePressedOver(icon))
     {
       score=200
      fish.visible=true
      fish2.visible=true
      fish3.visible=true
      fish4.visible=true
      fish5.visible=true
      
      boat.visible=false
      boat1.visible=false
      boy.visible=false
      fisher.visible=false
      boat2.visible=false

 


     }

     score=score-1
     if(score>=0)
     {
      Spawnfood()
     }
if(score===0)
{
    fish.visible=false
    fish2.visible=false
    fish3.visible=false
    fish4.visible=false
    fish5.visible=false
    
    boat.visible=true
    boat1.visible=true
    boy.visible=true
    fisher.visible=true
    boat2.visible=true

}

if(score<=0)
{
  score=0
}
  if(keyDown(LEFT_ARROW)&&(balloon.x>=70)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in left direction
    writePosition(-1,0)
  }
  else if(keyDown(RIGHT_ARROW)&&(balloon.x<=1130)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in right direction
    writePosition(1,0)
  }
  else if(keyDown(UP_ARROW)&&(balloon.y>=130)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in up direction
    writePosition(0,-1); 
  }
  else if(keyDown(DOWN_ARROW)&&(balloon.y<=280)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in down direction
    writePosition(0,+1);


  }

  drawSprites();
  fill("White");
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}
}


function writePosition(x,y)
{
     database.ref('ballon/position').set({'x': position.x + x , 'y': position.y + y }) 

} 
function readPosition(data)
{ 
  position = data.val(); 
  console.log(position.x); 
  Gamestate=Play
  balloon.x = position.x;
  balloon.y = position.y; 
}
function showError(){ console.log("Error in writing to the database")}

function Spawnfood()
{
  if(frameCount % 10 === 0) 
  {
    food=createSprite(600,300,150,150);
    food.addAnimation("sun",foodImg);
    food.scale=0.02;
    food.velocityY=4
    food.x=Math.round(random(balloon.x-50,balloon.x+50));
    food.lifetime=60

  }

}

