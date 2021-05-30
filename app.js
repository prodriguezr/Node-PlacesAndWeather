require('colors');

const { readInput, showMenu, pause } = require("./helpers/inquirer");
const Searches = require("./models/Searches");

const main = async() => {
    let option = 0;

    console.clear();

    const searches = new Searches();

    do {
        option = await showMenu();

        switch (option) {
            case 1:
                // Show input
                const place = await readInput('Place to search?');
                console.log(place);
                
                //TODO: Search all the places

                //TODO: Select a place

                //TODO: Get weather info for place

                //TODO: Show results
                console.log('\nPlace/Location Information:\n'.green);
                console.log('Name: ', );
                console.log('Latitude:', );
                console.log('Longitude:', );
                console.log('T° Min/Max:', );

                console.log('');
                break;
        
            case 2:
                
                break;
        }
        if (option !== 0) 
            await pause();

    } while (option !== 0)
}

main();