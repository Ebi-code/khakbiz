import iranPc from "./assets/data/petrochemicals/iran.json";
import russiaPc from "./assets/data/petrochemicals/russia.json";
import iranProduct from "./assets/data/products/iran.json";
import russiaProduct from "./assets/data/products/russia.json";
import buyersList from "./assets/data/buyers/buyers.json";

let petrochemicals = [{ ...iranPc }, { ...russiaPc }];
let allPetrochemicalsData = [...iranPc.data, ...russiaPc.data];
const productsList = [{ ...iranProduct }, { ...russiaProduct }];
const products = [...iranProduct.data, ...russiaProduct.data];

export {
  allPetrochemicalsData,
  petrochemicals,
  iranPc,
  russiaPc,
  products,
  buyersList,
  productsList,
};
