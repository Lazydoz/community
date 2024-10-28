let type = document.title;
const file = ("/data/"+type+".json");
const appear_position = document.querySelector("#container");

let start = 0, end = 20;

function next_page() // chuyen toi trang truoc
{ start += 10; end += 10;}
function previous_page() // tro lai trang truoc
{ start -= 10; end -= 10; }

fetch(file)
    .then (response => response.json())
    .then (data => {

        function object()
        {
            for(start; start < end; start++)
                {
                    const obj = data[start];
                    const appear_obj = document.createElement("div"); appear_obj.classList.add("asset");
        
                    appear_obj.innerHTML = `
                            <img src="${obj.img}" alt="">
                            <div class="information">${obj.name}</div>
                            <div class="source">
                                <a href="${obj.download}" target="_blank"><i class="fa-solid fa-download"></i></a>
                                <a href="${obj.source}" target="_blank"><i class="fa-solid fa-link"></i></a>
                            </div>
                        `;
        
                    appear_position.appendChild(appear_obj);
                }
        }
        object();
        
        
    })