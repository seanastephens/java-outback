import React from 'react';
import ReactDOM from 'react-dom';

import Question from 'question';
import { load, save } from 'save';
import { initial, reset, loadQuestions, markCorrect, markWrong } from 'state';
import { OK } from 'decoration';
import shuffle from 'shuffle';
	
const FlashCards = React.createClass( {
	getInitialState: initial,

	storeJSONInState(json) {
		const done = load();
		const questions = shuffle(json.filter(q => !done[q.id]));
		this.setState({ questions });
	},

	componentDidMount: function() { loadQuestions(this.storeJSONInState); },

	render() {
		const question = this.state.questions[0];
		const questionsLeft = question !== undefined;

		const onCorrect = () => this.setState(markCorrect(this.state));
		const onIncorrect = () => this.setState(markWrong(this.state));

		const resetQuestions = function() { loadQuestions(this.storeJSONInState); };

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
	getInitialState: () => Object.assign({}, initial(), {search: ''}),
	componentDidMount() {
		this.setState({finished: load()});
		loadQuestions(questions => {
			questions.sort((a, b) => Number(a.id) < Number(b.id));
			this.setState({ questions });
		}, true);
	},
	render() {
		const questions = this.state.questions;
		const finished = this.state.finished

		const searchFields = question => question.answers
			.map(answer => answer.answer)
			.concat([question.question]);

		const query = this.state.search.toUpperCase();
		const filter = question => searchFields(question)
			.some(text => text.toUpperCase().includes(query));


		return (
			<div className='container'>
				<Search onchange={search => this.setState({search})} />
					{
						questions.filter(filter).map(question => (
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

const Search = (props) => (
	<div className='container well well-md'>
		<div className="input-group">
			<span className="input-group-addon">Search</span>
			<input type="text" 
				className="form-control" id="search-bar" 
				onChange={event => props.onchange(event.target.value)}/>
		</div>
	</div>
);

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
