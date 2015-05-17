module.exports = {
    entry: './stuff/src/entry.jsx',
    output: {
        path: __dirname,
        filename: "./stuff/bundle.js"
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: "style!css"
        }, {
            test: /\.styl$/,
            loader: 'style-loader!css-loader!stylus-loader'
        }, {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel'
        }]
    }
};