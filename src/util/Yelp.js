const clientId = '';
const secret = '';
let accessToken;

const Yelp = {
  
    getAccessToken: function() {
        if (accessToken) {
          return new Promise(resolve => resolve(accessToken));
        }
        //Make a request to the Yelp API token endpoint and pass clientId and secret to get the access token.
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=${clientId}&client_secret=${secret}`, 
           {  method: 'POST' })
          .then(response => response.json())
          .then(jsonResponse => {
            accessToken = jsonResponse.access_token;
           });
        },
    search: function(term, location, sortBy) {
        return Yelp.getAccessToken()
          .then(() => {
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, 
                     { headers: { Authorization: `Bearer ${accessToken}` }
        })
         .then(response => response.json())
         .then(jsonResponse => {
              if (jsonResponse.businesses) {
                  return jsonResponse.businesses.map(business => {
                      console.log(business);
                      return {
                        id: business.id,
                        imageSrc: business.image_url,
                        name: business.name,
                        address: business.location.address1,
                        city: business.location.city,
                        state: business.location.state,
                        zipCode: business.location.zip_code,
                        category: business.categories[0].title,
                        rating: business.rating,
                        reviewCount: business.review_count
                      }
                  });
              }
          });
       });
    
    }
},

  /**
   * Add functionality to provide users with the ability to view reviews.
   * @param {*} id 
   */
  getReviews(id) {
    return Yelp.getAccessToken()
      .then(() => {
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${id}/reviews`, { headers: { Authorization: `Bearer ${accessToken}`}})
      })
      .then(response => response.json())
      .then(jsonResponse => {
        return jsonResponse.reviews;
      });

  }
}

export default Yelp;

