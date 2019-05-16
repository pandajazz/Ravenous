import React from 'react';
import BusinessList from './components/BusinessList/BusinessList';
import SearchBar from './components/SearchBar/SearchBar';
import Yelp from './util/Yelp';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: [],

    }
  }

  searchYelp = (term, location, sortBy) => {
    Yelp.search(term, location, sortBy)
    .then(businesses => {this.setState({businesses: businesses});
    });
    
  }

  render() {
    return (
      <div className="App">
        <h1>Ravenous</h1>
          <SearchBar searchYelp={this.searchYelp}/>
          <BusinessList businesses={this.state.businesses}/> 
      </div>
    );
  }
}


export default App;
