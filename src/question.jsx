'use strict';

import React from 'react';

import { OK, NotOK } from './decoration';

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

const Answer = ({ children }) => <div className='col-md-12'>{ children }</div>;

const Spacer = ({ style }) => <div className="col-md-12" style={style}/>;

const NextButton = ({ onClick, disabled }) =>
  <div className="col-md-12">
    <button className='btn btn-default col-md-2'
      onClick={onClick} disabled={disabled}>
      Next
    </button>
  </div>;

const Result = ({ correct, children }) =>
  <div className="col-md-12">
    <h4 style={{color: correct ? 'black' : 'red'}}>
      { children }
    </h4>
  </div>;

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = { answered: null };
  }

  render() {
    const { question, onCorrect, onIncorrect } = this.props;
    const { explanation, answers } = question;
    const { answered } = this.state;
    const answeredCorrect = answered === 'correct';

    const nextCallback = () => {
      answeredCorrect ? onCorrect() : onIncorrect();
      this.setState(this.getInitialState());
    };

    return (
      <div className='container'>
        <Prompt>{ question.question }</Prompt>
        <div>
          {
            answers.map(({answer, correct} , key) => {
              const Element = answered ?
                (correct ? CorrectAnswer : IncorrectAnswer) :
                DefaultAnswer;

              const callback = () => {
                if(!answered)
                  this.setState({ answered: correct ? 'correct' : 'incorrect' });
              };

              return (
                <Answer key={key}>
                  <Element onClick={callback}>{ answer }</Element>
                </Answer>
              );
            })
          }
        </div>
        <Spacer style={{height:'40px'}}/>
        <NextButton onClick={nextCallback} disabled={!answered}/>
        <Result correct={answeredCorrect}>
          { answered ? (answeredCorrect ? 'Correct' : explanation) : null }
        </Result>
      </div>
    );
  }
};
