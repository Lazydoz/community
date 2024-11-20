let type = document.title;
const file = ("../data/" + type + ".json"); // lay data
const appear_position = document.querySelector("#container");

let start = 0, end = 20;

// hien thi trang hien tai dang o
function current_page(){
    document.getElementById("page").value = end / 20;
}
// tong so trang hien co
function max_page(length){
    
    let max = length / 20;
    let thua = length % 20;

    // neu thua thi lam tron 
    if (thua < 10 ){ 
        max += 1;
    }
    return max.toFixed(0);
}
// tai va hien thi du lieu trang tiep theo
function next_page() {
    start += 20;
    end += 20;
    object(); // Cập nhật nội dung
}

// tai va hien thi du lieu trang truoc do
function previous_page() {
    start -= 20;
    end -= 20;
    object(); // Cập nhật nội dung
}

function object() {
    appear_position.innerHTML = ""; // Xóa nội dung cũ

    current_page(); // trang hien tai
    fetch(file)
        .then(response => response.json())
        .then(data => {
            for (let i = start; i < end && i < data.length; i++) {
                const obj = data[i];
                const appear_obj = document.createElement("div");
                appear_obj.classList.add("asset");

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

            // tong so trang co
            //let max = data.length / 20 ; let max_page = max.toFixed(0);
            document.getElementById("max").innerHTML =`/ ${max_page(data.length)}`; 
        });
}

document.addEventListener('DOMContentLoaded', object);