import React from 'react';
import ReactDOM from 'react-dom';

import Question from 'question';
import { load, save } from 'save';
import { initial, reset, loadQuestions, markCorrect, markWrong } from 'state';
import { OK } from 'decoration';
	
const FlashCards = React.createClass( {
	getInitialState: initial,
	componentDidMount() {
		loadQuestions(state => this.setState(state));
	},
	render() {
		const question = this.state.questions[0];
		const questionsLeft = question !== undefined;

		const onCorrect = () => this.setState(markCorrect(this.state));
		const onIncorrect = () => this.setState(markWrong(this.state));

		const resetQuestions = () => reset(state => this.setState(state));

		return (
			<div className='container'>
				<div style={{minHeight: '400px' }}>
					{
						questionsLeft ? 
						<Question {...{question, onCorrect, onIncorrect}}/> :
						<DoneMessage/>
					}
				</div>
				<div>
					<Info questions={this.state.questions}/>
					<ResetButton onClick={resetQuestions} />
				</div>
			</div>
		);
	}
});

const QuestionList = React.createClass({
	getInitialState: initial,
	componentDidMount() {
		this.setState({finished: load()});
		loadQuestions(state => {
			state.questions.sort((a, b) => Number(a.id) < Number(b.id));
			this.setState(state)
		}, true);
	},
	render() {
		const questions = this.state.questions;
		const finished = this.state.finished

		return (
			<div className='container'>
					{
						questions.map(question => (
								<div key={question.id} className='container well well-lg'>
									<h4>
										{ finished[question.id] ? <OK/> : null }
										{ ' ' + question.question /* space for glyphicon */ }
									</h4>
									<UnorderedList data={question.answers.map(a => a.answer)}/>
								</div>
							)
						)
					}
			</div>
		);
	}
});

const UnorderedList = (props) => (
	<ul>
		{
			props.data.map((line, i) => (
				<li className="col-xs-12 text-left" key={i}>
					<h4>
						{ line }
					</h4>
				</li>
			))
		}
	</ul>
);
const App = React.createClass({
	getInitialState: () => ({ path: 'Flash Cards' }),
	render() {
		return (
			<div className='container'>
				<Header onChange={path => this.setState({path})} />
				{
					this.state.path === 'Flash Cards' ? <FlashCards/> : <QuestionList/>
				}
			</div>
		);
	}
});

const Header = (props) => (
	<nav className="navbar navbar-default">
		<div className="container-fluid">
			<div className="navbar-header">
				<span className="navbar-brand">Java Outback</span>
			</div>
			<ul className="nav navbar-nav">
				{
					['Flash Cards', 'Question List'].map(text => (
						<li key={text}><a onClick={() => props.onChange(text)}>{text}</a></li>
					))
				}
			</ul>
		</div>
	</nav>
);

const Link = (props) => (
	<span onClick={() => props.onClick(props.text)}>{props.text}</span>
);

const DoneMessage = props => (<h4>All done! Hit reset to start over.</h4>);

const ResetButton = props => (
	<button className="btn btn-warning" onClick={ props.onClick }>
		Reset Questions
	</button>
);

const Info = props => (<h4>{ props.questions.length + " questions left" }</h4>);

ReactDOM.render(React.createElement(App), document.getElementById('main'));
