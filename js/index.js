const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576
const overlay = {
    opacity: 0
}

const player = new Player({
    src: './img/king/idle.png',
    frames: 11,
    animations: {
        idleRight: {
            src: './img/king/idle.png',
            frames: 11,
            frameBuffer: 10,
            loop: true
        },
        idleLeft: {
            src: './img/king/idleLeft.png',
            frames: 11,
            frameBuffer: 10,
            loop: true
        },
        runRight: {
            src: './img/king/runRight.png',
            frames: 8,
            frameBuffer: 10,
            loop: true
        },
        runLeft: {
            src: './img/king/runLeft.png',
            frames: 8,
            frameBuffer: 10,
            loop: true
        },
        enterDoor: {
            src: './img/king/enterDoor.png',
            frames: 8,
            frameBuffer: 10,
            loop: false,
            onComplete: () => {
                gsap.to(overlay, {
                    opacity: 1,
                    onComplete: () => {
                        level++;
                        if (level === 4) level = 1
                        levels[level].init()
                        player.switchSprite('idleRight')
                        player.moveable = true
                        gsap.to(overlay, {
                            opacity: 0
                        })
                    }
                })
            }
        }
    }
})

let parsedCollisions
let collisionBlocks
let background
let doors
let level = 1
let levels = {
    1: {
        init: () => {
            parsedCollisions = collisionsLevel1.parse2D()
            collisionBlocks = parsedCollisions.createObjectsFrom2D()
            player.collisionBlocks = collisionBlocks
            if (player.currentAnimation) player.currentAnimation.complete = false
            background = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                src: './img/backgroundLevel2.png'
            })
            background = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                src: './img/backgroundLevel1.png'
            })
            doors = [
                new Sprite({
                    position: {
                        x: 760,
                        y: 274
                    },
                    src: './img/doorOpen.png',
                    frames: 5,
                    frameBuffer: 10,
                    loop: false,
                    autoplay: false
                })
            ]
        }
    },
    2: {
        init: () => {
            parsedCollisions = collisionsLevel2.parse2D()
            collisionBlocks = parsedCollisions.createObjectsFrom2D()
            player.collisionBlocks = collisionBlocks
            player.position.x = 100
            player.position.y = 50
            if (player.currentAnimation) player.currentAnimation.complete = false
            background = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                src: './img/backgroundLevel2.png'
            })
            doors = [
                new Sprite({
                    position: {
                        x: 772,
                        y: 336
                    },
                    src: './img/doorOpen.png',
                    frames: 5,
                    frameBuffer: 10,
                    loop: false,
                    autoplay: false
                })
            ]
        }
    },
    3: {
        init: () => {
            parsedCollisions = collisionsLevel3.parse2D()
            collisionBlocks = parsedCollisions.createObjectsFrom2D()
            player.collisionBlocks = collisionBlocks
            player.position.x = 750
            player.position.y = 100
            if (player.currentAnimation) player.currentAnimation.complete = false
            background = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                src: './img/backgroundLevel3.png'
            })
            doors = [
                new Sprite({
                    position: {
                        x: 175,
                        y: 334
                    },
                    src: './img/doorOpen.png',
                    frames: 5,
                    frameBuffer: 10,
                    loop: false,
                    autoplay: false
                })
            ]
        }
    }
}


const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

function animate() {
    window.requestAnimationFrame(animate)
    background.draw()
    collisionBlocks.forEach((collisionBlock) => {
        collisionBlock.draw()
    })
    doors.forEach((door) => {
        door.draw()
    })
    player.handleInput(keys)
    player.draw()
    player.update()

    context.save()
    context.globalAlpha = overlay.opacity
    context.fillStyle = 'black'
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.restore()
}
levels[level].init()
animate()