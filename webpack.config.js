const path = require('path');
const ZipPlugin = require('zip-webpack-plugin');

module.exports = {
    // Specify the entry point for our app.
    entry: [
        path.join(__dirname, 'src/index.js')
    ],
    // Specify the output file containing our bundled code
    output: {
        path: __dirname + '/dist',
        filename: 'index.js',
        library: 'index',
        libraryTarget: 'umd'
    },
    target: "node",
    externals: [
        //provided by Lambda runtime
        "aws-sdk",
        "imagick"
    ],
    module: {
        /**
         * Tell webpack how to load 'json' files.
         * When webpack encounters a 'require()' statement
         * where a 'json' file is being imported, it will use
         * the json-loader.
         */
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                exclude: /node_modules/,
                loader: 'json-loader'
            }
        ]
    },
    plugins: [
        new ZipPlugin({
            filename: 'image-resizer-service.zip',
            include: ['index.js'],
        }),
    ]
};