const { readInput, showMenu, pause } = require("./helpers/inquirer");

const main = async() => {
    let option = 0;

    console.clear();

    do {
        option = await showMenu();

        switch (option) {
            case 1:
                
                break;
        
            case 2:
                
                break;
        }
        if (option !== 0) 
            await pause();

    } while (option !== 0)
}

main();