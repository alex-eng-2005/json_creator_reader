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
    return JSON.stringify(data)
}

//Decodes JSON to the best of it's ability
function decodeJSON(text)
{
    let arr = []
    //Splits the data based on commas

    //First, we check if it a parser
    if(text[0] == "{" && text[text.length - 1] == "}")
    {
        //Keys, values
        let keys = []
        //Values
        let values = [];
        //Key
        let key = "";
        //Value
        let value = "";
        //INdex
        let index = 0;
        //Count all of the success
        let success = true;
        //Splits the array into different sections
        arr = text.slice(1, text.length - 1);
        arr = arr.split(",");
        console.log(arr);
        //Loops through the array
        for(let kv of arr)
        {
            //Finds the valid names
            try
            {
                let valid = JSON.parse(`{${kv}}`)
                keys.push(Object.keys(valid)[0])
                values.push(Object.values(valid)[0])
            }
            //Catches the ones that are improper
            catch(e)
            {
                index = kv.length - 1;
                value = "";
                key = "";
                success = false;

                if(kv[kv.length - 1] == "\"")
                {
                    //First count all of the parenthesis
                    while(index >= 0)
                    {
                        if(kv[index] == ":")
                        {
                            //Checks for the bracket and if there is nothing in front
                            if(value.indexOf("\"") != value.length - 1 
                            && Number(value.slice(0, value.indexOf("\""))) == 0)
                            {
                                key = kv.slice(0, index);
                                value = value.slice(value.indexOf("\"") + 1, value.length - 1);
                                success = true;
                                index = 0;
                            }
                        }
                        else
                        {
                            value = kv[index] + value;
                        }
                        index -= 1
                    }
                    //If we cannot extract a key and value, we return false
                    if(!success)
                    {
                        return false;
                    }
                }
                else
                {
                    //Checks if cannot determine the key and value
                    if(kv.indexOf(":") == -1)
                    {
                        return false;
                    }
                    else
                    {
                        key = kv.slice(0, kv.indexOf(":"))
                        value = kv.slice(kv.indexOf(":") + 1);
                        if(!isNaN(Boolean(value)))
                        {
                            value = Number(value);
                        }
                        else if(!isNaN(Number(value)))
                        {
                            value = Number(value);
                        }
                        else if(Array.isArray(value))
                        {
                            value = new Array(value);
                        }
                         
                    }
                }
                //Gets the keys and values
                keys.push(key.trim());
                values.push(value);
            }
        }
        //Turns it into an json
        let obj = {}
        for(let i = 0; i < keys.length; i++)
        {
            obj[keys[i]] = values[i]
        }
        //Returns all of the keys and values
        return JSON.stringify(obj);
    }
    //This is not a json and cannot be fixed
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
    
    //Goes to the 
    //console.log(keys_values);
    document.getElementById("error-msg").style.visibility = "hidden"
    //Stores the sessionStorage into the keys and values
    sessionStorage.setItem("key_values", keys_values);
    //Outputs our results output
    window.location.href="output.html"
})

document.getElementById("enter2-btn").addEventListener("click", ()=>{
    try
    {
        //Reads text to json
        let read_data = JSON.parse(document.getElementById("json-input").value);
        //Reads the data
        let keys_values = clean_json(read_data);
        //console.log(keys_values)
        document.getElementById("error-msg").style.visibility = "hidden"
        //Stores the key_values into the session storage
        sessionStorage.setItem("key_values", keys_values);
        //Outputs our results into the output
        window.location.href="output.html"
    }
    //Fixes up the json to what it thinks the user wants
    catch(err)
    {
        let result = decodeJSON(document.getElementById("json-input").value)
        if(!result)
        {
            document.getElementById("error-msg").style.visibility = "visible"
            
        }
        else
        {
              document.getElementById("error-msg").style.visibility = "hidden"
        }
    }
})
