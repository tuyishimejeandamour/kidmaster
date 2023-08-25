import {useBluetoothStore} from "@/store/bluetoothStore";

export default class PairedDevice {
    device_reference: null | any;
    device_id: null | BluetoothServiceUUID | string;
    server: null | any;
    service: null | any;
    characteristic_map: any[];
    name: string | null = null;


    constructor() {
        this.device_reference = null;
        this.device_id = null;
        this.server = null;
        this.service = null;
        this.name = null;
        this.characteristic_map = [];
    }

    reset() {
        if (this.device_id !== null && typeof this.device_id !== "number" && this.device_id?.replace(/ /g, "") !== "") {
            const { setLastConnectedDevice } = useBluetoothStore();
            setLastConnectedDevice(this.device_id);
        }

        this.device_reference = null;
        this.device_id = null;
        this.server = null;
        this.service = null;
        this.characteristic_map = [];
    }
}