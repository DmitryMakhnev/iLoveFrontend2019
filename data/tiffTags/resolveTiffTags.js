import tiffTagsFromCongressLibrary from './tiffTagsFromCongressLibrary.json';

const currentTags = {
    'TIFF_TAG_ImageWidth': 0x0100,
    'TIFF_TAG_ImageLength': 0x0101,
    'TIFF_TAG_BitsPerSample': 0x0102,
    'TIFF_TAG_Compression': 0x0103,
    'TIFF_TAG_PhotometricInterpretation': 0x0106,
    'TIFF_TAG_ImageDescription': 0x010E,
    'TIFF_TAG_Make': 0x010F,
    'TIFF_TAG_Model': 0x0110,
    'TIFF_TAG_StripOffsets': 0x0111,
    'TIFF_TAG_Orientation': 0x0112,
    'TIFF_TAG_SamplesPerPixel': 0x0115,
    'TIFF_TAG_RowsPerStrip': 0x0116,
    'TIFF_TAG_StripByteCounts': 0x0117,
    'TIFF_TAG_XResolution': 0x011A,
    'TIFF_TAG_YResolution': 0x011B,
    'TIFF_TAG_PlanarConfiguration': 0x011C,
    'TIFF_TAG_ResolutionUnit': 0x0128,
    'TIFF_TAG_TransferFunction': 0x012D,
    'TIFF_TAG_Software': 0x0131,
    'TIFF_TAG_DateTime': 0x0132,
    'TIFF_TAG_Artist': 0x013B,
    'TIFF_TAG_WhitePoint': 0x013E,
    'TIFF_TAG_PrimaryChromaticities': 0x013F,
    'TIFF_TAG_JPEGInterchangeFormat': 0x0201,
    'TIFF_TAG_JPEGInterchangeFormatLength': 0x0202,
    'TIFF_TAG_YCbCrCoefficients': 0x0211,
    'TIFF_TAG_YCbCrSubSampling': 0x0212,
    'TIFF_TAG_YCbCrPositioning': 0x0213,
    'TIFF_TAG_ReferenceBlackWhite': 0x0214,
    'TIFF_TAG_Copyright': 0x8298,
    'TIFF_TAG_ExifIFDPointer': 0x8769,
    'TIFF_TAG_GPSInfoIFDPointer': 0x8825,
    'TIFF_TAG_NewSubfileType': 0x00FE,
    'TIFF_TAG_SubfileType': 0x00FF,
    'TIFF_TAG_Threshholding': 0x0107,
    'TIFF_TAG_CellWidth': 0x0108,
    'TIFF_TAG_CellLength': 0x0109,
    'TIFF_TAG_FillOrder': 0x010A,
    'TIFF_TAG_MinSampleValue': 0x0118,
    'TIFF_TAG_MaxSampleValue': 0x0119,
    'TIFF_TAG_XResolution_NS': 0x0120,
    'TIFF_TAG_YResolution_NS': 0x0121,
    'TIFF_TAG_GrayResponseUnit': 0x0122,
    'TIFF_TAG_GrayResponseCurve': 0x0123,
    'TIFF_TAG_HostComputer': 0x013C,
    'TIFF_TAG_ColorMap': 0x0140,
    'TIFF_TAG_ExtraSamples': 0x0152,
    'TIFF_TAG_DocumentName': 0x010D,
    'TIFF_TAG_PageName': 0x011D,
    'TIFF_TAG_XPosition': 0x011E,
    'TIFF_TAG_YPosition': 0x011F,
    'TIFF_TAG_T4Options': 0x0124,
    'TIFF_TAG_T6Options': 0x0125,
    'TIFF_TAG_PageNumber': 0x0129,
    'TIFF_TAG_Predictor': 0x013D,
    'TIFF_TAG_HalftoneHints': 0x0141,
    'TIFF_TAG_TileWidth': 0x0142,
    'TIFF_TAG_TileLength': 0x0143,
    'TIFF_TAG_TileOffsets': 0x0144,
    'TIFF_TAG_TileByteCounts': 0x0145,
    'TIFF_TAG_BadFaxLines': 0x0146,
    'TIFF_TAG_CleanFaxData': 0x0147,
    'TIFF_TAG_ConsecutiveBadFaxLines': 0x0148,
    'TIFF_TAG_SubIFDs': 0x014A,
    'TIFF_TAG_InkSet': 0x014C,
    'TIFF_TAG_InkNames': 0x014D,
    'TIFF_TAG_NumberOfInks': 0x014E,
    'TIFF_TAG_DotRange': 0x0150,
    'TIFF_TAG_TargetPrinter': 0x0151,
    'TIFF_TAG_SampleFormat': 0x0153,
    'TIFF_TAG_SMinSampleValue': 0x0154,
    'TIFF_TAG_SMaxSampleValue': 0x0155,
    'TIFF_TAG_TransferRange': 0x0156,
    'TIFF_TAG_ClipPath': 0x0157,
    'TIFF_TAG_XClipPathUnits': 0x0158,
    'TIFF_TAG_YClipPathUnits': 0x0159,
    'TIFF_TAG_Indexed': 0x015A,
    'TIFF_TAG_JPEGTables': 0x015B,
    'TIFF_TAG_OPIProxy': 0x015F,
    'TIFF_TAG_GlobalParametersIFD': 0x0190,
    'TIFF_TAG_ProfileType': 0x0191,
    'TIFF_TAG_FaxProfile': 0x0192,
    'TIFF_TAG_CodingMethods': 0x0193,
    'TIFF_TAG_VersionYear': 0x0194,
    'TIFF_TAG_ModeNumber': 0x0195,
    'TIFF_TAG_Decode': 0x01B1,
    'TIFF_TAG_DefaultImageColor': 0x01B2,
    'TIFF_TAG_JPEGProc': 0x0200,
    'TIFF_TAG_JPEGRestartInterval': 0x0203,
    'TIFF_TAG_JPEGLosslessPredictors': 0x0205,
    'TIFF_TAG_JPEGPointTransforms': 0x0206,
    'TIFF_TAG_JPEGQTables': 0x0207,
    'TIFF_TAG_JPEGDCTables': 0x0208,
    'TIFF_TAG_JPEGACTables': 0x0209,
    'TIFF_TAG_StripRowCounts': 0x022F,
    'TIFF_TAG_XMP': 0x02BC,
    'TIFF_TAG_ImageID': 0x800D,
    'TIFF_TAG_ImageLayer': 0x87AC,
    'EXIF_PRIVATE_TAG_ExposureTime': 0x829A,
    'EXIF_PRIVATE_TAG_FNumber': 0x829D,
    'EXIF_PRIVATE_TAG_ExposureProgram': 0x8822,
    'EXIF_PRIVATE_TAG_SpectralSensitivity': 0x8824,
    'EXIF_PRIVATE_TAG_PhotographicSensitivity': 0x8827,
    'EXIF_PRIVATE_TAG_OECF': 0x8828,
    'EXIF_PRIVATE_TAG_SensitivityType': 0x8830,
    'EXIF_PRIVATE_TAG_StandardOutputSensitivity': 0x8831,
    'EXIF_PRIVATE_TAG_RecommendedExposureIndex': 0x8832,
    'EXIF_PRIVATE_TAG_ISOSpeed': 0x8833,
    'EXIF_PRIVATE_TAG_ISOSpeedLatitudeyyy': 0x8834,
    'EXIF_PRIVATE_TAG_ISOSpeedLatitudezzz': 0x8835,
    'EXIF_PRIVATE_TAG_ExifVersion': 0x9000,
    'EXIF_PRIVATE_TAG_DateTimeOriginal': 0x9003,
    'EXIF_PRIVATE_TAG_DateTimeDigitized': 0x9004,
    'EXIF_PRIVATE_TAG_ComponentsConfiguration': 0x9101,
    'EXIF_PRIVATE_TAG_CompressedBitsPerPixel': 0x9102,
    'EXIF_PRIVATE_TAG_ShutterSpeedValue': 0x9201,
    'EXIF_PRIVATE_TAG_ApertureValue': 0x9202,
    'EXIF_PRIVATE_TAG_BrightnessValue': 0x9203,
    'EXIF_PRIVATE_TAG_ExposureBiasValue': 0x9204,
    'EXIF_PRIVATE_TAG_MaxApertureValue': 0x9205,
    'EXIF_PRIVATE_TAG_SubjectDistance': 0x9206,
    'EXIF_PRIVATE_TAG_MeteringMode': 0x9207,
    'EXIF_PRIVATE_TAG_LightSource': 0x9208,
    'EXIF_PRIVATE_TAG_Flash': 0x9209,
    'EXIF_PRIVATE_TAG_FocalLength': 0x920A,
    'EXIF_PRIVATE_TAG_SubjectArea': 0x9214,
    'EXIF_PRIVATE_TAG_MakerNote': 0x927C,
    'EXIF_PRIVATE_TAG_UserComment': 0x9286,
    'EXIF_PRIVATE_TAG_SubSecTime': 0x9290,
    'EXIF_PRIVATE_TAG_SubSecTimeOriginal': 0x9291,
    'EXIF_PRIVATE_TAG_SubSecTimeDigitized': 0x9292,
    'EXIF_PRIVATE_TAG_FlashpixVersion': 0xA000,
    'EXIF_PRIVATE_TAG_ColorSpace': 0xA001,
    'EXIF_PRIVATE_TAG_PixelXDimension': 0xA002,
    'EXIF_PRIVATE_TAG_PixelYDimension': 0xA003,
    'EXIF_PRIVATE_TAG_RelatedSoundFile': 0xA004,
    'EXIF_PRIVATE_TAG_InteroperabilityIFDPointer': 0xA005,
    'EXIF_PRIVATE_TAG_FlashEnergy': 0xA20B,
    'EXIF_PRIVATE_TAG_SpatialFrequencyResponse': 0xA20C,
    'EXIF_PRIVATE_TAG_FocalPlaneXResolution': 0xA20E,
    'EXIF_PRIVATE_TAG_FocalPlaneYResolution': 0xA20F,
    'EXIF_PRIVATE_TAG_FocalPlaneResolutionUnit': 0xA210,
    'EXIF_PRIVATE_TAG_SubjectLocation': 0xA214,
    'EXIF_PRIVATE_TAG_ExposureIndex': 0xA215,
    'EXIF_PRIVATE_TAG_SensingMethod': 0xA217,
    'EXIF_PRIVATE_TAG_FileSource': 0xA300,
    'EXIF_PRIVATE_TAG_SceneType': 0xA301,
    'EXIF_PRIVATE_TAG_CFAPattern': 0xA302,
    'EXIF_PRIVATE_TAG_CustomRendered': 0xA401,
    'EXIF_PRIVATE_TAG_ExposureMode': 0xA402,
    'EXIF_PRIVATE_TAG_WhiteBalance': 0xA403,
    'EXIF_PRIVATE_TAG_DigitalZoomRatio': 0xA404,
    'EXIF_PRIVATE_TAG_FocalLengthIn35mmFilm': 0xA405,
    'EXIF_PRIVATE_TAG_SceneCaptureType': 0xA406,
    'EXIF_PRIVATE_TAG_GainControl': 0xA407,
    'EXIF_PRIVATE_TAG_Contrast': 0xA408,
    'EXIF_PRIVATE_TAG_Saturation': 0xA409,
    'EXIF_PRIVATE_TAG_Sharpness': 0xA40A,
    'EXIF_PRIVATE_TAG_DeviceSettingDescription': 0xA40B,
    'EXIF_PRIVATE_TAG_SubjectDistanceRange': 0xA40C,
    'EXIF_PRIVATE_TAG_ImageUniqueID': 0xA420,
    'EXIF_PRIVATE_TAG_CameraOwnerName': 0xA430,
    'EXIF_PRIVATE_TAG_BodySerialNumber': 0xA431,
    'EXIF_PRIVATE_TAG_LensSpecification': 0xA432,
    'EXIF_PRIVATE_TAG_LensMake': 0xA433,
    'EXIF_PRIVATE_TAG_LensModel': 0xA434,
    'EXIF_PRIVATE_TAG_LensSerialNumber': 0xA435,
    'EXIF_PRIVATE_TAG_Gamma': 0xA500,
    'GPS_INFO_TAG_GPSVersionID': 0x0000,
    'GPS_INFO_TAG_GPSLatitudeRef': 0x0001,
    'GPS_INFO_TAG_GPSLatitude': 0x0002,
    'GPS_INFO_TAG_GPSLongitudeRef': 0x0003,
    'GPS_INFO_TAG_GPSLongitude': 0x0004,
    'GPS_INFO_TAG_GPSAltitudeRef': 0x0005,
    'GPS_INFO_TAG_GPSAltitude': 0x0006,
    'GPS_INFO_TAG_GPSTimeStamp': 0x0007,
    'GPS_INFO_TAG_GPSSatellites': 0x0008,
    'GPS_INFO_TAG_GPSStatus': 0x0009,
    'GPS_INFO_TAG_GPSMeasureMode': 0x000A,
    'GPS_INFO_TAG_GPSDOP': 0x000B,
    'GPS_INFO_TAG_GPSSpeedRef': 0x000C,
    'GPS_INFO_TAG_GPSSpeed': 0x000D,
    'GPS_INFO_TAG_GPSTrackRef': 0x000E,
    'GPS_INFO_TAG_GPSTrack': 0x000F,
    'GPS_INFO_TAG_GPSImgDirectionRef': 0x0010,
    'GPS_INFO_TAG_GPSImgDirection': 0x0011,
    'GPS_INFO_TAG_GPSMapDatum': 0x0012,
    'GPS_INFO_TAG_GPSDestLatitudeRef': 0x0013,
    'GPS_INFO_TAG_GPSDestLatitude': 0x0014,
    'GPS_INFO_TAG_GPSDestLongitudeRef': 0x0015,
    'GPS_INFO_TAG_GPSDestLongitude': 0x0016,
    'GPS_INFO_TAG_GPSDestBearingRef': 0x0017,
    'GPS_INFO_TAG_GPSDestBearing': 0x0018,
    'GPS_INFO_TAG_GPSDestDistanceRef': 0x0019,
    'GPS_INFO_TAG_GPSDestDistance': 0x001A,
    'GPS_INFO_TAG_GPSProcessingMethod': 0x001B,
    'GPS_INFO_TAG_GPSAreaInformation': 0x001C,
    'GPS_INFO_TAG_GPSDateStamp': 0x001D,
    'GPS_INFO_TAG_GPSDifferential': 0x001E,
    'GPS_INFO_TAG_GPSHPositioningError': 0x001F,
    'INTEROPERABILITY_TAG_InteroperabilityIndex': 0x0001,
    'INTEROPERABILITY_TAG_InteroperabilityVersion': 0x0002,
    'INTEROPERABILITY_TAG_RelatedImageFileFormat': 0x1000,
    'INTEROPERABILITY_TAG_RelatedImageWidth': 0x1001,
    'INTEROPERABILITY_TAG_RelatedImageLength': 0x1002,
};



