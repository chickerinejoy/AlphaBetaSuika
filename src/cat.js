import { Bodies, World } from "matter-js";
import { CATS } from "./catsData";

let currentBody = null;
let currentCat = null;

// Exported functions to access current cat and body
export const getCurrentCat = () => currentCat;
export const getCurrentBody = () => currentBody;

// Function to add a new cat to the world
export function addCat(world) {
  const cat = getRandomCat();

  // Cat dropping sound
  const dropSound = new Audio('/public/drop.m4a'); 

  dropSound.currentTime = 0;
  dropSound.play().catch(() => {}); 

  // Create new body for cat
  const body = Bodies.circle(300, 50, cat.radius, {
    label: cat.label,
    isSleeping: true,
    render: {
      fillStyle: cat.color,
      sprite: { texture: `/${cat.label}.png` },
    },
    restitution: 0.2,
  });

  currentBody = body;
  currentCat = cat;

  World.add(world, body);
}

// Randomize falling cat
function getRandomCat() {
  let cat;
  do {
    const index = Math.floor(Math.random() * 5);
    cat = CATS[index];
  } while (cat.label === currentCat?.label);
  return cat;
}
