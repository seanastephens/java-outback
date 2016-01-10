'use strict';

import React from 'react';

export default React.createClass( {
	getInitialState() {
		return { explanation: false, congratulations: false };
	},
	render() {
		const revealIncorrect = () => {
			this.setState(Object.assign(this.state, { explanation: true }));
		};
		const revealCorrect = () => {
			this.setState(Object.assign(this.state, { congratulations: true }));
		};

		const parentOnCorrect = this.props.onCorrect;	
		const parentOnIncorrect = this.props.onIncorrect;	

		const nextQuestionCorrect = () => {
			this.setState(this.getInitialState());
			parentOnCorrect();
		};
		const nextQuestionIncorrect = () => {
			this.setState(this.getInitialState());
			parentOnIncorrect();
		};

		const question = this.props.question;

		const answers = question.bogus
			.map(content => ({ correct: false, content, callback: revealIncorrect }))
			.concat([ { correct: true, content: question.answer, callback: revealCorrect } ]);

		const styleForButton = {
			true: { backgroundColor: '#6f6' },
			false: { backgroundColor: '#f66' }
		};
		const answered = this.state.explanation || this.state.congratulations;
		const explanation = this.state.explanation;

		return (<div>
				<h4>{ question.line }</h4>
				{ 
					answers.map((answer, i) => {
						const buttonColor = styleForButton[answer.correct];
						return (
							<div key={i}>
								<button 
								className={'btn ' + (answered ? '' : 'btn-default' )}
								style={answered ? buttonColor : null}
								onClick={ answer.callback }>{ answer.content }</button>
							</div>
						);
					})
				}
				<div>
					<h4 style={{color: (explanation ? 'red' : 'black')}} >{ 
						(() => {
							if(this.state.explanation)
								return question.explanation;
							if(this.state.congratulations)
								return "Correct";
							return null
						})()
					}</h4>

					<button 
					className='btn btn-default'
					onClick={ 
						this.state.explanation ? nextQuestionIncorrect : nextQuestionCorrect 
					}
					type="button"
					disabled={!answered}>Next</button>
				</div>
			</div>);
	}
});
