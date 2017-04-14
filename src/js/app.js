import Promise from 'promise-polyfill';
if (!window.Promise) {
  window.Promise = Promise;
}

import './map';
import './nav';
import './rsvp';
