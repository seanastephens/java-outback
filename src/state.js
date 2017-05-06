'use strict';

import { load, save } from './save';

export const initial = () => ({ questions: [] });

const DATA_URL = 'http://seanastephens.github.io/javaranch-data/questions.v2.json';

let questions = null;
export const loadQuestions = () =>
  questions || (questions = fetch(DATA_URL).then(d => d.json()));

export const reset = () => save({});

export const markCorrect = ({ questions }) => {
  console.log(Object.keys(load()));
  save(Object.assign(load(), { [questions[0].id]: true }));
  return { questions: questions.slice(1) };
};

export const markWrong = ({ questions }) => ({
  questions: questions.slice(1).concat([questions[0]])
});
