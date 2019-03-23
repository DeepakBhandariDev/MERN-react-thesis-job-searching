import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getVacs, deleteVac } from '../actions/vacActions';
import PropTypes from 'prop-types';

class VacancyApp extends Component {
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
          <TransitionGroup className='shopping-list'>
            {vacs.map(({ _id, title, city, desc }) => (
              <CSSTransition key={_id} timeout={500} classNames='fade'>
                <ListGroupItem>
                  <ListGroupItemHeading >{title} <br/> {city}  </ListGroupItemHeading>   
                  <ListGroupItemText className="list-text"> {desc}</ListGroupItemText>
                  <Button
                      className='remove-btn'
                      color='danger'
                      size='sm'
                      onClick={this.onDeleteClick.bind(this, _id)}>
                      &times;
                    </Button>   
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
            </Container>
        );
    }
}
VacancyApp.propTypes = {
    getVacs: PropTypes.func.isRequired,
    vac: PropTypes.shape({ 
        id: PropTypes.isRequired,
        title: PropTypes.isRequired,
        city: PropTypes.string,
        desc: PropTypes.string })
}

const mapStateToProps = state => ({
    vac: state.vac
  });

export default connect(
    mapStateToProps,
    { getVacs , deleteVac }
  )(VacancyApp);