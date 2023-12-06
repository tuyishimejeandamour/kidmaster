import RenderBluetoothDevice from "@/visualeditor/components/sidebar/bluetooth/bluetoothdevices";
import React, {useEffect, useState} from "react";
import Sideloading from "@/visualeditor/components/sidebar/bluetooth/Sketelonload";
import {ipcRenderer} from "electron";
import * as electron from "electron";
import {useBluetoothStore} from "@/store/bluetoothStore";
import Device from "@/bluetooth/device";
import {Message} from "@arco-design/web-react";
import {useUIStore} from "@/visualeditor";

export default function (){
    const {showBluetoothDevices,setShowBluetoothDevices} = useUIStore();
    const {discoveredDevices,setDiscoveredDevices,defaultBot} = useBluetoothStore();
    const [scanned,setScanned] = useState([]);
    const devices = ()=> {
        ipcRenderer.on("bluetooth-discovery-response", (_event, response) => {

            let devices = response.devices;

            // console.log(devices);

            let device_map = devices.filter((device: electron.BluetoothDevice) => {

                if ( !device.deviceName.includes(device.deviceId)){
                    return device;
                }

            })

            setScanned(device_map)


        })
    }
   const handRequest = (id:any)=> {
    console.log(id)
   }
    const scan = ()=>{
                // Electron-specific code
                // Connect via backend

                if (showBluetoothDevices){
                    setShowBluetoothDevices(true);

                    console.log("Requesting Bluetooth Scan");

                    ipcRenderer.sendSync("bluetooth-state", {
                        mode : "discovery"
                    })

                    navigator.bluetooth.requestDevice({
                        acceptAllDevices : true,
                    }).then(_device => {
                        console.log("Bluetooth Discovery Callback");
                    }).catch(error => {
                        console.log(error)
                        // if (error.message.indexOf("bluetooth adapter not available") > -1){
                        //     Message.error("Failed to find bluetooth adapter");
                        // } else if (error.message.indexOf("User cancelled") > -1){
                        //     Message.error("Scan cancelled");
                        // } else {
                        //     Message.error(`An error has occurred:\n${error.message}`);
                        // }


                    }).finally(() => {
                        Message.info("stop scanning");
                        setDiscoveredDevices(scanned);
                    })

                } else {

                    setShowBluetoothDevices(false)

                    Message.info("Scanning stopped");

                    ipcRenderer.send("bluetooth-state", {
                        mode : "discovery",
                        stop : true
                    });
                }

    }

    useEffect(()=>{
        devices();
        console.log(scanned)
        return(() =>{
            ipcRenderer.removeAllListeners("bluetooth-discovery-response");
        })
        },[scanned])

    function handleScan() {
        scan();
    }

     // return !showBluetoothDevices ? <RenderBluetoothDevice discoveredDevices={scanned} /> : <Sideloading handleScan={handleScan} />
    return (
        <div className="flex mx-auto w-full items-center justify-center">
            { scanned.length > 0 &&
            <ul className="flex flex-col w-full p-4 text-gray-300">
                { scanned.map((device:Device,_index:number)=>{
                    if(device){
                        return (
                    <li className="border-gray-400 w-full flex flex-row mb-2">
                        <div className="select-none w-full cursor-pointer bg-gray-800/20 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                            <div className="flex flex-col rounded-md w-10 h-10 bg-gray-700 justify-center items-center mr-4">
                                <svg className={"fill-slate-300 w-8 h-8"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13.5 2C13.5 2.44425 13.3069 2.84339 13 3.11805V5H18C19.6569 5 21 6.34315 21 8V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V8C3 6.34315 4.34315 5 6 5H11V3.11805C10.6931 2.84339 10.5 2.44425 10.5 2C10.5 1.17157 11.1716 0.5 12 0.5C12.8284 0.5 13.5 1.17157 13.5 2ZM6 7C5.44772 7 5 7.44772 5 8V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V8C19 7.44772 18.5523 7 18 7H13H11H6ZM2 10H0V16H2V10ZM22 10H24V16H22V10ZM9 14.5C9.82843 14.5 10.5 13.8284 10.5 13C10.5 12.1716 9.82843 11.5 9 11.5C8.17157 11.5 7.5 12.1716 7.5 13C7.5 13.8284 8.17157 14.5 9 14.5ZM15 14.5C15.8284 14.5 16.5 13.8284 16.5 13C16.5 12.1716 15.8284 11.5 15 11.5C14.1716 11.5 13.5 12.1716 13.5 13C13.5 13.8284 14.1716 14.5 15 14.5Z"></path></svg>
                            </div>
                            <div className="flex-1 pl-1">
                                <div className=" w-full truncate"><span className={"truncate font-medium"}>{device.deviceName}</span></div>
                                <div className="text-gray-400 text-sm">{device.deviceId}</div>
                            </div>
                            <div className="text-gray-400 w-10 text-xs">connect</div>
                        </div>
                    </li>)}
                })
                }
            </ul>
            }
            {
                scanned.length == 0 && <Sideloading handleScan={handleScan} />
            }
        </div>
    )

}