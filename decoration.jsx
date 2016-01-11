'use strict'

import React from 'react';

const merge = (a, b) => Object.assign({}, a, b);

export const OK = (props) => (
	<span style={merge(props.style, {color: 'green'})} className="glyphicon glyphicon-ok"/>
);

export const NotOK = (props) => (
	<span style={merge(props.style, {color: 'red'})} className="glyphicon glyphicon-remove"/>
);
