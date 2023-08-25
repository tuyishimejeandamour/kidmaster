import Device from "@/bluetooth/device";
import * as electron from "electron";

export  function insertListItem(device:electron.BluetoothDevice,index: number,handleClick:Function): void {
    const parentUl = document.querySelector('#devices') as HTMLUListElement; // Replace with your actual ul class name
    const li = document.createElement('li');
    li.className = 'border-gray-400 flex flex-row mb-2';

    const innerDiv = document.createElement('div');
    innerDiv.className = 'select-none cursor-pointer bg-gray-800/20 rounded-md flex flex-1 items-center p-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg';

    const emojiDiv = document.createElement('div');
    emojiDiv.className = 'flex flex-col rounded-md w-10 h-10 bg-gray-700 justify-center items-center mr-4';
    emojiDiv.textContent = '⚽️';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'flex-1 pl-1 mr-16';

    const titleDiv = document.createElement('div');
    titleDiv.className = 'font-medium truncate';
    titleDiv.textContent = 'Training';

    const durationDiv = document.createElement('div');
    durationDiv.className = 'text-gray-400 text-sm';
    durationDiv.textContent = '1h';

    const timeDiv = document.createElement('div');
    timeDiv.className = 'text-gray-400 text-xs';
    timeDiv.textContent = '10:00 AM';
    timeDiv.onclick = handleClick(device.deviceId);

    contentDiv.appendChild(titleDiv);
    contentDiv.appendChild(durationDiv);

    innerDiv.appendChild(emojiDiv);
    innerDiv.appendChild(contentDiv);
    innerDiv.appendChild(timeDiv);

    li.appendChild(innerDiv);

    parentUl.appendChild(li);
}
