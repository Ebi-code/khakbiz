/* eslint-disable array-callback-return */
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Header from "../../components/Header/Header";
import Filters from "../../components/Filters/Filters";
import Titlebar from "../../components/Titlebar/Titlebar";
import image from "../../assets/images/products-page.png";
import { productsList } from "../../loadJson";

let products = [];
let countries = [];
let petrochemicalsList = [];
let productsName = [];
let productsGrade = [];
let productsTradeName = [];
let categories = [];
let tabs = [];

const removeDuplicateOptions = (array) => {
  return array.reduce(
    (prev, cur) => (prev.includes(cur) ? prev : [...prev, cur]),
    []
  );
};

productsList.map((product) => {
  product.data.map((data) => {
    products.push(data);
  });
});

products.map((product) => {
  countries.push(product.country);
  petrochemicalsList.push(product.petrochemical);
  productsName.push(product.product);
  productsTradeName.push(product.tradeName);
  productsGrade.push(product.grade);
});

const tabsList = ["all", ...countries];
const updateCountries = removeDuplicateOptions(tabsList);
const updatePetrochemical = removeDuplicateOptions(petrochemicalsList);
const updatecategoryProduct = removeDuplicateOptions(productsName);
const updatecategoryTradeName = removeDuplicateOptions(productsTradeName);
const updatecategoryGrade = removeDuplicateOptions(productsGrade);

tabs = [{ id: "country", name: "country", options: updateCountries }];
categories = [
  { id: "petrochemical", name: "petrochemical", options: updatePetrochemical },
  {
    id: "product",
    name: "product",
    options: updatecategoryProduct,
  },
  { id: "TradeName", name: "TradeName", options: updatecategoryTradeName },
  { id: "grade", name: "grade", options: updatecategoryGrade },
];

