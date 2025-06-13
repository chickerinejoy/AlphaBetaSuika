import { Events, Bodies, World } from "matter-js";
import { CATS } from "./catsData";
import { getPlayer } from "./switch";

let userScore = 0;
let computerScore = 0;
let gameOver = false;

export const isGameOver = () => gameOver;

export const setupCollisionHandler = (engine, world) => {
  Events.on(engine, "collisionStart", (event) => {
    event.pairs.forEach((collision) => {
      const { bodyA, bodyB } = collision;

      // Merge same cats
      if (bodyA.label === bodyB.label) {
        World.remove(world, [bodyA, bodyB]);

        const index = CATS.findIndex((f) => f.label === bodyA.label);
        if (index === CATS.length - 1) return;

        const newCat = CATS[index + 1];
        const merged = Bodies.circle(
          collision.collision.supports[0].x,
          collision.collision.supports[0].y,
          newCat.radius,
          {
            render: {
              fillStyle: newCat.color,
              sprite: { texture: `/${newCat.label}.png` },
            },
            label: newCat.label,
          }
        );

        World.add(world, merged);

        //  Update scores
        if (getPlayer() === "computer") { // User
          userScore += newCat.points;
          document.getElementById("user-score").innerText = userScore;
        } else if (getPlayer() === "user") { // Computer
          computerScore += newCat.points;
          document.getElementById("ai-score").innerText = computerScore;
        }
      }

      // Game Over logic
      const isTopLineA = bodyA.label === "topLine";
      const isTopLineB = bodyB.label === "topLine";

      const cat = isTopLineA ? bodyB : isTopLineB ? bodyA : null;

      if (cat && cat.speed < 0.1) {
        gameOver = true;
        alert("Game Over!");
      }
    });
  });
};
