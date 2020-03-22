import React from 'react';
import { withTaskContext } from '@twilio/flex-ui';
import { BACKEND_URL } from './../../Constants/'

class Prediagnosis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {},
      lastTask: null
    };
  }

  componentDidUpdate() {
    this.conditionalFetch();
  }

  componentDidMount() {
    this.conditionalFetch();
  }

  conditionalFetch = () => {
    if(this.props.task && this.props.task != this.state.lastTask) {
      this.setState({lastTask: this.props.task});
      this.fetchData();
    }
  }

  fetchData = () => {
    fetch(BACKEND_URL + this.props.task.attributes.session)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            info: result
          });
        },
        (error) => {
          console.log('Error');
          console.log(error);
        }
      )
  }

  render() {
    const { task } = this.props;
    return <div style={{padding: 5 + 'px', columnCount: 3}}>
      <p><span style={{ fontWeight: 'bold' }}>Vordiagnose</span></p>
      {
        this.state.info.answers && this.state.info.answers.verbatimAnswers ? 
          Object.entries(this.state.info.answers.verbatimAnswers)
          .map( ([key, value]) => <p>{key} <span style={{ fontWeight: 'bold' }}>{value}</span></p>) : null
        
      }
      <p>Ansteckungsrisiko: <span style={{ fontWeight: 'bold' }}>{this.state.info.answers ? this.state.info.answers.diagnosis : null}</span></p>
      <p>Kontaktrisiko: <span style={{ fontWeight: 'bold' }}>{this.state.info.answers && this.state.info.answers.riskCategories ? this.state.info.answers.riskCategories.contact_diagnosis_severe ? 'hoch' : 'mittel' : 'niedrig'}</span></p>
    </div>
    
  }
}


export default withTaskContext(Prediagnosis);
