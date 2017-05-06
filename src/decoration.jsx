'use strict';

import { merge } from './util';

export const OK = ({ style }) =>
  <span style={merge(style, {color: 'green'})} className="glyphicon glyphicon-ok"/>
;

export const NotOK = ({ style }) =>
  <span style={merge(style, {color: 'red'})} className="glyphicon glyphicon-remove"/>
;
