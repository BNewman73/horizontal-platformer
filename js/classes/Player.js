class Player extends Sprite {
    constructor({collisionBlocks = [], src, frames, animations, loop}) {
        super({src, frames, animations, loop})
        this.collisionBlocks = collisionBlocks
        this.position = {
            x: 200,
            y: 200
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.moveable = true
        this.width = 25
        this.height = 25
        this.sides = {
            bottom: this.position.y + this.height
        }
        this.gravity = 1
        this.hitbox = {
            position: {
                x: this.position.x + 60,
                y: this.position.y + 35
            },
            width: 45,
            height: 55
        }
    }

    switchSprite(name) {
        const animation = this.animations[name]
        this.currentAnimation = animation
        if (animation.image === this.image) return
        this.image = animation.image
        this.frames = animation.frames
        this.frameBuffer = animation.frameBuffer
        this.loop = animation.loop
        this.frame = 0
    }

    handleInput(keys) {
        if (!this.moveable) return
        this.velocity.x = 0
        if (keys.a.pressed) {
            this.velocity.x = -5
            this.switchSprite('runLeft')
            this.lastDirection = 'l'
        }
        else if (keys.d.pressed) {
                this.velocity.x = 5
                this.switchSprite('runRight')
                this.lastDirection = 'r'  
            }
        else {
            if (this.lastDirection === 'l') {
                this.switchSprite('idleLeft')
            }
            else {
                this.switchSprite('idleRight')
            }
        }
    }

    update() {
        // context.fillStyle = 'rgba(255, 0, 0, 0.5)'
        // context.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)
        this.position.x += this.velocity.x
        this.updateHitbox()
        this.checkForHorizontalCollision()
        this.applyGravity()
        this.updateHitbox()
        this.checkForVerticalCollision()
    }

    checkForHorizontalCollision() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]
            if (
                this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
                this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
                this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height
            ) {
                if (this.velocity.x < 0) {
                    const offset = this.hitbox.position.x - this.position.x
                    this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01
                    break
                }
                if (this.velocity.x > 0) {
                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width
                    this.position.x = collisionBlock.position.x - offset - 0.01
                    break
                }
            }
        }
    }

    applyGravity() {
        this.velocity.y += this.gravity
        this.position.y += this.velocity.y
    }

    checkForVerticalCollision() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]
            if (
                this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width && 
                this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
                this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y && 
                this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height
            ) {
                if (this.velocity.y < 0) {
                    this.velocity.y = 0
                    const offset = this.hitbox.position.y - this.position.y
                    this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01
                    break
                }
                if (this.velocity.y > 0) {
                    this.velocity.y = 0
                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
                    this.position.y = collisionBlock.position.y - offset - 0.01
                    break
                }
            }
        }
    }

    updateHitbox() {
        this.hitbox.position.x = this.position.x + 60,
        this.hitbox.position.y = this.position.y + 35
    }
}