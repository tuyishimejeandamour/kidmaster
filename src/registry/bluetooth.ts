
export class BluetoothTerminal {
    private _receiveBuffer: string;
    private readonly _maxCharacteristicValueLength: number;
    private _device:BluetoothDevice;
    private _characteristic: BluetoothRemoteGATTCharacteristic;
    private readonly _boundHandleDisconnection: OmitThisParameter<(event: any) => void>;
    private readonly _boundHandleCharacteristicValueChanged: OmitThisParameter<(event: any) => void>;
    private _serviceUuid: BluetoothServiceUUID = {} as BluetoothServiceUUID;
    private _characteristicUuid: BluetoothCharacteristicUUID = {} as BluetoothCharacteristicUUID;
    private _receiveSeparator: string | String = String();
    private _sendSeparator: string | String = String();
    constructor(serviceUuid = 0xFFE0, characteristicUuid = 0xFFE1,
                receiveSeparator = '\n', sendSeparator = '\n') {
        this._receiveBuffer = ''
        this._maxCharacteristicValueLength = 20; // Max characteristic value length.
        this._device = {} as BluetoothDevice
        this._characteristic = {} as BluetoothRemoteGATTCharacteristic
        this._boundHandleDisconnection = this._handleDisconnection.bind(this);
        this._boundHandleCharacteristicValueChanged =
            this._handleCharacteristicValueChanged.bind(this);

        this.setServiceUuid(serviceUuid);
        this.setCharacteristicUuid(characteristicUuid);
        this.setReceiveSeparator(receiveSeparator);
        this.setSendSeparator(sendSeparator);
    }

    /**
     * Set number or string representing service UUID used.
     * @param {!(number|string)} uuid - Service UUID
     */
    public setServiceUuid(uuid: (number | string | String | any)) {
        if (!Number.isInteger(uuid) &&
            !(typeof uuid === 'string' || uuid instanceof String)) {
            throw new Error('UUID type is neither a number nor a string');
        }

        if (!uuid) {
            throw new Error('UUID cannot be a null');
        }

        this._serviceUuid = uuid;
    }

    /**
     * Set number or string representing characteristic UUID used.
     * @param {!(number|string)} uuid - Characteristic UUID
     */
    public setCharacteristicUuid(uuid: any) {
        if (!Number.isInteger(uuid) &&
            !(typeof uuid === 'string' || uuid instanceof String)) {
            throw new Error('UUID type is neither a number nor a string');
        }

        if (!uuid) {
            throw new Error('UUID cannot be a null');
        }

        this._characteristicUuid = uuid;
    }

    /**
     * Set character representing separator for data coming from the connected
     * device, end of line for example.
     * @param {string} separator - Receive separator with length equal to one
     *                             character
     */
    setReceiveSeparator(separator: string | String|any) {
        if (!(typeof separator === 'string' || separator instanceof String)) {
            throw new Error('Separator type is not a string');
        }

        if (separator.length !== 1) {
            throw new Error('Separator length must be equal to one character');
        }

        this._receiveSeparator = separator;
    }

    /**
     * Set string representing separator for data coming to the connected
     * device, end of line for example.
     * @param {string} separator - Send separator
     */
    setSendSeparator(separator: string|any) {
        if (!(typeof separator === 'string' || separator instanceof String)) {
            throw new Error('Separator type is not a string');
        }

        if (separator.length !== 1) {
            throw new Error('Separator length must be equal to one character');
        }

        this._sendSeparator = separator;
    }

    /**
     * Launch Bluetooth device chooser and connect to the selected device.
     * @return {Promise} Promise which will be fulfilled when notifications will
     *                   be started or rejected if something went wrong
     */
    public connect(): Promise<any> {
        return this._connectToDevice(this._device);
    }

    /**
     * Disconnect from the connected device.
     */
    disconnect() {
        this._disconnectFromDevice(this._device);

        if (this._characteristic) {
            this._characteristic.removeEventListener('characteristicvaluechanged',
                this._boundHandleCharacteristicValueChanged);
            this._characteristic = {} as BluetoothRemoteGATTCharacteristic;
        }

        this._device = {} as BluetoothDevice;
    }

    /**
     * Data receiving handler which called whenever the new data comes from
     * the connected device, override it to handle incoming data.
     * @param {string} data - Data
     */
    receive(data:any) {
        // Handle incoming data.
    }

    /**
     * Send data to the connected device.
     * @param {string} data - Data
     * @return {Promise} Promise which will be fulfilled when data will be sent or
     *                   rejected if something went wrong
     */
    public send(data:string) {
        // Convert data to the string using global object.
        data = String(data || '');

        // Return rejected promise immediately if data is empty.
        if (!data) {
            return Promise.reject(new Error('Data must be not empty'));
        }

        data += this._sendSeparator;

        // Split data to chunks by max characteristic value length.
        const chunks = BluetoothTerminal._splitByLength(data,
            this._maxCharacteristicValueLength);

        // Return rejected promise immediately if there is no connected device.
        if (!this._characteristic) {
            return Promise.reject(new Error('There is no connected device'));
        }

        // Write first chunk to the characteristic immediately.
        if (chunks) {
            let promise = this._writeToCharacteristic(this._characteristic, chunks[0]);


            // Iterate over chunks if there are more than one of it.
            for (let i = 1; i < chunks.length; i++) {
                // Chain new promise.
                promise = promise.then(() => new Promise((resolve, reject) => {
                    // Reject promise if the device has been disconnected.
                    if (!this._characteristic) {
                        reject(new Error('Device has been disconnected'));
                    }

                    // Write chunk to the characteristic and resolve the promise.
                    this._writeToCharacteristic(this._characteristic, chunks[i]).then(resolve).catch(reject);
                }));
            }

            return promise;
        }
    }

