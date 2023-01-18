import { createApi } from 'unsplash-js';

const unsplash = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

const getUrlForCoffeesStores = (latLong, query, limit) => `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`

const getListOfCoffeeStoresPhotos = async () => {
    const photos = await unsplash.search.getPhotos({
        query: 'coffee shop',
        page: 1,
        perPage: 30,
    });

    const unsplashResults = photos.response.results

    return unsplashResults.map(result => result.urls["small"])
}

export const fetchCoffeeStores = async () => {
    const photos = await getListOfCoffeeStoresPhotos()
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: process.env.FOURSQUARE_API_KEY
        }
    };

    const response = await fetch(getUrlForCoffeesStores('28.648887639623315%2C-106.0722770002823', 'coffee', '6'), options);
    const data = await response.json()

    return data.results.map((result, index) => {
        return {
            id: result.fsq_id,
            address: result.location.formatted_address,
            name: result.name,
            imgUrl: photos.length > 0 ? photos[index] : null
        }
    })
}