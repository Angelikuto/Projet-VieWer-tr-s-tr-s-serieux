class scene extends Phaser.Scene {

    preload() {
        this.load.image('background', 'assets/images/ciel.png');
        this.load.image('spike', 'assets/images/spike.png');
        // At last image must be loaded with its JSON
        this.load.atlas('player', 'assets/images/kenney_player.png', 'assets/images/kenney_player_atlas.json');
        this.load.image('tiles', 'assets/tilesets/tileset_asset.png');
        this.load.image('fdodo', 'assets/animation/faon/fdodo.png');
        this.load.image('ododo', 'assets/animation/ours/ododo.png');

        // Load the export Tiled JSON
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/levelv1.json');

        //animation

        for (let m=1;m<=4;m++){
            this.load.image('marche'+m,'assets/animation/skev/marche'+m+'.png')
        }

        for (let m=1;m<=4;m++){
            this.load.image('faon'+m,'assets/animation/faon/f'+m+'.png')
        }
        for (let n=1;n<=3;n++){
            this.load.image('ours'+n,'assets/animation/ours/ours'+n+'.png')
        }
    }


    create() {


        const backgroundImage = this.add.image(-600, -6800, 'background').setOrigin(0, 0);
        backgroundImage.setScale(8, 10);
        const map = this.make.tilemap({key: 'map'});

        const tileset = map.addTilesetImage('tileset_asset', 'tiles');
        this.platforms = map.createStaticLayer('Sol1', tileset, 0,0).setOrigin(0,0);
        this.platforms2 = map.createStaticLayer('Sol2', tileset, 0,0).setOrigin(0,0);
        this.platforms3 = map.createStaticLayer('Sol3', tileset, 0,0).setOrigin(0,0);
        this.platforms4 = map.createStaticLayer('Arbre', tileset, 0,0).setOrigin(0,0);



            //animations

        this.anims.create({
            key: 'faon',
            frames: [
                {key:'faon1'},
                {key:'faon2'},
                {key:'faon3'},
                {key:'faon4'},
                {key:'fdodo'},
            ],
            frameRate: 4,
            repeat: -1});

        this.faon = this.add.sprite(950, 958, 'faon1').setScale(0.5).setOrigin(0,0).setVisible(false);
        this.faon.play('faon').setScale(0.5);
///
        this.anims.create({
            key: 'ours',
            frames: [
                {key:'ours1'},
                {key:'ours2'},
                {key:'ours3'},
                {key:'ododo'},

            ],
            frameRate: 4,
            repeat: -1});

        this.ours = this.add.sprite(300, 958, 'ours1').setScale(0.5).setOrigin(0,0).setVisible(false);
        this.ours.play('ours').setScale(0.5);

        this.cursors = this.input.keyboard.createCursorKeys();

        //objets tiled


        this.Faon = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        map.getObjectLayer('Faon').objects.forEach((Faon) => {
            const F1 = this.Faon.create(Faon.x, Faon.y, 'fdodo').setOrigin(0);
            F1.setScale(0.5)
            F1.body.setSize(50,50).setOffset(75,150);
        });

        this.Ours = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        map.getObjectLayer('Ours').objects.forEach((Ours) => {
            const O1 = this.Ours.create(Ours.x, Ours.y, 'ododo').setOrigin(0);
            O1.setScale(0.5)
            O1.body.setSize(50,50).setOffset(75,150);
        });



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

    ReveilF(circle,Faon){



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
            console.log(this.player.player.x)
            console.log(this.player.player.y)
        }

        this.player.player.body.setSize(200,750)





    }
}