
//Reads the json
function clean_json(data)
{
    return JSON.stringify(data)
}

//Reveals the entire sessions
function reveal()
{
    //Gets our table
    let table = document.getElementById("results")
    //Gets our object
    let obj = JSON.parse(sessionStorage.getItem("key_values"))
    //Index for buttons
    let i = 0;
    //Resets the session storage for safety reasions
    sessionStorage.setItem("keyItems",null);
    
    //Loops through the object
    for(let key in obj)
    {
        //Gets the rows and table data
        let tr = document.createElement("tr")
        let td1 = document.createElement("td")
        let td2 = document.createElement("td")
        let td3 = document.createElement("td")
        let td4 = document.createElement("td")
        
        //Session
        td1.textContent = key
        td2.textContent = typeof(obj[key])
        
        //Checks if td4 is a json
        if(typeof(obj[key]) == "object")
        {
            //Button
            let readObj = document.createElement("button")
            readObj.setAttribute("id", "button" + i);
            readObj.textContent = "Read This JSON"
            
            //Reads the button
            td4.appendChild(readObj);
            td3.textContent = JSON.stringify(obj[key])
            //Adds everything
            tr.appendChild(td1)
            tr.appendChild(td2)
            tr.appendChild(td3)
            tr.appendChild(td4)
        
            table.appendChild(tr);
            //Reads the button
            document.getElementById("button" + i).addEventListener("click", ()=>{
                console.log("button" + i);
            });
            i++;
        }
        else
        {
            td4.textContent = "Not a JSON"
            td3.textContent = obj[key]
            //Adds everything
            tr.appendChild(td1)
            tr.appendChild(td2)
            tr.appendChild(td3)
            tr.appendChild(td4)
        
            table.appendChild(tr);
        }
        
    }

}

//Reveals the JSON once we enter the screen
reveal();