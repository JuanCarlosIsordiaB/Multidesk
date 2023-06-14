//Se escriben las tareas 
const { src, dest, watch , series, paralel} = require('gulp'); //extraes lo que instalas

//CSS y SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer'); 

//Imagenes
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');


//Sirve para copilar
function css(done){
    //compilar sass
    //pasos: 1. identificar archivo, 2. compilarla, 3. guardar el css.

    src('src/scss/app.scss') // Paso 1.
        .pipe( sass() ) // Paso 2. 
        // { outputStyle: 'expanded'}  compressed: todo junto expanded: hoja normal
        .pipe(postcss([ autoprefixer() ]) )
        .pipe(dest('build/css') ) //Paso 3.
    done();
}


function imagenes(){
    return src('src/img/**/*')
        .pipe( imagemin({optimizationLevel: 3 }))
        .pipe( dest('build/img'))
}

function versionWebp(){
    return src('src/img/**/*.{png,jpg}')
        .pipe( webp())
        .pipe( dest('build/img'))
}


function dev(done){
    watch('src/scss/**/*.scss', css);
    //Busca todos los archivos que terminen con scss 
    // y va buscando cambios
    watch('src/img/**/*', imagenes);
    //Si se agregan mas imagenes
    done();
}

exports.css=css;
exports.dev=dev;
exports.imagenes=imagenes;
exports.versionWebp=versionWebp;
exports.default=series( imagenes, versionWebp,css, dev); //manda a llamar una funcion y despues llama la otra funcion