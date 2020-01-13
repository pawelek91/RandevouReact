import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import '../styles/App.css';
import Header from './Header';
import Navigation from './Navigation';
import Page from './Page';

export class App extends React.Component{
  render(){
  return (
    <Router>
    <div className="app">
      <header>
        {<Header />}
      </header>
      <main>
        <aside>
          {<Navigation />}
        </aside>
        <section className="page">
          {<Page />}
        </section>
      </main>
    </div>
  </Router>
  );
}
}

export default App;
