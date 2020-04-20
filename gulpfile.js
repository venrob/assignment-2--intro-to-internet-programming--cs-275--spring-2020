const { src, dest, series, watch } = require(`gulp`);
const del = require(`del`);
const htmlCompressor = require(`gulp-htmlmin`);
const htmlValidator = require(`gulp-html`);
const jsCompressor = require(`gulp-uglify`);
const cssCompressor = require(`gulp-uglifycss`);
const babel = require(`gulp-babel`);
const jsLinter = require(`gulp-eslint`);
const browserSync = require(`browser-sync`);
const cssValidator = require(`gulp-stylelint`);
const reload = browserSync.reload;
let browserChoice = `chrome`;

let validateHTML = () => {
    return src(`html/*.html`)
        .pipe(htmlValidator());
};

let validateJS = () => {
    return src(`js/*.js`)
        .pipe(jsLinter(`.eslintrc.json`))
        .pipe(jsLinter.formatEach(`compact`, process.stderr));
};

let validateCSS = () => {
    return src(`css/*.css`)
        .pipe(cssValidator({
            failAfterError: true,
            reporters: [
                {formatter: `verbose`, console: true}
            ]
        }));
};

let compressHTML = () => {
    return src(`html/*.html`)
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod/`));
};

let compressCSS = () => {
    return src(`css/*.css`)
        .pipe(cssCompressor({
            'uglyComments': true
        }))
        .pipe(dest(`prod/css`));
};

async function transpileJSForDev() {
    return src(`js/*.js`)
        .pipe(babel())
        .pipe(dest(`temp/scripts`));
}

let transpileJSForProd = () => {
    return src(`js/*.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`prod/scripts`));
};

let serve = () => {
    browserSync({
        notify: true,
        port: 9000,
        reloadDelay: 50,
        browser: browserChoice,
        server: {
            baseDir: [
                `temp`,
                `./`,
                `html`
            ]
        }
    });

    watch(`js/*.js`,
        series(validateJS, transpileJSForDev)
    ).on(`change`, reload);

    watch(`css/*.css`,
        series(validateCSS)
    ).on(`change`, reload);

    watch(`html/*.html`,
        series(validateHTML)
    ).on(`change`, reload);
};

async function clean() {
    let fs = require(`fs`),
        i,
        foldersToDelete = [`./temp`, `prod`];

    for (i = 0; i < foldersToDelete.length; ++i) {
        try {
            fs.accessSync(foldersToDelete[i], fs.F_OK);
            process.stdout.write(`\n\tThe ` + foldersToDelete[i] +
                ` directory was found and will be deleted.\n`);
            del(foldersToDelete[i]);
        } catch (e) {
            process.stdout.write(`\n\tThe ` + foldersToDelete[i] +
                ` directory does NOT exist or is NOT accessible.\n`);
        }
    }

    process.stdout.write(`\n`);
}

exports.build = series(compressHTML, compressCSS, transpileJSForProd);
exports.dev = series(validateHTML, validateJS, validateCSS, transpileJSForDev);
exports.serve = serve;
exports.validate = series(validateHTML, validateJS, validateCSS);
exports.clean = clean;
