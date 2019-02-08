import {
    BIG_ENDIAN_KEY,
    LITTLE_ENDIAN_KEY,
    getStringFromDataView
} from './binaryUtils';
import { ExtendedError } from './ExtendedError';
import {
    ERROR_CODE_NOT_VALID_EXIF_TIFF_HEADER_MARK_TAG,
    ERROR_CODE_NOT_VALID_EXIF_TIFF_HEADER_OFFSET_TO_FIRST_IFD,
    ERROR_CODE_NOT_VALID_JPG_EXIF_ENDIAN_VALUE,
} from './ErrorCodes';
import {
    EXIF_TAGS_EXIF_PRIVATE_LEVEL,
    EXIF_TAGS_GPS_INFO_LEVEL,
    EXIF_TAGS_INTEROPERABILITY_LEVEL,
    EXIF_TAGS_THUMBNAIL_LEVEL,
    EXIF_TAGS_TIFF_LEVEL,
    TIFF_TAG_ExifIFDPointer,
    TIFF_TAG_GPSInfoIFDPointer,
    EXIF_PRIVATE_TAG_InteroperabilityIFDPointer,
} from './tags/EXIFTags';
import {
    EXIF_TAG_TYPE_ASCII,
    EXIF_TAG_TYPE_BYTE,
    EXIF_TAG_TYPE_LONG,
    EXIF_TAG_TYPE_RATIONAL,
    EXIF_TAG_TYPE_SHORT,
    EXIF_TAG_TYPE_SLONG,
    EXIF_TAG_TYPE_SRATIONAL,
    EXIF_TAG_TYPE_UNDEFINED,
} from './tags/EXIFTagTypes';
import {
    STOP_LOOP_COMMAND
} from './consts';


/**
 * @typedef {Object} IBaseEXIFReadingData
 * @property {DataView} imageDataView
 * @property {number} exifDataStartByteIndex
 * @property {boolean} isLittleEndian
 * @property {number} tiffHeaderStartByteIndex
 */


export const EXIF_MARKER_AND_BASE_EXIF_BYTES_SIZE = 6;


export const EXIF_TAG_ID_BYTES_SIZE = 2;
export const EXIF_TAG_VALUE_TYPE_BYTES_SIZE = 2;
export const EXIF_TAG_NUMBER_OF_VALUES_BYTES_SIZE = 4;
export const EXIF_TAG_SCHEME_SECTIONS_BYTES_SIZE = EXIF_TAG_ID_BYTES_SIZE + EXIF_TAG_VALUE_TYPE_BYTES_SIZE + EXIF_TAG_NUMBER_OF_VALUES_BYTES_SIZE;


/**
 * @throws
 * @description detect endianness type (see http://formats.kaitai.io/exif/index.html)
 * @param {DataView} imageDataView
 * @param {number} exifDataStartByteIndex
 * @return {Object} endian type id
 */
