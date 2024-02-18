import { randomBytes } from 'crypto';

export const EXPIRY_DATE_LABELS = [
    'Exp. Date',
    'Expiry Date',
    'Expiration Date',
    'Valid Until',
    'Expires',
    'EXP',
    'Date of Expiry',
    'Expiry',
    'Valid To',
];

export const DOB_LABELS = ['DOB', 'Date of Birth', 'Birth Date', 'B. Date', 'D.O.B'];

export function indexOfFirstSubstring(fullText: string[], subStringList: string[]): number {
    let firstIndex = -1;
    for (const subString of subStringList) {
        const index = fullText.findIndex((ele) => ele.toLowerCase().includes(subString.toLowerCase()));
        if (index !== -1) {
            firstIndex = index;
            break;
        }
    }
    return firstIndex;
}

/**
 * Generates a unique filename with a specified prefix.
 *
 * @param prefix The prefix for the filename.
 * @returns A unique filename string.
 */
export function generateFilename(prefix: string = 'file'): string {
    // Generate a random hex string for uniqueness
    const uniquePart = randomBytes(8).toString('hex');
    // Get the current date-time string
    const now = new Date().toISOString().replace(/[:\-T\.Z]/g, '');
    // Return the composite filename
    return `${prefix}_${now}_${uniquePart}`;
}
