/* eslint-env node */
'use strict';

module.exports = {
  scenarios: [
    {
      name: 'qunit-default',
      npm: {
        devDependencies: {}
      }
    },
    {
      name: 'qunit-transitional',
      npm: {
        devDependencies: {
          'ember-cli-qunit': '4.1.1',
          'ember-qunit': '3.1.0',
          '@ember/test-helpers': '0.7.1'
        }
      }
    },
    {
      name: 'qunit-old',
      npm: {
        devDependencies: {
          'ember-cli-qunit': '4.0.2',
          'ember-qunit': '2.2.0'
        }
      }
    }
  ]
};
