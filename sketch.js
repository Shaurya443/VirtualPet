var dog,dogImg,dogImg1;
var database;
var foodS,foodStock;
var feed,addFood;
var fedTime,lastFed;
var foodObj;

function preload(){
   dogImg=loadImage("images/Dog.png");
   dogImg1=loadImage("images/happy dog.png");
  }

//Function to set initial environment
function setup() {
  //database=firebase.database();
  createCanvas(600,500);

  foodObj = new Food();

  dog=createSprite(380,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
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
  addFood.mousePressed(addFoods);
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

//Function to read values from DB
function readStock(data){
  foodS=data.val();
}


//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(dogImg1);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour(),
    gameState:"Hungry"
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}