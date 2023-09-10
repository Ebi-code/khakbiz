/* eslint-disable array-callback-return */
import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Filters from "../../components/Filters/Filters";
import Titlebar from "../../components/Titlebar/Titlebar";
import image from "../../assets/images/petrochemicals-page.jpg";

import { allPetrochemicalsData, petrochemicals } from "../../loadJson";

let countries = [];
let locationList = [];
let ownershipList = [];
let categories = [];
let tabs = [];

const removeDuplicateOptions = (array) => {
  return array.reduce(
    (prev, cur) => (prev.includes(cur) ? prev : [...prev, cur]),
    []
  );
};

allPetrochemicalsData.map((pc) => {
  countries.push(pc.country);
  locationList.push(pc.location);
  ownershipList.push(pc.ownership);
});

const tabsList = ["all", ...countries];
const updateCountries = removeDuplicateOptions(tabsList);
const updateLocation = removeDuplicateOptions(locationList);
const updateOwnership = removeDuplicateOptions(ownershipList);

tabs = [{ id: "country", name: "country", options: updateCountries }];
categories = [
  { id: "location", name: "location", options: updateLocation },
  { id: "ownership", name: "ownership", options: updateOwnership },
];

// Start Petrochemicals Page
const Petrochemicals = () => {
  const [checkedList, setCheckedList] = useState([]);
  const [filtersList, setFiltersList] = useState([]);
  const [filtersTab, setFiltersTab] = useState([]);
  const [selectCat, setSelectCat] = useState([]);
  const [selectTab, setSelectTab] = useState("all");

  let petrochemicalsDataCopy =
    selectTab === "all" ? allPetrochemicalsData : filtersTab;

  let tabCategoriesList = [];
  let tabLocation = [];
  let tabOwnership = [];

  // Countries Tab
  petrochemicals.map((pc) => {
    pc.data.map((data) => {
      if (pc.global === selectTab) {
        tabLocation.push(data.location);
        tabOwnership.push(data.ownership);
      }
    });
  });

  const updateTabLocation = removeDuplicateOptions(tabLocation);
  const updateTabOwnership = removeDuplicateOptions(tabOwnership);

  tabCategoriesList = [
    { id: "location", name: "location", options: updateTabLocation },
    { id: "ownership", name: "ownership", options: updateTabOwnership },
  ];

  // Handle Tab
  const handleTabs = (event) => {
    const { value } = event.target;
    let updateFiltersTab = [...filtersTab];

    updateFiltersTab = allPetrochemicalsData.filter(
      (pc) => pc.country === value
    );

    const removeDuplicateFilters = removeDuplicateOptions(updateFiltersTab);
    setFiltersTab(removeDuplicateFilters);
    setSelectTab(value);
  };

  // Handle change
  const handleChange = (event, id) => {
    const { value, checked } = event.target;
    let updateList = [...checkedList];
    let updateFiltersList = [...filtersList];
    let updateSelectCat = [...selectCat];

    // Filter Selected
    if (checked) {
      updateList = [...checkedList, value];
      petrochemicalsDataCopy.filter((pc) => {
        if (
          pc.location === value ||
          pc.country === value ||
          pc.ownership === value
        ) {
          updateFiltersList.push(pc);
        }
      });
    } else {
      updateList.splice(checkedList.indexOf(value), 1);
      petrochemicalsDataCopy.filter((pc) => {
        if (
          pc.location === value ||
          pc.country === value ||
          pc.ownership === value
        ) {
          updateFiltersList = updateFiltersList.filter((item) => item !== pc);
        }
      });
    }
    const removeDuplicateFilters = removeDuplicateOptions(updateFiltersList);

    setFiltersList(removeDuplicateFilters);
    setCheckedList(updateList);
    setSelectCat(updateSelectCat);
  };

  return (
    <React.StrictMode>
      <Header />
      <Titlebar
        titleTop="Petrochemicals"
        titleBottom=""
        description="List of Petrochemicals"
        image={image}
      />
      <main>
        <section className="relative allPetrochemicalsData-page">
          <div className="container">
            <Filters
              tabCategories={tabCategoriesList}
              tabs={tabs}
              selectTab={selectTab}
              categories={categories}
              handleChange={handleChange}
              handleTabs={handleTabs}
              filtersTab={filtersTab}
            >
              <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-5">
                    Petrochemicals List
                  </h2>
                  <ul className="w-full relative flex flex-wrap p-0 m-0">
                    {checkedList.map((list, index) => (
                      <li
                        key={index}
                        className="inline-flex items-center text-sm bg-gray-200 rounded-md text-black py-1 px-2 mr-5"
                      >
                        {list}
                      </li>
                    ))}
                  </ul>
                  <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-10 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {filtersList.length === 0
                      ? petrochemicalsDataCopy.map((pc) => (
                          <article
                            key={pc.id}
                            className="relative flex max-w-xl flex-col items-start justify-between"
                          >
                            <div className="relative aspect-h-1 aspect-w-1 w-full h-72 mb-4 overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                              <img
                                src={pc.imageSrc}
                                alt={pc.name}
                                className="h-full w-full object-cover object-center group-hover:opacity-75"
                              />
                              <p className="absolute top-2 left-2 z-10 rounded-full bg-gray-50 px-2 py-1 text-xs leading-3 capitalize font-medium text-gray-800 hover:bg-gray-100">
                                {pc.ownership}
                              </p>
                            </div>
                            <div className="w-full flex flex-wrap items-center justify-between gap-x-4 text-xs">
                              <p className="text-gray-500">{pc.phone}</p>
                              <a
                                href="/"
                                className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 capitalize font-medium text-gray-600 hover:bg-gray-100"
                              >
                                {pc.city}
                              </a>
                            </div>
                            <div className="group relative">
                              <h3 className="mt-3 text-lg capitalize font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                <a
                                  href={pc.website}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <span className="absolute inset-0" />
                                  Petrocemical: {pc.name}
                                </a>
                              </h3>
                              <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                                Email: {pc.email}
                              </p>
                            </div>
                            <div className="w-full relative mt-4 flex items-center gap-x-4">
                              <div className="w-full flex flex-wrap items-center justify-between text-sm leading-6">
                                <p className="font-semibold text-gray-900">
                                  <span className="absolute inset-0" />
                                  Country:
                                  <span className="pl-2 uppercase text-gray-500">
                                    {pc.country}
                                  </span>
                                </p>
                                <p className="font-semibold text-gray-900">
                                  <span className="absolute inset-0" />
                                  City:
                                  <span className="pl-2 capitalize text-gray-500">
                                    {pc.location}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </article>
                        ))
                      : filtersList.map((pc, index) => (
                          <article
                            key={pc.id}
                            className="relative flex max-w-xl flex-col items-start justify-between"
                          >
                            <div className="relative aspect-h-1 aspect-w-1 w-full h-72 mb-4 overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                              <img
                                src={pc.imageSrc}
                                alt={pc.name}
                                className="h-full w-full object-cover object-center group-hover:opacity-75"
                              />
                              <p className="absolute top-2 left-2 z-10 rounded-full bg-gray-50 px-2 py-1 text-xs leading-3 capitalize font-medium text-gray-800 hover:bg-gray-100">
                                {pc.ownership}
                              </p>
                            </div>
                            <div className="w-full flex flex-wrap items-center justify-between gap-x-4 text-xs">
                              <p className="text-gray-500">{pc.phone}</p>
                              <a
                                href="/"
                                className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 capitalize font-medium text-gray-600 hover:bg-gray-100"
                              >
                                {pc.city}
                              </a>
                            </div>
                            <div className="group relative">
                              <h3 className="mt-3 text-lg capitalize font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                <a
                                  href={pc.website}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <span className="absolute inset-0" />
                                  Petrocemical: {pc.name}
                                </a>
                              </h3>
                              <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                                Email: {pc.email}
                              </p>
                            </div>
                            <div className="w-full relative mt-4 flex items-center gap-x-4">
                              <div className="w-full flex flex-wrap items-center justify-between text-sm leading-6">
                                <p className="font-semibold text-gray-900">
                                  <span className="absolute inset-0" />
                                  Country:
                                  <span className="pl-2 uppercase text-gray-500">
                                    {pc.country}
                                  </span>
                                </p>
                                <p className="font-semibold text-gray-900">
                                  <span className="absolute inset-0" />
                                  City:
                                  <span className="pl-2 capitalize text-gray-500">
                                    {pc.location}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </article>
                        ))}
                  </div>
                </div>
              </div>
            </Filters>
          </div>
        </section>
      </main>
    </React.StrictMode>
  );
};

export default Petrochemicals;