export function detectEXIFEndianness(imageDataView, exifDataStartByteIndex) {
    const tiffHeaderStartIndex = exifDataStartByteIndex + EXIF_MARKER_AND_BASE_EXIF_BYTES_SIZE;

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
 * @param {!DataView} imageDataView
 * @param {!number} exifDataStartByteIndex
 * @param {!boolean} isLittleEndian
 */
export function validateEXIFTIFFHeader(imageDataView, exifDataStartByteIndex, isLittleEndian) {

    // validate tag mark
    const tiffHeaderStartIndex = exifDataStartByteIndex + EXIF_MARKER_AND_BASE_EXIF_BYTES_SIZE;
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
    const tiffOffsetToFirstIFDValue = getEXIFTIFFFirstIFDOffset(imageDataView, exifDataStartByteIndex, isLittleEndian);
    if (tiffOffsetToFirstIFDValue > MIN_TIFF_OFFSET_TO_FIRST_IFD) {
        throw new ExtendedError(
            ERROR_CODE_NOT_VALID_EXIF_TIFF_HEADER_OFFSET_TO_FIRST_IFD,
            'not valid exif tiff header offset to first ifd',
            tiffOffsetToFirstIFDValue
        );
    }
}

/**
 * @param {!DataView} imageDataView
 * @param {!number} exifDataStartByteIndex
 * @param {!boolean} isLittleEndian
 * @return {!number}
 */
export function getEXIFTIFFFirstIFDOffset(imageDataView, exifDataStartByteIndex, isLittleEndian) {
    const tiffHeaderStartIndex = exifDataStartByteIndex + EXIF_MARKER_AND_BASE_EXIF_BYTES_SIZE;
    return imageDataView.getUint32(tiffHeaderStartIndex + 4, isLittleEndian);
}

/**
 * @param {DataView} imageDataView
 * @param {number} tagByteIndex
 * @param {number} valueLength
 * @param {number} valueOffsetOrData
 * @return {number|Array.<number>}
 */
function readEXIFTagValueForType8Bit(imageDataView, tagByteIndex, valueLength, valueOffsetOrData) {
    if (valueLength === 1) {
        return imageDataView.getUint8(tagByteIndex + EXIF_TAG_SCHEME_SECTIONS_BYTES_SIZE);
    }

    const valueStartByteIndex = valueLength > 4
        ? valueOffsetOrData
        : tagByteIndex + EXIF_TAG_SCHEME_SECTIONS_BYTES_SIZE;

    const values = [];
    for (let i = 0; i !== valueLength; i += 1) {
        values.push(imageDataView.getUint8(valueStartByteIndex + i));
    }

    return values;
}

/**
 * @param {DataView} imageDataView
 * @param {number} tagByteIndex
 * @param {number} valueLength
 * @param {number} valueOffsetOrData
 * @return {string}
 */
function readEXIFTagValueForTypeASCII(imageDataView, tagByteIndex, valueLength, valueOffsetOrData) {
    const valueStartByteIndex = valueLength > 4 ? valueOffsetOrData : tagByteIndex + EXIF_TAG_SCHEME_SECTIONS_BYTES_SIZE;
    return getStringFromDataView(imageDataView, valueStartByteIndex, valueLength - 1);
}

/**
 * @param {DataView} imageDataView
 * @param {number} tagByteIndex
 * @param {number} valueLength
 * @param {number} valueOffsetOrData
 * @param {boolean} isLittleEndian
 * @return {number|Array.<number>}
 */
function readEXIFTagValueForTypeSHORT(imageDataView, tagByteIndex, valueLength, valueOffsetOrData, isLittleEndian) {
    if (valueLength === 1) {
        return imageDataView.getUint16(tagByteIndex + EXIF_TAG_SCHEME_SECTIONS_BYTES_SIZE, isLittleEndian);
    }

    const valueStartByteIndex = valueLength > 2 ? valueOffsetOrData : (tagByteIndex + EXIF_TAG_SCHEME_SECTIONS_BYTES_SIZE);
    const values = [];
    for (let i = 0; i !== valueLength; i += 1) {
        values[i] = imageDataView.getUint16(valueStartByteIndex + i * 2, isLittleEndian);
    }
    return values;
}

/**
 * @param {DataView} imageDataView
 * @param {number} tagByteIndex
 * @param {number} valueLength
 * @param {number} valueOffsetOrData
 * @param {boolean} isLittleEndian
 * @return {number|Array.<number>}
 */
function readEXIFTagValueForTypeLONG(imageDataView, tagByteIndex, valueLength, valueOffsetOrData, isLittleEndian) {
    if (valueLength === 1) {
        return imageDataView.getUint32(tagByteIndex + EXIF_TAG_SCHEME_SECTIONS_BYTES_SIZE, isLittleEndian);
    }

    const values = [];
    for (let i = 0; i !== valueLength; i += 1) {
        values.push(imageDataView.getUint32(valueOffsetOrData + 4 * i, isLittleEndian))
    }
    return values;
}

export class ExifRational {
    /**
     * @param {number} numerator
     * @param {number} denominator
     */
    constructor(numerator, denominator) {
        this.value = numerator / denominator;
        // noinspection JSUnusedGlobalSymbols
        this.numerator = numerator;
        // noinspection JSUnusedGlobalSymbols
        this.denominator = denominator;
    }
}

/**
 * @param {DataView} imageDataView
 * @param {number} tagByteIndex
 * @param {number} valueLength
 * @param {number} valueOffsetOrData
 * @param {boolean} isLittleEndian
 * @return {ExifRational|Array.<ExifRational>}
 */
function readEXIFTagValueForTypeRATIONAL(imageDataView, tagByteIndex, valueLength, valueOffsetOrData, isLittleEndian) {
    if (valueLength === 1) {
        const numerator = imageDataView.getUint32(valueOffsetOrData, isLittleEndian);
        const denominator = imageDataView.getUint32(valueOffsetOrData + 4, isLittleEndian);
        return new ExifRational(numerator, denominator);
    }

    const values = [];
    for (let i = 0; i !== valueLength; i += 1) {
        const numerator = imageDataView.getUint32(valueOffsetOrData + 8 * i, isLittleEndian);
        const denominator = imageDataView.getUint32(valueOffsetOrData + 4 + 8 * i, isLittleEndian);
        values.push(new ExifRational(numerator, denominator));
    }
    return values;
}

/**
 * @param {DataView} imageDataView
 * @param {number} tagByteIndex
 * @param {number} valueLength
 * @param {number} valueOffsetOrData
 * @param {boolean} isLittleEndian
 * @return {number|Array.<number>}
 */
function readEXIFTagValueForTypeSLONG(imageDataView, tagByteIndex, valueLength, valueOffsetOrData, isLittleEndian) {
    if (valueLength === 1) {
        return imageDataView.getInt32(tagByteIndex + 8, isLittleEndian);
    }

    const values = [];
    for (let i = 0; i !== valueLength; i += 1) {
        values.push(imageDataView.getInt32(valueOffsetOrData + 4 * i, isLittleEndian));
    }
    return values;
}

/**
 * @param {DataView} imageDataView
 * @param {number} tagByteIndex
 * @param {number} valueLength
 * @param {number} valueOffsetOrData
 * @param {boolean} isLittleEndian
 * @return {number|Array.<number>}
 */
function readEXIFTagValueForTypeSRATIONAL(imageDataView, tagByteIndex, valueLength, valueOffsetOrData, isLittleEndian) {
    if (valueLength === 1) {
        const numerator = imageDataView.getInt32(valueOffsetOrData, isLittleEndian);
        const denominator = imageDataView.getInt32(valueOffsetOrData + 4, isLittleEndian);
        return numerator / denominator;
    }

    const values = [];
    for (let i = 0; i !== valueLength; i += 1) {
        const numerator = imageDataView.getInt32(valueOffsetOrData + 8 * i, isLittleEndian);
        const denominator = imageDataView.getInt32(valueOffsetOrData + 4 + 8 * i, isLittleEndian);
        values.push(numerator / denominator);
    }
    return values;
}


/**
 * @param {IBaseEXIFReadingData} baseEXIFReadingData
 * @param {number} tagByteIndex
 * @return {*}
 */
export function readEXIFTagValue(baseEXIFReadingData, tagByteIndex) {
    const imageDataView = baseEXIFReadingData.imageDataView;
    const tiffHeaderStartByteIndex = baseEXIFReadingData.tiffHeaderStartByteIndex;
    const isLittleEndian = baseEXIFReadingData.isLittleEndian;

    const tagValueType = imageDataView.getUint16(tagByteIndex + EXIF_TAG_ID_BYTES_SIZE, isLittleEndian);
    const valueLength = imageDataView.getUint32(tagByteIndex + EXIF_TAG_ID_BYTES_SIZE + EXIF_TAG_VALUE_TYPE_BYTES_SIZE, isLittleEndian);
    const valueOffsetOrData = imageDataView.getUint32(tagByteIndex + EXIF_TAG_SCHEME_SECTIONS_BYTES_SIZE, isLittleEndian) + tiffHeaderStartByteIndex;

    if (valueLength === 0) {
        return null;
    }

    switch (tagValueType) {
        case EXIF_TAG_TYPE_BYTE:
            return readEXIFTagValueForType8Bit(imageDataView, tagByteIndex, valueLength, valueOffsetOrData);

        case EXIF_TAG_TYPE_ASCII:
            return readEXIFTagValueForTypeASCII(imageDataView, tagByteIndex, valueLength, valueOffsetOrData);

        case EXIF_TAG_TYPE_SHORT:
            return readEXIFTagValueForTypeSHORT(imageDataView, tagByteIndex, valueLength, valueOffsetOrData, isLittleEndian);

        case EXIF_TAG_TYPE_LONG:
            return readEXIFTagValueForTypeLONG(imageDataView, tagByteIndex, valueLength, valueOffsetOrData, isLittleEndian);

        case EXIF_TAG_TYPE_RATIONAL:
            return readEXIFTagValueForTypeRATIONAL(imageDataView, tagByteIndex, valueLength, valueOffsetOrData, isLittleEndian);

        case EXIF_TAG_TYPE_UNDEFINED:
            return readEXIFTagValueForType8Bit(imageDataView, tagByteIndex, valueLength, valueOffsetOrData);

        case EXIF_TAG_TYPE_SLONG:
            return readEXIFTagValueForTypeSLONG(imageDataView, tagByteIndex, valueLength, valueOffsetOrData, isLittleEndian);

        case EXIF_TAG_TYPE_SRATIONAL:
            return readEXIFTagValueForTypeSRATIONAL(imageDataView, tagByteIndex, valueLength, valueOffsetOrData, isLittleEndian);
    }
}


/**
 * @description read exif tags part one by one,
 * we use it some times for different chunks because we have not one levels of tags
 *
 * @param {IBaseEXIFReadingData} baseEXIFReadingData
 * @param {number} imageFileDirectoryStartByteIndex
 * @param {function(tagCode: number, tagByteIndex: number):?ILoopCommand} tagReader
 * @return {?ILoopCommand}
 */
export function readEXIFImageFileDirectoryTags(baseEXIFReadingData, imageFileDirectoryStartByteIndex, tagReader) {
    const imageDataView = baseEXIFReadingData.imageDataView;
    const isLittleEndian = baseEXIFReadingData.isLittleEndian;
    const entriesCount = imageDataView.getUint16(imageFileDirectoryStartByteIndex, isLittleEndian);
    const EXIF_DIRECTORY_BYTES_SIZE = 12;
    const DIRECTORY_NUMBER_BYTES_SIZE = 2;

    for (let i = 0; i < entriesCount; i += 1) {
        const tagByteIndex = imageFileDirectoryStartByteIndex + i * EXIF_DIRECTORY_BYTES_SIZE + DIRECTORY_NUMBER_BYTES_SIZE;

        const tag = imageDataView.getUint16(tagByteIndex, isLittleEndian);

        const tagReaderResult = tagReader(tag, tagByteIndex);

        if (tagReaderResult === STOP_LOOP_COMMAND) {
            return STOP_LOOP_COMMAND;
        }
    }
}

/**
 * @callback PureExifTagReaderHandler
 * @param {number} tagCode
 * @param {number} tagByteIndex
 * @param {IBaseEXIFReadingData} baseEXIFReadingData
 * @param {number} tagLevel
 * @param {number} imageFileDirectoryStart
 */

/**
 * @description read exif tags one by one
 * see more https://www.media.mit.edu/pia/Research/deepview/exif.html#IFD
 * and check for info about next exif levels http://www.cipa.jp/std/documents/e/DC-008-2012_E.pdf (if link is broken, google by 'EXIF 2.3')
 *
 * @param {!IBaseEXIFReadingData} baseEXIFReadingData
 * @param {!PureExifTagReaderHandler} tagReader
 */
export function readEXIFTags(baseEXIFReadingData, tagReader) {
    const imageDataView = baseEXIFReadingData.imageDataView;
    const tiffHeaderStartByteIndex = baseEXIFReadingData.tiffHeaderStartByteIndex;
    const isLittleEndian = baseEXIFReadingData.isLittleEndian;
    const tiffFirstIFDOffset = getEXIFTIFFFirstIFDOffset(imageDataView, baseEXIFReadingData.exifDataStartByteIndex, isLittleEndian);

    let exifIFDPointer;
    let gpsInfoIFDPointer;

    // Support Tags of 1 Level - IFD TIFF Tags
    const imageFileDirectoryStart = tiffHeaderStartByteIndex + tiffFirstIFDOffset;
    let tagReadingResultCommand = readEXIFImageFileDirectoryTags(
        baseEXIFReadingData,
        imageFileDirectoryStart,
        (tagId, tagByteIndex) => {
            switch (tagId) {
                case TIFF_TAG_ExifIFDPointer:
                    // TIFF_TAG_EXIF_IFD_POINTER has only one value as long, 32 bit int
                    exifIFDPointer = imageDataView.getUint32(tagByteIndex + EXIF_TAG_SCHEME_SECTIONS_BYTES_SIZE, isLittleEndian);
                    break;

                case TIFF_TAG_GPSInfoIFDPointer:
                    // TIFF_TAG_GPS_INFO_IFD_POINTER has only one value as long, 32 bit int
                    gpsInfoIFDPointer = imageDataView.getUint32(tagByteIndex + EXIF_TAG_SCHEME_SECTIONS_BYTES_SIZE, isLittleEndian);
                    break;
            }

            return tagReader(tagId, tagByteIndex, baseEXIFReadingData, EXIF_TAGS_TIFF_LEVEL, imageFileDirectoryStart);
        }
    );

    // Support Tags of 2 Level - IFD Exif Private Tags
    let interoperabilityIFDPointer;
    if (!tagReadingResultCommand && exifIFDPointer) {
        const imageFileDirectoryStart = tiffHeaderStartByteIndex + exifIFDPointer;
        tagReadingResultCommand = readEXIFImageFileDirectoryTags(
            baseEXIFReadingData,
            imageFileDirectoryStart,
            (tagId, tagByteIndex) => {
                if (tagId === EXIF_PRIVATE_TAG_InteroperabilityIFDPointer) {
                    // EXIF_PRIVATE_TAG_INTEROPERABILITY_IFD_POINTER has only one value as long, 32 bit int
                    interoperabilityIFDPointer = imageDataView.getUint32(tagByteIndex + EXIF_TAG_SCHEME_SECTIONS_BYTES_SIZE, isLittleEndian);
                }
                return tagReader(tagId, tagByteIndex, baseEXIFReadingData, EXIF_TAGS_EXIF_PRIVATE_LEVEL, imageFileDirectoryStart);
            }
        );
    }

    // Support Tags of 3 Level - IFD GPS Info Tags
    if (!tagReadingResultCommand && gpsInfoIFDPointer) {
        const imageFileDirectoryStart = tiffHeaderStartByteIndex + gpsInfoIFDPointer;
        tagReadingResultCommand = readEXIFImageFileDirectoryTags(
            baseEXIFReadingData,
            imageFileDirectoryStart,
            (tagId, tagByteIndex) =>
                tagReader(tagId, tagByteIndex, baseEXIFReadingData, EXIF_TAGS_GPS_INFO_LEVEL, imageFileDirectoryStart)
        );
    }

    // Support Tags of 4 Level - Interoperability Tags
    if (!tagReadingResultCommand && interoperabilityIFDPointer) {
        const imageFileDirectoryStart = tiffHeaderStartByteIndex + interoperabilityIFDPointer;
        readEXIFImageFileDirectoryTags(
            baseEXIFReadingData,
            imageFileDirectoryStart,
            (tagId, tagByteIndex) =>
                tagReader(tagId, tagByteIndex, baseEXIFReadingData, EXIF_TAGS_INTEROPERABILITY_LEVEL, imageFileDirectoryStart)
        );
    }
}


/**
 * @param {DataView} imageDataView
 * @param {number} imageFileDirectoryStartByteIndex
 * @param {boolean} isLittleEndian
 * @return {number}
 */
export function getNextIFDOffset(imageDataView, imageFileDirectoryStartByteIndex, isLittleEndian) {
    const entriesCount = imageDataView.getUint16(imageFileDirectoryStartByteIndex, isLittleEndian);
    return imageDataView.getUint32(imageFileDirectoryStartByteIndex + 2 + entriesCount * 12, isLittleEndian);
}


/**
 * @param {!IBaseEXIFReadingData} baseEXIFReadingData
 * @param {!PureExifTagReaderHandler} tagReader
 */
export function readEXIFThumbnail(baseEXIFReadingData, tagReader) {
    const imageDataView = baseEXIFReadingData.imageDataView;
    const tiffHeaderStartByteIndex = baseEXIFReadingData.tiffHeaderStartByteIndex;
    const isLittleEndian = baseEXIFReadingData.isLittleEndian;
    const tiffFirstIFDOffset = getEXIFTIFFFirstIFDOffset(imageDataView, baseEXIFReadingData.exifDataStartByteIndex, isLittleEndian);

    const imageFileDirectoryStartByteIndex = tiffHeaderStartByteIndex + tiffFirstIFDOffset;

    const ifd1OffsetPointer = getNextIFDOffset(imageDataView, imageFileDirectoryStartByteIndex, isLittleEndian);

    if (ifd1OffsetPointer && (ifd1OffsetPointer < imageDataView.byteLength)) {
        const ifd1StartByteIndex = tiffHeaderStartByteIndex + ifd1OffsetPointer;

        readEXIFImageFileDirectoryTags(
            baseEXIFReadingData,
            ifd1StartByteIndex,
            (tagId, tagByteIndex) => {
                tagReader(tagId, tagByteIndex, baseEXIFReadingData, EXIF_TAGS_THUMBNAIL_LEVEL, ifd1StartByteIndex);
            }
        )
    }
}

/**
 * @typedef {Object} IEXIFTagReaders
 * @property {PureExifTagReaderHandler} [common]
 * @property {PureExifTagReaderHandler} [thumbnail]
 */

/**
 * @throws
 * @param {!DataView} jpgDataView
 * @param {!number} exifDataStartByteIndex
 * @param {!IEXIFTagReaders} tagReaders
 * @return {!IBaseEXIFReadingData}
 */
export function readEXIF(jpgDataView, exifDataStartByteIndex, tagReaders) {
    const currentEXIFEndian = detectEXIFEndianness(jpgDataView, exifDataStartByteIndex);
    const isLittleEndian = currentEXIFEndian === LITTLE_ENDIAN_KEY;

    validateEXIFTIFFHeader(jpgDataView, exifDataStartByteIndex, isLittleEndian);

    const tiffHeaderStartByteIndex = exifDataStartByteIndex + EXIF_MARKER_AND_BASE_EXIF_BYTES_SIZE;

    /** @type {IBaseEXIFReadingData} */
    const baseEXIFReadingData = {
        imageDataView: jpgDataView,
        exifDataStartByteIndex: exifDataStartByteIndex,
        isLittleEndian: isLittleEndian,
        tiffHeaderStartByteIndex: tiffHeaderStartByteIndex,
    };

    const commonTagsReader = tagReaders.common;
    if (commonTagsReader) {
        readEXIFTags(
            baseEXIFReadingData,
            commonTagsReader
        );
    }

    const thumbnailTagsReader = tagReaders.thumbnail;
    if (thumbnailTagsReader) {
        readEXIFThumbnail(
            baseEXIFReadingData,
            thumbnailTagsReader
        );
    }

    return baseEXIFReadingData;
}