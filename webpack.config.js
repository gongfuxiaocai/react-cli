const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const merge = require('webpack-merge');

const requestUrl = require('./config/requestUrl');

const dev = process.argv.indexOf( "development" ) !== -1 ? true : false;

const con_config = {
    mode: dev ? 'development' : 'production',
    performance: {
        hints: false
    },
    resolve: {
        alias: {
            Components: path.resolve( __dirname, './src/component' ),//组件路径缩写配置
            UtilRoot: path.resolve( __dirname, './src/utils' ), //工具方法路径缩写配置
            Config: path.resolve( __dirname, './config' ), //配置文件路径
            Request: path.resolve( __dirname, './src/dataProvider' ), //请求地址
            Contexts: path.resolve( __dirname, './src/contexts' ), //context地址
        }
    },
    module: {
        rules: [
            {
                test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
                loader: "file-loader"
            },
            {
                test: /\.js|\.jsx$/,
                loader: 'babel-loader?cacheDirectory',
                exclude: /node_modules/,
                query: {
                    plugins: [
                        [ require('babel-plugin-transform-imports'), {
                            "SwiftPassUI": {
                                "transform": function( name ) {
                                    const importName = name.substr( 0, 1 ).toLowerCase() + name.substring( 1 );
                                    return 'Components/' + importName;
                                },
                                preventFullImport: true
                            }
                        }]
                    ]
                }
            },
            {
                test: /(\.css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: [{
                        loader: 'style-loader',
                    }],
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    autoprefixer({
                                        browsers: [
                                            'last 2 versions',
                                            'Firefox ESR',
                                            '> 1%',
                                            'ie >= 9',
                                            'iOS >= 8',
                                            'Android >= 4',
                                        ],
                                    }),
                                ],
                            }
                        },
                    ],
                }),
            },
            {
                test: /(\.less)$/,
                use: ExtractTextPlugin.extract({
                    fallback: [{
                        loader: 'style-loader',
                    }],
                    use: [
                        {
                            loader: 'css-loader',
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    autoprefixer({
                                        browsers: [
                                            'last 2 versions',
                                            'Firefox ESR',
                                            '> 1%',
                                            'ie >= 9',
                                            'iOS >= 8',
                                            'Android >= 4',
                                        ],
                                    }),
                                ],
                            }
                        },
                        {
                            loader: 'less-loader',
                        },
                    ],
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=1&name=images/[name].[ext]'
            },
            {
                test: /\.pdf$/,
                use: 'url-loader',
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                exclude: /node_modules/
            }

        ]
    },
    optimization: {
        removeAvailableModules: true,
        removeEmptyChunks: true,
        // mergeDuplicateChunks: true
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './src/index.html'
        }),
        new ExtractTextPlugin({
            filename: "style.[chunkhash:5].css",
            allChunks: true
        }),
    ],

};

const dev_config = {
    devtool: 'eval-source-map',
    output: {
        path: path.resolve( __dirname, './dist' ),
        publicPath: '/',
        filename: '[name].bundle.js'
    },
    optimization: {
        splitChunks: false,
    },
    devServer: {
        disableHostCheck: true,
        historyApiFallback: true,
        contentBase: 'dist',
        // proxy: {
        //     '/data-base/': {
        //         target: requestUrl.apiUrl,
        //         changeOrigin: false,
        //     },
        //     '/pic/': {
        //         target: requestUrl.picUrl,
        //         changeOrigin: false,
        //     },
        //     '/file/': {
        //         target: requestUrl.fileUrl,
        //         changeOrigin: false,
        //     }
        // }
    }
};

const pro_config = {
    output: {
        path: path.resolve( __dirname, './dist' ),
        publicPath: '/',
        filename: '[name].[chunkhash:5].js',
        chunkFilename: '[name].[chunkhash:5].chunk.js',
    },
    optimization: {
        usedExports: true,
        runtimeChunk: {
            name: "manifest"
        },
        splitChunks: {
            name: true,
            cacheGroups: {
                default: false,
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "all",
                    name: "vendor",
                    maxInitialRequests: 5,
                },
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin( 'dist' ),
        new ParallelUglifyPlugin({
            sourceMap: false,
            cacheDir: path.resolve(__dirname, 'node_modules', '.cache', 'webpack-parallel-uglify-plugin'),
            uglifyES: {
                compress: {
                    drop_console: true,
                    drop_debugger: true
                }
            }
        }),
    ],
};

module.exports = (  ) => {
    if( dev ) return merge( con_config, dev_config );
    else return merge( con_config, pro_config );
};