import React, { Component } from 'react';
import {
  Form, FormGroup,
  Label, Input, Button
} from 'reactstrap';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      supervisors: [
        {
          id: 0,
          label: 'Select ...'
        }
      ]
    }
  }

  async componentDidMount() {
    const response  = await this.getSupervisors();
    const result = await response.json();

    let supervisors = [
      {
        id: 0,
        label: 'Select ...'
      }
    ];

    result.forEach(item => {
      supervisors.push(item);
    });

    this.setState({supervisors});
  }

  getSupervisors() {
    return fetch('http://localhost:4000/api/supervisors');
  }

  handleSubmit() {
    
  }

  render() {
    const { supervisors } = this.state;

    return (
      <div className="App">
        <div className="notification-form">
          <h2 className="header">
            Notification Form
          </h2>
          <Form className="row px-1 py-4 body">
            <FormGroup className="col-6">
              <Label for="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
              />
            </FormGroup>
            <FormGroup className="col-6">
              <Label for="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
              />
            </FormGroup>
            <Label>
              How would you prefer to be notified?
            </Label>
            <FormGroup className="col-6">
              <Input type="checkbox" />
              {' '}
              <Label for="email">Email</Label>
              <Input
                id="email"
                name="email"
              />
            </FormGroup>
            <FormGroup className="col-6">
              <Input type="checkbox" />
              {' '}
              <Label for="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
              />
            </FormGroup>
            <FormGroup className="offset-3 col-6">
              <Label for="supervisor">Supervisor</Label>
              <Input
                id="supervisor"
                name="select"
                type="select"
              >
                {
                  supervisors.map((item, index) => (
                    <option key={index} value={item.id}>{item.label}</option>
                  ))
                }
              </Input>
            </FormGroup>
            <FormGroup className="text-center">
              <Button type="button" onClick={this.handleSubmit.bind(this)}>SUBMIT</Button>
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
}

export default App;
