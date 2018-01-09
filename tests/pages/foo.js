import {
  create,
  visitable,
  isVisible,
  clickable
} from 'ember-cli-page-object';

export default create({
  visit: visitable('/foo'),
  hasSpan: isVisible('.span'),

  hideSpan: clickable('.button')
});
