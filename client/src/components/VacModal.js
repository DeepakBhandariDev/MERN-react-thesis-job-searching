import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addVac } from '../actions/vacActions';


class VacModal extends Component{
  state = {
    modal: false,
    title: "Job field is empty",
    city: "City info not given",
    desc: "No description provided"
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };
  
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  
  }

  onSubmit = e => {
    e.preventDefault();

    const newVac = {
      title: this.state.title,
      city: this.state.city,
      desc: this.state.desc
    };

    // Add item via addItem action
    this.props.addVac(newVac);

    this.toggle();
  }
  render() {
    return(
      <div>
        <Button
        color='dark'
        style={{ marginBottom: '2rem' }}
        onClick={this.toggle}>

        Add Vacancy</Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add Vacancy</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='vac' key="vac">Vacancy</Label>
                <Input
                  type='text'
                  name='title'
                  
                  placeholder='Job title'
                  onChange={this.onChange}
                />
                <Input
                  type='text'
                  name= 'city'
                  
                  placeholder='City'
                  onChange={this.onChange}
                />
                <Input
                  type='text'
                  name= 'desc'
                 
                  placeholder='Add more info like salary and business name'
                  onChange={this.onChange}
                />
                <Button color='dark' style={{ marginTop: '2rem' }} block>
                  Submit info
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  vac: state.vac
});

export default connect(mapStateToProps,
  { addVac }
)(VacModal);
