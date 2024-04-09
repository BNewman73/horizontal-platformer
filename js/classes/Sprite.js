class Sprite {
    constructor({position, src, frames = 1, animations, frameBuffer = 10, loop = true, autoplay = true}) {
        this.position = position
        this.frames = frames
        this.image = new Image()
        this.image.onload = () => {
            this.loaded = true
            this.width = this.image.width / this.frames
            this.height = this.image.height
        }
        this.image.src = src
        this.loaded = false
        this.frame = 0      
        this.elapsed = 0
        this.frameBuffer = frameBuffer
        this.loop = loop
        this.autoplay = autoplay
        this.animations = animations
        this.currentAnimation
        if (this.animations) {
            for (let key in this.animations) {
                const image = new Image()
                image.src = this.animations[key].src
                this.animations[key].image = image
            }
        }
    }

    draw() {
        if (!this.loaded) return
        const cropbox = {
            position: {
                x: this.width * this.frame,
                y: 0
            },
            width: this.width,
            height: this.height
        }
        context.drawImage(
            this.image,
            cropbox.position.x,
            cropbox.position.y,
            cropbox.width,
            cropbox.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
        this.updateFrame()
    }

    play() {
        this.autoplay = true
    }

    updateFrame() {
        if (!this.autoplay) return
        if (this.elapsed % this.frameBuffer === 0) {
            if (this.frame < this.frames - 1) this.frame += 1
            else if (this.loop) this.frame = 0
        }
        this.elapsed += 1
        if (this.currentAnimation?.onComplete) {
            if (this.frame === this.frames - 1 && !this.currentAnimation.complete) {
                this.currentAnimation.onComplete()
                this.currentAnimation.complete = true
            }
        }
    }
}