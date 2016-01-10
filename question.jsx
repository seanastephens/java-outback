'use strict';

import React from 'react';

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
		const allAnswers = Array.prototype.concat.apply(badAnswers, answer(question.answer, true));

		const styleForButton = {
			true: { backgroundColor: '#6f6' },
			false: { backgroundColor: '#f66' }
		};

		return (<div>
				<h4>{ question.line }</h4>
				{ 
					allAnswers.map((answer, i) => {
						const buttonColor = styleForButton[answer.correct];
						return (
							<div key={i}>
								<button 
								className='btn btn-default'
								style={answered ? buttonColor : null}
								onClick={ answer.correct ? revealCorrect : revealIncorrect }>
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
						const color = (this.state !== NOT_ANSWERED) ? 'red' : 'black';
						const callback = 
							(this.state === INCORRECT_ANSWER ? nextQuestionIncorrect : nextQuestionCorrect);
						return (
							<div>
								<h4 style={{color}}>{text}</h4>
								<button 
								className='btn btn-default'
								onClick={callback}
								type="button"
								disabled={this.state === NOT_ANSWERED}>
								Next
								</button>
							</div>
						);
					})()
				}
			</div>);
	}
});
