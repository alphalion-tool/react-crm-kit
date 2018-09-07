/* eslint-disable */

const path = require('path');

const jasmineReporters = require('jasmine-reporters');
const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
const DisplayProcessor = require('jasmine-spec-reporter').DisplayProcessor;
const HTMLReport = require('protractor-html-reporter');

const indexPath = path.join(__dirname, '../');
const reportPath = path.join(indexPath, './_reports/');

function TimeProcessor(configuration) {}

TimeProcessor.prototype = new DisplayProcessor();

TimeProcessor.prototype.displaySuite = function (suite, log) {
    return log;
};

TimeProcessor.prototype.displaySuccessfulSpec = function (spec, log) {
    // console.log(spec);
  return spec.id.replace('spec', '') + ' - ' + log + ' - ' + spec.duration;
};

TimeProcessor.prototype.displayFailedSpec = function (spec, log) {
  return spec.id.replace('spec', '') + ' - ' + log + ' - ' + spec.duration;
};

TimeProcessor.prototype.displayPendingSpec = function (spec, log) {
  return spec.id.replace('spec', '') + ' - ' + log + ' - ' + spec.duration;
};

const doneReporter = {
    jasmineDone: function() {
        const testConfig = {
             reportTitle: 'Test Execution Report',
             outputPath: path.join(reportPath, './test/html'),
             screenshotPath: path.join(reportPath, './test/screenshots'),
             testBrowser: 'JSDOM',
             browserVersion: '1.x'
         };
        new HTMLReport().from(path.join(reportPath, './test/xml/xmlresults.xml'), testConfig);
    }
};

jasmine.getEnv().clearReporters();               // remove default reporter logs
jasmine.getEnv().addReporter(new SpecReporter({  // add jasmine-spec-reporter
    customProcessors: [TimeProcessor]
}));

const junitReporter = new jasmineReporters.JUnitXmlReporter({
    savePath: path.join(reportPath, './test/xml/'),
    consolidateAll: true,
    filePrefix: 'xmlresults'
});
jasmine.getEnv().addReporter(junitReporter);
jasmine.getEnv().addReporter(doneReporter);