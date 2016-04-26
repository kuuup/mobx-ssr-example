var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;    
    });


gulp.task('app', ['mobx']);

gulp.task('mobx', function(callback) {
    webpack({
        context: __dirname + '/src/client',
        entry: ["./index.js"],
        output: {
            path: __dirname + '/dist',
            filename: "./bundle.js"
        },
        devtool: 'source-map',
        node: {
            console: true,
            fs: 'empty',
            net: 'empty',
            tls: 'empty'
        },
        module: {
            loaders: [
                {
                    test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
                    loader: "url?limit=10000&mimetype=application/font-woff"
                }, 
                {
                    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                    loader: "url?limit=10000&mimetype=application/octet-stream"
                },
                {
                    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                    loader: "file"
                }, 
                {
                    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                    loader: "url?limit=10000&mimetype=image/svg+xml"
                }, 
                {
                    test: /\.js?$/,
                    exclude: /node_modules/,
                    loader: 'babel',
                    query: {
                        presets: ["es2015", "react", "stage-0"],
                        plugins: [
                            "transform-decorators-legacy",
                            "transform-es2015-modules-commonjs",
                            "transform-react-constant-elements"
                            
                        ]
                    }
                },
                {   test: /\.json$/, 
                    loader: 'json-loader' 
                },
                {
                    test: /\.css?$/,
                    loader: 'style-loader!css-loader'
                },
                {   test: /\.png/, 
                    loader: "file-loader" 
                    
                }
            ]
        }
    }, function(err, stats) {
        if (err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});