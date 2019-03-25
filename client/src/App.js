import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavBar from './components/AppNavBar';
import VacancyApp from './components/VacancyApp';
import VacModal from './components/VacModal';
import './App.css';
import {Container} from 'reactstrap';

import store from './store';
import { Provider } from 'react-redux';
import { loadUser } from './actions/authActions';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
      <div className="App">
        <AppNavBar/>
        <Container>
        <VacModal />
        <VacancyApp />
        </Container>
        
      </div>
         </Provider>
    );
  }
}

export default App;
