import React, { Component } from 'react';
import './SearchBar.css';


class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = { //set the initial state of SearchBar
            term: '', // refers to the search term located in the search input
            location: '', // refers to the location to search near the location input
            sortBy: 'best_match' // represents the selected sorting option to use
        };

    this.sortByOptions = {
        'Best Match': 'best_match',
        'Highest Rated': 'rating',
        'Most Reviewed': 'review_count'  
    };
}    
    
    getSortByClass = sortByOption => { //returns the current CSS class for a sorting option: useful in providing visual feedback to users
        if (this.state.sortBy === sortByOption) {
            return 'active';
        } else {
            return '';
        }
    }

    handleSortByChange = sortByOption => { //sets the state of a sorting option
        this.setState({
            sortBy: sortByOption
        });

    }

    handleTermChange = e => {
        this.setState({
            term: e.target.value
        });
    }

    handleLocationChange = e => {
        this.setState({
            location: e.target.value
        })
    }

    handleSearch = e => {
        this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
        e.preventDefault();
    }

    renderSortByOptions = () => {
        return Object.keys(this.sortByOptions).map(sortByOption => {
            let sortByOptionValue = this.sortByOptions[sortByOption];
            return (
                <li 
                className={this.getSortByClass}
                key={sortByOptionValue}
                onClick={this.handleSortByChange}> 
                {sortByOption}
                </li>
            );
        });
    }


 render() { 
    return (
            <div className="SearchBar">
                <div className="SearchBar-sort-options">
                    <ul>
                        {this.renderSortByOptions()}
                    </ul>
                </div>
                <div className="SearchBar-fields">
                    <input  onChange={this.handleTermChange}
                            placeholder="Search Businesses" />
                    <input  onChange={this.handleLocationChange}
                            placeholder="Where?" />
                </div>
                <div className="SearchBar-submit">
                    <a onClick={this.handleSearch}>Let's Go</a>
                </div>
             </div>
        );
    }   
}

export default SearchBar;