export default function generateUUID(): string {
    if (window.crypto && window.crypto.getRandomValues) {
        // Use window.crypto API for modern browsers
        const buffer = new Uint16Array(8);
        window.crypto.getRandomValues(buffer);
        return (
            pad4(buffer[0]) +
            pad4(buffer[1]) +
            '-' +
            pad4(buffer[2]) +
            '-' +
            pad4(buffer[3]) +
            '-' +
            pad4(buffer[4]) +
            '-' +
            pad4(buffer[5]) +
            pad4(buffer[6]) +
            pad4(buffer[7])
        );
    } else {
        // Fallback for browsers that do not support window.crypto
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (
            c
        ) {
            const r = (Math.random() * 16) | 0;
            const v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }
}

function pad4(number: number): string {
    return ('0000' + number.toString(16)).slice(-4);
}

