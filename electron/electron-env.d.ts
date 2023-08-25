/// <reference types="vite-electron-plugin/electron-env" />

declare namespace NodeJS {
  interface ProcessEnv {
    VSCODE_DEBUG?: 'true'
    DIST_ELECTRON: string
    VITE_DEV_SERVER_URL: string
    DIST: string
    /** /dist/ or /public/ */
    PUBLIC: string
  }

}

declare namespace Bluetooth {
  type DataItem = {
    time: string;
    data: {
      [CHARACTERISTIC: string]:
          | number[]
          | string
          | "WRITE_ONLY";
    };
  };

  type ScanData = {
    [DEVICE_ID: string]: {
      [SERVICE_ID: string]: DataItem[];
    };
  };
}