import {create} from 'zustand';
import { immer } from 'zustand/middleware/immer';
import PairedDevice from "@/bluetooth/pairedDevice";
import Device from "@/bluetooth/device";

export  interface DefaultBotConfig {
    BOT_MAC_QUICK_ADDR: string;
    BOT_SERVICE_UUID: string;
    BOT_COLOR_CHARACTERISTIC_UUID: string;
    BOT_POWER_CHARACTERISTIC_UUID: string;
}
const DEFAULT_BULB_CONFIG:DefaultBotConfig = {
    BOT_MAC_QUICK_ADDR 			: "98:5D:AD:25:DB:90",
    BOT_SERVICE_UUID 				: "f000ffa0-0451-4000-b000-000000000000",
    BOT_COLOR_CHARACTERISTIC_UUID 	: "f000ffa5-0451-4000-b000-000000000000",
    BOT_POWER_CHARACTERISTIC_UUID  : "f000ffa3-0451-4000-b000-000000000000"
}
interface BluetoothState {
    pairedDevice: PairedDevice;
    lastConnectedDevice:string;
    discoveredDevices: Array<Device>;
    defaultBot:DefaultBotConfig;
    setLastConnectedDevice:(state:string) => void;
    setDefaultBot:(state:DefaultBotConfig) => void;
    setPairedDevice:(state:PairedDevice) => void;
    setDiscoveredDevices:(state:Array<Device>) => void;
}

export const useBluetoothStore = create<BluetoothState>()(
    immer((set, _get) => ({
        lastConnectedDevice: "",
        pairedDevice: new PairedDevice(),
        defaultBot: DEFAULT_BULB_CONFIG,
        discoveredDevices: new Array<Device>(),
        setLastConnectedDevice: (value:string) => {
            set((state) => {
                state.lastConnectedDevice = value
            })
        },
        setDefaultBot: (value:DefaultBotConfig) => {
            set((state) => {
                state.defaultBot = value
            })

        },
        setPairedDevice: (value:PairedDevice) => {
            set((state) => {
                state.pairedDevice = value
            })
        },
        setDiscoveredDevices: (value:Array<Device>) => {
            set((state) => {
                state.discoveredDevices = value
            })
        }

    }))
);
