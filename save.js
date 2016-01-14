'use strict';

const KEY = 'java-ranch-localstorage';

export const save = v => localStorage[KEY] = JSON.stringify(v) || '{}';
export const load = () => JSON.parse(localStorage[KEY] || '{}');
