const {  watch, dest, series, parallel } = require("gulp");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");
const { spawn } = require("child_process");
const del = require("del")

function delDist() {
    return del(['dist/**/*'])
}

function init() {
    return reload()
}

function run() {
    return spawn('hotnode', ['dist/app.js'], {
        stdio: "inherit",
        shell: true
    })
}

function watchSrc() {
    watch('src/**/*.ts', reload);
}

function reload() {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(dest("dist", {
            overwrite: true
        }));
}

exports.default = series(delDist, init, parallel(watchSrc, run) )
