//Create button 
const create = document.getElementById("create_btn")
//Read button
const read = document.getElementById("read_btn")

//Goes to the read html
read.addEventListener("click", ()=>{
    window.location.href ="reader.html"
})

//Goes to the create html
create.addEventListener("click", ()=>{
    window.location.href ="creator.html"
})