class Menu extends Phaser.Scene {

    constructor() {
        super("menuGame");
    }

    preload(){
        this.load.image('menu', 'assets/images/menu.png');

    }

    create(){
        const ui = this.add.image(0, 0, 'menu').setOrigin(0, 0);
    }

    update() {

        this.input.keyboard.on('keydown-ENTER', function () {
            this.scene.start("playGame");
        }, this);

    }
}