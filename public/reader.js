//Gets the json from the api
export async function get_json(url)
{
    let data = await fetch(url)
    if(data.ok)
    {
        return data.json()
    }
    else
    {
        return "Not able to read"
    }
}

//Reads the json
export function clean_json(data)
{
    //Arr
    let keys = []
    //Values
    let values = [];
    for(let [key, value] of Object.entries(data))
    {
        keys.push(key)
        values.push(value)
    }
    return [keys, values]
}

//Decodes JSON
function decodeJSON(text)
{
    let arr = []
    //Splits the data based on commas

    //First, we check if it a parser
    if(text[0] == "{" && text[text.length - 1] == "}")
    {
        //Keys, values
        let keys_values = [];
        //Splits the array into different sections
        arr = text.slice(1, text.length - 1);
        arr = arr.split(",");
        //Loops through the array
        

        return arr;
    }
    //This is not a json
    else
    {
        return false;
    }
}

//Reads the data from the json
document.getElementById("enter-btn").addEventListener("click",async ()=>{
    //Gets the url
    let get_url = document.getElementById("api-input").value
    //Gets the data
    let get_data = await get_json(get_url);
    //Reads the data
    let keys_values = clean_json(get_data);
    console.log(keys_values);
})

document.getElementById("enter2-btn").addEventListener("click", ()=>{
    try
    {
        //Reads text to json
        let read_data = JSON.parse(document.getElementById("json-input").value);
        //Reads the data
        let keys_values = clean_json(read_data);
        console.log(keys_values)
    }
    //Fixes up the json to what it thinks the user wants
    catch(err)
    {
        console.log("Edited JSON");
        console.log(decodeJSON(document.getElementById("json-input").value))
    }
})
