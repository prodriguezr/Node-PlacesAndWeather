require('colors');
require('dotenv').config();

const { readInput, showAppMenu, pause, listPlaces } = require("./helpers/inquirer");
const Searches = require("./models/Searches");

const main = async() => {
    const appChoices = [
        { value: 1, name: `${'1'.green}.- Get weather by place` },
        { value: 2, name: `${'2'.green}.- History` },
        { value: 0, name: `${'0'.green}.- Quit\n` },        
    ];

    let option = 0;

    console.clear();

    const searches = new Searches();
    
    do {
        option = await showAppMenu('Places And Weather App', appChoices);

        switch (option) {
            case 1:
                const query = await readInput('Place:');
                const places = await searches.searchByFilter(query);
        
                const placeId = await listPlaces(places);

                if (placeId === '0') continue;

                const selectedPlace = places.find(p => p.id === placeId );

                searches.addHistory(selectedPlace.name);

                // Get weather info for place
                const weather = await searches.weatherByPlace(selectedPlace.latitude, selectedPlace.longitude);

                // Show results
                console.clear(); 
                console.log('\nPlace/Location Information:\n'.green);
                console.log('Name: ', selectedPlace.name.green);
                console.log('Latitude:', selectedPlace.latitude);
                console.log('Longitude:', selectedPlace.longitude);
                console.log('\nWeather Information:\n'.green);
                console.log(`\t${weather.description}`);
                console.log(`\tT° Min/Actual/Max: ${weather.min}° / ${weather.actual}° / ${weather.max}°`);

                console.log('');
                break;
        
            case 2:
                searches.capitalizedHistory.forEach((place, i) => {
                    const idx = `${i + 1}.-`.green;
                    console.log(`${ idx } ${ place }`);
                });
                break;
        }
        if (option !== 0) 
            await pause();

    } while (option !== 0)
}

main();