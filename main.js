kaboom({
    width: 1280,
    height: 720,
    scale: 0.7
})

loadSpriteAtlas('assets/tileset.png', {
    'platform-left': { x: 82, y: 64, width: 16,
        height: 8
    },
    'platform-middle': {
        x: 112,
        y: 64,
        width: 16,
        height: 8
    },
    'platform-right': {
        x: 142,
        y: 64,
        width: 16,
        height: 8
    },
    'smaller-tree': {
        x: 0,
        y: 80,
        width: 60,
        height: 65
    },
    'bigger-tree': {
        x: 170,
        y: 10,
        width: 115,
        height: 200
    },
    'ground': {
        x: 80,
        y: 144,
        width: 16,
        height: 16
    },
    'ground-deep': {
        x: 0,
        y: 144,
        width: 16,
        height: 16
    }
})

loadSprite('background-0', 'assets/background_0.png')
loadSprite('background-1', 'assets/background_1.png')
loadSprite('background-2', 'assets/background_2.png')
loadSprite('idle-sprite', 'assets/Idle.png', {
    sliceX: 8,
    sliceY: 1,
    anims: { 'idle-anim': { from: 0, to: 7, loop: true }}
})
loadSprite('run-sprite', 'assets/Run.png', {
    sliceX: 8,
    sliceY: 1,
    anims: { 'run-anim': { from: 0, to: 7, loop: true }}
})

loadSprite('jump-sprite', 'assets/Jump.png', {
    sliceX: 2,
    sliceY: 1,
    anims: { 'jump-anim': { from: 0, to: 1, loop: true }}
})

loadSprite('fall-sprite', 'assets/Fall.png', {
    sliceX: 2,
    sliceY: 1,
    anims: { 'fall-anim' : { from: 0, to: 1, loop: true }}
})

setGravity(1000)

add([
    sprite('background-0'),
    fixed(), 
    scale(4)
])

add([
    sprite('background-0'),
    fixed(),
    pos(1000, 0),
    scale(4),
]).flipX = true

add([
    sprite('background-1'),
    fixed(),
    scale(4)
])

add([
    sprite('background-1'),
    fixed(),
    pos(1000, 0),
    scale(4),
]).flipX = true

add([
    sprite('background-2'),
    fixed(),
    scale(4)
])

add([
    sprite('background-2'),
    fixed(),
    pos(1000, 0),
    scale(4),
]).flipX = true

const tree = add([
    sprite('smaller-tree'),
    scale(4),
    pos(40, 190)
])

const map = addLevel([
    '5                                                     5',
    '5                                                     5',
    '5   012                  012                  012     5',
    '5        012                                          5',
    '5                                   012               5',
    '5   012              012                              5',
    '5             012                                     5',
    ' 333333                      012           012        5',
    ' 444444                                               5',
    ' 444444   012                                         5',
    ' 33333333333333333333333333333333333333333333333333333 ',
    ' 44444444444444444444444444444444444444444444444444444 '
], {
    tileWidth: 16,
    tileHeight: 16,
    tiles: {
        0: () => [
            sprite('platform-left'),
            area(),
            body({isStatic: true})
        ],
        1: () => [
            sprite('platform-middle'),
            area(),
            body({isStatic: true})
        ],
        2: () => [
            sprite('platform-right'),
            area(),
            body({isStatic: true})
        ],
        3: () => [
            sprite('ground'),
            area(),
            body({isStatic: true})
        ],
        4: () => [
            sprite('ground-deep'),
            area(),
            body({isStatic: true})
        ],
        5: () => [
            rect(16, 16),
            opacity(0),
            area(),
            body({isStatic: true})
        ]
    }
})

map.use(scale(4))

const biggerTree = add([
    sprite('bigger-tree'),
    scale(4),
    pos(900,104)
])

const player = add([
    sprite('idle-sprite'),
    scale(2),
    area({shape: new Rect(vec2(0), 32, 32), offset: vec2(0,32)}),
    anchor('center'),
    body(),
    pos(900,10),
    {
        speed: 500,
        previousHeight: null,
        heightDelta: 0,
        direction: 'right'
    }
])

player.play('idle-anim')

onKeyDown('right', () => {
    if (player.curAnim() !== 'run-anim' && player.isGrounded()) {
        player.use(sprite('run-sprite'))
        player.play('run-anim')
    }

    if (player.direction !== 'right') player.direction = 'right'

    player.move(player.speed, 0)
})

onKeyRelease('right', () => {
    player.use(sprite('idle-sprite'))
    player.play('idle-anim')
})

onKeyDown('left', () => {
    if (player.curAnim() !== 'run-anim' && player.isGrounded()) {
        player.use(sprite('run-sprite'))
        player.play('run-anim')
    }

    if (player.direction !== 'left') player.direction = 'left'

    player.move(-player.speed, 0)
})

onKeyRelease('left', () => {
    player.use(sprite('idle-sprite'))
    player.play('idle-anim')
})

onKeyPress('up', () => {
    if (player.isGrounded()) {
        player.jump()
    }
})

camScale(1.5)

onUpdate(() => {

    if (player.previousHeight) {
        player.heightDelta = player.previousHeight - player.pos.y
    }

    player.previousHeight = player.pos.y

    const cameraLeftBound = 550
    const cameraRightBound = 3000
    const cameraVerticalOffset = player.pos.y - 100

    if (cameraLeftBound > player.pos.x) {
        camPos(cameraLeftBound, cameraVerticalOffset)
    } else if (cameraRightBound < player.pos.x) {
        camPos(cameraRightBound, cameraVerticalOffset)
    } else {
        camPos(player.pos.x, cameraVerticalOffset)
    }

    if (player.curAnim() !== 'run-anim' && player.isGrounded()) {
        player.use(sprite('idle-sprite'))
        player.play('idle-anim')
    }

    if (player.curAnim() !== 'jump-anim' && !player.isGrounded() && player.heightDelta > 0) {
        player.use(sprite('jump-sprite'))
        player.play('jump-anim')
    }

    if (player.curAnim() !== 'fall-anim' && !player.isGrounded() && player.heightDelta < 0) {
        player.use(sprite('fall-sprite'))
        player.play('fall-anim')
    }

    if (player.direction === 'left') {
        player.flipX = true
    } else {
        player.flipX = false
    }
})