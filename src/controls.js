import { Body, Sleeping } from "matter-js";
import { addFruit, getCurrentBody } from "./fruit";

let interval = null;
let disableAction = false;
let currentPlayer = "user";

export const setupControls = (world) => {
  // Initial spawn for the user
  addFruit(world);

  window.onkeydown = (event) => {
    if (currentPlayer !== "user" || disableAction) return;

    // Prevent scrolling with arrow keys
    if (
      event.code === "ArrowLeft" ||
      event.code === "ArrowRight" ||
      event.code === "Space"
    ) {
      event.preventDefault();
    }

    // Game over == no actions
    const currentBody = getCurrentBody();
    if (!currentBody) return;

    // Moving == ignore other inputs
    switch (event.code) {
      case "ArrowLeft":
        if (interval) return;
        interval = setInterval(() => {
          if (currentBody.position.x - 20 > 30) {
            Body.setPosition(currentBody, {
              x: currentBody.position.x - 1,
              y: currentBody.position.y,
            });
          }
        }, 5);
        break;

      case "ArrowRight":
        if (interval) return;
        interval = setInterval(() => {
          if (currentBody.position.x + 20 < 590) {
            Body.setPosition(currentBody, {
              x: currentBody.position.x + 1,
              y: currentBody.position.y,
            });
          }
        }, 5);
        break;

      case "Space":
        disableAction = true;
        Sleeping.set(currentBody, false); // Drop it

        setTimeout(() => {
          disableAction = false;
          currentPlayer = "computer"; // Switch turn
          setTimeout(() => handleComputerTurn(world), 500);
        }, 1000);
        break;
    }
  };

  // Prevent moving when key is released
  window.onkeyup = (event) => {
    if (event.code === "ArrowLeft" || event.code === "ArrowRight") {
      clearInterval(interval);
      interval = null;
    }
  };
};

// AI turn must replace with alpha-beta
const handleComputerTurn = (world) => {
  addFruit(world);
  const currentBody = getCurrentBody();
  if (!currentBody) return;

  // Position computer fruit randomly
  const targetX = 100 + Math.random() * 400;

  const moveInterval = setInterval(() => {
    // Calculates distance of fruit and target position
    const dx = targetX - currentBody.position.x;

    if (Math.abs(dx) < 1) {
      clearInterval(moveInterval);

      setTimeout(() => {
        // Drop fruit
        Sleeping.set(currentBody, false);
        // Spawn fruit for user after computer is done
        setTimeout(() => {
          currentPlayer = "user";
          addFruit(world);
        }, 1000);
      }, 500);
    } else {
      // Keep moving towards target position
      Body.setPosition(currentBody, {
        x: currentBody.position.x + Math.sign(dx),
        y: currentBody.position.y,
      });
    }
  }, 5);
};
