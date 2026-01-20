//import {get_json, clean_json, decodeJSON} from "reader.js"

//Reveals the entire sessions
function reveal()
{
    let table = document.getElementById("results")
    let obj = sessionStorage.getItem("key_values")
    console.log(JSON.parse(obj))
    for(let i = 0; i < 10; i++)
    {
        let tr = document.createElement("tr")
        let td1 = document.createElement("td")
        let td2 = document.createElement("td")
        let td3 = document.createElement("td")
        
        //Session
        td1.textContent = i
        td2.textContent = "SILVER"
        td3.textContent = i

        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        
        table.appendChild(tr);
    }

}

//Reveals the JSON
reveal();