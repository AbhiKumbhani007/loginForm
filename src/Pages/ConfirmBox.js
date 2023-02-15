import React, { Fragment } from "react";

function ConfirmBox({ onConfirm, onCancel, message }) {
  return (
    <Fragment>
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white w-96 p-4 rounded-lg shadow-lg">
          <p className="text-lg font-medium mb-2">{message}</p>
          <div className="flex justify-end">
            <button
              className="inline-block px-6 py-2.5 mr-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              onClick={onConfirm}
            >
              Yes
            </button>
            <button
              className="inline-block px-6 py-2.5 mr-2 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
              onClick={onCancel}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ConfirmBox;
