import React, { Component } from 'react';
import Business from '../Business/Business.js'
import './BusinessList.css';

class BusinessList extends Component {
    render() {
        return (
            <div className="BusinessList">
                {
                    this.props.businesses.map(business => {
                        return <Business key={business.id} business={business}/>
                    })
                }
            </div>
        )

    }
}

export default BusinessList;