const currentTagsByCodes = Object.keys(currentTags)
    .reduce(
        (result, key) => {
            result[currentTags[key]] = {
                dec: currentTags[key],
                name: key,
            };
            return result;
        },
        {}
    );

const groupByFieldName = (array, fieldName, itemProcessing) => {
    return array.reduce(
        (result, item) => {
            const fieldNameValue = item[fieldName];
            if (!result[fieldNameValue]) {
                result[fieldNameValue] = [];
            }
            let resultItem = item;
            if (itemProcessing) {
                resultItem = itemProcessing(item);
            }
            result[fieldNameValue].push(resultItem);
            return result;
        },
        {}
    );
};

const tiff2 = tiffTagsFromCongressLibrary.filter(item => !currentTagsByCodes.hasOwnProperty(item.dec))
    .map(item => {
        let level = item.sourceOfTag.trim();
        if (level.toLowerCase().indexOf('exif private ifd') !== -1) {
            level = 'Exif Private IFD';
        }

        return {
            hex: parseInt(item.dec, 10).toString(16).toUpperCase(),
            name: item.name,
            level
        }
    });
const tiffExtends = groupByFieldName(tiff2, 'level', item => {
    delete item.level;
    return item;
});
console.log(JSON.stringify(tiffExtends));


console.log(tiffTagsFromCongressLibrary.length);
console.log(tiff2.length);
console.log(JSON.stringify(tiff2));
// console.log(tiff2.length);

// const tiffTagsFromCongressLibrary



