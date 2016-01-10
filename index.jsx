import React from 'react';
import Header from 'header';
import Question from 'question';
import DoneMessage from 'done-message';
import { load, save } from 'save';
import { 
	initial, 
	reset,
	loadQuestions, 
	markCorrect, 
	markWrong, 
	thisQuestion,
	totalNumberOfQuestions,
	remainingQuestions
} from 'state';
	
const App = React.createClass( {
	getInitialState: initial,
	componentDidMount() {
		loadQuestions(state => this.setState(state));
	},
	render() {
		const question = thisQuestion(this.state);

		const onCorrect = () => this.setState( markCorrect( this.state ));
		const onIncorrect = () => this.setState( markWrong( this.state ));

		return (
			<div className='container'>
				<Header/>
				{
					question 
					? <Question { ...{question, onCorrect, onIncorrect} } />
					: <DoneMessage/>
				}
				<div style={{position: 'absolute', bottom: '5%'}}>
					<h4>{ remainingQuestions(this.state) + " questions left" }</h4>
					<button 
						onClick={ () => reset(state => this.setState(state)) }
						className="btn btn-warning">Reset Questions</button>
				</div>
			</div>
		);
	}

} );

React.render(React.createElement(App), document.body);
