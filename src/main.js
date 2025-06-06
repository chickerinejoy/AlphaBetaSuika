import { engine, render, startEngine } from "./engine";
import { setupWallBounds } from "./wall";
import { setupControls } from "./controls";
import { setupCollisionHandler } from "./collision";
import { addFruit } from "./fruit";

const world = engine.world;

setupWallBounds(world);
setupControls(world);
setupCollisionHandler(engine, world);
addFruit(world);
startEngine();
