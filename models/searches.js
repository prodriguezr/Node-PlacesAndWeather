class Searches {
    history = ['Londres', 'Montevideo', 'Curicó', 'Santiago'];

    constructor() {
        // TODO: Read DB if exists
    }

    async place(place = '') {
        // TODO: Http request
        console.log(place);

        return []; // Return all the places that match place searched
    }
}

module.exports = Searches;