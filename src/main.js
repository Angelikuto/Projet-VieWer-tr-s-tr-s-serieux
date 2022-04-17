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
            gravity: { y: 850 },
            debug: true,
        },
    },
    scene: new scene(),
};

const game = new Phaser.Game(config);