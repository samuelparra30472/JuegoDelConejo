const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit,rope;
var fruit_con;
var rabbit

function preload(){
  backgroundImg = loadImage ("background.png")
  fruitImg = loadImage ("melon.png")
  rabbitImg = loadImage("Rabbit-01.png")
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png")
  eat = loadAnimation (" eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png")
  sad = loadAnimation ("sad_1.png","sad_2.png","sad_3.png")

bk_song = loadSound("sound1.mp3")
sad_sound = loadSound("sad.wav")
cut_sound = loadSound("rope_cut.mp3")
eating_sound = loadSound("eating_sound.mp3")
air = loadSound("air.wav")


  blink.playing = true
  eat.playing = true
  sad.playing = true

  eat.looping = false
  sad.looping = false

  sad_sound.looping = false
  eating_sound.looping = false
}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  bk_song.play()
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,680,600,20);

  rope = new Rope(7,{x:245,y:30});
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);

  rope2 = new Rope(8,{x:150,y:20})
  fruit_con2 = new Link(rope2,fruit)

  rope3 = new Rope(5,{x:300,y:45})
  fruit_con3 = new Link(rope3,fruit)



  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)

  blink.frameDelay = 20
  eat.frameDelay = 2
  rabbit = createSprite (250,600,30,30)
  rabbit.scale = 0.2

  rabbit.addAnimation("blinkng",blink)
  rabbit.addAnimation("eating",eat)
  rabbit.addAnimation("craying",sad)

button = createImg("cut_button.png")
button.position(200,30)
button.size(50,50)
button.mouseClicked(drop)

button2 = createImg("cut_button.png")
button2.position(150,20)
button2.size(50,50)
button2.mouseClicked(drop2)

button3 = createImg("cut_button.png")
button3.position(300,40)
button3.size(50,50)
button3.mouseClicked(drop3)

balloon = createImg("balloon.png")
balloon.position(20,250)
balloon.size(80,80)

balloon.mouseClicked(airblow)

buttomMute = createImg("mute.png")
buttomMute.position(50,50)
buttomMute.size(50,50)
buttomMute.mouseClicked(mute)

  
}

function draw() 
{
  background(51);
  image(backgroundImg,0,0,500,700)
  rope.show();
  rope2.show()
  rope3.show()


push()
imageMode(CENTER)
if(fruit!==null){
  image(fruitImg,fruit.position.x,fruit.position.y,70,70)
}
pop()

  Engine.update(engine);
  ground.show();

if(collide(fruit,rabbit)==true){
  rabbit.changeAnimation("eating")
  eating_sound.play()
  }

  if(fruit !== null && fruit.position.y >= 650){
    rabbit.changeAnimation("craying")
    sad_sound.play()
    World.remove(engine.world,fruit)
    fruit = null
  }


  drawSprites()


 
   
}

function drop(){
  rope.break()
  fruit_con.detach();
  fruit_con = null
  cut_sound.play()

}

function drop2(){
  rope2.break()
  fruit_con2.detach();
  fruit_con2 = null
  cut_sound.play()
}

function drop3(){
  rope3.break()
  fruit_con3.detach();
  fruit_con3 = null
  cut_sound.play()
}

function collide (body,sprite){
  if(body != null){
    var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)

    if(d<=80){
    World.remove(engine.world,fruit)
    fruit = null
    console.log("true")
    return true
    }

    else{
      console.log("false")
      return false
    }
  }
}

function airblow(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.02,y:0})
  air.play()
}

function mute (){
  if(bk_song.isPlaying()){
    bk_song.stop()
  }
  else{
    bk_song.play()
  }
}
