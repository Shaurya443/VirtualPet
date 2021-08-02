var dog,sadDog,happyDog;



function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);
  feed = createButton("Feed the dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)

  addFood = createButton("Add Food")
  addFood.position(800,95)
addFood.mousePressed(addFoods)  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

}

function draw() {
  background(46,139,87);
  drawSprites();
}

//function to read food Stock
function feedDog(){
  dog.addImage(happyDog)

  if(foodObj.getFoodStock()<=0){
    foodObj,updateFoodStock(foodObj.getFoodStock()*0)
  }else{
    foodObj,updateFoodStock(foodObj.getFoodStock()-1)
  }
}

//function to update food stock and last fed time
function lastFed(){
  dog.addImage(happyDog)

    foodObj,updateFoodStock(foodObj.getFoodStock()-1)
  databse.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
  fill(225,225,224)
  textSize(15)
  if(lastFed>=12){
    text("Last feed :"+lastFed%12 + "PM",350,30 )
  }else if(lastFed ==0){
text("Last feed : 12 AM",350,30)
  }else{
    text("Last feed :"+lastFed + "AM",350,30)
  }
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
Food:foodS
  })

}
