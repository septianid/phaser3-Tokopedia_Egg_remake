import Phaser from 'phaser';
import CircularProgressPlugin from 'phaser3-rex-plugins/plugins/circularprogress-plugin.js';
import RoundRectanglePlugin from 'phaser3-rex-plugins/plugins/roundrectangle-plugin.js';
import GlowFilterPipelinePlugin from 'phaser3-rex-plugins/plugins/glowfilterpipeline-plugin.js';
import { Loading } from './main_scenes/loading.js';
import { Idle } from './main_scenes/idle_scene.js';
import { Hatching } from './main_scenes/hatching_scene.js'

const config = {
    type: Phaser.AUTO,
    parent: "game-page",
    backgroundColor: 0x75D5E3,
    dom: {
      createContainer: true
    },
    physics: {
      default: 'arcade',
    },
    plugins: {
      global: [{
          key: 'rexCircularProgressPlugin',
          plugin: CircularProgressPlugin,
          start: true
      },{
          key: 'rexRoundRectanglePlugin',
          plugin: RoundRectanglePlugin,
          start: true
      },{
          key: 'rexGlowFilterPipeline',
          plugin: GlowFilterPipelinePlugin,
          start: true
      }]
    },
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 720,
      height: 1280,
    },
    scene: [Loading, Idle, Hatching],
    audio: {
      disableWebAudio: true,
    }
  };
  
const game = new Phaser.Game(config);
