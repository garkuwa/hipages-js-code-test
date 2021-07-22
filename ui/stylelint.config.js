/**
 * Parsing styles in JSX requires a different config compared to parsing usual css
 */
const isTsxConfigRequired = !!process.argv.find(arg => arg.indexOf('tsx') >= 0);

const rules = {
    'font-family-no-missing-generic-family-keyword': null,
    'property-no-vendor-prefix': null,
};
const processors = isTsxConfigRequired ? ['stylelint-processor-styled-components'] : [];
const extendsConfig = ['stylelint-config-recommended'];

if (isTsxConfigRequired) {
    extendsConfig.push('stylelint-config-styled-components');
}

module.exports = {
    processors,
    extends: extendsConfig,
    rules,
};
