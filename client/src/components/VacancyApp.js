import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getVacs, deleteVac } from '../actions/vacActions';
import PropTypes from 'prop-types';

class VacancyApp extends Component {

  static propTypes = {
    getVacs: PropTypes.func.isRequired,
    vac: PropTypes.shape({ 
        id: PropTypes.number,
        title: PropTypes.string,
        city: PropTypes.string,
        sal: PropTypes.string,
        desc: PropTypes.string }),
        isAuthenticated: PropTypes.bool
}
    componentDidMount() {
        this.props.getVacs();
      }  
    
      onDeleteClick = (id) => {
        this.props.deleteVac(id)
      }

    render(){
        const { vacs } = this.props.vac;
        return(
            <Container>
                
            
            <ListGroup>
          <TransitionGroup className='vac-app'>
            {vacs.map(({ _id, title, city,sal, desc }) => (
              <CSSTransition key={_id} timeout={500} classNames='fade'>
                <ListGroupItem className="lis" >
                  <ListGroupItemHeading >{title} <br/> {city+","} {"Salary:"}{sal}  </ListGroupItemHeading>   
                  <ListGroupItemText className="list-text">  {desc} </ListGroupItemText>
                  {this.props.isAuthenticated ? (
                    <Button
                      className='remove-btn'
                      outline
                      color='danger'
                      size='sm'
                      onClick={this.onDeleteClick.bind(this, _id)}
                    >
                      &times;
                    </Button>
                  ) : null}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
            </Container>
        );
    }
}


const mapStateToProps = state => ({
    vac: state.vac,
    isAuthenticated: state.auth.isAuthenticated
  });

export default connect(
    mapStateToProps,
    { getVacs , deleteVac }
  )(VacancyApp);