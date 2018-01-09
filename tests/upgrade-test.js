import moduleForAcceptance from './helpers/module-for-acceptance';
import { module, test } from 'qunit';
import { moduleForComponent, setupRenderingTest, setupApplicationTest } from 'ember-qunit';
import require from 'require';
import hbs from 'htmlbars-inline-precompile';
import page from './pages/foo';
import ENV from 'ecpo-upgrade-test/config/environment';

moduleForComponent('foo-bar', 'Integration test', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it works', function(assert) {
  this.render(hbs`{{foo-bar}}`);
  assert.ok(page.hasSpan);

  page.hideSpan();
  assert.notOk(page.hasSpan);
});

moduleForAcceptance('Acceptance test');

test('it works', function(assert) {
  page.visit();

  andThen(function() {
    assert.ok(page.hasSpan);
  });

  page.hideSpan();

  andThen(function() {
    assert.notOk(page.hasSpan);
  });
});

if (ENV.emberTryScenario === 'qunit-old') {
  module('new test helpers');

  test('there are none', function(assert) {
    assert.notOk(setupRenderingTest);
    assert.notOk(setupApplicationTest);
    assert.notOk(require.has('@ember/test-helpers'));
  });
} else if (ENV.emberTryScenario === 'qunit-transitional') {
  const { click, render } = require('@ember/test-helpers');

  module('new test helpers', function() {
    test('no dom helpers or setupApplicationTest', function(assert) {
      assert.ok(setupRenderingTest);
      assert.notOk(setupApplicationTest);
      assert.notOk(click);
    });
  });

  module('RFC232 rendering test using integration execution context', function(hooks) {
    setupRenderingTest(hooks);

    hooks.beforeEach(function() {
      page.setContext(this);
    });
    hooks.afterEach(function() {
      page.removeContext();
    });

    test('it works', async function(assert) {
      await render(hbs`{{foo-bar}}`);
      assert.ok(page.hasSpan);

      await page.hideSpan();
      assert.notOk(page.hasSpan);
    });
  });

  module('RFC232 rendering test using RFC268 execution context', function(hooks) {
    setupRenderingTest(hooks);

    test('it throws', async function(assert) {
      await render(hbs`{{foo-bar}}`);
      assert.throws(() => page.hideSpan(), /ember-qunit/);
    });
  });
} else if (ENV.emberTryScenario === 'qunit-default') {
  const { click, render } = require('@ember/test-helpers');

  module('new test helpers', function() {
    test('are all present', function(assert) {
      assert.ok(setupRenderingTest);
      assert.ok(setupApplicationTest);
      assert.ok(click);
    });
  });

  module('RFC232 rendering test using integration execution context', function(hooks) {
    setupRenderingTest(hooks);

    hooks.beforeEach(function() {
      page.setContext(this);
    });
    hooks.afterEach(function() {
      page.removeContext();
    });

    test('it works', async function(assert) {
      await render(hbs`{{foo-bar}}`);
      assert.ok(page.hasSpan);

      await page.hideSpan();
      assert.notOk(page.hasSpan);
    });
  });

  module('RFC232 rendering test using RFC268 execution context', function(hooks) {
    setupRenderingTest(hooks);

    test('it works', async function(assert) {
      await render(hbs`{{foo-bar}}`);
      assert.ok(page.hasSpan);

      await page.hideSpan();
      assert.notOk(page.hasSpan);
    });
  });

  module('RFC268 application test using RFC268 execution context', function(hooks) {
    setupApplicationTest(hooks);

    test('it works', async function(assert) {
      await page.visit();
      assert.ok(page.hasSpan);

      await page.hideSpan();
      assert.notOk(page.hasSpan);
    });
  });
}
