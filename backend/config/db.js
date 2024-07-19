import mongooes from 'mongoose'

export const connextDB = async () => {
    await mongooes.connect('mongodb+srv://samrach:123@cluster0.wbdd062.mongodb.net/food_delivery_by_rach').then(() =>
        console.log("huj database connect hx ot error te !!"));
}