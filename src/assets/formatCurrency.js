const FormatCurrencyVND = (vnd, check) => {
    if (!vnd) return vnd;
    const options = { style: 'currency', currency: 'VND', minimumFractionDigits: 0, maximumFractionDigits: 3, useGrouping: true };
    const options1 = { minimumFractionDigits: 0, maximumFractionDigits: 3, useGrouping: true };

    return vnd.toLocaleString('vi-VN', check ? options1 : options);
};

export { FormatCurrencyVND }