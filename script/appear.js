let type = document.title;

const file = ("/data/"+type+".json");

fetch(file)
    .then (response => response.json())
    .then (data => {
        const start = 0;
        const end = 0;
    })