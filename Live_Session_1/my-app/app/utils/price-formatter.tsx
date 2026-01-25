const PriceFormatter = (price: number) => {
    const newFormat = Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
        }).format(price);
    return newFormat;
}

export default PriceFormatter