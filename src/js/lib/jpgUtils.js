import { ExtendedError } from './ExtendedError';
import {
    ERROR_CODE_NOT_VALID_JPG_EXIF_START,
    ERROR_CODE_NOT_VALID_JPG_MARKER
} from './ErrorCodes';
import {
    EXIF_TAGS_DICTIONARY,
} from './tags/EXIFTags';
import {
    readEXIF,
    readEXIFTagValue,
} from './exifUtils';
import { getStringFromDataView } from './binaryUtils';
import { STOP_LOOP_COMMAND } from './consts';



// You can see some common markers by this link https://en.wikipedia.org/wiki/JPEG#Syntax_and_structure
export const JPG_BINARY_MARKER_START_CODE = 0xFF;
// image start marker
export const JPG_BINARY_SOI_MARKER_CODE = 0xD8;
// app1 start marker
export const JPG_BINARY_APP1_MARKER_CODE = 0xE1;
// exif start string id
export const JPG_EXIF_START_STRING_MARKER = 'Exif';



/**
 * @param {DataView} someDataView — any data view for validation
 * @return {boolean}
 */
export function isValidJPG(someDataView) {
    return someDataView.getUint8(0) === JPG_BINARY_MARKER_START_CODE
        && someDataView.getUint8(1) === JPG_BINARY_SOI_MARKER_CODE;
}

/**
 * @throws
 * @description walk by JPG bytes for detecting segments (see http://formats.kaitai.io/jpeg/jpeg.svg)
 * @param {DataView} jpgDataView — data view of jpg
 * @param {function(number, number):?ILoopCommand} handler
 */
export function findJPGSegmentStarts(jpgDataView, handler) {
    const jpgDataViewLength = jpgDataView.byteLength;
    // skip first two bytes, because it's just jpg marker
    let currentByteIndex = 2;
    let currentMarker;

    while (currentByteIndex < jpgDataViewLength) {
        // validate segment start marker
        if (jpgDataView.getUint8(currentByteIndex) !== JPG_BINARY_MARKER_START_CODE) {
            throw new ExtendedError(
                ERROR_CODE_NOT_VALID_JPG_MARKER,
                'not valid jpg marker',
                jpgDataView.getUint8(currentByteIndex)
            );
        }

        // read next byte after segment start marker
        currentMarker = jpgDataView.getUint8(currentByteIndex + 1);

        // some kind of break
        const handlerResultCommand = handler(currentMarker, currentByteIndex);
        if (handlerResultCommand === STOP_LOOP_COMMAND) {
            break;
        }

        // get length fo current segment for skipping his bytes
        const currentSegmentLength = jpgDataView.getUint16(currentByteIndex + 2);
        currentByteIndex += 2 + currentSegmentLength;
    }
}

/**
 * @throws
 * @description (see http://formats.kaitai.io/jpeg/index.html)
 * @param {DataView} jpgDataView
 * @param {number} exifDataStartByteIndex
 */
export function validateJPGEXIFStart(jpgDataView, exifDataStartByteIndex) {
    const extractedMarker = getStringFromDataView(
        jpgDataView,
        exifDataStartByteIndex,
        JPG_EXIF_START_STRING_MARKER.length
    );

    if (extractedMarker !== JPG_EXIF_START_STRING_MARKER) {
        throw new ExtendedError(
            ERROR_CODE_NOT_VALID_JPG_EXIF_START,
            'not valid jpg exif start'
        );
    }
}



/**
 * @throws
 * @param {DataView} jpgDataView
 * @param {PureExifTagReaderHandler} tagReader
 * @return {?IBaseEXIFReadingData}
 */
export function readEXIFDataFormJPGDataView(jpgDataView, tagReader) {
    let exifSegmentStartByteIndex;
    findJPGSegmentStarts(
        jpgDataView,
        (currentMarker, currentByteIndex) => {
            if (currentMarker === JPG_BINARY_APP1_MARKER_CODE) {
                exifSegmentStartByteIndex = currentByteIndex;
                return STOP_LOOP_COMMAND;
            }
        }
    );

    if (exifSegmentStartByteIndex) {
        const JPG_SEGMENT_MARKER_AND_EXIF_MARKER_SIZE = 4;
        const exifDataStartByteIndex = exifSegmentStartByteIndex + JPG_SEGMENT_MARKER_AND_EXIF_MARKER_SIZE;

        validateJPGEXIFStart(jpgDataView, exifDataStartByteIndex);

        return readEXIF(jpgDataView, exifDataStartByteIndex, tagReader);
    }
}



/**
 * @throws
 * @description simple exif params provider
 * @param {DataView} jpgDataView — data view of jpg
 * @return {Object}
 */
export function getEXIFDataFromJPG(jpgDataView) {
    const exifTags = {};
    readEXIFDataFormJPGDataView(
        jpgDataView,
        (tagId, tagByteIndex, baseEXIFReadingData, tagLevel) => {
            exifTags[EXIF_TAGS_DICTIONARY[tagLevel][tagId]] = readEXIFTagValue(baseEXIFReadingData, tagByteIndex);
        }
    );
    return {
        tags: exifTags,
    };
}


