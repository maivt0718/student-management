/** Các chức năng có trong dự án quản lí sinh viên
 * Thêm Sinh Viên
 * Đưa dữ liệu các sinh viên hiển thị lên bảng
 * Xoá Sinh Viên
 * Chỉnh sửa thông tin sinh viên
 * Reset dữ liệu sinh viên trên form
 * Lưu và lấy dữ liệu được lưu trữ ở localStorage
 * Validation dữ liệu người dùng nhập (Ràng buộc)
 * Tìm kiếm sinh viên
 *
 */

// Lưu và lấy dữ liệu được lưu trữ ở localStorage
// 3 cach clone 1 object moi - https://www.freecodecamp.org/news/clone-an-object-in-javascript/
// - Object.assign
// - Spread Method
// - Json Parse
$.saveLocalStorage = (key = "arrSV", value = result) => {
  // convert object to JSON
  localStorage.setItem(key, JSON.stringify(value));
};

$.getLocalStorage = (key = "arrSV") => {
  let dataLocal = localStorage.getItem(key);
  // convert JSON to object
  let newdataLocal = JSON.parse(dataLocal);
  return newdataLocal ? newdataLocal : [];
};

$.renderArrSV = (arr = result) => {
  let content = "";

  arr.forEach((element) => {
    // The LS is not supporting to store objects with its PaymentMethodChangeEvent, so we need create the new objecc
    let newSV = new SinhVien();
    Object.assign(newSV, element);
    let { txtMaSV, txtTenSV, txtEmail, txtNgaySinh, khSV } = newSV;
    let tinhDiemTB = newSV.tinhDiemTB();
    content += `
    <tr>
        <td>${txtMaSV}</td>
        <td>${txtTenSV}</td>
        <td>${txtEmail}</td>
        <td>${txtNgaySinh}</td>
        <td>${khSV}</td>
        // Can chay lun nen ()
        <td>${tinhDiemTB.toFixed(2)}</td> 
        <td><button class="btn btn-danger delete" onclick="$.deleteSV('${txtMaSV}');">Xoa</button></td>
        <td><button class="btn btn-warning modify" onclick="$.getValueSV('${txtMaSV}');">Sua</button></td>
    </tr>
        `;
  });
  $("#tbodySinhVien").html(content);
};

// Delete
$.deleteSV = (mssv) => {
  let index = result.findIndex((item, index) => {
    return item.txtMaSV == mssv;
  });
  if (index != -1) {
    result.splice(index, 1);
    $.saveLocalStorage();
    $.renderArrSV();
  }
};

// Get information
$.getValueSV = (mssv) => {
  let arrFields = $("#formQLSV input, #formQLSV select");
  let sv = result.find((element) => {
    return element.txtMaSV == mssv;
  });

  for (const element of arrFields) {
    let { id } = element;
    element.value = sv[id];
    if (id == "txtMaSV") {
      element.readOnly = true;
    }
  }
  return sv;
};

$.getInfoSV = () => {
  let arrFields = $("#formQLSV input, #formQLSV select");
  let isValid = true;
  let sv = new SinhVien();
  for (let element of arrFields) {
    let { value, id } = element;
    // Get data-attribute of input
    let datavalidation = $(`#${id}`).attr("data-validation")
    sv[id] = value;

    //   checkEmptyValue
    let getTheSpanID = $(`#${element.id}`).parent()[0].children[2].id;
    isValid &= $.checkEmptyValue(getTheSpanID, value);

    // checkMaxMinValue
    if(datavalidation == "length"){
        isValid &= $.checkMaxMinValue(getTheSpanID, value, 4, 15);
    }
  }

  if (isValid) {
    return sv;
  }
  return;
};

let result = $.getLocalStorage();
$.renderArrSV();

// Thêm Sinh Viên
$("#formQLSV").submit(function (e) {
  e.preventDefault();
  let sv = $.getInfoSV();
  if (!sv) {
    return;
  }
  result.push(sv);
  $.renderArrSV();
  $.saveLocalStorage();
  $("#formQLSV").trigger("reset");
});

// Update
$(".update").click(function (e) {
  e.preventDefault();
  let currentSV = $.getInfoSV();
  let index = result.findIndex((item, index) => {
    return item.txtMaSV == currentSV.txtMaSV;
  });
  if (index != -1) {
    result[index] = currentSV;
  }
  $.renderArrSV();
  $.saveLocalStorage();
  $("#formQLSV").trigger("reset");
});

// Reset
$(".reset").click(function (e) { 
    e.preventDefault();
    let arrFields = $("#formQLSV input, #formQLSV select");
    
    for (const element of arrFields) {
        let {id} = element
        $(`#${id}`).val("");
    }
});

// Search
$("#txtSearch").on("input", function (e) {
    e.preventDefault();
    let newKeyWords = $.removeVietnameseTones(e.target.value).trim().toLowerCase();
    let arrFilter = result.filter((item, index) => {
        let newTenSV = $.removeVietnameseTones(item.txtTenSV).trim().toLowerCase();
        return newTenSV.includes(newKeyWords)
    })
    $.renderArrSV(arrFilter)

});

