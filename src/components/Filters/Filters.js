/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { Fragment, useState } from "react";

import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const sortOptions = [
  { name: "A to Z", href: "#", current: true },
  { name: "Z to A", href: "#", current: false },
];

// Start Component
const Filters = ({
  children,
  selectTab,
  tabs,
  tabCategories,
  categories,
  handleTabs,
  handleChange,
}) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const checkEmptyArray = (arr) => (arr.length === 0 ? [] : arr);

  checkEmptyArray(tabs);
  checkEmptyArray(tabCategories);
  checkEmptyArray(categories);
  checkEmptyArray(handleTabs);
  checkEmptyArray(handleChange);

  return (
    <div className="bg-white">
      {/* Mobile filter dialog */}
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setMobileFiltersOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4 border-t border-gray-200">
                  <h3 className="sr-only">Categories</h3>

                  {/* Tabs */}
                  {tabs.map((tab) => (
                    <Disclosure
                      as="div"
                      key={tab.id}
                      className="border-b border-gray-200 py-6 px-4"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm capitalize text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {tab.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-4">
                              {tab.options.map((option, optionIdx) => (
                                <div key={option} className="flex items-center">
                                  <input
                                    id={`tabs-${tab.id}-${optionIdx}`}
                                    name={tab.name}
                                    defaultValue={option}
                                    type="radio"
                                    onChange={handleTabs}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`tabs-${tab.id}-${optionIdx}`}
                                    className="ml-3 text-sm capitalize text-gray-600"
                                  >
                                    {option}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                  {/* Categories */}
                  {selectTab === "all"
                    ? categories.map((category) => (
                        <Disclosure
                          as="div"
                          key={category.id}
                          className="border-b border-gray-200 py-6 px-4"
                        >
                          {({ open }) => (
                            <>
                              <h3 className="-my-3 flow-root">
                                <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm capitalize text-gray-400 hover:text-gray-500">
                                  <span className="font-medium text-gray-900">
                                    {category.name}
                                  </span>
                                  <span className="ml-6 flex items-center">
                                    {open ? (
                                      <MinusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <PlusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    )}
                                  </span>
                                </Disclosure.Button>
                              </h3>

                              <Disclosure.Panel className="pt-6">
                                <div className="space-y-4">
                                  {category.options.map((option, optionIdx) => (
                                    <div
                                      key={option}
                                      className="flex items-center px-4"
                                    >
                                      <input
                                        id={`${category.id}-${optionIdx}`}
                                        name={option}
                                        defaultValue={option}
                                        type="checkbox"
                                        onChange={handleChange}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                      />
                                      <label
                                        htmlFor={`${category.id}-${optionIdx}`}
                                        className="ml-3 capitalize text-sm text-gray-600"
                                      >
                                        {option}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ))
                    : tabCategories.map((category) => (
                        <Disclosure
                          as="div"
                          key={category.id}
                          className="border-b border-gray-200 py-6 px-4"
                        >
                          {({ open }) => (
                            <>
                              <h3 className="-my-3 flow-root">
                                <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm capitalize text-gray-400 hover:text-gray-500">
                                  <span className="font-medium text-gray-900">
                                    {category.name}
                                  </span>
                                  <span className="ml-6 flex items-center">
                                    {open ? (
                                      <MinusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <PlusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    )}
                                  </span>
                                </Disclosure.Button>
                              </h3>

                              <Disclosure.Panel className="pt-6">
                                <div className="space-y-4">
                                  {category.options.map((option, optionIdx) => (
                                    <div
                                      key={option}
                                      className="flex items-center"
                                    >
                                      <input
                                        id={`${category.id}-${optionIdx}`}
                                        name={option}
                                        defaultValue={option}
                                        type="checkbox"
                                        // checked="false"
                                        onChange={handleChange}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                      />
                                      <label
                                        htmlFor={`${category.id}-${optionIdx}`}
                                        className="ml-3 text-sm capitalize text-gray-600"
                                      >
                                        {option}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ))}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            New Arrivals
          </h1>
          <div className="flex items-center">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.name}>
                        {({ active }) => (
                          <a
                            href={option.href}
                            className={classNames(
                              option.current
                                ? "font-medium text-gray-900"
                                : "text-gray-500",
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            {option.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <button
              type="button"
              className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
            >
              <span className="sr-only">View grid</span>
              <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <span className="sr-only">Filters</span>
              <FunnelIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div aria-labelledby="products-heading" className="pb-24 pt-6">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          <div className="relative grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* Filters */}
            <form className="sticky top-9 hidden lg:block">
              <h3 className="sr-only">Categories</h3>
              {/* Tabs */}
              {tabs.map((tab) => (
                <Disclosure
                  as="div"
                  key={tab.id}
                  className="border-b border-gray-200 py-6"
                >
                  {({ open }) => (
                    <>
                      <h3 className="-my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm capitalize text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            {tab.name}
                          </span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <PlusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-4">
                          {tab.options.map((option, optionIdx) => (
                            <div key={option} className="flex items-center">
                              <input
                                id={`tabs-${tab.id}-${optionIdx}`}
                                name={tab.name}
                                defaultValue={option}
                                type="radio"
                                checked={tabs === option}
                                onChange={handleTabs}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor={`tabs-${tab.id}-${optionIdx}`}
                                className="ml-3 text-sm capitalize text-gray-600"
                              >
                                {option}
                              </label>
                            </div>
                          ))}
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
              {/* categories */}

              {selectTab === "all"
                ? categories.map((category) => (
                    <Disclosure
                      as="div"
                      key={category.id}
                      className="border-b border-gray-200 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm capitalize text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {category.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>

                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-4">
                              {category.options.map((option, optionIdx) => (
                                <div key={option} className="flex items-center">
                                  <input
                                    id={`${category.id}-${optionIdx}`}
                                    name={option}
                                    defaultValue={option}
                                    type="checkbox"
                                    onChange={handleChange}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`${category.id}-${optionIdx}`}
                                    className="ml-3 text-sm capitalize text-gray-600"
                                  >
                                    {option}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))
                : tabCategories.map((category) => (
                    <Disclosure
                      as="div"
                      key={category.id}
                      className="border-b border-gray-200 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm capitalize text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {category.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>

                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-4">
                              {category.options.map((option, optionIdx) => (
                                <div key={option} className="flex items-center">
                                  <input
                                    id={`${category.id}-${optionIdx}`}
                                    name={option}
                                    defaultValue={option}
                                    type="checkbox"
                                    // checked="false"
                                    onChange={handleChange}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`${category.id}-${optionIdx}`}
                                    className="ml-3 text-sm capitalize text-gray-600"
                                  >
                                    {option}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
            </form>
            {/* Product grid */}
            <div className="lg:col-span-3">
              {/* {filterList.length === 0 ? children : filterList} */}
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
