
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import path from "path";
import TerserJSPlugin from "terser-webpack-plugin";
import UglifyJSPlugin from "uglifyjs-webpack-plugin";
import webpack from "webpack";
import {BundleAnalyzerPlugin} from "webpack-bundle-analyzer";
import merge from "webpack-merge";
import common from "./webpack.common";
const config: webpack.Configuration = merge(common, {
    mode: "production",
    devtool: "source-map",
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "..", "dist"),
    },
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    plugins: [
        new UglifyJSPlugin(),
        new BundleAnalyzerPlugin(),
    ],
});

export default config;
