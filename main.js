kaboom({
    width: 1280,
    height: 720,
    scale: 0.7
})

loadSpriteAtlas('assets/tileset.png', {
    'platform-left': {
        x: 82,
        y: 64,
        width: 16,
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
    }
})


add([
    sprite('platform-right'),
    area(),
    scale(8),
    pos(center())
])