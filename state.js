'use strict'

import ajax from 'ajax';
import shuffle from 'shuffle';
import { load, save } from 'save';

export const initial = () => ({ questions: [] });

//const DATA_URL = "http://seanastephens.github.io/javaranch-data/questions.json";
const DATA_URL = "questions.json";
export const loadQuestions = callback => {
	ajax(DATA_URL, data => {
		const completed = load();
		const questions = shuffle(JSON.parse(data)
			.filter(q => completed[q.id] === undefined)
			.map(({ id, bogus, answer, explanation, line }) => ({
				id,
				explanation,
				prompt: line,
				answers: shuffle(bogus.map(text => ({ content: text, correct: false}))
					.concat({content:answer, correct: true}))
			})));

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
