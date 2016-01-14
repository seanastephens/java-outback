'use strict';

import React from 'react';

import { OK, NotOK } from 'decoration';

// text align style is manually added to the style element
// because of bootstrap class precedence issues. 
const DefaultAnswer = ({ backgroundColor, onClick, children }) => 
	<button className='btn btn-default col-md-4' 
		style={{textAlign: 'left', backgroundColor}} 
		onClick={ onClick }>{ children }</button>
;

const CorrectAnswer = ({ onClick, children}) => 
	<DefaultAnswer onClick={onClick} backgroundColor="#BBffBB">
		{ children } <OK style={{float: 'right'}}/>
	</DefaultAnswer>
;

const IncorrectAnswer = ({ onClick, children }) => 
	<DefaultAnswer onClick={onClick} backgroundColor="#ffBBBB">
		{ children } <NotOK style={{float: 'right'}}/>
	</DefaultAnswer>
;

const Prompt = ({ children }) => <h4>{ children }</h4>;

const Answer = ({ answer, onCorrect, onIncorrect, colored }) => {
	const onClick = !colored ? (answer.correct ? onCorrect : onIncorrect) : null;
	const Element = colored ? (answer.correct ? CorrectAnswer : IncorrectAnswer) : DefaultAnswer;
	return (
		<div className='col-md-12'>
			<Element onClick={onClick}> { answer.answer } </Element>
		</div>
	);
};

const Spacer = ({ style }) => (<div className="col-md-12" style={style}/>);

const NextButton = ({ onClick, disabled }) => (
	<div className="col-md-12">
		<button className='btn btn-default col-md-2' 
			onClick={onClick} disabled={disabled}>
			Next
		</button>
	</div>
);

const Result = ({ incorrect, children }) => (
	<div className="col-md-12">
		<h4 style={{color: incorrect ? 'red' : 'black'}}>
			{ children }
		</h4>
	</div>
);

export default React.createClass({
	getInitialState: () => ({ answered: null }),
	render() {
		const incorrectCallback = this.props.onIncorrect;
		const correctCallback = this.props.onCorrect;
		const question = this.props.question;
		const colored = this.state.answered;
		const answered = this.state.answered;
		const explanation = question.explanation;
		const answers = question.answers;

		const onCorrect = () => this.setState({ answered: 'correct' });
		const onIncorrect = () => this.setState({ answered: 'incorrect' });
	
		const nextCallback = () => {
			this.state.answered === 'correct' ? correctCallback() : incorrectCallback();
			this.setState(this.getInitialState());
		};

		return (
			<div className='container'>
				<Prompt>{ question.question }</Prompt>
				<div>
					{
						answers.map((answer, key) => 
							<Answer {...{key, answer, colored, onCorrect, onIncorrect}}/>
						)
					}
				</div>
				<Spacer style={{height:'40px'}}/>
				<NextButton onClick={nextCallback} disabled={!answered}/>
				<Result incorrect={answered === 'incorrect'}>
					{ answered && (answered === 'correct' ? 'Correct' : explanation) }
				</Result>
			</div>
		);
	}
});
