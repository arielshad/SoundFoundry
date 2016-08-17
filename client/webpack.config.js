var webpack = require("webpack");

var ExtractPlugin = require("extract-text-webpack-plugin");
var CleanPlugin = require("clean-webpack-plugin");

var production = (process.env.NODE_ENV === "production");

var plugins = [
    new ExtractPlugin("bundle.css", {allChunks: true}), //where content should be piped
    new webpack.optimize.CommonsChunkPlugin({
        name: "main", //move dependencies to our main bundle file
        children: true, //look for dependencies in all children
        minChunks: 2 //how many times a dependency must come up before being extracted
    })
];

if (production) {
    plugins = plugins.concat([

        // This plugin looks for similar chunks and files
        // and merges them for better caching by the user
        new webpack.optimize.DedupePlugin(),

        // This plugins optimizes chunks and modules by
        // how much they are used in your app
        new webpack.optimize.OccurenceOrderPlugin(),

        // This plugin prevents Webpack from creating chunks
        // that would be too small to be worth loading separately
        new webpack.optimize.MinChunkSizePlugin({
            minChunkSize: 51200, // ~50kb
        }),

        // This plugin minifies all the Javascript code of the final bundle
        new webpack.optimize.UglifyJsPlugin({
            mangle:   true,
            compress: {
                warnings: false, // Suppress uglification warnings
            },
        }),

        // This plugins defines various variables that we can set to false
        // in production to avoid code related to them from being compiled
        // in our final bundle
        new webpack.DefinePlugin({
            __SERVER__:      !production,
            __DEVELOPMENT__: !production,
            __DEVTOOLS__:    !production,
            'process.env':   {
                BABEL_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),

    ]);
}
else{
    plugins = plugins.concat([
        new webpack.HotModuleReplacementPlugin()
    ]);
}

module.exports = {
    //entry: "./src",
    entry: [
        //'webpack-dev-server/client?https://0.0.0.0:8080',
        //'webpack/hot/only-dev-server',
        './src/App.js'
    ],
    devServer: {
        hot: true
    },
    output: {
        path: "builds/",
        filename: "[name].js",
        chunkFilename: "[name]-[chunkhash].js",
        publicPath: "builds/"
    },
    plugins: plugins,
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel",
                include: __dirname + "/src"
            },
            {
                test: /\.scss$/,
                loader: ExtractPlugin.extract("style", "css!sass")
                //loaders: ["style", "css", "sass"]
            },
            {
                test:/\.css$/,
                loader: ExtractPlugin.extract("css")
            },
            {
                test: /\.html/,
                loader: "html"
            },
            {
                test: /\.(png|gif|jpe?g|svg)$/i,
                loader: "url",
                query: {
                    limit: 10000 //encode in base64 url if <10kb, else fallback to file-loader
                }
            }
        ]
    }
};

