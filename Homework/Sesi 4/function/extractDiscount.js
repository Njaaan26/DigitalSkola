export function extractDiscount(discountString) {
    let numericString = discountString.replace(/[^0-9]/g, ''); // Hapus semua kecuali angka 
    return parseInt(numericString); // Ubah ke integer 
}

