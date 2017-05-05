'use strict';

import React from 'react'; //eslint-disable-line no-unused-vars

const merge = (a, b) => Object.assign({}, a, b);

export const OK = ({ style }) => 
	<span style={merge(style, {color: 'green'})} className="glyphicon glyphicon-ok"/>
;

export const NotOK = ({ style }) => 
	<span style={merge(style, {color: 'red'})} className="glyphicon glyphicon-remove"/>
;
