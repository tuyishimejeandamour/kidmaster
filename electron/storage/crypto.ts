import * as crypto from 'crypto';

const algorithm = 'aes-256-ctr';

type CipherData = {
    iv: string;
    content: string;
};

export function encrypt(text: string, secretKey: string): CipherData {
    const iv = crypto.randomBytes(16).toString('hex');

    const cipher = crypto.createCipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'));

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]).toString('hex');

    return { iv, content: encrypted };
}

export function decrypt(hash: CipherData, secretKey: string): string {
    const decipher = crypto.createDecipheriv(
        algorithm,
        secretKey,
        Buffer.from(hash.iv, 'hex')
    );

    return Buffer.concat([
        decipher.update(Buffer.from(hash.content, 'hex')),
        decipher.final(),
    ]).toString();
}
