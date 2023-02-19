const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");
const zlib = require("zlib");
const CompressionPlugin = require("compression-webpack-plugin");
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');

const PRODUCTION_PLUGINS = [
    new HtmlWebpackPlugin({
        title: "FastWallet",
        template: "./public/index.html",
        favicon: "./src/app/static/images/favicon.svg",
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
        filename: '[name].[hash].css',
    }),
    new StylelintPlugin({ fix: true }),
    new CompressionPlugin({
        filename: "[path][base].br",
        algorithm: "brotliCompress",
        test: /\.(js|css|html|svg)$/,
        compressionOptions: {
            params: {
                [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
            },
        },
        threshold: 10240,
        minRatio: 0.8,
        deleteOriginalAssets: false,
    }),
    new Dotenv({ path: "./.env" }),
    new webpack.ProvidePlugin({
        Buffer: [ 'buffer', 'Buffer' ],
    }),
];

const DEVELOPMENT_PLUGINS = [
    new HtmlWebpackPlugin({
        title: "FastWallet",
        template: "./public/index.html",
        // favicon: "./src/app/static/images/favicon.svg",
    }),
    new Dotenv({ path: "./local.env" }),
    new webpack.ProvidePlugin({
        Buffer: [ 'buffer', 'Buffer' ],
    }),
];

const OPTIMISATION = {
    splitChunks: {
        chunks: "all",
    },
    minimize: true,
    minimizer: [new CssMinimizerPlugin()],
};

const IMAGE_COMPRESSION = [
    {
        loader: "image-webpack-loader",
        options: {
            mozjpeg: {
                progressive: false,
            },
            optipng: {
                enabled: true,
            },
            pngquant: {
                quality: [0.8, 0.8],
                speed: 2,
            },
        },
    },
];

module.exports = (env, argv) => {
    const isProduction = argv.mode === "production";

    return {
        mode:  isProduction ? "production": "development",
        watch: isProduction ? false : true,
        performance: {
            hints: false,
            maxEntrypointSize: 512000,
            maxAssetSize: 512000,
        },
        entry: "./src/index.tsx",
        target: "web",
        output: {
            path: path.resolve(__dirname, "dist/"),
            filename: "[name].[hash].js",
            publicPath: "/",
        },
        // devtool: "source-map",
        plugins: isProduction ? PRODUCTION_PLUGINS : DEVELOPMENT_PLUGINS,
        devServer: {
            port: 3003,
            open: true,
            historyApiFallback: true,
            allowedHosts: "all"
        },
        resolve: {
            fallback: {
                buffer: require.resolve('buffer'),
                assert: require.resolve('assert'),
                stream: require.resolve('stream-browserify'),
                crypto: require.resolve('crypto-browserify'),
                https: require.resolve('https-browserify'),
                url: require.resolve('url'),
                http: require.resolve('stream-http')
            },
            alias: {
                "@components": path.resolve(__dirname, "./src/app/components/"),
                "@views": path.resolve(__dirname, "./src/app/views/"),
                "@static": path.resolve(__dirname, "./src/app/static/"),
                "@utils": path.resolve(__dirname, "./src/app/utils/"),
                "@app": path.resolve(__dirname, "./src/app/"),
                "@": path.resolve(__dirname, "./src/"),
            },
            extensions: [".ts", ".tsx", ".js", ".jsx"],
            modules: ["node_modules"],
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    enforce: "pre",
                    use: ["source-map-loader"],
                },
                {
                    test: /\.m?(tsx|ts)$/i,
                    exclude: /(node_modules)/,
                    use: [
                        {
                            loader: "ts-loader",
                        },
                    ],
                },
                {
                    test: /\.(scss)$/,
                    exclude: /(node_modules)/,
                    use: isProduction
                        ? [
                            MiniCssExtractPlugin.loader,
                            "css-loader",
                            "sass-loader",
                        ]
                        : ["style-loader", "css-loader", "sass-loader"],
                },
                {
                    test: /\.(css)$/,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    exclude: /(node_modules)/,
                    type: "asset/resource",
                    generator: {
                        filename: "fonts/[name][hash:5][ext]",
                    },
                },
                {
                    test: /\.(jpe|jpg|png|svg)(\?.*$|$)/,
                    exclude: /(node_modules)/,
                    type: "asset/resource",
                    generator: {
                        filename: "images/[name][hash:5][ext]",
                    },
                    use: isProduction ? IMAGE_COMPRESSION : [],
                },
            ],
        },
        optimization: isProduction ? OPTIMISATION : {},
    };
};
