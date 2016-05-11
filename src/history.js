import $ from 'jquery';
import { browserHistory } from 'react-router'


function navigateTo(location, params = {}) {
  let { pathname, query } = location,
      queryStr = $.param(Object.assign({}, query, params));

  browserHistory.push(`${pathname}?${queryStr}`);
}


function getQueryParam(location, param, defaultValue, func) {
  if (location.query[param]) {
    if (func) {
      return func(location.query[param]);
    }
    return location.query[param];
  }
  return defaultValue;
}


export default {
  getQueryParam,
  navigateTo
}
