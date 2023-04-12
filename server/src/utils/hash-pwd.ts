import * as crypto from 'crypto';
import { salt } from './salt';

export const hashPwd = (p: string): string => {
    const hmac = crypto.createHmac('sha512', salt);
    hmac.update(p);
    return hmac.digest('hex');
};
