import { extractDiscount } from './extractDiscount.js';

let hargaBarang = 100000
let diskonBaju = "-20%"

// let diskonSepatu = "Off -25%"
// let diskonCelana = "Hemat 10.000"

let converttoNumeric = extractDiscount(diskonBaju)


console.log(hargaBarang);
console.log(converttoNumeric)

//console.log(extractDiscount(diskonBaju));
//console.log(extractDiscount(diskonSepatu));
//console.log(extractDiscount(diskonCelana));

// Total harga barang kena diskon
let belanjaKenaDiskon = (hargaBarang * (converttoNumeric / 100))
console.log(belanjaKenaDiskon);


let granTotal = hargaBarang - belanjaKenaDiskon
console.log("Jadi total belanjaan : Rp." + granTotal)

