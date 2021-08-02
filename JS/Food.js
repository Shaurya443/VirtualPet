class Food{
 constructor(x,y,width,height){
var options={
    isStatic:0.9,
    friction:0.05
}
this.body =Bodies.rectangle(x,y,width,options)
this.width = width
this.height = height
World.add(world,this.body)
this.image =loadImage("Images/Milk.png")
 }
display(){
    var x = 80,y =100

    imageMode(CENTER)
    image(this.image,720,220,70,70)

    if(this.foodStock!=0){
        for(var i=0;i<this.foodStock;i++){
            if(i%10==0){
                x=80;
                y=y+50
            }
            image(this.image,x,y,50,50)
            x=x+30
        }

    }
}
getFoodStock(){
    var foodStock = database.ref('foodStock')
    foodStock.on("value",function(data){
    foodStock = data.val()
    })
  


}
updateFoodStock(foodStock){
    database.ref('/').update({
        foodStock:foodStock
    })

}

}
