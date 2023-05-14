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
    pos(-50, 190)
])

const map = addLevel([
    '               ',
    '               ',
    ' 012           ',
    '      012      ',
    '               ',
    ' 012           ',
    '           012                                    ',
    '333                                               ',
    '444                                               ',
    '444   012                                         ',
    '33333333333333333333333333333333333333333333333333',
    '44444444444444444444444444444444444444444444444444'
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
    rect(30,30),
    area(),
    body(),
    pos(50,10),
    {
        speed: 500
    }
])

onKeyDown('right', () => player.move(player.speed, 0))
onKeyDown('left', () => player.move(-player.speed, 0))
onKeyPress('up', () => {
    if (player.isGrounded()) player.jump()
})

onUpdate(() => {
    camPos(player.pos)
})