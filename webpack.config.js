const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

//Делаем переменный в режиме разработки и в режиме продакш.
const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
    const config = {
        splitChunks: {
          chunks: 'all',
        },
    }
    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserWebpackPlugin(),
        ]
    }

    return config;
}

const cssLoaders = (extra) => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: isDev,
                reloadAll: true,
            },
        },
        'css-loader',
    ]

    if (extra) {
        loaders.push(extra)
    }

    return loaders;
}

module.exports = {
    // context: path.resolve(__dirname, 'gem-puzzle'),
    mode: 'development',
    entry: {
        main: './js/index.js'
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'build')
    },
    //Делаем так чтобы вебпак понимал файлы, которые импортятся без его типа(пример .js .json и дальше можем вкладывать что угодно)
    resolve: {
        extensions: ['.js', '.json'],
        // Алиас убирает вложенность ../../ надо чтобы все было в одной папки, перед путем ставим собачку @
        alias: {
            '@': path.resolve(__dirname, 'gem-puzzle')
        }
    },
    optimization: optimization(),
    devServer: {
        port: 3000,
        open: true,
        //Флаг что мы в разработки
        hot: isDev
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
    ],
    module: {
        rules: [
            //Loading CSS
            {
                test: /\.css$/,
                use: cssLoaders(),
            },
            //Loading SCSS
            {
                test: /\.s[ac]ss$/i,
                use: cssLoaders('sass-loader'),
            },
            // Loading Image
            {
                test: /\.jpe?g$|\.gif$|\.png|\.ico|\.svg$/,
                use: ['file-loader']
            },
            //Loading font
            {
                test: /\.(ttf|otf|eot|woff|woff2)$/,
                use: ['file-loader']
            }
        ],
    }
}










//Install

//npm init -- pcg.json
//npm install -g webpack webpack-cli = установка глобально вб сборщик и вб сбощик для продакшена
//npm i -D webpack webpack-cli = лакольно ставим.

//создаем файл в проекте webpack.config.js и делаем базовую конфигурацию.
// const path = require('path');
// module.exports = {
//     context: path.resolve(__dirname, 'gem-puzzle'),
//     mode: 'development',
//     entry: {
//         main: './js/script.js'
//     },
//     output: {
//         filename: '[name].[contenthash].js',
//         path: path.resolve(__dirname, 'build')
//     },
// }

//npm i -D html-webpack-plugin = отрисовка html, подключаем в вб.конфиге.
//Можно сделать функцию в Jse и протестировать что все подключилось. И в консоле пишем webpack и может создатся папка build.

//npm i -D clean-webpack-plugin = собирает в один файл и удаляет старые. Подключаем в вб.конфиге и добавить в плагин.

//Делаем скрипт на запуск в pcg.json, "start": "webpack --mode development", "build": "webpack --mode production",
//После запускаем npm run start и для проверки.

// Делаем modulе s rules v wb confige na Loading CSS: {test: /\.css$/, use: ['style-loader', 'css-loader'],},
//npm i -D style-loader css-loader = лоадер стилей. Cделаем проверку в html i styles(что-то заполним) и потом поключим стили в index.js import и путь.

//npm i -D file-loader = Подключение картинок. В module v rules делаем Loading image in wb.config.js.
//Делаем проверку добавим небольшие стили с width. Потом import images in index.js и сделаем вставку в hmtl через js.

//Установка шрифтов, качаем на гугл фонтс. Делаем файл в css fonts.css и подключаем import его в style.css и делаем font-family.
//Подключаем модуль. Loading fonts. nmp run start.

//npm install --save normalize.css = reset styles. Можно подключить в стилях @import '~normalize.css' или в index.js

//Делаем чтобы вебпак понимал расширения(.js, .json) и меняем относительные пути ../ на @.
//Надо чтобы все файлы были в одной папки. И можно сделать проверку с png.
// resolve: {
//     extensions: ['.js', '.json'],
//     alias: {
//         '@': path.resolve(__dirname, 'gem-puzzle')
//     },
// },

//npm i -S jquery == елси как-то робить не будет то установим, надо еще сделать будет импорт в js и функция optimization на config chunks

//npm i -D webpack-dev-server = Делает автоматическое обновление всех файлов.
//Потом идем вб конфиг и делаем devServer. Потом меняем в pcg.json скрипт на старт в dev, а старт на "start": "webpack-dev-server --mode development --open"
//Если не работает, то надо поменять версии в pcg.jsone на "webpack": "^4.44.1","webpack-cli": "^3.3.12" и сделать npm i.

//Делаем наш js файл приватным. Меняем "main": "index.js" в pcg.json na "private": true.

//npm install --save-dev mini-css-extract-plugin = делает чтобы стили хранились в отдельном файле, также он заменяет loader.
//Делаем переменную. В wb.config модуле в rules меняем styles.css на MiniCssExtractPlugin.loader. В plugin добавляем new Mini.. и там filename. Проверяем должен создатся main.css
//Теперь можно заменить в module rules на функцию cssLoaders() и делаем ее. Добавляем 2 перемынных и не забывает в devServer добавить hot: isDev
//И после этого npm i -D cross-env = Этот пакет определяет в какой системе находимся и система задает их в pcg.json
//В pcg.jsone в scrip добавим cross-env NODE-ENV=development, v build prodaction. И проверяем npm dev.

//npm install terser-webpack-plugin --save-dev = Оптимизирует и сжимет js script.
//npm i -D optimize-css-assets-webpack-plugin = Также для css.
//После reslove создаем optimization: optimization(), и деалем эту функцию
// const optimization = () => {
//     const config = {
//         splitChunks: {
//           chunks: 'all',
//         },
//     }
//     if (isProd) {
//         config.minimizer = [
//             new OptimizeCssAssetsWebpackPlugin(),
//             new TerserWebpackPlugin(),
//         ]
//     }
//     return config;
// }

//npm i -D node-sass sass-loader = node sass корневой функционал, loader для вебпака
//добавляем в моудуль scss и в функцию csslaoder('sass-loader') = if (extra) {loaders.push(extra)}
