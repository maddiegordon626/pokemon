import { films } from '../assets/films.js'
let mainArea = document.querySelector("main")

let mainHeader = document.querySelector("header")
films.forEach(function(film) {
    let filmDiv = document.createElement("div")
    let title = document.createElement("h1")
    let crawl = document.createElement("p")

    filmDiv.appendChild(title)
    filmDiv.appendChild(crawl)

    title.textContent = film.title
    crawl.innerText = film.opening_crawl

    mainArea.appendChild(filmDiv)
})