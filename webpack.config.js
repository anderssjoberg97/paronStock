const webpack = require("webpack");
const path = require("path");

module.exports = {
    entry: path.join(__dirname, "src", "client.js"),
    output: {
        path: path.join(__dirname, "src", "static", "js"),
        filename: "bundle.js"
    },
    module: {
        loaders: [{
            test: path.join(__dirname, "src"),
            exclude: "/node_modules/",
            loader: "babel-loader",
            query: {
                presets: ["react", "es2015", "stage-0"]
            }
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.enc.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false},
            mangle: true,
            sourcemap: false,
            beautify: false,
            dead_code: true
        })
    ],
    devServer: {
        historyApiFallback: true,
    }
};
