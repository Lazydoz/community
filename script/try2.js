let type = document.title;
const file = ("../data/" + type + ".json"); // lấy data
const file1 = ("../data/" + type + ".json"); // lấy data
const file2 = ("../data/" + "n_" + type + ".json"); // lấy data

const appear_position = document.querySelector("#container"); // vị trí xuất hiện

let start = 0, end = 20;
let searchKeyword = ""; // Biến lưu từ khóa tìm kiếm

// Hiển thị trang hiện tại
function current_page() {
    document.getElementById("page").value = end / 20;
}

// Tính tổng số trang
function max_page(length) {
    return Math.ceil(length / 20); // Làm tròn số trang
}

// Tải và hiển thị dữ liệu trang tiếp theo
function next_page() {
    start += 20;
    end += 20;
    object(); // Cập nhật nội dung
}

// Tải và hiển thị dữ liệu trang trước đó
function previous_page() {
    start -= 20;
    end -= 20;
    object(); // Cập nhật nội dung
}

// Nhảy đến trang chỉ định
function jump_to(move_to_page) {
    end = move_to_page * 20;
    start = end - 20;
    object(); // Cập nhật nội dung
}

// Thêm sự kiện khi người dùng nhập số trang và nhấn enter 
document.getElementById("page").addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        jump_to(Number(this.value));
    }
});

// Hàm lấy dữ liệu từ file JSON 
async function fetchJSON(filex) {
    const response = await fetch(filex);
    const data = await response.json();
    return data;
}

// Hàm kết hợp hai file JSON 
async function mergeJSONFiles(file1, file2) {
    const data1 = await fetchJSON(file1);
    const data2 = await fetchJSON(file2);

    // Kết hợp hai mảng JSON 
    const mergedData = [...data1, ...data2];
    return mergedData;
}

// Lọc dữ liệu dựa trên từ khóa tìm kiếm
function filterData(data, keyword) {
    if (!keyword) return data;
    return data.filter(item => item.name.toLowerCase().includes(keyword.toLowerCase()));
}

/*--- MAIN PROGRAM ---*/
function object() {
    appear_position.innerHTML = ""; // Xóa nội dung cũ

    current_page(); // Cập nhật trang hiện tại
    mergeJSONFiles(file2, file1)
        .then(mergedData => {
            // Lọc dữ liệu dựa trên từ khóa tìm kiếm
            const filteredData = filterData(mergedData, searchKeyword);

            // Hiển thị dữ liệu từ start -> end
            for (let i = start; i < end && i < filteredData.length; i++) {
                const obj = filteredData[i];
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

            document.getElementById("max").innerText = `/ ${max_page(filteredData.length)}`;
        });
}

// Thêm sự kiện tìm kiếm khi người dùng nhập từ khóa
document.getElementById("search").addEventListener("input", function () {
    searchKeyword = this.value; // Lấy từ khóa tìm kiếm
    start = 0; // Đặt lại trang bắt đầu
    end = 20; // Đặt lại số lượng hiển thị
    object(); // Cập nhật hiển thị
});

// Khởi chạy khi DOM được tải
document.addEventListener("DOMContentLoaded", object);
