class Player {


    constructor(scene) {
        this.scene=scene
        this.cameras=scene
        this.player = this.scene.physics.add.sprite(700, 1075, 'marche1');
        this.player.setScale(0.2)
        this.player.setBounce(0.1);
        this.scene.physics.add.collider(this.player, this.scene.colliders);
        this.cooldown=false



        this.scene.anims.create({
            key: 'walk',
            frames: [
                {key:'marche1'},
                {key:'marche2'},
                {key:'marche3'},
                {key:'marche4'},
            ],
            frameRate: 4,
            repeat: -1});


        this.scene.anims.create({
            key: 'idle',
            frames: [
                {key:'marche1'},
                {key:'marche3'},
            ],

            frameRate: 2,
            repeat: -1

        });

        this.scene.anims.create({
            key: 'jump',
            frames: [
                {key:'marche2'},
                {key:'marche2'},
            ],

            frameRate: 2,
            repeat: -1

        });
    }
    jappement(){
        if(this.scene.dontmove === true) {
            if (this.cooldown === false) {
                let circle = this.scene.add.circle(this.player.x, this.player.y, 150);
                circle = this.scene.physics.add.existing(circle, true)
                this.cooldown = true

                this.scene.physics.add.overlap(circle, this.scene.Ours, this.test, null, this);
                this.scene.physics.add.overlap(circle, this.scene.Faon, this.test2, null, this);

                this.scene.time.delayedCall(2000, () => {
                    this.cooldown = false
                    circle.destroy()
                    console.log(this.cooldown)
                })
            }
        }

    }

    test(circle,ours){
        ours.play('ours',true)
        console.log("je collide")
    }

    test2(circle,faon){
        faon.play('faon',true)
        console.log("je collide")
    }


    jump(){
        if(this.scene.dontmove === true) {
            this.player.setVelocityY(-420);
            this.player.play('jump', true);
        }
    }
    moveRight(){
        if(this.scene.dontmove === true) {
            this.player.setVelocityX(250);
            this.player.setFlipX(false);
            if (this.player.body.onFloor()) {
                this.player.play('walk', true)
            }
            this.player.setScale(0.2)
        }
    }
    moveLeft(){
        if(this.scene.dontmove === true) {
            this.player.setVelocityX(-250);
            if (this.player.body.onFloor()) {
                this.player.play('walk', true)
            }
            this.player.setFlipX(true);
            this.player.setScale(0.2)
        }
    }
    stop(){
        this.player.setVelocityX(0);
        if (this.player.body.onFloor()) {
            this.player.play('idle',true)
        }
    }

    }



