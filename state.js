'use strict'

import ajax from 'ajax';
import shuffle from 'shuffle';
import { load, save } from 'save';

export const initial = () => ({ questions: [] });

const DATA_URL = "http://seanastephens.github.io/javaranch-data/questions.v2.json";
export const loadQuestions = (callback, nofilter) => {
	ajax(DATA_URL, data => {
		const completed = load();
		const questions = shuffle(JSON.parse(data)
			.filter(q => nofilter || completed[q.id] === undefined));

		callback({ questions });
	});
};

export const reset = callback => {
	save({});
	loadQuestions(callback);
};

export const markCorrect = ({ questions }) => {
	console.log(Object.keys(load()));
	save(Object.assign(load(), { [questions[0].id]: true }));
	return { questions: questions.slice(1) };
};

export const markWrong = ({ questions }) => ({ 
	questions: questions.slice(1).concat([questions[0]])
});
