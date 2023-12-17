const select=document.getElementById("select-char")
const pname=document.getElementById("name")
const ptype=document.getElementById("type")
const pheight=document.getElementById("height")
const pweight=document.getElementById("weight")
const pAbility=document.getElementById("ability")
const char=document.getElementById("char")
const buttons = document.querySelectorAll("button")

fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0").then(function(response){
    return response.json()
})
.then(function(data){
    console.log(data)

    // add pokemons into a list
    for(let char of data.results){
        let option=document.createElement("option")
        option.value=char.name
        option.innerHTML=char.name

        select.appendChild(option)
    }
})

select.addEventListener("change",function(){
    fetch("https://pokeapi.co/api/v2/pokemon/"+(select.selectedIndex+1)+"/").then(function(response){
        return response.json()
    })
    .then(function(value){
        console.log(value)
        // uppercase first letter
        let charname=value.name[0].toUpperCase() + value.name.slice(1)

        // change properties value
        pname.innerHTML=charname
        ptype.innerHTML=""
        for(let i in value.types){
            ptype.innerHTML+=value.types[i].type.name
            if(i<value.types.length-1){
                ptype.innerHTML+=", "
            }
        }
        pheight.innerHTML=value.height/10+"m"
        pweight.innerHTML=value.weight+"lbs"
        pAbility.innerHTML=""

        try{
            for(let i in value.abilities){
                pAbility.innerHTML+=value.abilities[i].ability.name
                if(i<value.abilities.length-1){
                    pAbility.innerHTML+=", "
                }
            }
        }
        catch{pAbility.innerHTML="No information yet"}
        
        char.src=value.sprites.front_default
        // adjust character side
        for(let button of buttons){
            button.addEventListener("click",function(){
                if(button.id=="default-front"){
                    char.src=value.sprites.front_default
                }
                else if(button.id=="shiny-front"){
                    char.src=value.sprites.front_shiny
                }
                else if(button.id=="default-back"){
                    char.src=value.sprites.back_default
                }
                else{
                    char.src=value.sprites.back_shiny
                }
            })
        }
       
    })
})