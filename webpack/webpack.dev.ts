import path from "path";
import webpack from "webpack";
import merge from "webpack-merge";
import common from "./webpack.common";
const config: webpack.Configuration = merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    output: {
        filename: "[name].[hash].js",
        path: path.resolve(__dirname, "..", "dist"),
    },
    devServer: {
        contentBase: "./dist",
        host: "0.0.0.0",
    },
});
export default config;
