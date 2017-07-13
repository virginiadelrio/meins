const path = require('path');
const webpack = require('webpack');
const less = require('gulp-less');
const gulp = require('gulp');
const clean = require('gulp-clean');
const autoprefixer = require('gulp-autoprefixer');
const rev = require('gulp-rev');
const cleanCss = require('gulp-clean-css');

const argv = require('yargs').argv;
const isProduction = argv.production != null;

const colors = require('./src/utils/colors');

gulp.task('clean', () => {
    return gulp.src(['./build/']).pipe(clean());
});

gulp.task('copy', () => {
    return gulp
        .src(['static/**/*', 'static/**/*', 'static/**/*', 'static/**/*'], {
            base: 'static'
        })
        .pipe(gulp.dest('./build'));
});

gulp.task('less', ['copy'], () => {
    const baseStream = gulp
        .src('./src/less/*.less')
        .pipe(
            less({
                paths: ['.', './node_modules'],
                globalVars: colors
            })
        )
        .pipe(
            autoprefixer({
                browsers: ['last 2 versions', '> 1%', 'Firefox ESR']
            })
        );

    const cleanStream = isProduction ? baseStream.pipe(cleanCss()) : baseStream;

    return cleanStream.pipe(gulp.dest('./build/css'));
});

function webpackTask() {
    return callback => {
        const plugins = [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
                }
            })
        ];
        if (isProduction) {
            plugins.push(new webpack.optimize.UglifyJsPlugin());
        }

        return webpack(
            {
                entry: {
                    meins: './src/clients/meins',
                    wahl17: './src/clients/wahl17',
                    'facebook-vergleich': './src/clients/facebook-vergleich.jsx'
                },
                devtool: isProduction ? 'sourcemap' : 'eval',
                module: {
                    rules: [
                        {
                            test: /.jsx?/,
                            include: [
                                path.resolve(__dirname, 'src'),
                                path.resolve(__dirname, '../video-player/src'),
                                path.resolve(
                                    __dirname,
                                    'node_modules/einsplayer/src'
                                )
                            ],
                            use: {
                                loader: 'babel-loader',
                                options: {
                                    babelrc: false,
                                    presets: isProduction
                                        ? [
                                              'es2015',
                                              'react',
                                              [
                                                  'env',
                                                  { targets: { uglify: true } }
                                              ]
                                          ]
                                        : ['es2015', 'react']
                                }
                            }
                        }
                    ]
                },
                output: {
                    // filename: 'main.[hash].js'
                    path: __dirname + '/build/js',
                    filename: '[name].js'
                },
                externals: {
                    jquery: 'jQuery',
                    'chart.js': 'Chart'
                },
                plugins,
                stats: {
                    colors: true,
                    timings: true,
                    modules: true,
                    children: true
                }
            },
            (err, stats) => {
                // eslint-disable-next-line
                console.log(
                    stats.toString({
                        chunks: false,
                        colors: true
                    })
                );
                callback(err, stats);
            }
        );
    };
}

gulp.task('webpack', ['copy'], webpackTask(false));

gulp.task('rev', ['less', 'webpack'], () => {
    return gulp
        .src(
            [
                'build/js/meins.js',
                'build/js/charts.js',
                'build/css/meins.css',
                'build/css/wahl17.css'
            ],
            {
                base: 'build'
            }
        )
        .pipe(rev())
        .pipe(gulp.dest('build'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('build'));
});

gulp.task('assets', ['rev']);
