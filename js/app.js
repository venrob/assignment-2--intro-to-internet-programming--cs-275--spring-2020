let tabhandles, recipes, riceOZ;
let chosen_recipe = -1;
let originalRecipes = null;
window.onload = () => {
    //Load elements
    tabhandles = document.getElementById(`tab_container`).getElementsByTagName(`p`);
    recipes = document.getElementsByClassName(`Recipe`); //Recipe paragraphs
    riceOZ = document.getElementById(`riceOZ`); //Input field
    tabhandles[0].addEventListener(`click`, () => {
        chooseRecipe(0);
    });
    tabhandles[1].addEventListener(`click`, () => {
        chooseRecipe(1);
    });
    riceOZ.addEventListener(`input`, () => {
        riceOZ.value =
            Math.min(riceOZ.max,Math.max(riceOZ.min,parseFloat(riceOZ.value)));
        if(invalidValue(riceOZ.value)) //Don't update if bad value
            return;
        updateRice();
    });
    chooseRecipe(0); //Set the default recipe to the leftmost tab
    updateRice();
};

function chooseRecipe(r)
{
    if(chosen_recipe === r) return; //Don't re-choose the same recipe
    chosen_recipe = r;
    for(let i = 0; i < recipes.length; ++i)
    {
        if(i === r)
        {
            recipes[i].hidden = false;
            tabhandles[i].style.backgroundColor = `rgb(80%,80%,80%)`;
            tabhandles[i].style.color = `black`;
        }
        else
        {
            recipes[i].hidden = true;
            tabhandles[i].style.backgroundColor = null;
            tabhandles[i].style.color = null;
        }
    }
}

function updateRice()
{
    if(invalidValue(riceOZ.value)) //If no value, don't try to update
        return;

    if(originalRecipes == null) //Store the recipe html before first replacement
    {
        originalRecipes = [];
        for(let i = 0; i < recipes.length; ++i)
        {
            originalRecipes.push(recipes[i].innerHTML);
        }
    }
    for(let i = 0; i < recipes.length; ++i)
    {
        //RegEx replacement of fields of form '${EQUATION}'
        //Numbers and operators are allowed, as is 'r', representing the
        //amount of rice, in ounces.
        let txt = originalRecipes[i];
        let reg = /\$\{([a-z0-9*/+-. ]+)\}/i;
        let match = txt.match(reg);
        while (match != null) //Repeat for each field
        {
            txt = txt.replace(reg,equparse(match[1]));
            //Check next match
            match = txt.match(reg);
        }
        recipes[i].innerHTML = txt;
    }
}

function equparse(str) //Parses an equation of plaintext
{
    str = str.replace(/[\t\r\n ]+/g, ``); //Remove whitespace
    let result = null;
    let match;
    let working = null;
    let op = null;
    let numregx = /[0-9.]+/i;
    let varregx = /[a-z]+/i;
    let opregx = /[*/+-]/i;
    while(str != `` || working != null)
    {
        if(working != null) //We have a number to process
        {
            if(result === null) //We have only 1 number to process; assign it
            {
                result = working;
                working = null;
                continue;
            }
            //else We have 2 numbers to process. Process based on operator.
            switch(op)
            {
                case `*`:
                    result *= working;
                    break;
                case `/`:
                    result /= working;
                    break;
                case `+`:
                    result += working;
                    break;
                case `-`:
                    result -= working;
                    break;
                case null:
                    //No operator listed; assume multiplication (i.e. '2x')
                    op = `*`;
                    continue; //Return to top of loop
                default:
                    console.error(`Error: Unkown operator '` + op + `'`);
                    return result;
            }
            working = null;
            op = null;
            continue;
        }
        //else we have no number to process; search string
        match = str.match(numregx);
        if(match != null && match.index === 0)
        {
            //Process a number
            working = parseFloat(match[0]);
            str = str.replace(numregx,``);
            continue;
        }
        match = str.match(varregx);
        if(match != null && match.index === 0)
        {
            //Process the variable
            switch(match[0])
            {
                case `r`: //OZ of rice, from input field
                    working = parseFloat(riceOZ.value);
                    break;
                default:
                    console.error(`Error: Unkown variable '` + match[0] + `'`);
                    return result;
            }
            str = str.replace(varregx,``);
            continue;
        }
        match = str.match(opregx);
        if(match != null && match.index === 0)
        {
            //Process an operator
            op = match[0];
            str = str.replace(opregx,``);
            continue;
        }
        //Didn't match any rules... we have an error here.
        console.error(`Error: Unknown input-\n` + str);
        return result;
    }
    return parseFloat(result.toFixed(2)); //Truncate to max of 2 decimal places
}

function invalidValue(str)
{
    let float = parseFloat(str);
    return (isNaN(float) || float < 1);
}
