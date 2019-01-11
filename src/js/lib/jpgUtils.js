import { ExtendedError } from './ExtendedError';
import {
    ERROR_CODE_NOT_VALID_EXIF_TIFF_HEADER_MARK_TAG, ERROR_CODE_NOT_VALID_EXIF_TIFF_HEADER_OFFSET_TO_FIRST_IFD,
    ERROR_CODE_NOT_VALID_JPG_EXIF_ENDIAN_VALUE,
    ERROR_CODE_NOT_VALID_JPG_EXIF_START,
    ERROR_CODE_NOT_VALID_JPG_MARKER
} from './ErrorCodes';
import { getStringFromDataView } from './binaryUtils';
import {
    EXIF_PRIVATE_TAG_InteroperabilityIFDPointer, EXIF_TAGS_DICTIONARY,
    EXIF_TAGS_EXIF_PRIVATE_LEVEL,
    EXIF_TAGS_GPS_INFO_LEVEL, EXIF_TAGS_INTEROPERABILITY_LEVEL,
    EXIF_TAGS_TIFF_LEVEL,
    TIFF_TAG_ExifIFDPointer,
    TIFF_TAG_GPSInfoIFDPointer
} from './EXIFTags';



// You can see some common markers by this link https://en.wikipedia.org/wiki/JPEG#Syntax_and_structure
export const JPG_BINARY_MARKER_START_CODE = 0xFF;
// image start marker
export const JPG_BINARY_SOI_MARKER_CODE = 0xD8;
// exif start marker
export const JPG_BINARY_APP1_MARKER_CODE = 0xE1;


export const JPG_EXIF_START_STRING_MARKER = 'Exif';
export const EXIF_MARKER_AND_BASE_EXIF_OFFSET = 6;
export const EXIF_TAG_VALUE_OFFSET = 8;

// some information about endianness https://en.wikipedia.org/wiki/Endianness#Examples
export const LITTLE_ENDIAN_KEY = {};
export const BIG_ENDIAN_KEY = {};


/**
 * @typedef {Object} ILoopCommand
 */

/**
 * @type {ILoopCommand}
 */
