let type = document.title;
const file = ("../data/" + type + ".json"); // lay data
const file1 = ("../data/" + type + ".json"); // lay data
const file2 = ("../data/" + "n_" + type + ".json"); // lay data

const appear_position = document.querySelector("#container"); // cho xuat hien

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
// Hàm  lấy dữ liệu từ file JSON 
async function fetchJSON(filex) { 
    const response = await fetch(filex); 
    const data = await response.json(); 
    return data; 
} 
// Hàm  kết hợp hai file JSON 
async function mergeJSONFiles(file1, file2){ 
    const data1 = await fetchJSON(file1); 
    const data2 = await fetchJSON(file2); 
    
    // Kết hợp hai mảng JSON 
    const mergedData = [...data1, ...data2]; 
    return mergedData; 
}

/*---         MAIN PROGRAM           ---*/
function object() {
    appear_position.innerHTML = ""; // Xóa nội dung cũ

    current_page(); // trang hien tai
    mergeJSONFiles(file2, file1)
        .then(mergedData => { 
            for (let i = start; i < end && i < mergedData.length; i++) {
                const obj = mergedData[i];
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

            document.getElementById("max").innerHTML =`/ ${max_page(mergedData.length)}`; 
        });
}

document.addEventListener('DOMContentLoaded', object);