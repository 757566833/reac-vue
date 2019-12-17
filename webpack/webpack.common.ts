import { CleanWebpackPlugin } from "clean-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
// tslint:disable-next-line: no-var-requires
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
import tsImportPluginFactory from "ts-import-plugin";
import webpack from "webpack";

const config: webpack.Configuration = {
    // mode: "development",
    devtool: "inline-source-map",
    entry: {
        app: "./src/index.tsx",
    },
    // optimization: {
    //     // usedExports: true,
    //     // moduleIds: "hashed",
    //     // runtimeChunk: "single",
    //     splitChunks: {
    //         minSize: 1,
    //         cacheGroups: {
    //             react: {
    //                 test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
    //                 name: "react",
    //                 chunks: "all",
    //             },
    //             antd: {
    //                 test: /[\\/]node_modules[\\/]antd[\\/]/,
    //                 name: "antd",
    //                 chunks: "all",
    //             },
    //             antdIcon: {
    //                 test: /[\\/]node_modules[\\/]\@ant(.+?)[\\/]/,
    //                 name: "antdIcon",
    //                 chunks: "all",
    //             },
    //             // moment: {
    //             //     test: /[\\/]node_modules[\\/]moment(.+?)[\\/]/,
    //             //     name: "moment",
    //             //     chunks: "all",
    //             // },
    //         },
    //     },
    // },

    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"],
    },
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: {
                    transpileOnly: true,
                    getCustomTransformers: () => ({
                        before: [tsImportPluginFactory({
                            libraryName: "antd",
                            libraryDirectory: "lib",
                            style: true,
                        })],
                    }),
                    compilerOptions: {
                        module: "es2015",
                    },
                },
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: process.env.NODE_ENV === "development",
                    },
                },
                {
                    loader: "css-loader",
                },

                ],
                exclude: /node_modules/,
            },
            {
                test: /\.less$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        // you can specify a publicPath here
                        // by default it uses publicPath in webpackOptions.output
                        //   publicPath: '../',
                        hmr: process.env.NODE_ENV === "development",
                    },
                },
                {
                    loader: "css-loader",

                },
                // {
                //     loader: 'postcss-loader',
                // },

                {
                    loader: "less-loader",

                },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "test",
            template: "template.html",
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: "[name].[contenthash].css",
            chunkFilename: "[id].[hash].css",
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
        new ProgressBarPlugin(),
        new ForkTsCheckerWebpackPlugin(),
        // new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),
    ],
};

export default config;
