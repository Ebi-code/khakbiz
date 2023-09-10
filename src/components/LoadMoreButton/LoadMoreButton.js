import React from "react";

const LoadMoreButton = ({
  showAllHandler,
  moreHandler,
  lessHandler,
  showItems,
  arrLength,
}) => {
  return (
    <div className="relative mt-10 flex items-center justify-center gap-x-6 z-10">
      {showItems < arrLength ? (
        <>
          <button
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => moreHandler()}
          >
            Load More
          </button>
          <button
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => showAllHandler()}
          >
            Show All
          </button>
        </>
      ) : (
        <button
          className="rounded-md bg-rose-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
          onClick={() => lessHandler()}
        >
          Show Less
        </button>
      )}
    </div>
  );
};

export default LoadMoreButton;
