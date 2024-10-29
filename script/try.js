let type = document.title;
const file = ("./data/" + type + ".json"); // lay data
const appear_position = document.querySelector("#container");

let start = 0, end = 20;

function next_page() {
    start += 20;
    end += 20;
    object(); // Cập nhật nội dung
}

function previous_page() {
    start -= 20;
    end -= 20;
    object(); // Cập nhật nội dung
}

function object() {
    appear_position.innerHTML = ""; // Xóa nội dung cũ

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
        });
}

document.addEventListener('DOMContentLoaded', object);