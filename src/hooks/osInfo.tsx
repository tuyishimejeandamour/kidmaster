import { useEffect, useState } from 'react';
import {ipcRenderer} from "electron";

export const useOSInfo = () => {
    const [os, setOS] = useState<string>();

    useEffect(() => {
        (async () => {
            if(navigator) {
                try {
                    const osData = (navigator.userAgent.indexOf('Linux') > -1) ? 'linux' : (navigator.userAgent.indexOf('Mac') > -1) ? 'mac' : (navigator.userAgent.indexOf('Win') > -1) ? 'windows' : 'unknown';
                    setOS(osData);
                } catch (error) {
                    console.error(error);
                }
            }
        })();
    }, [navigator.userAgent]);

    const compareOS = (os: string) => {
        return os === os;
    };


    return {os, compareOS};
}