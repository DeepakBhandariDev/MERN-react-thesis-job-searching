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
import PropTypes from 'prop-types';



class VacModal extends Component{
  
  state = {
    modal: false,
    title: "",
    city: "",
    desc: "",
    sal: "",
    uid: ""
  };
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    auth: PropTypes.object.isRequired
  };
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };
  
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  
  }
  Capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
    }
  
  static propTypes = {
      auth: PropTypes.object.isRequired
    };

  onSubmit = e => {
    e.preventDefault();
    const { user } = this.props.auth;
    const nameid = user.name;
    if(this.state.title && this.state.city && this.state.desc){
    const newVac = {
      title: this.Capitalize(this.state.title),
      city: this.Capitalize(this.state.city),
      desc: this.Capitalize(this.state.desc),
      sal: this.state.sal,
      uid: nameid
    };
    
    // Add item via addItem action
    this.props.addVac(newVac);

    this.toggle();
    
  }
  }
  render() {
    
    return(
      <div>
        
        {this.props.isAuthenticated ? (
        <Button
        color='dark'
        outline
        style={{ marginBottom: '2rem' }}
        onClick={this.toggle}>

        Add Vacancy</Button>
        ) : (
          <h4 className='mb-3 ml-4'>Job searching made easy!</h4>
        )}


        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add Vacancy</ModalHeader>
          <ModalBody className="lis">
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='vac' key="id">Fill all the fields</Label>
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
                  name= 'sal'
                  
                  placeholder='Approximate Salary'
                  onChange={this.onChange}
                />
                <Input
                  type='text'
                  name= 'desc'
                 
                  placeholder='Add more info like business name and supposed working hours'
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
  vac: state.vac,
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth
});

export default connect(mapStateToProps,
  { addVac }
)(VacModal);
