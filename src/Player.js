class Player {


    constructor(scene) {
        this.scene=scene
        this.cameras=scene
        this.player = this.scene.physics.add.sprite(294, 1052, 'player');
        this.player.setBounce(0.1);
        this.scene.physics.add.collider(this.player, this.scene.colliders);
        this.cooldown=false
        this.ennemy = this.scene.physics.add.sprite(400, 1052, 'player');
        this.scene.physics.add.collider(this.ennemy, this.scene.colliders);


        this.scene.anims.create({
            key: 'walk',
            frames: this.scene.anims.generateFrameNames('player', {
                prefix: 'robo_player_',
                start: 2,
                end: 3,
            }),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'idle',
            frames: [{key: 'player', frame: 'robo_player_0'}],
            frameRate: 10,

        });
        this.scene.anims.create({
            key: 'jump',
            frames: [{key: 'player', frame: 'robo_player_1'}],
            frameRate: 10,
            repeat:-1,

        });
    }
    jappement(){

        if(this.cooldown===false) {
            let circle = this.scene.add.circle(this.player.x, this.player.y, 150);
            circle = this.scene.physics.add.existing(circle, true)
            this.cooldown=true

            this.scene.physics.add.overlap(circle, this.ennemy,this.test,null,this);

            this.scene.time.delayedCall(2000, () => {
                this.cooldown=false
                circle.destroy()
                console.log(this.cooldown)
            })
        }

    }

    test(circle,ennemy){
        ennemy.destroy()
        console.log("je collide")
    }


    jump(){
        this.player.setVelocityY(-420);
        this.player.play('jump', true);
    }
    moveRight(){
        this.player.setVelocityX(300);
        this.player.setFlipX(false);
        if (this.player.body.onFloor()) {
            this.player.play('walk', true)}
    }
    moveLeft(){
        this.player.setVelocityX(-300);
        if (this.player.body.onFloor()) {
            this.player.play('walk', true)}
        this.player.setFlipX(true);
    }
    stop(){
        this.player.setVelocityX(0);
        if (this.player.body.onFloor()) {
            this.player.play('idle',true)
        }
    }

    }



