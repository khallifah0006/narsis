const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: "./src/index.js",  // Ensure this matches your actual JS entry file
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"  // ✅ Make sure Webpack generates a JS file here
    },
    mode: "development",
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },
        port: 8080,
        historyApiFallback: true
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        }),
        new CopyWebpackPlugin({
            patterns: [
               
                
                { from: "service-worker.js", to: "service-worker.js" },
                { from: "manifest.json", to: "manifest.json" },
                { from: "src/styles.css", to: "styles.css" },
                { from: "src/db.js", to: "db.js" },
                { from: "src/icons", to: "icons" },
                { from: "src/screenshots", to: "screenshots" },
                { from: "src/404.html", to: "404.html" },
                { from: "favicon.ico", to: "favicon.ico" }

            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            }
        ]
    }
};
