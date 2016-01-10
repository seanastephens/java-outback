'use strict';

import React from 'react';

import shuffle from 'shuffle';

const NOT_ANSWERED = { state: 'not-answered' };
const CORRECT_ANSWER = { state: 'correct' };
const INCORRECT_ANSWER = { state: 'incorrect' };

export default React.createClass( {
	getInitialState() {
		return NOT_ANSWERED;
	},
	render() {
		const revealIncorrect = () => this.setState(INCORRECT_ANSWER);
		const revealCorrect = () => this.setState(CORRECT_ANSWER);

		const nextQuestionCorrect = () => {
			this.setState(NOT_ANSWERED);
			this.props.onCorrect();
		};
		const nextQuestionIncorrect = () => {
			this.setState(NOT_ANSWERED);
			this.props.onIncorrect();
		};

		const question = this.props.question;

		const answer = (content, correct) => ({ content, correct });

		const badAnswers = question.bogus.map(content => answer(content, false));
		const allAnswers = badAnswers.concat([answer(question.answer, true)]);
		const shuffledAnswers = shuffle(allAnswers);

		const styleForButton = {
			true: { backgroundColor: '#6f6' },
			false: { backgroundColor: '#f66' }
		};

		return (<div>
				<h4>{ question.line }</h4>
				{ 
					shuffledAnswers.map((answer, i) => {
						const buttonColor = styleForButton[answer.correct];
						const styleObj = (this.state.state === NOT_ANSWERED.state) 
							? null : buttonColor;
						const callback = answer.correct ? revealCorrect : revealIncorrect;
						return (
							<div key={i}>
								<button className='btn btn-default' style={ styleObj } 
									onClick={ callback }>
									{ answer.content }
								</button>
							</div>
						);
					})
				}
				{
					(() => {
						const text = {
							[NOT_ANSWERED.state]: '',
							[CORRECT_ANSWER.state]: 'Correct',
							[INCORRECT_ANSWER.state]: question.explanation,
						}[this.state.state];
						const color = (this.state.state === INCORRECT_ANSWER.state) ? 'red' : 'black';
						const callback = 
							(this.state === INCORRECT_ANSWER ? nextQuestionIncorrect : nextQuestionCorrect);
						return (
							<div>
								<h4 style={{color}}>{text}</h4>
								<button 
								className='btn btn-default'
								onClick={callback}
								type="button"
								disabled={this.state.state === NOT_ANSWERED.state}>
								Next
								</button>
							</div>
						);
					})()
				}
			</div>);
	}
});
