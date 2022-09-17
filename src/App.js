import React, { Component } from 'react';
import {
  Form, FormGroup, FormFeedback,
  Label, Input, Button
} from 'reactstrap';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      firstName: '',
      lastName: '',
      email: '',
      emailNotified: false,
      phone: '',
      phoneNotified: false,
      supervisor: '',
      success: false,
      supervisors: [
        {
          id: '',
          label: 'Select ...'
        }
      ],
      errors: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        supervisor: '',
      }
    }
  }

  async componentDidMount() {
    const response  = await this.getSupervisors();
    const result = await response.json();

    let supervisors = [
      {
        id: '',
        label: 'Select ...'
      }
    ];

    result.forEach(item => {
      supervisors.push(item);
    });

    this.setState({ supervisors });
  }

  getSupervisors() {
    return fetch('http://localhost:4000/api/supervisors');
  }

  async handleSubmit() {
    await this.clearErrors();

    const valid = this.validForm();

    if (valid) {
      const response  = await this.submitAction();
      const result = await response.json();

      if (result.status === 200) {
        this.setState({ success: true });

        setTimeout(() => {
          this.setState({ success: false });
        }, 3000)
      } else if (result.status === 400) {
        this.setState({ errors: result.errors });
      }
    }
  }

  clearErrors() {
    this.setState({
      errors: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        supervisor: '',
      }
    });
  }

  validForm() {
    const {
      firstName,
      lastName,
      email,
      phone,
      supervisor,
      errors
    } = this.state;

    const letterRegex = /^[A-Za-z]+$/;
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    let valid = true;

    if (firstName === '') {
      errors.firstName = 'First Name is required!';
      valid = false;
    } else {
      if (!firstName.match(letterRegex)) {
        errors.firstName = 'First Name must only contain letters, no numbers.';
        valid = false;
      }
    }

    if (lastName === '') {
      errors.lastName = 'Last Name is required!';
      valid = false;
    } else {
      if (!lastName.match(letterRegex)) {
        errors.lastName = 'Last Name must only contain letters, no numbers.';
        valid = false;
      }
    }

    if (email !== '') {
      if (!email.match(emailRegex)) {
        errors.email = 'Email address is not valid.';
        valid = false;
      }
    }

    if (phone !== '') {
      if (!phone.match(phoneRegex)) {
        errors.phone = 'Phone number is not valid.';
        valid = false;
      }
    }

    if (supervisor === '') {
      errors.supervisor = 'Supervisor is required!';
      valid = false;
    }

    this.setState({ errors });

    return valid;
  }

  submitAction() {
    const {
      firstName,
      lastName,
      email, emailNotified,
      phone, phoneNotified,
      supervisor
    } = this.state;

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName,
        lastName,
        email, emailNotified,
        phone, phoneNotified,
        supervisor
      })
    };

    return fetch('http://localhost:4000/api/submit', requestOptions);
  }

  render() {
    const {
      firstName,
      lastName,
      email, emailNotified,
      phone, phoneNotified,
      supervisor,
      supervisors,
      errors,
      success
    } = this.state;

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
                value={firstName}
                invalid={errors.firstName !== ''}
                onChange={val => {
                  this.setState({ firstName: val.target.value });
                }}
              />
              {
                errors.firstName !== '' && (
                  <FormFeedback>{errors.firstName}</FormFeedback>
                )
              }
            </FormGroup>
            <FormGroup className="col-6">
              <Label for="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={lastName}
                invalid={errors.lastName !== ''}
                onChange={val => {
                  this.setState({ lastName: val.target.value });
                }}
              />
              {
                errors.lastName !== '' && (
                  <FormFeedback>{errors.lastName}</FormFeedback>
                )
              }
            </FormGroup>
            <Label>
              How would you prefer to be notified?
            </Label>
            <FormGroup className="col-6">
              <Input
                type="checkbox"
                defaultChecked={emailNotified}
                onChange={() => {
                  this.setState({ emailNotified: !emailNotified })
                }}
              />
              {' '}
              <Label for="email">Email</Label>
              <Input
                id="email"
                value={email}
                invalid={errors.email !== ''}
                onChange={val => {
                  this.setState({ email: val.target.value });
                }}
              />
              {
                errors.email !== '' && (
                  <FormFeedback>{errors.email}</FormFeedback>
                )
              }
            </FormGroup>
            <FormGroup className="col-6">
              <Input
                type="checkbox"
                defaultChecked={phoneNotified}
                onChange={() => {
                  this.setState({ phoneNotified: !phoneNotified })
                }}
              />
              {' '}
              <Label for="phone">Phone Number</Label>
              <Input
                id="phone"
                value={phone}
                invalid={errors.phone !== ''}
                onChange={val => {
                  this.setState({ phone: val.target.value });
                }}
              />
              {
                errors.phone !== '' && (
                  <FormFeedback>{errors.phone}</FormFeedback>
                )
              }
            </FormGroup>
            <FormGroup className="offset-3 col-6">
              <Label for="supervisor">Supervisor</Label>
              <Input
                id="supervisor"
                type="select"
                value={supervisor}
                invalid={errors.supervisor !== ''}
                onChange={e => {
                  this.setState({ supervisor: e.target.value });
                }}
              >
                {
                  supervisors.map((item, index) => (
                    <option
                      key={index}
                      value={item.id}
                    >
                      {item.label}
                    </option>
                  ))
                }
              </Input>
              {
                errors.supervisor !== '' && (
                  <FormFeedback>{errors.supervisor}</FormFeedback>
                )
              }
            </FormGroup>
            <FormGroup className="text-center">
              <Button type="button" onClick={this.handleSubmit.bind(this)}>SUBMIT</Button>
            </FormGroup>
          </Form>
          {
            success && (
              <h4 className="text-center text-success mb-4">
                Successfully Submitted!
              </h4>
            )
          }
        </div>
      </div>
    );
  }
}

export default App;
