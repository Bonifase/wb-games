const canvas = document.getElementById("main-canvas");
const context = canvas.getContext("2d");
var message = "Bouncing back...";
var img = new Image();
img.src = "./travel2.jpg";

// actor
var player = {
  x: 50,
  spdX: 30,
  y: 40,
  spdY: 5,
  name: "PHP 🍭"
};
var actors = [];

const Enemy = (id, x, y, spdX, spdY, name) => {
  var enemy3 = {
    x: x,
    spdX: spdX,
    y: y,
    spdY: spdY,
    name: name,
    id: id
  };
  actors[id] = enemy3;
};

Enemy("E1", 150, 350, 10, 15, "JavaScript 🙂");
Enemy("E2", 250, 350, 10, -15, "Node 🍪");
Enemy("E3", 250, 150, 10, -8, "Python 🔥");

const HEIGHT = 500;
const WIDTH = 800;
context.font = "40px Arial bold";
context.fillStyle = "green";
// context.drawImage(img, 0, 0);

const getDistanceBetweenEntity = (entity1, entity2) => {
  //return distance (number)
  var vx = entity1.x - entity2.x;
  var vy = entity1.y - entity2.y;
  return Math.sqrt(vx * vx + vy * vy);
};

const testCollisionEntity = (entity1, entity2) => {
  //return if colliding (true/false)
  var distance = getDistanceBetweenEntity(entity1, entity2);
  return distance < 60;
};

const updateEntity = actor => {
  //   player
  actor.x += actor.spdX;
  actor.y += actor.spdY;
  context.fillText(actor.name, actor.x, actor.y);
  if (actor.x < 0 || actor.x > WIDTH) {
    console.log(message);
    actor.spdX = -actor.spdX;
  }
  if (actor.y < 0 || actor.y > HEIGHT) {
    console.log(message);
    actor.spdY = -actor.spdY;
  }
};
const update = () => {
  context.clearRect(0, 0, WIDTH, HEIGHT);
  for (let actor in actors) {
    updateEntity(actors[actor]);

    var collision = testCollisionEntity(player, actors[actor]);
    if (collision) {
      context.fillText("Colliding!", 300, 200);
      console.log("Colliding!");
    }
  }
  updateEntity(player);
};

setInterval(update, 40);
