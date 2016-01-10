import React from 'react';
import ReactDOM from 'react-dom';

import Question from 'question';
import { load, save } from 'save';
import { 
	initial, 
	reset,
	loadQuestions, 
	markCorrect, 
	markWrong, 
	totalNumberOfQuestions,
	remainingQuestions
} from 'state';
	
const App = React.createClass( {
	getInitialState: initial,
	componentDidMount() {
		loadQuestions(state => this.setState(state));
	},
	render() {
		const question = this.state.questions[0];
		const questionsLeft = question !== undefined;

		const onCorrect = () => this.setState( markCorrect( this.state ));
		const onIncorrect = () => this.setState( markWrong( this.state ));

		const resetQuestions = () => reset(state => this.setState(state));

		return (
			<div className='container'>
				<Header/>
				{
					questionsLeft ? 
					<Question {...{question, onCorrect, onIncorrect}}/> :
					<DoneMessage/>
				}
				<div className='footer'>
					<Info questions={this.state.questions}/>
					<ResetButton onClick={resetQuestions} />
				</div>
			</div>
		);
	}
} );

const Header = (props) => (
	<div className="page-header text-center">
		<h1>Java Outback</h1>
	</div>
);

const DoneMessage = props => (<h4>All done! Refresh the page to start over.</h4>);

const ResetButton = props => (
	<button className="btn btn-warning" onClick={ props.onClick }>
		Reset Questions
	</button>
);

const Info = props => (<h4>{ props.questions.length + " questions left" }</h4>);

ReactDOM.render(React.createElement(App), document.getElementById('main'));
