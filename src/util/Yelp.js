const clientId = 'foYKL-RKbEtxt2rVYFWjGg';
const secret = 'dNdOBTYmwJ2RgfLr1veCIXGYgFUz38LkMEQlgNv_HjDmF2KK3TAd9A__54dmWkKTWYEJ82CWpEuIqGwBLq7GlRaWqMw-bJKh8FxizQyv9LLK4gDmFJRzvdb7fVncXHYx';
let accessToken;

const Yelp = {
  
    getAccessToken: function() {
        if (accessToken) {
          return new Promise(resolve => resolve(accessToken));
        }
        //Make a request to the Yelp API token endpoint and pass clientId and secret to get the access token.
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=${clientId}&client_secret=${secret}`, { 
            method: 'POST'
           }).then(response => {
            return response.json();
           }).then(jsonResponse => {
            accessToken = jsonResponse.access_token;
           });
        },
    search: function(term, location, sortBy) {
        return Yelp.getAccessToken().then(() => {
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        }).then(response => { 
            return response.json();
        }).then(jsonResponse => {
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
};

export default Yelp;

