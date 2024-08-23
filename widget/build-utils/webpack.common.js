const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const publicPath = '/';
module.exports = {
    // Entry point, from where all extraction should be made
    entry: './src/widget/index.js',
    // Init webpack rules to collect js, jsx, css files
    module: {
        rules: [
            {
                // Extract and Transpile ES6+ in to ES5 
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                use: ['@svgr/webpack'],
            },
            {
                test: /\.(scss|css)$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                type: 'asset/inline'
            }
        ]
    },
    // https://webpack.js.org/configuration/output/
    output: {
        path: path.resolve(__dirname, '../../public/widget'),
        filename: 'widget.js',
        chunkFilename: 'widget.chunk.js',
        // Output library name
        library: 'EdatosGraphs',
        libraryTarget: 'umd',
        publicPath: publicPath,
        libraryExport: 'default',
    },
    // https://webpack.js.org/configuration/dev-server/
    devServer: {
        static: {
           directory: path.join(__dirname, '../dist')
        },
        hot: true,
        compress: true,
    },
    // https://webpack.js.org/configuration/optimization/
    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true,
                extractComments: false,
                terserOptions: {
                    output: {
                        comments: false,

                    }
                }
            }),
        ]
    }
}
