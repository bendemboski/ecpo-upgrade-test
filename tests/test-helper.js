import require from 'require';
import Application from '../app';
import resolver from './helpers/resolver';
import {
  setResolver
} from 'ember-qunit';

if (require.has('@ember/test-helpers')) {
  const { setApplication } = require('@ember/test-helpers');
  const { start } = require('ember-qunit');

  setApplication(Application.create({ autoboot: false }));
  start();
} else {
  const { start } = require('ember-cli-qunit');

  setResolver(resolver);
  start();
}
