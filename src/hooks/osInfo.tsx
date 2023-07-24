import { useEffect, useState } from 'react';

export const useOSInfo = () => {
    const [os, setOS] = useState<string>();

    useEffect(() => {
        (async () => {
            try {
                const osData = process.platform;
                setOS(osData);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    const compareOS = (os: string) => {
        return os === os;
    };


    return {os, compareOS};
}