const FormatCurrencyVND = (vnd) => {
    // Sử dụng options để định cấu hình định dạng số
    const options = { style: 'currency', currency: 'VND', minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true };

    return vnd.toLocaleString('vi-VN', options);
};

export { FormatCurrencyVND }