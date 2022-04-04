const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const BundleAnalyzerPlugin  = require('webpack-bundle-analyzer').BundleAnalyzerPlugin



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

const babelOptions = preset => {
   const options = {
        presets: [
            '@babel/preset-env'
        ],
        plugins: [
            '@babel/plugin-proposal-class-properties'
        ]
      }
    
    if(preset){
        options.presets.push(preset)
    }  
    return options
}

const jsLoaders = () => {
    const loaders = [{
        loader: 'babel-loader',
        options: babelOptions()
    }]

    // if(isDev){
    //     loaders.push('eslint-loader')
    // }

    return loaders
}

const plugins = () => {
    const base = [
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
        }),
    ]
    if(isProd){
        base.push(new BundleAnalyzerPlugin())
    }

    return base
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

console.log('IS DEV', isDev)

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main:['@babel/polyfill', './index.jsx'],
        analytics: './analytics.ts'
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
   // devtool: isDev ? 'source-map' : '',
    plugins: plugins(),
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
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: jsLoaders(),
              },
              {
                test: /\.m?ts$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: babelOptions('@babel/preset-typescript')
                }
              },
              {
                test: /\.m?jsx$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: babelOptions('@babel/preset-react')
                }
              }

        ]
    }
}