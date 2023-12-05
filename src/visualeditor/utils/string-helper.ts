import {repeat} from 'lodash-es';
import {customAlphabet, urlAlphabet} from 'nanoid';


export const generateNodeId = customAlphabet(urlAlphabet.replace('_', '').replace('-', ''), 8);


export function formatFunctionIndent(rawBody?: string | null, indent = 2) {
    if (!rawBody) {
        return '';
    }

    return rawBody
        .trim()
        .split('\n')
        .join('\n' + repeat(' ', indent));
}
