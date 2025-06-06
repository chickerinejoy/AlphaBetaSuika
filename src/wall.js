import { Bodies, World } from "matter-js";

// Setup the wall bounds for the game
export const setupWallBounds = (world) => {
  const ground = Bodies.rectangle(310, 820, 620, 60, {
    isStatic: true,
    render: { fillStyle: "#E6B143" },
  });
  const leftWall = Bodies.rectangle(15, 395, 30, 790, {
    isStatic: true,
    render: { fillStyle: "#E6B143" },
  });
  const rightWall = Bodies.rectangle(605, 395, 30, 790, {
    isStatic: true,
    render: { fillStyle: "#E6B143" },
  });
  const topLine = Bodies.rectangle(310, 150, 620, 2, {
    isStatic: true,
    isSensor: true,
    render: { fillStyle: "#E6B143" },
    label: "topLine",
  });

  World.add(world, [ground, leftWall, rightWall, topLine]);
};
