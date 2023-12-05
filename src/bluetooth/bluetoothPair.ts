// import {useBluetoothStore} from "@/store/bluetoothStore";
//
// export async function asyncForEach(array:any[], callback:Function) {
//
//     for (let index = 0; index < array.length; index++){
//         await callback(array[index], index, array);
//     }
// }
//
// export function setBulbPowerState(state: boolean){
//
//     const { pairedDevice, setPairedDevice,defaultBot } = useBluetoothStore();
//
//     if (!(pairedDevice.deviceId)){
//         console.log("Failed to set bulb power state - no device paired");
//         return
//     }
//
//     if (typeof pairedDevice.characteristic_map.get(defaultBot.BOT_POWER_CHARACTERISTIC_UUID) == "undefined"){
//         console.log("Did not find bluetooth characteristic to set power state");
//         return;
//     }
//
//     let array_uint8 = new Uint8Array([83, (state == true) ? 79 : 67]);
//
//     pairedDevice.characteristic_map.get(defaultBot.BOT_POWER_CHARACTERISTIC_UUID)
//         .writeValue(array_uint8.buffer).then(() => {
//         console.log(`Pushed bulb power state ${(state == true) ? "true" : "false"}`, array_uint8);
//         getBulbPowerState(true);
//     }).catch((e:string) => {
//         console.log("Failure", e);
//     });
//
// }
//
//
// export function getBulbPowerState(power_state:any,doUpdateUI: boolean){
//     const { pairedDevice, setPairedDevice,defaultBot } = useBluetoothStore();
//
//     if (!(pairedDevice.deviceId)){
//         console.log("Failed to get bulb power state - no device paired");
//         return
//     }
//
//     if (typeof pairedDevice.characteristic_map.get(defaultBot.BOT_POWER_CHARACTERISTIC_UUID) == "undefined"){
//         console.log("Did not find bluetooth characteristic to get power state");
//         return;
//     }
//
//     pairedDevice.characteristic_map.get(defaultBot.BOT_POWER_CHARACTERISTIC_UUID).readValue().then(value => {
//
//         let byteArray = getByteArrayFromDataView(value, "getUint8");
//
//         let state = (byteArray[0] == 79);
//
//         console.log("Bulb power state -> ", state, byteArray);
//
//
//
//         if (doUpdateUI){
//             power_state.set(state);
//         }
//
//         return state;
//
//     }).catch((e:string) => {
//         console.log(e);
//     })
//
//
// }
//
// function getByteArrayFromDataView(dataView:ArrayBuffer, bufferType: string){
//
//     if (typeof bufferType == "undefined"){
//         bufferType = "getUint8";
//     }
//
//     let byteArray = [];
//     let bufferSize = dataView.byteLength;
//
//     for (let i = 0; i < bufferSize; i++){
//         // @ts-ignore
//         byteArray[i] = dataView[bufferType](i);
//     }
//
//     return byteArray;
//
// }