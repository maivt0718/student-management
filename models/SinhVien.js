class SinhVien{
    txtMaSV = "";
    txtTenSV = "";
    txtEmail = "";
    txtPass = "";
    txtNgaySinh = "";
    khSV = "";
    txtDiemToan = "";
    txtDiemLy = "";
    txtDiemHoa = "";

    tinhDiemTB = () => {
        return (this.txtDiemHoa * 1 + this.txtDiemToan * 1 + this.txtDiemLy * 1)/3;
    }
}
