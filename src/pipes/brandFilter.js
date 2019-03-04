export const brandFilter = (arr, brand) => {
    if(!brand) return arr;

    return arr.filter(product => brand.includes(product.brand));
};