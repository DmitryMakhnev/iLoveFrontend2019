import { ExtendedError } from './ExtendedError';
import { ERROR_CODE_CAN_NOT_READ_BLOB_BY_FILE_READER } from './ErrorCodes';


// some information about endianness https://en.wikipedia.org/wiki/Endianness#Examples
export const LITTLE_ENDIAN_KEY = {};
export const BIG_ENDIAN_KEY = {};


/**
 * @param {Blob} blob
 * @return {Promise<ArrayBuffer>}
 */
export function getArrayBufferFromBlob(blob) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = e => resolve(e.target.result);
        fileReader.onerror = () => reject(
            new ExtendedError(
                ERROR_CODE_CAN_NOT_READ_BLOB_BY_FILE_READER,
                'Can\'t read blob by file reader',
                blob
            )
        );
        fileReader.readAsArrayBuffer(blob);
    });
}

/**
 * @param {Blob} blob
 * @return {Promise<DataView>}
 */
export function getDataViewFromBlob(blob) {
    return getArrayBufferFromBlob(blob)
        .then(arrayBuffer => new DataView(arrayBuffer));
}


/**
 * @param {DataView} dataView
 * @param {number} start
 * @param {number} length
 * @return {string}
 */
export function getStringFromDataView(dataView, start, length) {
    let result = '';
    const iMax = start + length;
    for (let i = start; i !== iMax; i++) {
        result += String.fromCharCode(dataView.getUint8(i));
    }
    return result;
}

