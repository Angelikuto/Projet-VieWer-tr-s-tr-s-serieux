const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 1350,
    heigth: 720,
    scale: {
        ///       mode: Phaser.Scale.RESIZE,
        ///    autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 650 },
            debug: false,
        },
    },
    scene: [scene,Menu],
};

const game = new Phaser.Game(config);