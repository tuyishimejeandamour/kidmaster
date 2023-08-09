import React from 'react'
export default function RenderBluetoothDevice () {
  return (
      <div className="flex mx-auto w-full items-center justify-center">
          <ul className="flex flex-col p-4 text-gray-300">
              <li className="border-gray-400 flex flex-row mb-2">
                  <div className="select-none cursor-pointer bg-gray-800/20 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                      <div className="flex flex-col rounded-md w-10 h-10 bg-gray-700 justify-center items-center mr-4">?</div>
                      <div className="flex-1 pl-1 mr-16">
                          <div className="font-medium truncate">Cup of water</div>
                          <div className="text-gray-400 text-sm">200ml</div>
                      </div>
                      <div className="text-gray-400 text-xs">6:00 AM</div>
                  </div>
              </li>
              <li className="border-gray-400 flex flex-row mb-2">
                  <div className="select-none cursor-pointer bg-gray-800/20  rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                      <div className="flex flex-col rounded-md w-10 h-10 bg-gray-700 justify-center items-center mr-4">⚽️</div>
                      <div className="flex-1 pl-1 mr-16">
                          <div className="font-medium truncate">Training</div>
                          <div className="text-gray-400 text-sm">1h</div>
                      </div>
                      <div className="text-gray-400 text-xs">10:00 AM</div>
                  </div>
              </li>
              <li className="border-gray-400 flex flex-row mb-2">
                  <div className="select-none cursor-pointer bg-gray-800/20 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                      <div className="flex flex-col rounded-md w-10 h-10 bg-gray-700 justify-center items-center mr-4">?</div>
                      <div className="flex-1 pl-1 mr-16">
                          <div className="font-medium">Study</div>
                          <div className="text-gray-400 text-sm">4h</div>
                      </div>
                      <div className="text-gray-400 text-xs">1:00 PM</div>
                  </div>
              </li>
          </ul>
      </div>
  )
}