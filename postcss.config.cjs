const cssnano = require("cssnano");
const postcssPresetEnv = require('postcss-preset-env');

const config = {
    plugins: [
        postcssPresetEnv(),

        cssnano({
            preset: "default",
        }),
    ],
};

module.exports = config;
