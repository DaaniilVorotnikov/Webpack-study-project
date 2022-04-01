const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev
const optimization = () => {
    const config =  {
        splitChunks:{
            chunks: 'all'
        }
    }

    if(isProd){
        config.minimizer = [
            new OptimizeCssAssetWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }

 return config
}

const cssLoader = (extra) => {

    const loaders = [
        {loader: MiniCssExtractPlugin.loader},
         'css-loader'
        ]

        if(extra){
            loaders.push(extra)
        }
    
    return loaders    
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

console.log('IS DEV', isDev)

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: './index.js',
        analytics: './analytics.js'
    },
    output:{
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.json', '.png'],
        alias: {
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@': path.resolve(__dirname, 'src')
        }
    },
    optimization: optimization(),
    devServer:{
        static: {
            directory: path.join(__dirname, 'src'),
          },
          compress: true,
          port: 9000,
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html',
            minify:{
                collapseWhitespace: isProd
            }
        }), 
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
            {
                from: path.resolve(__dirname, 'src/favicon.ico'),
                to: path.resolve(__dirname, 'dist')
            }
        ]}),
        new MiniCssExtractPlugin({
            filename: filename('css')
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoader()
            },
            {
                test: /\.less$/,
                use: cssLoader('less-loader')
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoader('sass-loader')
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                type: 'asset/resource'
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                type: 'asset/resource'
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.csv$/,
                loader:'csv-loader'
            },

        ]
    }
}