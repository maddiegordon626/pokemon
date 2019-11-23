
// const allPokemon = (async () => {
// const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
// const myJson = await response.json();
// console.log(JSON.stringify(myJson))
// })


// console.log(allPokemon().then)

//data.stats[0].base_stat
class Pokemon {
    constructor(id, name, stats) {
        this.id = id
        this.name = name
        this.base_stat = stats
    }
}

const Maddiemon = new Pokemon(900, "Maddiemon", 130);

document.querySelector("#pokebutton").addEventListener("click", () => {
    let pokeId = prompt("Provide the pokemon ID you want to add:")
    if(!pokeId > 0 && !pokeId < 810) {
        alert("That Pokemon ID does not exist! Please enter a different one.")
    }
    let retrievedPokemon = getAPIData(`https://pokeapi.co/api/v2/pokemon/${pokeId}`).then(result => {
        //let newPokemon = new Pokemon(result)
        populateDOM(result)
    }).catch(error => console.log(error))
    
})

async function getAPIData(url) {
    try {
        const response = await fetch(url)
        const data = await response.json()
        
        return data
    } catch (error) {
        console.error(error)
    }
}

const theData = getAPIData("https://pokeapi.co/api/v2/pokemon/?limit=25").then(data => {
    for(const pokemon of data.results) {
        getAPIData(pokemon.url).then(pokedata => {
            populateDOM(pokedata)
            
        })
    }
})



let mainArea = document.querySelector("main")

function populateDOM(single_pokemon) {
    
    let pokeScene = document.createElement("div")
    let pokeCard = document.createElement("div")
    let pokeFront = document.createElement("div")
    let pokeBack = document.createElement("div")

    fillCardFront(pokeFront, single_pokemon)
    fillCardBack(pokeBack, single_pokemon)

    pokeScene.setAttribute("class", "scene")
    pokeCard.setAttribute("class", "card")
    pokeCard.appendChild(pokeFront)
    pokeCard.appendChild(pokeBack)
    pokeScene.appendChild(pokeCard)

    mainArea.appendChild(pokeScene)

    pokeCard.addEventListener( "click", function() {
        pokeCard.classList.toggle("is-flipped");
    });
}

function getPokeNumber(id) {
    console.log(id)
    if (id < 10) return `00${id}`
    if (id > 9 && id < 100) {
        return `0${id}`
    } else return id
}

function fillCardFront(pokeFront, data) {
    pokeFront.setAttribute("class", "card__face card__face--front")
    let name = document.createElement("p")
    let pic = document.createElement("img")
    pic.setAttribute("class", "picDivs")
    console.log(data.id)
    let pokeNum = getPokeNumber(data.id)
    pokeFront.appendChild(name)
    //name.textContent = `${data.name} height: ${data.height}`
    //pic.src = `../images/${pokeNum}.png`
    pic.src = `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${pokeNum}.png`

    pokeFront.appendChild(pic)
    pokeFront.appendChild(name)
}

function fillCardBack(pokeBack, data) {
    pokeBack.setAttribute("class", "card__face card__face--back")
    let pokeOrder = document.createElement("p")
    let pokeHP = document.createElement("h5")
    pokeOrder.textContent = `#${data.id} ${data.name[0].toUpperCase()}${data.name.slice(1)}`
    //pokeHP.textContent = data.stats[0].base_stat
    pokeBack.appendChild(pokeOrder)
    pokeBack.appendChild(pokeHP)
}









