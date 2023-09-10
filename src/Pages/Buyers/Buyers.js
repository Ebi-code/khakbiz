/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Header from "../../components/Header/Header";
import Filters from "../../components/Filters/Filters";
import Titlebar from "../../components/Titlebar/Titlebar";
import image from "../../assets/images/buyers-page.jpg";
import { buyersList } from "../../loadJson";

let buyers = [];
let countries = [];
let isConnect = [];
let productsBuyers = [];
let categories = [];
let tabs = [];

const removeDuplicateOptions = (array) => {
  return array.reduce(
    (prev, cur) => (prev.includes(cur) ? prev : [...prev, cur]),
    []
  );
};

buyersList.map((buyer) => buyers.push(buyer));

buyers.map((buyer) => {
  countries.push(buyer.country);
  isConnect.push(buyer.connect);

  buyer.products.map((products) => {
    productsBuyers.push(products);
  });
});

const tabsList = ["all", ...countries];
const updateCountries = removeDuplicateOptions(tabsList);
const updateIsConnect = removeDuplicateOptions(isConnect);
const updateProductsBuyers = removeDuplicateOptions(productsBuyers);

tabs = [{ id: "country", name: "country", options: updateCountries }];
categories = [
  { id: "Is Connect", name: "Is Connect", options: updateIsConnect },
  {
    id: "products",
    name: "products",
    options: updateProductsBuyers,
  },
];

const Buyers = () => {
  const [checkedList, setCheckedList] = useState([]);
  const [filtersList, setFiltersList] = useState([]);
  const [filtersTab, setFiltersTab] = useState([]);
  const [selectCat, setSelectCat] = useState([]);
  const [selectTab, setSelectTab] = useState("all");
  let buyersDataCopy = selectTab === "all" ? buyers : filtersTab;

  let tabCategoriesList = [];
  let tabIsConnect = [];
  let tabProducts = [];

  // Countries Tab
  buyersList.map((buyer) => {
    if (buyer.country === selectTab) {
      tabIsConnect.push(buyer.connect);
      buyer.products.map((product) => tabProducts.push(product));
    }
  });
  const updateTabProductsBuyers = removeDuplicateOptions(tabProducts);
  const updateTabIsConnect = removeDuplicateOptions(tabIsConnect);

  tabCategoriesList = [
    { id: "Is Connect", name: "Is Connect", options: updateTabIsConnect },
    {
      id: "products",
      name: "products",
      options: updateTabProductsBuyers,
    },
  ];

  // handle Tabs
  const handleTabs = (event) => {
    const { value } = event.target;

    let updateFiltersTab = [...filtersTab];

    updateFiltersTab = buyers.filter((pc) => pc.country === value);
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
      buyersDataCopy.filter((buyer) => {
        let product = buyer.products.find((product) => product === value);
        if (
          buyer.country === value ||
          buyer.connect === value ||
          product === value
        ) {
          updateFiltersList.push(buyer);
        }
      });
    } else {
      updateList.splice(checkedList.indexOf(value), 1);
      buyersDataCopy.filter((buyer) => {
        let product = buyer.products.find((product) => product === value);
        if (
          buyer.country === value ||
          buyer.connect === value ||
          product === value
        ) {
          // updateFiltersList.splice(filtersList.indexOf(buyer), 1);
          updateFiltersList = updateFiltersList.filter(
            (item) => item !== buyer
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
        titleTop="Buyers"
        titleBottom=""
        description="List of Buyers"
        image={image}
      />
      <section className="relative">
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
                Petrochemicals buyers
              </h2>
              <ul className="w-full relative flex flex-wrap p-0 m-0">
                {checkedList.map((list) => (
                  <li className="inline-flex items-center text-sm bg-gray-200 rounded-md text-black py-1 px-2 mr-5">
                    {list}
                  </li>
                ))}
              </ul>

              <div className="relative mt-6">
                <ul
                  role="list"
                  className="divide-y divide-gray-100 pt-6 sm:pt-10"
                >
                  {filtersList.length === 0
                    ? buyersDataCopy.map((person) => (
                        <li
                          key={person.id}
                          className="flex flex-wrap justify-between gap-x-6 py-5"
                        >
                          <div className="flex min-w-0 gap-x-4">
                            <img
                              className="h-12 w-12 flex-none rounded-full bg-gray-50"
                              src={person.imageSrc}
                              alt=""
                            />
                            <div className="min-w-0 flex-auto">
                              <p className="text-sm font-semibold leading-6 text-gray-900">
                                <NavLink to={`/buyers/buyer/${person.id}`}>
                                  {`${person.name} ${person.lastName}`}
                                </NavLink>
                              </p>
                              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                {person.email}
                              </p>
                            </div>
                          </div>
                          <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-gray-900">
                              {person.country}
                            </p>
                            <p className="text-sm leading-6 text-gray-900">
                              {person.phone}
                            </p>
                            {person.connect === "connected" ? (
                              <div className="mt-1 flex items-center gap-x-1.5">
                                <p className="text-xs leading-5 text-gray-500">
                                  Is Customer
                                </p>
                                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                </div>
                                {/* <p className="text-xs leading-5 text-gray-500">Online</p> */}
                              </div>
                            ) : (
                              <div className="mt-1 flex items-center gap-x-1.5">
                                <p className="text-xs leading-5 text-gray-500">
                                  Buyer
                                </p>
                                <div className="flex-none rounded-full bg-rose-500/20 p-1">
                                  <div className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                                </div>
                              </div>
                              // <p className="mt-1 text-xs leading-5 text-gray-500">
                              //   Last seen{" "}
                              //   <time dateTime={person.lastSeenDateTime}>
                              //     {person.lastSeen}
                              //   </time>
                              // </p>
                            )}
                          </div>
                        </li>
                      ))
                    : filtersList.map((person, index) => (
                        <li
                          key={index}
                          className="flex flex-wrap justify-between gap-x-6 py-5"
                        >
                          <div className="flex min-w-0 gap-x-4">
                            <img
                              className="h-12 w-12 flex-none rounded-full bg-gray-50"
                              src={person.imageSrc}
                              alt=""
                            />
                            <div className="min-w-0 flex-auto">
                              <p className="text-sm font-semibold leading-6 text-gray-900">
                                <NavLink to={`/buyers/buyer/${person.id}`}>
                                  {`${person.name} ${person.lastName}`}
                                </NavLink>
                              </p>
                              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                {person.email}
                              </p>
                            </div>
                          </div>
                          <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-gray-900">
                              {person.country}
                            </p>
                            <p className="text-sm leading-6 text-gray-900">
                              {person.phone}
                            </p>
                            {person.connect ? (
                              <div className="mt-1 flex items-center gap-x-1.5">
                                <p className="text-xs leading-5 text-gray-500">
                                  Is Customer
                                </p>
                                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                </div>
                                {/* <p className="text-xs leading-5 text-gray-500">Online</p> */}
                              </div>
                            ) : (
                              <div className="mt-1 flex items-center gap-x-1.5">
                                <p className="text-xs leading-5 text-gray-500">
                                  Buyer
                                </p>
                                <div className="flex-none rounded-full bg-rose-500/20 p-1">
                                  <div className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                                </div>
                              </div>
                              // <p className="mt-1 text-xs leading-5 text-gray-500">
                              //   Last seen{" "}
                              //   <time dateTime={person.lastSeenDateTime}>
                              //     {person.lastSeen}
                              //   </time>
                              // </p>
                            )}
                          </div>
                        </li>
                      ))}
                </ul>
              </div>
            </div>
          </Filters>
        </div>
      </section>
    </React.StrictMode>
  );
};

export default Buyers;
