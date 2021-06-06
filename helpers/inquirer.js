const inquirer = require('inquirer');

require('colors');

const showAppMenu = async(appTitle = '', choices = []) => {
    const question = [
        {
            type: 'list',
            name: 'option',
            message: 'What would you like to do?',
            choices
        }        
    ];
    
    console.clear();

    console.log('============================='.green);
    console.log(`   ${appTitle}`.white);
    console.log('============================\n'.green);

    const { option } = await inquirer.prompt(question);

    return option;
}

const pause = async() => {
    await inquirer.prompt(
        [
            {
                type: 'input',
                name: 'option',
                message: `Press ${'ENTER'.green} to continue`
            }
        ]
    );

    console.log('');

    return;
}

const listPlaces = async(places = []) => {
    const choices = places.map((place, i) => {
        const idx = `${i + 1}.-`.green;

        return {
            value: place.id,
            name: `${ idx } ${ place.name }`,
        }
    });

    choices.unshift({
        value: '0',
        name: '0.-'.green + ' Cancel',
    });

    const question = [
        {
            type: 'list',
            name: 'id',
            message: 'Select a place',
            choices,
        }
    ]

    const { id } = await inquirer.prompt(question);

    return id;
} 

const readInput = async(message) => {
    const question = [
        {
            type: 'input',
            name: 'description',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Enter a value for the description';
                } 
                return true;
            }
        }
    ];

    const { description } = await inquirer.prompt(question);

    return description;
}

const confirm = async(message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message,
        }
    ];

    const { ok } = await inquirer.prompt(question);

    return ok;
}


module.exports = {
    showAppMenu,
    pause,
    readInput,
    confirm,
    listPlaces,
}