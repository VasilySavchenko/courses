/** Implementation of user auth validation */
import { ethers } from 'ethers';

// eslint-disable-next-line require-jsdoc
export class Validator {
    /** static method for email field validation */
    static email(email: string): boolean {
        const re = new RegExp(
            /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            'i'
        );

        return re.test(String(email).toLowerCase());
    }
    /** Static method for password field validation */
    static password(password: string): boolean {
        /** same validation from back-end:
         * min 8 letter password, with at least a symbol,
         * upper and lower case letters and a number */
        const re = new RegExp(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'i'
        );

        return re.test(String(password).toLowerCase());
    }

    /** Static method for password field validation */
    static phone(phone: string): boolean {
        /** same validation from back-end:
         * min 8 letter password, with at least a symbol,
         * upper and lower case letters and a number */
        const re = new RegExp(
            /^\+\d{10,12}$/,
            'i'
        );

        return re.test(String(phone).toLowerCase());
    }
}