    /**
     * Get the connected device name.
     * @return {string} Device name or empty string if not connected
     */
    public getDeviceName() {
        if (!this._device) {
            return '';
        }

        return this._device.name;
    }

    /**
     * Connect to device.
     * @param {Object} device
     * @return {Promise}
     * @private
     */
    private async _connectToDevice(device: any): Promise<any> {
        try {
            const device_1 = await (device ? Promise.resolve(device) : this._requestBluetoothDevice());
            const characteristic = await this._connectDeviceAndCacheCharacteristic(device_1);
            return this._startNotifications(characteristic);
        } catch (error:any) {
            this._log(error);
            return await Promise.reject(error);
        }
    }

    /**
     * Disconnect from device.
     * @param {Object} device
     * @private
     */
    private _disconnectFromDevice(device:BluetoothDevice) {
        if (!device) {
            return;
        }

        this._log('Disconnecting from "' + device.name + '" bluetooth device...');

        device.removeEventListener('gattserverdisconnected',
            this._boundHandleDisconnection);

        if (!device.gatt?.connected) {
            this._log('"' + device.name +
                '" bluetooth device is already disconnected');
            return;
        }

        device.gatt.disconnect();

        this._log('"' + device.name + '" bluetooth device disconnected');
    }

    /**
     * Request bluetooth device.
     * @return {Promise}
     * @private
     */
    private async _requestBluetoothDevice(): Promise<any> {
        this._log('Requesting bluetooth device...');

        const device = await navigator.bluetooth.requestDevice({
            filters: [{services: [this._serviceUuid]}],
        });
        this._log('"' + device.name + '" bluetooth device selected');
        this._device = device; // Remember device.
        this._device.addEventListener('gattserverdisconnected',
            this._boundHandleDisconnection);
        return this._device;
    }

    /**
     * Connect device and cache characteristic.
     * @param {Object} device
     * @return {Promise}
     * @private
     */
    private async _connectDeviceAndCacheCharacteristic(device: BluetoothDevice): Promise<BluetoothRemoteGATTCharacteristic> {
        // Check remembered characteristic.
        if (device.gatt?.connected && this._characteristic) {
            return Promise.resolve(this._characteristic);
        }

        this._log('Connecting to GATT server...');

        try {
            const server = await device.gatt?.connect();
            this._log('GATT server connected', 'Getting service...');

            const service = await server?.getPrimaryService(this._serviceUuid);
            this._log('Service found', 'Getting characteristic...');

            const characteristic = await service?.getCharacteristic(this._characteristicUuid);
            this._log('Characteristic found');

            this._characteristic = characteristic as BluetoothRemoteGATTCharacteristic; // Remember characteristic.

            return this._characteristic;
        } catch (error) {
            throw error;
        }
    }


    /**
     * Start notifications.
     * @param {Object} characteristic
     * @return {Promise}
     * @private
     */
    private async _startNotifications(characteristic: BluetoothRemoteGATTCharacteristic): Promise<void> {
        this._log('Starting notifications...');

        await characteristic.startNotifications();
        this._log('Notifications started');
        characteristic.addEventListener('characteristicvaluechanged',
            this._boundHandleCharacteristicValueChanged);
    }

    /**
     * Stop notifications.
     * @param {Object} characteristic
     * @return {Promise}
     * @private
     */
    private async _stopNotifications(characteristic: BluetoothRemoteGATTCharacteristic) {
        this._log('Stopping notifications...');
        await characteristic.stopNotifications();
        this._log('Notifications stopped');
        characteristic.removeEventListener('characteristicvaluechanged',
            this._boundHandleCharacteristicValueChanged);
    }

    /**
     * Handle disconnection.
     * @param {Object} event
     * @private
     */
    _handleDisconnection(event:any) {
        const device = event.target;

        this._log('"' + device.name +
            '" bluetooth device disconnected, trying to reconnect...');

        this._connectDeviceAndCacheCharacteristic(device).
        then((characteristic) => this._startNotifications(characteristic)).
        catch((error) => this._log(error));
    }

    /**
     * Handle characteristic value changed.
     * @param {Object} event
     * @private
     */
    _handleCharacteristicValueChanged(event:any) {
        const value = new TextDecoder().decode(event.target.value);

        for (const c of value) {
            if (c === this._receiveSeparator) {
                const data = this._receiveBuffer.trim();
                this._receiveBuffer = '';

                if (data) {
                    this.receive(data);
                }
            } else {
                this._receiveBuffer += c;
            }
        }
    }

    /**
     * Write to characteristic.
     * @param {Object} characteristic
     * @param {string} data
     * @return {Promise}
     * @private
     */
    private _writeToCharacteristic(characteristic: BluetoothRemoteGATTCharacteristic, data: string | undefined): Promise<any> {
        return characteristic.writeValue(new TextEncoder().encode(data));
    }

    /**
     * Log.
     * @param {Array} messages
     * @private
     */
    _log(...messages: string[]) {
        console.log(...messages); // eslint-disable-line no-console
    }

    /**
     * Split by length.
     * @param {string} string
     * @param {number} length
     * @return {Array}
     * @private
     */
    static _splitByLength(string: string, length: number): RegExpMatchArray {
        return string.match(new RegExp('(.|[\r\n]){1,' + length + '}', 'g')) as RegExpMatchArray;
    }
}
