export default class Device {
    deviceName: string;
    deviceId: string;

    constructor(name: string, id: string) {
        this.deviceName = name;
        this.deviceId = id;
    }
}