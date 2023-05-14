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
})


const map = addLevel([
    '               ',
    ' 012           ',
    '      012      ',
    '               ',
    ' 012           ',
    '           012 ',
    '               ',
    '      012      ',
    '               '
], {
    tileWidth: 16,
    tileHeight: 16,
    tiles: {
        0: () => [sprite('platform-left')],
        1: () => [sprite('platform-middle')],
        2: () => [sprite('platform-right')],
    }
})

map.use(scale(4))