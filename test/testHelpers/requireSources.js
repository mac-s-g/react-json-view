import register from "ignore-styles"
register([".sass", ".scss"])
import "./../../src/js/index"

import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import jsdom from 'jsdom';

//https://stackoverflow.com/questions/46896639/ensure-a-dom-environment-is-loaded-for-enzyme
function setUpDomEnvironment() {
  const { JSDOM } = jsdom;
  const dom = new JSDOM('<!doctype html><html><body></body></html>');
  const { window } = dom;

  global.window = window;
  global.document = window.document;
  global.navigator = {
    userAgent: 'node.js',
  };
  copyProps(window, global);
}

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(src, prop));
  Object.defineProperties(target, props);
}

setUpDomEnvironment();

configure({ adapter: new Adapter() })