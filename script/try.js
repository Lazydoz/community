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
// nhap so trang va nhay den trang do
var move_page = document.getElementById("page").value;
function jump_to(move_to_page){
    end = move_to_page * 20;
    start = end - 20;
    object(); // Cập nhật nội dung
}

// them su kien khi nguoi dung nhap so trang va nhap enter 
document.getElementById("page").addEventListener('keypress', function(e){ 
    if (e.key === 'Enter') 
        { 
            jump_to(Number(this.value)); 
        }
    }
);

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

            document.getElementById("max").innerHTML =`/ ${max_page(data.length)}`; 
        });
}

document.addEventListener('DOMContentLoaded', object);