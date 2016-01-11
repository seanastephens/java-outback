'use strict';

import React from 'react';

import shuffle from 'shuffle';
import { OK, NotOK } from 'decoration';

// text align style is manually added to the style element
// because of bootstrap class precedence issues. 
const DefaultAnswer = (props) => (
	<button className='btn btn-default col-md-4' 
		style={{textAlign: 'left', backgroundColor: props.backgroundColor}} 
		onClick={ props.onClick }>{ props.children }</button>
);

const CorrectAnswer = (props) => (
	<DefaultAnswer onClick={props.onClick} backgroundColor="#BBffBB">
		{ props.children } <OK style={{float: 'right'}}/>
	</DefaultAnswer>
);

const IncorrectAnswer = (props) => (
	<DefaultAnswer onClick={props.onClick} backgroundColor="#ffBBBB">
		{ props.children } <NotOK style={{float: 'right'}}/>
	</DefaultAnswer>
);

const Prompt = (props) => (<h4>{ props.children }</h4>);

const Answer = (props) => {
	const answer = props.answer;
	const onClick = !props.colored ? (answer.correct ? props.onCorrect : props.onIncorrect) : null;
	const Element = props.colored ? (answer.correct ? CorrectAnswer : IncorrectAnswer) : DefaultAnswer;
	return (
		<div className='col-md-12'>
			<Element onClick={onClick}> { answer.answer } </Element>
		</div>
	);
};

const Spacer = (props) => (<div className="col-md-12" style={props}/>);

const NextButton = (props) => (
	<div className="col-md-12">
		<button className='btn btn-default col-md-2' {...props}>Next</button>
	</div>
);

const Result = (props) => (
	<div className="col-md-12">
		<h4 style={{color: props.incorrect ? 'red' : 'black'}}>
			{ props.children }
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
						answers.map((answer, key) => {
							return <Answer {...{key, answer, colored, onCorrect, onIncorrect}}/>
						})
					}
				</div>
				<Spacer height='40px'/>
				<NextButton onClick={nextCallback} disabled={!answered}/>
				<Result incorrect={answered === 'incorrect'}>
					{ answered && (answered === 'correct' ? 'Correct' : explanation) }
				</Result>
			</div>
		);
	}
});
