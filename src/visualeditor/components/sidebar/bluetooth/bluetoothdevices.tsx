import React from 'react'
import PairedDevice from "@/bluetooth/pairedDevice";
import {ipcRenderer} from "electron";
import {useBluetoothStore} from "@/store/bluetoothStore";
import {showDesktopNotification} from "../../../../../electron/main/notification";
import {asyncForEach} from "@/bluetooth/bluetoothPair";

interface Props {
    deviceId: string
}

export default function RenderBluetoothDevice({deviceId}: Props) {
    const [pairedDevice, setPairedDevices] = React.useState<PairedDevice>(new PairedDevice());
    const {setLastConnectedDevice, setPairedDevice, defaultBot} = useBluetoothStore()

    function requestDevicePair(deviceId: string) {


        ipcRenderer.sendSync("bluetooth-state", {
            mode: "pairing",
            deviceId: deviceId
        });


        navigator.bluetooth.requestDevice({

            acceptAllDevices: true,
            optionalServices: ["generic_access", "battery_service", "device_information", defaultBot.BOT_SERVICE_UUID]

        }).then(device => {

            console.log("==================================")
            console.log("Bluetooth Pairing Callback")
            console.log(device);

            pairedDevice.device_reference = device;
            pairedDevice.deviceId = deviceId;
            setLastConnectedDevice(deviceId);
            pairedDevice.characteristic_map = new Map<string, BluetoothRemoteGATTCharacteristic>();
            setPairedDevice(pairedDevice);

            device.addEventListener("gattserverdisconnected", () => {
                console.log("DEVICE DISCONNECTED - RESET MENUS");
                pairedDevice.reset();
                setPairedDevice(pairedDevice);

                showDesktopNotification("Device disconnected", "device-unpaired")
            })

            return device.gatt?.connect();

        }).then(server => {

            console.log("Getting light control server. . .");
            console.log(server)

            pairedDevice.server = server;
            setPairedDevice(pairedDevice);
            showDesktopNotification("Paired successfully", "pair-success");

            $(".device-developer span.device_name").text(`Device Name: ${pairedDevice.device_reference.name}`)
            $(".device-developer > span.deviceId").text(`Device ID: ${pairedDevice.device_reference.id}`)

            server?.getPrimaryServices().then(function (services) {
                console.log("SERVICES", services);
            })

            return server?.getPrimaryService(defaultBot.BOT_SERVICE_UUID);

        }).then(service => {

            console.log(`Service ${service?.uuid}`);

            pairedDevice.service = service;
            setPairedDevice(pairedDevice);
            service?.getCharacteristics().then(characteristics => {

                let doAsyncForEach = async () => {

                    await asyncForEach(characteristics, async (characteristic: { uuid: string }) => {

                        pairedDevice.characteristic_map.set(characteristic.uuid, characteristic);
                        console.log(`Characteristic: ${characteristic.uuid}`, characteristic)
                        setPairedDevice(pairedDevice);
                    })

                    console.log(pairedDevice);

                    getBulbColor(true);
                    getBulbPowerState(true);

                }

                doAsyncForEach();

            })

        }).catch((e) => {
            console.log(e);
            showDesktopNotification("pair-failure", "Failed to pair to device");
        })

    }
}


return (
    <div className="flex mx-auto w-full items-center justify-center">
        <ul className="flex flex-col p-4 text-gray-300">
        </ul>
    </div>
)
}