import { engine, render, startEngine } from "./engine";
import { setupWallBounds } from "./wall";
import { userControls } from "./controls";
import { setupCollisionHandler } from "./collision";
import { addCat } from "./cat";

const world = engine.world;

setupWallBounds(world);
userControls(world);
setupCollisionHandler(engine, world);
addCat(world);
startEngine();
