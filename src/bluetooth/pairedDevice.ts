import {useBluetoothStore} from "@/store/bluetoothStore";

export default class PairedDevice {
    device_reference: null | any;
    deviceId: null | BluetoothServiceUUID | string;
    server: null | any;
    service: null | any;
    characteristic_map: Map<string, any>;
    name: string | null = null;


    constructor() {
        this.device_reference = null;
        this.deviceId = null;
        this.server = null;
        this.service = null;
        this.name = null;
        this.characteristic_map = new Map<string, any>();
    }

    reset() {
        if (this.deviceId !== null && typeof this.deviceId !== "number" && this.deviceId?.replace(/ /g, "") !== "") {
            const {setLastConnectedDevice} = useBluetoothStore();
            setLastConnectedDevice(this.deviceId);
        }

        this.device_reference = null;
        this.deviceId = null;
        this.server = null;
        this.service = null;
        this.characteristic_map = new Map<string, any>();
    }
}