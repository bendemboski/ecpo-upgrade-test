# ecpo-upgrade-test

This is a project meant to test different scenarios using `ember-cli-page-object`
to help make sure upgrading to a version that supports `RFC232` and `RFC268`
goes smoothly.

There are application three scenarios we care about:

* **old**: before any `RFC232`/`RFC268` was implemented
* **transitional**: a brief window when `RFC232` was implemented`, but `@ember/test-helpers` didn't yet export any DOM helpers
* **new**: now, when `RFC232`/`RFC268` are both fully implemented

This project uses `ember-try` to run each of those scenarios, and
`tests/upgrade-test.js` makes sure that each scenario is set up with the correct
`ember-qunit` and `@ember/test-helpers`, and then verifies that all the right
tests work in all the right ways.

NOTE: Due to how `yarn` does its hoisting, we have to use `npm` or we can't set
up the older scenarios correctly.

`package.json` contains a commit hash for `ember-cli-page-object`, which is the
latest commit in the pull request to introduce `RFC232`/`RFC268` support. After
ensuring that that hash points where you want it to, just run `npm test`.
