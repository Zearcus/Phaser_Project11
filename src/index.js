

import Phaser from 'phaser';

import PlayScene from './scenes/Play';
import PreloadScene from './scenes/Preload';
//import MainMenu from './menu.ts'


const WIDTH = 800;
const HEIGHT = 600;
let cursors
let playerInput

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
}

const Scenes = [PreloadScene,PlayScene];
const createScene = Scene => new Scene(SHARED_CONFIG)
const initScenes = () => Scenes.map(createScene)

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  pixelArt: true,
  physics: {
    default: 'arcade', 
    arcade: {
      //debug: true,
    }
  },
  scene: initScenes()
}

export function ConvertXCartesianToIsometric(x, y) {     
  var tempX = x - y / 1.108;      
  return tempX }  

export function ConvertYCartesianToIsometric(x, y) {     
  var tempY = (x + y) / 2;      
  return tempY }

new Phaser.Game(config);