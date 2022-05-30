class scene extends Phaser.Scene {

    preload() {
        this.load.image('background', 'assets/images/background.png');
        this.load.image('spike', 'assets/images/spike.png');
        // At last image must be loaded with its JSON
        this.load.atlas('player', 'assets/images/kenney_player.png', 'assets/images/kenney_player_atlas.json');
        this.load.image('tiles', 'assets/tilesets/tileset_asset.png');

        // Load the export Tiled JSON
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/levelv1.json');
    }


    create() {





        const backgroundImage = this.add.image(0, 0, 'background').setOrigin(0, 0);
        backgroundImage.setScale(8, 10);
        const map = this.make.tilemap({key: 'map'});

        const tileset = map.addTilesetImage('tileset_asset', 'tiles');
        this.platforms = map.createStaticLayer('Sol1', tileset, 0,0).setOrigin(0,0);
        this.platforms2 = map.createStaticLayer('Sol2', tileset, 0,0).setOrigin(0,0);
        this.platforms3 = map.createStaticLayer('Sol3', tileset, 0,0).setOrigin(0,0);
        this.platforms4 = map.createStaticLayer('Arbre', tileset, 0,0).setOrigin(0,0);

        this.cursors = this.input.keyboard.createCursorKeys();





        //COLLIDERS
        this.colliders = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        const colliderLayer = map.getObjectLayer('colliders')
        colliderLayer.objects.forEach(objData=> {
            const {x = 0, y = 0, width = 0, height = 0} = objData
            let colliders = this.add.rectangle(x, y, width, height).setOrigin(0, 0)
            colliders = this.physics.add.existing(colliders)
            this.colliders.add(colliders)
        })

    //reste à la fin
        this.player = new Player(this)
        this.cameras.main.startFollow(this.player.player,true);
    }


    update() {

        switch (true) {
            case this.cursors.down.isDown:
                this.player.jappement();
                break;
                this.player.stop();
            case (this.cursors.space.isDown || this.cursors.up.isDown) && this.player.player.body.onFloor():
                this.player.jump()
                console.log("oui")
                break;
            case this.cursors.left.isDown:
                this.player.moveLeft()
                break;
            case this.cursors.right.isDown:
                this.player.moveRight();
                break;
            default:
                this.player.stop();
        }





    }
}