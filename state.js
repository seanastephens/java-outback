'use strict'

import ajax from 'ajax';
import shuffle from 'shuffle';
import { load, save } from 'save';

export const initial = () => ({ questions: [] });

const DATA_URL = "http://seanastephens.github.io/javaranch-data/questions.json";
export const loadQuestions = callback => {
	ajax(DATA_URL, data => {
		const completed = load();
		const questions = JSON.parse(data).filter(q => completed[q.id] === undefined);
		const shuffledQuestions = shuffle(questions);
		callback({ questions: shuffledQuestions })
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
