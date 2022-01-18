var dog,dogImg,dogImg1;
var database;
var foodS,foodStock;
var feed,addFood;
var FeedTime;
var LastFeed;
var foodObj;

function preload(){
   dogImg=loadImage("images/Dog.png");
   dogImg1=loadImage("images/happy dog.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1000,500);

  foodObj = new Food();

  dog=createSprite(380,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  var dogo=database.ref('Food');
  dogo.on("value",readPosition,showError);
  textSize(20); 

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFood);
  
}


function draw() {
  background(46,139,87);

  foodObj.display();
 
  drawSprites();
  
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,170,100);
 // textSize(13);
 
  fill(225,255,224);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : ", lastFed%12,+" PM",350,30);
  }else if(lastFed===0){
    text("Last Feed : 12AM",350,30);
  }else{
    text("Last Feed : "+ lastFed +" AM",350,30);
  }

}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function writePosition(nazo){
  if(nazo>0){
    nazo=nazo-1
  }
     else{
    nazo=0
  }
   
    database.ref('/').set({
    'Food': nazo
  })

function feedDog(){
  dog.addImage(dogImg1);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour(),
    gameState:"Hungry"
  })
}

function addFood(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
   
   function showError(){
      console.log("Error in writing to the database");
   }
}
