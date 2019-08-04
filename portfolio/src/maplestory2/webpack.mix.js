let mix = require('laravel-mix');
mix.pug = require('laravel-mix-pug');

var LiveReloadPlugin = require('webpack-livereload-plugin');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

mix.webpackConfig({
    plugins: [
        new LiveReloadPlugin()
    ]
});

mix.scripts([
    'src/js/global/header.js',
    'src/js/global/mobilenav.js',
    'src/js/global/gnt-popup.js',
    'src/js/global/popup.js',
    'src/js/global/share.js',
    'src/js/pages/news/loadmore.js',
    'src/js/global/video.js',
    'src/js/global/checksize.js',
    'src/js/global/event.js',
    'src/js/global/google-analytics-tracking.js',
    //'src/js/pages/news/list.js',
    'src/js/pages/news/article.js,',
    'src/js/pages/home/carousel.js'],
    'build/js/all.js')



    .scripts([
        'src/js/pages/classes/carousel.js',
        'src/js/pages/classes/nav.js'
    ], 'build/js/classes/all.js')
    .scripts([
        'src/lib/jquery/dist/jquery.js',
        'src/lib/slick.js/slick/slick.js'
    ], 'build/js/vendors.js')

    .sass('src/sass/all.scss', 'build/css/all.css')
    .sass('src/sass/pages/classes/all.scss', 'build/css/classes/all.css')
    .sass('src/sass/pages/info-page-template/all.scss', 'build/css/info-page/all.css')
    .options({processCssUrls: false})

    .copyDirectory('src/img/', 'build/img/')
    .copyDirectory('src/fonts', 'build/fonts')

    .pug('src/pug/pages/*.pug', './build', {
        seeds: 'src/pug/data/',
        pug: {
            pretty: true
        }
    })

    .browserSync({
        proxy: false,
        server:{
            baseDir: "build"
        }
    });

// Full API
// mix.js(src, output);
// mix.react(src, output); <-- Identical to mix.js(), but registers React Babel compilation.
// mix.extract(vendorLibs);
// mix.sass(src, output);
// mix.standaloneSass('src', output); <-- Faster, but isolated from Webpack.
// mix.fastSass('src', output); <-- Alias for mix.standaloneSass().
// mix.less(src, output);
// mix.stylus(src, output);
// mix.postCss(src, output, [require('postcss-some-plugin')()]);
// mix.browserSync('my-site.dev');
// mix.combine(files, destination);
// mix.babel(files, destination); <-- Identical to mix.combine(), but also includes Babel compilation.
// mix.copy(from, to);
// mix.copyDirectory(fromDir, toDir);
// mix.minify(file);
// mix.sourceMaps(); // Enable sourcemaps
// mix.version(); // Enable versioning.
// mix.disableNotifications();
// mix.setPublicPath('path/to/public');
// mix.setResourceRoot('prefix/for/resource/locators');
// mix.autoload({}); <-- Will be passed to Webpack's ProvidePlugin.
// mix.webpackConfig({}); <-- Override webpack.config.js, without editing the file directly.
// mix.then(function () {}) <-- Will be triggered each time Webpack finishes building.
// mix.options({
//   extractVueStyles: false, // Extract .vue component styling to file, rather than inline.
//   processCssUrls: true, // Process/optimize relative stylesheet url()'s. Set to false, if you don't want them touched.
//   purifyCss: false, // Remove unused CSS selectors.
//   uglify: {}, // Uglify-specific options. https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
//   postCss: [] // Post-CSS options: https://github.com/postcss/postcss/blob/master/docs/plugins.md
// });
