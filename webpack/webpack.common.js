const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    entry: {
        app: "./src/index.tsx"
    },
    devtool: 'inline-source-map',
    output: {
        filename: "[name].[hash].js",
        path: path.resolve(__dirname, '..', 'dist')
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    devServer: {
        contentBase: './dist'
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            {
                test: /\.css?$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'test',
            template: 'template.html'
        }),
        new CleanWebpackPlugin(),
    ]
};