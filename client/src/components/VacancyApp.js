import React, { Component, Fragment } from "react";
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  ListGroupItemHeading,
  ListGroupItemText
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getVacs, deleteVac } from "../actions/vacActions";
import PropTypes from "prop-types";
import { Form, FormGroup, Label, Input } from "reactstrap";
import jobs from "./jobs.jpg";

class VacancyApp extends Component {
  state = {
    serTitl: "",
    serCit: "",
    submitted: false
  };

  static propTypes = {
    getVacs: PropTypes.func.isRequired,
    vac: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      city: PropTypes.string,
      sal: PropTypes.string,
      desc: PropTypes.string,
      uid: PropTypes.string
    }),
    isAuthenticated: PropTypes.bool,
    auth: PropTypes.object.isRequired
  };
  componentDidMount() {
    this.props.getVacs();
    
  }

  

  onDeleteClick = id => {
    this.props.deleteVac(id);
  };

  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  oncser = e => {
    this.setState({ [e.target.name]: this.Capitalize(e.target.value) });
  };

  sermit = e => {
    e.preventDefault();
    this.setState({ isSubmitted: true });
    console.log(this.state.isSubmitted);
    
  };

  

  render() {
    let renderSe = "";
    const { user } = this.props.auth;
    const { vacs } = this.props.vac;
    

    renderSe = (
      
      <Container>
      <Fragment>
        <ListGroup>
        <TransitionGroup className="vac-app">
            {vacs.map(({ _id, title, city, sal, desc, uid }) => {
            return city === this.state.serCit && title===this.state.serTitl ? (
                <CSSTransition key={_id} timeout={500} classNames="fade">
                  <ListGroupItem className="lis">
                    <ListGroupItemHeading>
                      {title} <br /> {city + ","} {"Salary:"}
                      {sal}{" "}
                    </ListGroupItemHeading>
                    <ListGroupItemText className="list-text">
                      {" "}
                      {desc}{" "}
                    </ListGroupItemText>
                  </ListGroupItem>
                </CSSTransition>
               ) : null;
            })}
          </TransitionGroup>
        </ListGroup>
      </Fragment>
    </Container>
        
       );
    
    if (this.props.isAuthenticated ) {
      return (
        <Container>
        <Fragment>
          <ListGroup>
            <TransitionGroup className="vac-app">
              {vacs.map(({ _id, title, city, sal, desc, uid }) => {
                return uid === user.name ? (
                  <CSSTransition key={_id} timeout={500} classNames="fade">
                    <ListGroupItem className="lis">
                      <ListGroupItemHeading>
                        {title} <br /> {city + ","} {"Salary:"}
                        {sal}{" "}
                      </ListGroupItemHeading>
                      <ListGroupItemText className="list-text">
                        {" "}
                        {desc}{" "}
                      </ListGroupItemText>
                      {this.props.isAuthenticated ? (
                        <Button
                          className="remove-btn"
                          outline
                          color="danger"
                          size="sm"
                          onClick={this.onDeleteClick.bind(this, _id)}
                        >
                          &times;
                        </Button>
                      ) : null}
                    </ListGroupItem>
                  </CSSTransition>
                ) : null;
              })}
            </TransitionGroup>
          </ListGroup>
        </Fragment>
      </Container>
      );
    } else{
      return (
        <div>
        <Form onSubmit={this.sermit}>
          <FormGroup>
            <Label for="title">Job title</Label>
            <Input
              type="text"
              onChange={this.oncser}
              name="serTitl"
              className="inp"
              placeholder="Job title eg: bartender"
            />
          </FormGroup>
          <FormGroup>
            <Label for="city">City</Label>
            <Input
              type="text"
              onChange={this.oncser}
              name="serCit"
              className="inp"
              placeholder="Which city?"
            />
          </FormGroup>
          <Button>Search for the Job!</Button>
        </Form>
        <br />
        
        <img src={jobs} alt="Logo" />
        {this.state.isSubmitted && renderSe}
    
        
         
        
      </div>
        
      );
    }
  }
}

const mapStateToProps = state => ({
  vac: state.vac,
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getVacs, deleteVac }
)(VacancyApp);
