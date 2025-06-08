
import { Events, Bodies, World } from "matter-js";
import { FRUITS } from "./fruitsData";
import { getPlayer } from "./switch";

let userScore = 0;
let computerScore = 0;
let gameOver = false;
//
export const isGameOver = () => gameOver;

export const setupCollisionHandler = (engine, world) => {
  Events.on(engine, "collisionStart", (event) => {
    event.pairs.forEach((collision) => {
      const { bodyA, bodyB } = collision;

      // Merge same fruits
      if (bodyA.label === bodyB.label) {
        World.remove(world, [bodyA, bodyB]);

        const index = FRUITS.findIndex((f) => f.label === bodyA.label);
        if (index === FRUITS.length - 1) return;

        const newFruit = FRUITS[index + 1];
        const merged = Bodies.circle(
          collision.collision.supports[0].x,
          collision.collision.supports[0].y,
          newFruit.radius,
          {
            render: {
              fillStyle: newFruit.color,
              sprite: { texture: `/${newFruit.label}.png` },
            },
            label: newFruit.label,
          }
        );

        World.add(world, merged);

        //  Update scores
        if (getPlayer() === "computer") { // User
          userScore += newFruit.points;
          document.getElementById("user-score").innerText = userScore;
        } else if (getPlayer() === "user") { // Computer
          computerScore += newFruit.points;
          document.getElementById("ai-score").innerText = computerScore;
        }
      }

      // Game Over logic
      const isTopLineA = bodyA.label === "topLine";
      const isTopLineB = bodyB.label === "topLine";

      const fruit = isTopLineA ? bodyB : isTopLineB ? bodyA : null;

      if (fruit && fruit.speed < 0.1) {
        gameOver = true;
        alert("Game Over!");
      }
    });
  });
};
