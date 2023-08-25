import {app, BrowserWindow, ipcMain, shell} from 'electron'
import {release} from 'node:os'
import {join} from 'node:path'
import * as fs from 'node:fs'
import * as path from 'node:path'
import {update} from './update'
import ScanData = Bluetooth.ScanData;

process.env.DIST_ELECTRON = join(__dirname, '../')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.DIST_ELECTRON, '../public')
  : process.env.DIST

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}
app.commandLine.appendSwitch("enable-web-bluetooth", 'true');
app.commandLine.appendSwitch('enable-experimental-web-platform-features', 'true');

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow | null = null
// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.js')
const url = process.env.VITE_DEV_SERVER_URL
const indexHtml = join(process.env.DIST, 'index.html')

async function createWindow() {
  win = new BrowserWindow({
    title: 'Main window',
    icon: join(process.env.PUBLIC, 'favicon.ico'),
    titleBarStyle: 'hidden',
    titleBarOverlay: true,
    frame: false,
    webPreferences: {
      preload,
      sandbox: false,
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  if (url) { // electron-vite-vue#298
    await win.loadURL(url)
    // Open devTool if the app is not packaged
    win.webContents.openDevTools()
  } else {
    await win.loadFile(indexHtml)
  }
  win.setMenu(null)
  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })

  // Apply electron-updater
  update(win)
}

app.whenReady().then(async () => {
  await createWindow();
    // Bluetooth
    // Universal Settings
    let bluetooth_state_manager = {
      mode : "none",
      timeout : null as  NodeJS.Timeout | null,
      callback : null as Function | null,
      setCallback : function(callback_fn:any){
        bluetooth_state_manager.callback = function(args:any){

          bluetooth_state_manager.mode = "none";
          bluetooth_state_manager.callback = null;

          if (bluetooth_state_manager.timeout){
            clearTimeout(bluetooth_state_manager.timeout);
          }

          callback_fn(args);
        }
      }
    }

    let bluetooth_discovery_device_list:  Electron.BluetoothDevice[];
    let bluetooth_pairing_device_id: string;

    //

    function updateClientBluetoothDiscovery(isFinal:boolean){
      win?.webContents.send("bluetooth-discovery-response", {
        devices : bluetooth_discovery_device_list,
        isFinal : isFinal
      })
    }

    //

    ipcMain.on("bluetooth-state", (event, args) => {
      // args.mode = "discovery" or "pairing"

      if (args.mode !== "discovery" && args.mode !== "pairing"){
        throw new Error(`Attempted to set bluetooth state manager to invalid state : ${args.mode}`);
      }

      if (args.mode == "discovery" && args.stop == true){
        // discovery-stop

        console.log("Bluetooth Discovery Stopped");

        if (bluetooth_state_manager.callback){
          bluetooth_state_manager.callback("");
        }

        updateClientBluetoothDiscovery(true);

        event.returnValue = 200;
        return;
      }

      bluetooth_state_manager.mode = args.mode;

      if (args.mode == "discovery") {
        bluetooth_discovery_device_list = [];
      } else {
        bluetooth_pairing_device_id = args.deviceId;
      }

      let origin_mode = args.mode + "";

      let timeout = setTimeout(function(){
        if (bluetooth_state_manager.mode == origin_mode && bluetooth_state_manager.timeout == timeout){

          console.log((origin_mode == "discovery") ? "Bluetooth Discovery timed out" : "Bluetooth Pairing timed out");

          if (bluetooth_state_manager.callback){
            bluetooth_state_manager.callback("");
          }

          if (origin_mode == "discovery"){
            updateClientBluetoothDiscovery(true);
          }

        }
      }, 30 * 1000);

      bluetooth_state_manager.timeout = timeout;

      event.returnValue = 200;

    })

   console.log("Bluetooth State Manager Initialized");
    win?.webContents.on("select-bluetooth-device", (event, devices_list, callback) => {

      event.preventDefault();

      console.log(`Bluetooth Scanner Triggered | Mode: ${bluetooth_state_manager.mode}`);

      bluetooth_state_manager.setCallback(callback);

      if (bluetooth_state_manager.mode == "discovery"){

        console.log(`(${devices_list.length}) devices found. [${devices_list.length - bluetooth_discovery_device_list.length} new]`)

        bluetooth_discovery_device_list = devices_list;

        updateClientBluetoothDiscovery(true);

      } else if (bluetooth_state_manager.mode == "pairing"){

        let result_device = devices_list.find((device) => {
          return device.deviceId == bluetooth_pairing_device_id;
        })

        if (result_device && bluetooth_state_manager.callback){
          bluetooth_state_manager.callback(result_device.deviceId);
        }

      } else {
        if (bluetooth_state_manager.callback){
          bluetooth_state_manager.callback("");
        }
        throw new Error("Bluetooth State Manager - No Mode Set");
      }
    })

    //

    let scanner_data = {} as Bluetooth.ScanData

    let first_record_timestamp: Date;

    ipcMain.on("data-recorder", (event, args) => {

      if (typeof scanner_data[args.deviceId] == "undefined") {
        scanner_data[args.deviceId] = {};
      }

      if (typeof scanner_data[args.deviceId][args.serviceUUID] == "undefined") {
        scanner_data[args.deviceId][args.serviceUUID]  = [] as any[];
      }

      scanner_data[args.deviceId][args.serviceUUID].push({
        time : args.time,
        data : args.data
      });
      console.log(args)

      if (typeof first_record_timestamp == "undefined"){
        first_record_timestamp = new Date();
      }

      console.log("Recorded Bluetooth Device Service Characteristics");
    })

    function prettyPrintArray(json:JSON | string| ScanData) {
      if (typeof json === 'string') {
        json = JSON.parse(json);
      }
      return JSON.stringify(json, function (_k, v) {
        if (v instanceof Array && typeof v[0] == "number")
          return JSON.stringify(v);
        return v;
      }, 2).replace(/\\/g, '')
          .replace(/"\[/g, '[')
          .replace(/]"/g, ']')
          .replace(/"\{/g, '{')
          .replace(/}"/g, '}');
    }

    ipcMain.on("export-data", (event, args) => {
      console.log("Exporting recorded data . . .", scanner_data);

      fs.writeFileSync(path.join(__dirname, `/dev/data_record.json`), prettyPrintArray(scanner_data), {flag: "w"});

    })

    
})

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', async () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    await createWindow()
  }
})

// New window example arg: new windows url
ipcMain.handle('open-win', async (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,

      contextIsolation: false,
    },
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    await childWindow.loadURL(`${url}#${arg}`)
  } else {
    await childWindow.loadFile(indexHtml, {hash: arg})
  }
})

