'use strict'

import ajax from 'ajax';
import { load, save } from 'save';

export const initial = () => ({ questions: [] });

const DATA_URL = "http://seanastephens.github.io/javaranch-data/questions.json";
export const loadQuestions = callback => {
	ajax(DATA_URL, data => {
		const finishedQuestions = load();
		const questions2 = JSON.parse(data);
		console.log(questions2.length)
		const questions = questions2
			.filter(q => finishedQuestions[q.id] === undefined);			
		console.log(questions.length)

		callback({ questions: questions })
	});
};

export const remainingQuestions = ({ questions }) => questions.length;

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

export const thisQuestion = ({ questions }) => questions[0];