// Start Products Page
const Products = () => {
  const [checkedList, setCheckedList] = useState([]);
  const [filtersList, setFiltersList] = useState([]);
  const [filtersTab, setFiltersTab] = useState([]);
  const [selectCat, setSelectCat] = useState([]);
  const [selectTab, setSelectTab] = useState("all");
  let productsDataCopy = selectTab === "all" ? products : filtersTab;

  let tabCategoriesList = [];
  let tabProducts = [];
  let tabPetrochemicals = [];
  let tabTradeName = [];
  let tabGrade = [];

  // Countries Tab
  productsList.map((product) => {
    product.data.map((data) => {
      if (product.global === selectTab) {
        tabProducts.push(data.product);
        tabPetrochemicals.push(data.petrochemical);
        tabTradeName.push(data.tradeName);
        tabGrade.push(data.grade);
      }
    });
  });
  const updateTabCountry = removeDuplicateOptions(tabProducts);
  const updateTabPetrochemical = removeDuplicateOptions(tabPetrochemicals);
  const updateTabTradeName = removeDuplicateOptions(tabTradeName);
  const updateTabGrade = removeDuplicateOptions(tabGrade);

  tabCategoriesList = [
    { id: "petrochemical", name: "petrochemical", options: updateTabCountry },
    {
      id: "product",
      name: "product",
      options: updateTabPetrochemical,
    },
    { id: "TradeName", name: "TradeName", options: updateTabTradeName },
    { id: "grade", name: "grade", options: updateTabGrade },
  ];

  // handle Tabs
  const handleTabs = (event) => {
    const { value } = event.target;

    let updateFiltersTab = [...filtersTab];

    updateFiltersTab = products.filter((pc) => pc.country === value);
    const removeDuplicateFilters = removeDuplicateOptions(updateFiltersTab);
    setFiltersTab(removeDuplicateFilters);
    setSelectTab(value);
  };

  // Handle Change
  const handleChange = (event, id) => {
    const { value, checked } = event.target;
    let updateList = [...checkedList];
    let updateFiltersList = [...filtersList];
    let updateSelectCat = [...selectCat];

    // Filter Selected
    if (checked) {
      updateList = [...checkedList, value];
      productsDataCopy.filter((product) => {
        console.log(product);
        if (
          product.country === value ||
          product.petrochemical === value ||
          product.product === value ||
          product.tradeName === value ||
          product.grade === value
        ) {
          updateFiltersList.push(product);
        }
      });
    } else {
      updateList.splice(checkedList.indexOf(value), 1);
      productsDataCopy.filter((product) => {
        if (
          product.country === value ||
          product.petrochemical === value ||
          product.product === value ||
          product.tradeName === value ||
          product.grade === value
        ) {
          // updateFiltersList.splice(filtersList.indexOf(product), 1);
          updateFiltersList = updateFiltersList.filter(
            (item) => item !== product
          );
        }
      });
    }

    const removeDuplicateFilters = removeDuplicateOptions(updateFiltersList);
    setCheckedList(updateList);
    setFiltersList(removeDuplicateFilters);
    setSelectCat(updateSelectCat);
  };

  return (
    <React.StrictMode>
      <Header />
      <Titlebar
        titleTop="Products"
        titleBottom=""
        description="List of Products"
        image={image}
      />
      <main>
        <section className="buyers-page">
          <div className="container">
            <Filters
              tabCategories={tabCategoriesList}
              tabs={tabs}
              selectTab={selectTab}
              categories={categories}
              handleChange={handleChange}
              handleTabs={handleTabs}
            >
              <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-5">
                  Petrochemicals Products
                </h2>
                <ul className="w-full relative flex flex-wrap p-0 m-0">
                  {checkedList.map((list) => (
                    <li className="inline-flex items-center text-sm bg-gray-200 rounded-md text-black py-1 px-2 mr-5">
                      {list}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                  {filtersList.length === 0
                    ? productsDataCopy.map((product) => (
                        <div key={product.id} className="group relative">
                          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                            <img
                              src={product.imageSrc[0]}
                              alt={product.imageAlt}
                              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                            />
                          </div>
                          <div className="mt-6 flex justify-between">
                            <div>
                              <h3 className="uppercase text-sm font-bold text-blue-950">
                                <NavLink to={`/products/product/${product.id}`}>
                                  <span
                                    aria-hidden="true"
                                    className="absolute inset-0"
                                  />
                                  {product.product}
                                </NavLink>
                              </h3>
                              <p className="mt-5 capitalize text-sm font-bold text-zinc-800">
                                Trade Name: 
                                <span className="pl-2 uppercase font-semibold text-slate-600">{product.tradeName}</span>
                              </p>
                              <p className="mt-2 capitalize text-sm font-bold text-zinc-800">
                                petrochemical: 
                                <span className="pl-2 uppercase font-semibold text-slate-600">{product.petrochemical}</span>
                              </p>
                            </div>
                            <div className="flex items-start justify-end text-left">
                              {product.grade &&
                                <p className="py-1 px-2 rounded-md bg-slate-100 uppercase text-xs font-medium text-gray-600">
                                  {product.grade}
                                </p>
                              }
                              {/* <a
                                href={product.datasheet}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <span
                                  aria-hidden="true"
                                  className="absolute inset-0"
                                />
                                datasheet
                              </a> */}
                            </div>
                          </div>
                        </div>
                      ))
                    : filtersList.map((product, index) => (
                        <div key={index} className="group relative">
                          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                            <img
                              src={product.imageSrc[0]}
                              alt={product.imageAlt}
                              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                            />
                          </div>
                          <div className="mt-6 flex justify-between">
                            <div>
                              <h3 className="uppercase text-sm font-bold text-blue-950">
                                <NavLink to={`/products/product/${product.id}`}>
                                  <span
                                    aria-hidden="true"
                                    className="absolute inset-0"
                                  />
                                  {product.product}
                                </NavLink>
                              </h3>
                              <p className="mt-5 capitalize text-sm font-bold text-zinc-800">
                                Trade Name: 
                                <span className="pl-2 uppercase font-semibold text-slate-600">{product.tradeName}</span>
                              </p>
                              <p className="mt-2 capitalize text-sm font-bold text-zinc-800">
                                petrochemical: 
                                <span className="pl-2 uppercase font-semibold text-slate-600">{product.petrochemical}</span>
                              </p>
                            </div>
                            <div className="flex items-start justify-end text-left">
                              {product.grade &&
                                <p className="py-1 px-2 rounded-md bg-slate-100 uppercase text-xs font-medium text-gray-600">
                                  {product.grade}
                                </p>
                              }
                              {/* <a
                                href={product.datasheet}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <span
                                  aria-hidden="true"
                                  className="absolute inset-0"
                                />
                                datasheet
                              </a> */}
                            </div>
                          </div>
                        </div>
                      ))}
                </div>
              </div>
            </Filters>
          </div>
        </section>
      </main>
    </React.StrictMode>
  );
};

export default Products;