export const STOP_LOOP_COMMAND = {};



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
export function findJPGSegmentsStarts(jpgDataView, handler) {
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
 * @description detect endianness type (see http://formats.kaitai.io/exif/index.html)
 * @param {DataView} imageDataView
 * @param {number} exifDataStartByteIndex
 * @return {Object} endian type id
 */
export function detectJPGEXIFEndianness(imageDataView, exifDataStartByteIndex) {
    const tiffHeaderStartIndex = exifDataStartByteIndex + EXIF_MARKER_AND_BASE_EXIF_OFFSET;

    const EXIF_LITTLE_ENDIAN_VALUE = 0x4949;
    const EXIF_BIG_ENDIAN_VALUE = 0x4d4d;

    const exifEndiannessValue = imageDataView.getUint16(tiffHeaderStartIndex);

    switch (exifEndiannessValue) {
        case EXIF_LITTLE_ENDIAN_VALUE:
            return LITTLE_ENDIAN_KEY;

        case EXIF_BIG_ENDIAN_VALUE:
            return BIG_ENDIAN_KEY;

        default:
            throw new ExtendedError(
                ERROR_CODE_NOT_VALID_JPG_EXIF_ENDIAN_VALUE,
                'not valid jpg exif endian value',
                exifEndiannessValue
            );
    }

}

/**
 * @throws
 * @description base validation of TIFF header
 * see https://www.media.mit.edu/pia/Research/deepview/exif.html#TiffHeader
 * and http://formats.kaitai.io/exif_le/exif_le.svg also
 *
 * @param {DataView} imageDataView
 * @param {number} exifDataStartByteIndex
 * @param {boolean} isLittleEndian
 */
export function validateTIFFHeader(imageDataView, exifDataStartByteIndex, isLittleEndian) {

    // validate tag mark
    const tiffHeaderStartIndex = exifDataStartByteIndex + EXIF_MARKER_AND_BASE_EXIF_OFFSET;
    const TIFF_MOTOROLA_TAG_MARK = 0x002a;
    const tiffHeaderTagMarkValue = imageDataView.getUint16(tiffHeaderStartIndex + 2, isLittleEndian);
    if (tiffHeaderTagMarkValue !== TIFF_MOTOROLA_TAG_MARK) {
        throw new ExtendedError(
            ERROR_CODE_NOT_VALID_EXIF_TIFF_HEADER_MARK_TAG,
            'not valid exif tiff header mark tag',
            tiffHeaderTagMarkValue
        );
    }

    // validate offset to first ifd
    const MIN_TIFF_OFFSET_TO_FIRST_IFD = 0x00000008;
    const tiffOffsetToFirstIFDValue = getTIFFFirstIFDOffset(imageDataView, exifDataStartByteIndex, isLittleEndian);
    if (tiffOffsetToFirstIFDValue > MIN_TIFF_OFFSET_TO_FIRST_IFD) {
        throw new ExtendedError(
            ERROR_CODE_NOT_VALID_EXIF_TIFF_HEADER_OFFSET_TO_FIRST_IFD,
            'not valid exif tiff header offset to first ifd',
            tiffOffsetToFirstIFDValue
        );
    }
}

/**
 * @param {DataView} imageDataView
 * @param {number} exifDataStartByteIndex
 * @param {boolean} isLittleEndian
 * @return {number}
 */
export function getTIFFFirstIFDOffset(imageDataView, exifDataStartByteIndex, isLittleEndian) {
    const tiffHeaderStartIndex = exifDataStartByteIndex + EXIF_MARKER_AND_BASE_EXIF_OFFSET;
    return imageDataView.getUint32(tiffHeaderStartIndex + 4, isLittleEndian);
}

/**
 * @description read exif tags part one by one,
 * we use it some times for different chunks because we have not one levels of tags
 *
 * @param {DataView} imageDataView
 * @param {number} imageFileDirectoryStart
 * @param {boolean} isLittleEndian
 * @param {function(tagCode: number, entryOffset: number):?ILoopCommand} tagReader
 * @return {?ILoopCommand}
 */
export function readPartOfEXIFTags(imageDataView, imageFileDirectoryStart, isLittleEndian, tagReader) {
    const entriesCount = imageDataView.getUint16(imageFileDirectoryStart, isLittleEndian);
    const EXIF_DIRECTORY_BYTES_SIZE = 12;
    const DIRECTORY_NUMBER_BYTES_SIZE = 2;

    for (let i = 0; i < entriesCount; i += 1) {
        const entryOffset = imageFileDirectoryStart + i * EXIF_DIRECTORY_BYTES_SIZE + DIRECTORY_NUMBER_BYTES_SIZE;

        const tag = imageDataView.getUint16(entryOffset, isLittleEndian);

        const tagReaderResult = tagReader(tag, entryOffset);

        if (tagReaderResult === STOP_LOOP_COMMAND) {
            return STOP_LOOP_COMMAND;
        }
    }
}

/**
 * @description read exif tags one by one
 * see more https://www.media.mit.edu/pia/Research/deepview/exif.html#IFD
 * and check for info about next exif levels http://www.cipa.jp/std/documents/e/DC-008-2012_E.pdf (if link is broken, google by 'EXIF 2.3')
 *
 * @param {DataView} imageDataView
 * @param {number} tiffHeaderStartIndex
 * @param {number} tiffFirstIFDOffset
 * @param {boolean} isLittleEndian
 * @param {function(tagCode: number, tagLevel: number, entryOffset: number, imageDataView: DataView, isLittleEndian: boolean):?ILoopCommand} tagReader
 */
export function readEXIFTags(imageDataView, tiffHeaderStartIndex, tiffFirstIFDOffset, isLittleEndian, tagReader) {
    let exifIFDPointer;
    let gpsInfoIFDPointer;

    const imageFileDirectoryStart = tiffHeaderStartIndex + tiffFirstIFDOffset;
    let tagReadingResultCommand = readPartOfEXIFTags(
        imageDataView,
        imageFileDirectoryStart,
        isLittleEndian,
        (tagId, entryOffset) => {
            switch (tagId) {
                case TIFF_TAG_ExifIFDPointer:
                    // TIFF_TAG_EXIF_IFD_POINTER has only one value as long, 32 bit int
                    exifIFDPointer = imageDataView.getUint32(entryOffset + EXIF_TAG_VALUE_OFFSET, isLittleEndian);
                    break;

                case TIFF_TAG_GPSInfoIFDPointer:
                    // TIFF_TAG_GPS_INFO_IFD_POINTER has only one value as long, 32 bit int
                    gpsInfoIFDPointer = imageDataView.getUint32(entryOffset + EXIF_TAG_VALUE_OFFSET, isLittleEndian);
                    break;
            }

            return tagReader(tagId, EXIF_TAGS_TIFF_LEVEL, entryOffset, imageDataView, isLittleEndian);
        }
    );

    // Support Tags of 2 Level - IFD Exif Private Tags
    let interoperabilityIFDPointer;
    if (!tagReadingResultCommand && exifIFDPointer) {
        const imageFileDirectoryStart = tiffHeaderStartIndex + exifIFDPointer;
        tagReadingResultCommand = readPartOfEXIFTags(
            imageDataView,
            imageFileDirectoryStart,
            isLittleEndian,
            (tagId, entryOffset) => {
                if (tagId === EXIF_PRIVATE_TAG_InteroperabilityIFDPointer) {
                    // EXIF_PRIVATE_TAG_INTEROPERABILITY_IFD_POINTER has only one value as long, 32 bit int
                    interoperabilityIFDPointer = imageDataView.getUint32(entryOffset + EXIF_TAG_VALUE_OFFSET, isLittleEndian);
                }
                return tagReader(tagId, EXIF_TAGS_EXIF_PRIVATE_LEVEL, entryOffset, imageDataView, isLittleEndian);
            }
        );
    }

    // Support Tags of 3 Level - IFD GPS Info Tags
    if (!tagReadingResultCommand && gpsInfoIFDPointer) {
        const imageFileDirectoryStart = tiffHeaderStartIndex + gpsInfoIFDPointer;
        tagReadingResultCommand = readPartOfEXIFTags(
            imageDataView,
            imageFileDirectoryStart,
            isLittleEndian,
            (tagId, entryOffset) => {
                return tagReader(tagId, EXIF_TAGS_GPS_INFO_LEVEL, entryOffset, imageDataView, isLittleEndian);
            }
        );
    }

    // Support Tags of 4 Level - Interoperability Tags
    if (!tagReadingResultCommand && interoperabilityIFDPointer) {
        const imageFileDirectoryStart = tiffHeaderStartIndex + interoperabilityIFDPointer;
        readPartOfEXIFTags(
            imageDataView,
            imageFileDirectoryStart,
            isLittleEndian,
            (tagId, entryOffset) => {
                return tagReader(tagId, EXIF_TAGS_INTEROPERABILITY_LEVEL, entryOffset, imageDataView, isLittleEndian);
            }
        );
    }
}


/**
 * @throws
 * @param {DataView} jpgDataView — data view of jpg
 */
export function findEXIFParamsInJPG(jpgDataView) {

    let exifSegmentStartByteIndex;
    findJPGSegmentsStarts(
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

        const currentEXIFEndian = detectJPGEXIFEndianness(jpgDataView, exifDataStartByteIndex);
        const isLittleEndian = currentEXIFEndian === LITTLE_ENDIAN_KEY;

        validateTIFFHeader(jpgDataView, exifDataStartByteIndex, isLittleEndian);

        const tiffFirstIFDOffset = getTIFFFirstIFDOffset(jpgDataView, exifDataStartByteIndex, isLittleEndian);
        const tiffHeaderStartIndex = exifDataStartByteIndex + EXIF_MARKER_AND_BASE_EXIF_OFFSET;

        readEXIFTags(
            jpgDataView,
            tiffHeaderStartIndex,
            tiffFirstIFDOffset,
            isLittleEndian,
            (tagId, tagLevel, entryOffset) => {
                const name = EXIF_TAGS_DICTIONARY[tagLevel][tagId];
                if (name) {
                    console.log(name);
                } else {
                    console.warn(`0x${tagId.toString(16)} of Level ${tagLevel}`);
                }
            }
        );


    }

    return null;
}