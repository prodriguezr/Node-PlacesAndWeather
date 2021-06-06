const axios = require('axios');
const fs = require('fs');

class Searches {
    access_token = '';
    history = [];
    dbFolder = './db';
    dbFile = 'db.json';

    get mapboxParams() {
        return {
            'access_token': this.mapbox_token,
            'limit': 5,
            'language': 'es',
        }
    }

    get capitalizedHistory() {
        return this.history.map(place => {
            let words = place.split(' ');

            words = words.map(w => w[0].toUpperCase() + w.substring(1));

            return words.join(' ');
        });
    }

    get openWeatherParams() {
        return {
            'appid': this.openWeather_token,
            'units': 'metric',
        }
    }

    constructor() {
        this.mapbox_token = process.env.MAPBOX_KEY;
        this.openWeather_token = process.env.OPENWEATHER_KEY;
        
        // Read DB if exists
        this.readDB(this.dbFolder, this.dbFile);
    }

    async searchByFilter(query = '', limit = 5) {
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`,
                params: this.mapboxParams,
            });

            const response = await instance.get();

            return response.data.features.map(place => ({
                id: place.id,
                name: place.place_name,
                longitude: place.center[0],
                latitude: place.center[1],
                place_type: place.place_type,
            })); // Return all the places that match place searched
            
        } catch (error) {
            console.log(error);

            return [];        
        }    
    }

    async weatherByPlace(lat, lon) {
        try {
            const instance = axios.create({
                baseURL: 'https://api.openweathermap.org/data/2.5/weather',
                params: { ... this.openWeatherParams, lat, lon},
            });

            const response = await instance.get();
            const { weather, main } = response.data;

            return {
                description: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                actual: main.temp,
            };
        } catch (err) {
            console.log(err);
        }
    }

    addHistory(place = '') {
        if (this.history.includes(place.toLowerCase())) {
            return;
        }

        this.history = this.history.splice(0,5);
        
        this.history.unshift(place.toLowerCase());

        const payload = {
            history: this.history,
        }

        this.saveDB(this.dbFolder, this.dbFile, payload);
    }

    saveDB(dbFolder, dbFile, payload) {
        try {
            if (!fs.existsSync(dbFolder)) {
                fs.mkdirSync(dbFolder);
            }

            fs.writeFileSync(`${dbFolder}/${dbFile}`, JSON.stringify(payload));
        } catch (err) {
            console.log(err);
        }
    }

    readDB(dbFolder, dbFile) {
        try {
            if (!fs.existsSync(`${dbFolder}/${dbFile}`)) {
                return;
            }

            const info = fs.readFileSync(`${dbFolder}/${dbFile}`, { encoding: 'utf-8' });

            const data = JSON.parse(info);

            this.history = data.history;

        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = Searches;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       