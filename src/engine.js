import { Engine, Render, Runner } from "matter-js";

// Create Matter.js engine
export const engine = Engine.create();

// Configuration
export const render = Render.create({
  engine,
  element: document.getElementById("game-container"),
  options: {
    wireframes: false,
    background: "#0A0C1A",
    width: 620,
    height: 850,
  },
});

export const runner = Runner.create();

// Activates physics engine and rendering
export const startEngine = () => {
  Render.run(render);
  Runner.run(runner, engine);
};
