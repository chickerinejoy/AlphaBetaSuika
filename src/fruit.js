
import { Bodies, World } from "matter-js";
import { FRUITS } from "./fruitsData";

let currentBody = null;
let currentFruit = null;

// Exported functions to access current fruit and body
export const getCurrentFruit = () => currentFruit;
export const getCurrentBody = () => currentBody;

// Function to add a new fruit to the world
export function addFruit(world) {
  const fruit = getRandomFruit();

  // Create new body for fruit
  const body = Bodies.circle(300, 50, fruit.radius, {
    label: fruit.label,
    isSleeping: true,
    render: {
      fillStyle: fruit.color,
      sprite: { texture: `/${fruit.label}.png` },
    },
    restitution: 0.2,
  });

  currentBody = body;
  currentFruit = fruit;

  World.add(world, body);
}
//
// Randomize falling fruit
function getRandomFruit() {
  let fruit;
  do {
    const index = Math.floor(Math.random() * 5);
    fruit = FRUITS[index];
  } while (fruit.label === currentFruit?.label);
  return fruit;
}
