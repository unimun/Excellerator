module.exports = {
    target: "electron",
    node: {
        __dirname: false,
        __filename: false
    },
    resolve: {
        extensions: [".js", ".jsx", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                loaders: ["style-loader", "css-loader"]
            }
        ]
    },
    entry: {
        "main/index": "./src/main/index.js",
        "renderer/index": "./src/renderer/index.jsx"
    },
    output: {
        filename: "dist/js/[name].js"
    },
    devtool: "source-map"
};