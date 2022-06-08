module.exports = {
    presets: [
        [
            '@babel/preset-react',
            {
                pragma: 'Yc.createElement'
            }
        ]
    ]
}

// Yc.createElement -> render function