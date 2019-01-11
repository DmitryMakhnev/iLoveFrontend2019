// tag values were gotten from
// http://www.cipa.jp/std/documents/e/DC-008-2012_E.pdf is EXIF 2.3 standard (if link is broken, google by 'EXIF 2.3')
// https://www.awaresystems.be/imaging/tiff/tifftags.html is
// https://help.accusoft.com/ImageGear-Net/v22.0/Windows/HTML/topic370.html#hs-inthistopic-2b674a34-bae0-4cde-9f96-10992f358089

// Tags Level 1 - TIFF Tags
// by 2.3 standard
export const TIFF_TAG_ImageWidth = 0x0100;
export const TIFF_TAG_ImageLength = 0x0101;
export const TIFF_TAG_BitsPerSample = 0x0102;
export const TIFF_TAG_Compression = 0x0103;
export const TIFF_TAG_PhotometricInterpretation = 0x0106;
export const TIFF_TAG_ImageDescription = 0x010E;
export const TIFF_TAG_Make = 0x010F;
export const TIFF_TAG_Model = 0x0110;
export const TIFF_TAG_StripOffsets = 0x0111;
export const TIFF_TAG_Orientation = 0x0112;
export const TIFF_TAG_SamplesPerPixel = 0x0115;
export const TIFF_TAG_RowsPerStrip = 0x0116;
export const TIFF_TAG_StripByteCounts = 0x0117;
export const TIFF_TAG_XResolution = 0x011A;
export const TIFF_TAG_YResolution = 0x011B;
export const TIFF_TAG_PlanarConfiguration = 0x011C;
export const TIFF_TAG_ResolutionUnit = 0x0128;
export const TIFF_TAG_TransferFunction = 0x012D;
export const TIFF_TAG_Software = 0x0131;
export const TIFF_TAG_DateTime = 0x0132;
export const TIFF_TAG_Artist = 0x013B;
export const TIFF_TAG_WhitePoint = 0x013E;
export const TIFF_TAG_PrimaryChromaticities = 0x013F;
export const TIFF_TAG_JPEGInterchangeFormat = 0x0201;
export const TIFF_TAG_JPEGInterchangeFormatLength = 0x0202;
export const TIFF_TAG_YCbCrCoefficients = 0x0211;
export const TIFF_TAG_YCbCrSubSampling = 0x0212;
export const TIFF_TAG_YCbCrPositioning = 0x0213;
export const TIFF_TAG_ReferenceBlackWhite = 0x0214;
export const TIFF_TAG_Copyright = 0x8298;
export const TIFF_TAG_ExifIFDPointer = 0x8769;
export const TIFF_TAG_GPSInfoIFDPointer = 0x8825;
// more from https://www.awaresystems.be/imaging/tiff/tifftags.html
// part from https://www.awaresystems.be/imaging/tiff/tifftags/baseline.html
export const TIFF_TAG_NewSubfileType = 0x00FE;
export const TIFF_TAG_SubfileType = 0x00FF;
export const TIFF_TAG_Threshholding = 0x0107;
export const TIFF_TAG_CellWidth = 0x0108;
export const TIFF_TAG_CellLength = 0x0109;
export const TIFF_TAG_FillOrder = 0x010A;
export const TIFF_TAG_MinSampleValue = 0x0118;
export const TIFF_TAG_MaxSampleValue = 0x0119;
// not standard
export const TIFF_TAG_XResolution_NS = 0x0120;
// not standard
export const TIFF_TAG_YResolution_NS = 0x0121;
export const TIFF_TAG_GrayResponseUnit = 0x0122;
export const TIFF_TAG_GrayResponseCurve = 0x0123;
export const TIFF_TAG_HostComputer = 0x013C;
export const TIFF_TAG_ColorMap = 0x0140;
export const TIFF_TAG_ExtraSamples = 0x0152;
// https://www.awaresystems.be/imaging/tiff/tifftags/extension.html
export const TIFF_TAG_DocumentName = 0x010D;
export const TIFF_TAG_PageName = 0x011D;
export const TIFF_TAG_XPosition = 0x011E;
export const TIFF_TAG_YPosition = 0x011F;
export const TIFF_TAG_T4Options = 0x0124;
export const TIFF_TAG_T6Options = 0x0125;
export const TIFF_TAG_PageNumber = 0x0129;
export const TIFF_TAG_Predictor = 0x013D;
export const TIFF_TAG_HalftoneHints = 0x0141;
export const TIFF_TAG_TileWidth = 0x0142;
export const TIFF_TAG_TileLength = 0x0143;
export const TIFF_TAG_TileOffsets = 0x0144;
export const TIFF_TAG_TileByteCounts = 0x0145;
export const TIFF_TAG_BadFaxLines = 0x0146;
export const TIFF_TAG_CleanFaxData = 0x0147;
export const TIFF_TAG_ConsecutiveBadFaxLines = 0x0148;
export const TIFF_TAG_SubIFDs = 0x014A;
export const TIFF_TAG_InkSet = 0x014C;
export const TIFF_TAG_InkNames = 0x014D;
export const TIFF_TAG_NumberOfInks = 0x014E;
export const TIFF_TAG_DotRange = 0x0150;
export const TIFF_TAG_TargetPrinter = 0x0151;
export const TIFF_TAG_SampleFormat = 0x0153;
export const TIFF_TAG_SMinSampleValue = 0x0154;
export const TIFF_TAG_SMaxSampleValue = 0x0155;
export const TIFF_TAG_TransferRange = 0x0156;
export const TIFF_TAG_ClipPath = 0x0157;
export const TIFF_TAG_XClipPathUnits = 0x0158;
export const TIFF_TAG_YClipPathUnits = 0x0159;
export const TIFF_TAG_Indexed = 0x015A;
export const TIFF_TAG_JPEGTables = 0x015B;
export const TIFF_TAG_OPIProxy = 0x015F;
export const TIFF_TAG_GlobalParametersIFD = 0x0190;
export const TIFF_TAG_ProfileType = 0x0191;
export const TIFF_TAG_FaxProfile = 0x0192;
export const TIFF_TAG_CodingMethods = 0x0193;
export const TIFF_TAG_VersionYear = 0x0194;
export const TIFF_TAG_ModeNumber = 0x0195;
export const TIFF_TAG_Decode = 0x01B1;
export const TIFF_TAG_DefaultImageColor = 0x01B2;
export const TIFF_TAG_JPEGProc = 0x0200;
export const TIFF_TAG_JPEGRestartInterval = 0x0203;
export const TIFF_TAG_JPEGLosslessPredictors = 0x0205;
export const TIFF_TAG_JPEGPointTransforms = 0x0206;
export const TIFF_TAG_JPEGQTables = 0x0207;
export const TIFF_TAG_JPEGDCTables = 0x0208;
export const TIFF_TAG_JPEGACTables = 0x0209;
export const TIFF_TAG_StripRowCounts = 0x022F;
export const TIFF_TAG_XMP = 0x02BC;
export const TIFF_TAG_ImageID = 0x800D;
export const TIFF_TAG_ImageLayer = 0x87AC;
// TODO: [dmitry.makhnev] add description from source https://www.loc.gov/preservation/digital/formats/content/tiff_tags.shtml
export const TIFF_TAG_PrintImageMatching = 0xC4A5;

// Tags Level 2 - Exif Private Tags
// by 2.3 standard
export const EXIF_PRIVATE_TAG_ExposureTime = 0x829A;
export const EXIF_PRIVATE_TAG_FNumber = 0x829D;
export const EXIF_PRIVATE_TAG_ExposureProgram = 0x8822;
export const EXIF_PRIVATE_TAG_SpectralSensitivity = 0x8824;
export const EXIF_PRIVATE_TAG_PhotographicSensitivity = 0x8827;
export const EXIF_PRIVATE_TAG_OECF = 0x8828;
export const EXIF_PRIVATE_TAG_SensitivityType = 0x8830;
export const EXIF_PRIVATE_TAG_StandardOutputSensitivity = 0x8831;
export const EXIF_PRIVATE_TAG_RecommendedExposureIndex = 0x8832;
export const EXIF_PRIVATE_TAG_ISOSpeed = 0x8833;
export const EXIF_PRIVATE_TAG_ISOSpeedLatitudeyyy = 0x8834;
export const EXIF_PRIVATE_TAG_ISOSpeedLatitudezzz = 0x8835;
export const EXIF_PRIVATE_TAG_ExifVersion = 0x9000;
export const EXIF_PRIVATE_TAG_DateTimeOriginal = 0x9003;
export const EXIF_PRIVATE_TAG_DateTimeDigitized = 0x9004;
export const EXIF_PRIVATE_TAG_ComponentsConfiguration = 0x9101;
export const EXIF_PRIVATE_TAG_CompressedBitsPerPixel = 0x9102;
export const EXIF_PRIVATE_TAG_ShutterSpeedValue = 0x9201;
export const EXIF_PRIVATE_TAG_ApertureValue = 0x9202;
export const EXIF_PRIVATE_TAG_BrightnessValue = 0x9203;
export const EXIF_PRIVATE_TAG_ExposureBiasValue = 0x9204;
export const EXIF_PRIVATE_TAG_MaxApertureValue = 0x9205;
export const EXIF_PRIVATE_TAG_SubjectDistance = 0x9206;
export const EXIF_PRIVATE_TAG_MeteringMode = 0x9207;
export const EXIF_PRIVATE_TAG_LightSource = 0x9208;
export const EXIF_PRIVATE_TAG_Flash = 0x9209;
export const EXIF_PRIVATE_TAG_FocalLength = 0x920A;
export const EXIF_PRIVATE_TAG_SubjectArea = 0x9214;
export const EXIF_PRIVATE_TAG_MakerNote = 0x927C;
export const EXIF_PRIVATE_TAG_UserComment = 0x9286;
export const EXIF_PRIVATE_TAG_SubSecTime = 0x9290;
export const EXIF_PRIVATE_TAG_SubSecTimeOriginal = 0x9291;
export const EXIF_PRIVATE_TAG_SubSecTimeDigitized = 0x9292;
export const EXIF_PRIVATE_TAG_FlashpixVersion = 0xA000;
export const EXIF_PRIVATE_TAG_ColorSpace = 0xA001;
export const EXIF_PRIVATE_TAG_PixelXDimension = 0xA002;
export const EXIF_PRIVATE_TAG_PixelYDimension = 0xA003;
export const EXIF_PRIVATE_TAG_RelatedSoundFile = 0xA004;
export const EXIF_PRIVATE_TAG_InteroperabilityIFDPointer = 0xA005;
export const EXIF_PRIVATE_TAG_FlashEnergy = 0xA20B;
export const EXIF_PRIVATE_TAG_SpatialFrequencyResponse = 0xA20C;
export const EXIF_PRIVATE_TAG_FocalPlaneXResolution = 0xA20E;
export const EXIF_PRIVATE_TAG_FocalPlaneYResolution = 0xA20F;
export const EXIF_PRIVATE_TAG_FocalPlaneResolutionUnit = 0xA210;
export const EXIF_PRIVATE_TAG_SubjectLocation = 0xA214;
export const EXIF_PRIVATE_TAG_ExposureIndex = 0xA215;
export const EXIF_PRIVATE_TAG_SensingMethod = 0xA217;
export const EXIF_PRIVATE_TAG_FileSource = 0xA300;
export const EXIF_PRIVATE_TAG_SceneType = 0xA301;
export const EXIF_PRIVATE_TAG_CFAPattern = 0xA302;
export const EXIF_PRIVATE_TAG_CustomRendered = 0xA401;
export const EXIF_PRIVATE_TAG_ExposureMode = 0xA402;
export const EXIF_PRIVATE_TAG_WhiteBalance = 0xA403;
export const EXIF_PRIVATE_TAG_DigitalZoomRatio = 0xA404;
export const EXIF_PRIVATE_TAG_FocalLengthIn35mmFilm = 0xA405;
export const EXIF_PRIVATE_TAG_SceneCaptureType = 0xA406;
export const EXIF_PRIVATE_TAG_GainControl = 0xA407;
export const EXIF_PRIVATE_TAG_Contrast = 0xA408;
export const EXIF_PRIVATE_TAG_Saturation = 0xA409;
export const EXIF_PRIVATE_TAG_Sharpness = 0xA40A;
export const EXIF_PRIVATE_TAG_DeviceSettingDescription = 0xA40B;
export const EXIF_PRIVATE_TAG_SubjectDistanceRange = 0xA40C;
export const EXIF_PRIVATE_TAG_ImageUniqueID = 0xA420;
export const EXIF_PRIVATE_TAG_CameraOwnerName = 0xA430;
export const EXIF_PRIVATE_TAG_BodySerialNumber = 0xA431;
export const EXIF_PRIVATE_TAG_LensSpecification = 0xA432;
export const EXIF_PRIVATE_TAG_LensMake = 0xA433;
export const EXIF_PRIVATE_TAG_LensModel = 0xA434;
export const EXIF_PRIVATE_TAG_LensSerialNumber = 0xA435;
export const EXIF_PRIVATE_TAG_Gamma = 0xA500;

// Tags Level 3 - GPS Info Tags
// by 2.3 standard
export const GPS_INFO_TAG_GPSVersionID = 0x0000;
export const GPS_INFO_TAG_GPSLatitudeRef = 0x0001;
export const GPS_INFO_TAG_GPSLatitude = 0x0002;
export const GPS_INFO_TAG_GPSLongitudeRef = 0x0003;
export const GPS_INFO_TAG_GPSLongitude = 0x0004;
export const GPS_INFO_TAG_GPSAltitudeRef = 0x0005;
export const GPS_INFO_TAG_GPSAltitude = 0x0006;
export const GPS_INFO_TAG_GPSTimeStamp = 0x0007;
export const GPS_INFO_TAG_GPSSatellites = 0x0008;
export const GPS_INFO_TAG_GPSStatus = 0x0009;
export const GPS_INFO_TAG_GPSMeasureMode = 0x000A;
export const GPS_INFO_TAG_GPSDOP = 0x000B;
export const GPS_INFO_TAG_GPSSpeedRef = 0x000C;
export const GPS_INFO_TAG_GPSSpeed = 0x000D;
export const GPS_INFO_TAG_GPSTrackRef = 0x000E;
export const GPS_INFO_TAG_GPSTrack = 0x000F;
export const GPS_INFO_TAG_GPSImgDirectionRef = 0x0010;
export const GPS_INFO_TAG_GPSImgDirection = 0x0011;
export const GPS_INFO_TAG_GPSMapDatum = 0x0012;
export const GPS_INFO_TAG_GPSDestLatitudeRef = 0x0013;
export const GPS_INFO_TAG_GPSDestLatitude = 0x0014;
export const GPS_INFO_TAG_GPSDestLongitudeRef = 0x0015;
export const GPS_INFO_TAG_GPSDestLongitude = 0x0016;
export const GPS_INFO_TAG_GPSDestBearingRef = 0x0017;
export const GPS_INFO_TAG_GPSDestBearing = 0x0018;
export const GPS_INFO_TAG_GPSDestDistanceRef = 0x0019;
export const GPS_INFO_TAG_GPSDestDistance = 0x001A;
export const GPS_INFO_TAG_GPSProcessingMethod = 0x001B;
export const GPS_INFO_TAG_GPSAreaInformation = 0x001C;
export const GPS_INFO_TAG_GPSDateStamp = 0x001D;
export const GPS_INFO_TAG_GPSDifferential = 0x001E;
export const GPS_INFO_TAG_GPSHPositioningError = 0x001F;


// Tags Level 4 -  Interoperability Tags
// by 2.3 standard
export const INTEROPERABILITY_TAG_InteroperabilityIndex = 0x0001;
// extended from https://help.accusoft.com/ImageGear-Net/v22.0/Windows/HTML/topic370.html#hs-inthistopic-2b674a34-bae0-4cde-9f96-10992f358089
export const INTEROPERABILITY_TAG_InteroperabilityVersion = 0x0002;
export const INTEROPERABILITY_TAG_RelatedImageFileFormat = 0x1000;
export const INTEROPERABILITY_TAG_RelatedImageWidth = 0x1001;
export const INTEROPERABILITY_TAG_RelatedImageLength = 0x1002;


export const EXIF_TAGS_TIFF_LEVEL = 1;
export const EXIF_TAGS_EXIF_PRIVATE_LEVEL = 2;
export const EXIF_TAGS_GPS_INFO_LEVEL = 3;
export const EXIF_TAGS_INTEROPERABILITY_LEVEL = 4;


// dictionary for tests, debug, and simplify output
export const EXIF_TAGS_DICTIONARY = {
    [EXIF_TAGS_TIFF_LEVEL]: {
        [TIFF_TAG_ImageWidth]: 'ImageWidth',
        [TIFF_TAG_ImageLength]: 'ImageLength',
        [TIFF_TAG_BitsPerSample]: 'BitsPerSample',
        [TIFF_TAG_Compression]: 'Compression',
        [TIFF_TAG_PhotometricInterpretation]: 'PhotometricInterpretation',
        [TIFF_TAG_ImageDescription]: 'ImageDescription',
        [TIFF_TAG_Make]: 'Make',
        [TIFF_TAG_Model]: 'Model',
        [TIFF_TAG_StripOffsets]: 'StripOffsets',
        [TIFF_TAG_Orientation]: 'Orientation',
        [TIFF_TAG_SamplesPerPixel]: 'SamplesPerPixel',
        [TIFF_TAG_RowsPerStrip]: 'RowsPerStrip',
        [TIFF_TAG_StripByteCounts]: 'StripByteCounts',
        [TIFF_TAG_XResolution]: 'XResolution',
        [TIFF_TAG_YResolution]: 'YResolution',
        [TIFF_TAG_PlanarConfiguration]: 'PlanarConfiguration',
        [TIFF_TAG_ResolutionUnit]: 'ResolutionUnit',
        [TIFF_TAG_TransferFunction]: 'TransferFunction',
        [TIFF_TAG_Software]: 'Software',
        [TIFF_TAG_DateTime]: 'DateTime',
        [TIFF_TAG_Artist]: 'Artist',
        [TIFF_TAG_WhitePoint]: 'WhitePoint',
        [TIFF_TAG_PrimaryChromaticities]: 'PrimaryChromaticities',
        [TIFF_TAG_JPEGInterchangeFormat]: 'JPEGInterchangeFormat',
        [TIFF_TAG_JPEGInterchangeFormatLength]: 'JPEGInterchangeFormatLength',
        [TIFF_TAG_YCbCrCoefficients]: 'YCbCrCoefficients',
        [TIFF_TAG_YCbCrSubSampling]: 'YCbCrSubSampling',
        [TIFF_TAG_YCbCrPositioning]: 'YCbCrPositioning',
        [TIFF_TAG_ReferenceBlackWhite]: 'ReferenceBlackWhite',
        [TIFF_TAG_Copyright]: 'Copyright',
        [TIFF_TAG_ExifIFDPointer]: 'ExifIFDPointer',
        [TIFF_TAG_GPSInfoIFDPointer]: 'GPSInfoIFDPointer',

        [TIFF_TAG_NewSubfileType]: 'NewSubfileType',
        [TIFF_TAG_SubfileType]: 'SubfileType',
        [TIFF_TAG_Threshholding]: 'Threshholding',
        [TIFF_TAG_CellWidth]: 'CellWidth',
        [TIFF_TAG_CellLength]: 'CellLength',
        [TIFF_TAG_FillOrder]: 'FillOrder',
        [TIFF_TAG_MinSampleValue]: 'MinSampleValue',
        [TIFF_TAG_MaxSampleValue]: 'MaxSampleValue',
        [TIFF_TAG_XResolution_NS]: 'XResolution_NS',
        [TIFF_TAG_YResolution_NS]: 'YResolution_NS',
        [TIFF_TAG_GrayResponseUnit]: 'GrayResponseUnit',
        [TIFF_TAG_GrayResponseCurve]: 'GrayResponseCurve',
        [TIFF_TAG_HostComputer]: 'HostComputer',
        [TIFF_TAG_ColorMap]: 'ColorMap',
        [TIFF_TAG_ExtraSamples]: 'ExtraSamples',

        [TIFF_TAG_DocumentName]: 'DocumentName',
        [TIFF_TAG_PageName]: 'PageName',
        [TIFF_TAG_XPosition]: 'XPosition',
        [TIFF_TAG_YPosition]: 'YPosition',
        [TIFF_TAG_T4Options]: 'T4Options',
        [TIFF_TAG_T6Options]: 'T6Options',
        [TIFF_TAG_PageNumber]: 'PageNumber',
        [TIFF_TAG_Predictor]: 'Predictor',
        [TIFF_TAG_HalftoneHints]: 'HalftoneHints',
        [TIFF_TAG_TileWidth]: 'TileWidth',
        [TIFF_TAG_TileLength]: 'TileLength',
        [TIFF_TAG_TileOffsets]: 'TileOffsets',
        [TIFF_TAG_TileByteCounts]: 'TileByteCounts',
        [TIFF_TAG_BadFaxLines]: 'BadFaxLines',
        [TIFF_TAG_CleanFaxData]: 'CleanFaxData',
        [TIFF_TAG_ConsecutiveBadFaxLines]: 'ConsecutiveBadFaxLines',
        [TIFF_TAG_SubIFDs]: 'SubIFDs',
        [TIFF_TAG_InkSet]: 'InkSet',
        [TIFF_TAG_InkNames]: 'InkNames',
        [TIFF_TAG_NumberOfInks]: 'NumberOfInks',
        [TIFF_TAG_DotRange]: 'DotRange',
        [TIFF_TAG_TargetPrinter]: 'TargetPrinter',
        [TIFF_TAG_SampleFormat]: 'SampleFormat',
        [TIFF_TAG_SMinSampleValue]: 'SMinSampleValue',
        [TIFF_TAG_SMaxSampleValue]: 'SMaxSampleValue',
        [TIFF_TAG_TransferRange]: 'TransferRange',
        [TIFF_TAG_ClipPath]: 'ClipPath',
        [TIFF_TAG_XClipPathUnits]: 'XClipPathUnits',
        [TIFF_TAG_YClipPathUnits]: 'YClipPathUnits',
        [TIFF_TAG_Indexed]: 'Indexed',
        [TIFF_TAG_JPEGTables]: 'JPEGTables',
        [TIFF_TAG_OPIProxy]: 'OPIProxy',
        [TIFF_TAG_GlobalParametersIFD]: 'GlobalParametersIFD',
        [TIFF_TAG_ProfileType]: 'ProfileType',
        [TIFF_TAG_FaxProfile]: 'FaxProfile',
        [TIFF_TAG_CodingMethods]: 'CodingMethods',
        [TIFF_TAG_VersionYear]: 'VersionYear',
        [TIFF_TAG_ModeNumber]: 'ModeNumber',
        [TIFF_TAG_Decode]: 'Decode',
        [TIFF_TAG_DefaultImageColor]: 'DefaultImageColor',
        [TIFF_TAG_JPEGProc]: 'JPEGProc',
        [TIFF_TAG_JPEGRestartInterval]: 'JPEGRestartInterval',
        [TIFF_TAG_JPEGLosslessPredictors]: 'JPEGLosslessPredictors',
        [TIFF_TAG_JPEGPointTransforms]: 'JPEGPointTransforms',
        [TIFF_TAG_JPEGQTables]: 'JPEGQTables',
        [TIFF_TAG_JPEGDCTables]: 'JPEGDCTables',
        [TIFF_TAG_JPEGACTables]: 'JPEGACTables',
        [TIFF_TAG_StripRowCounts]: 'StripRowCounts',
        [TIFF_TAG_XMP]: 'XMP',
        [TIFF_TAG_ImageID]: 'ImageID',
        [TIFF_TAG_ImageLayer]: 'ImageLayer',

        [TIFF_TAG_PrintImageMatching]: 'PrintImageMatching',
    },

    [EXIF_TAGS_EXIF_PRIVATE_LEVEL]: {
        [EXIF_PRIVATE_TAG_ExposureTime]: 'ExposureTime',
        [EXIF_PRIVATE_TAG_FNumber]: 'FNumber',
        [EXIF_PRIVATE_TAG_ExposureProgram]: 'ExposureProgram',
        [EXIF_PRIVATE_TAG_SpectralSensitivity]: 'SpectralSensitivity',
        [EXIF_PRIVATE_TAG_PhotographicSensitivity]: 'PhotographicSensitivity',
        [EXIF_PRIVATE_TAG_OECF]: 'OECF',
        [EXIF_PRIVATE_TAG_SensitivityType]: 'SensitivityType',
        [EXIF_PRIVATE_TAG_StandardOutputSensitivity]: 'StandardOutputSensitivity',
        [EXIF_PRIVATE_TAG_RecommendedExposureIndex]: 'RecommendedExposureIndex',
        [EXIF_PRIVATE_TAG_ISOSpeed]: 'ISOSpeed',
        [EXIF_PRIVATE_TAG_ISOSpeedLatitudeyyy]: 'ISOSpeedLatitudeyyy',
        [EXIF_PRIVATE_TAG_ISOSpeedLatitudezzz]: 'ISOSpeedLatitudezzz',
        [EXIF_PRIVATE_TAG_ExifVersion]: 'ExifVersion',
        [EXIF_PRIVATE_TAG_DateTimeOriginal]: 'DateTimeOriginal',
        [EXIF_PRIVATE_TAG_DateTimeDigitized]: 'DateTimeDigitized',
        [EXIF_PRIVATE_TAG_ComponentsConfiguration]: 'ComponentsConfiguration',
        [EXIF_PRIVATE_TAG_CompressedBitsPerPixel]: 'CompressedBitsPerPixel',
        [EXIF_PRIVATE_TAG_ShutterSpeedValue]: 'ShutterSpeedValue',
        [EXIF_PRIVATE_TAG_ApertureValue]: 'ApertureValue',
        [EXIF_PRIVATE_TAG_BrightnessValue]: 'BrightnessValue',
        [EXIF_PRIVATE_TAG_ExposureBiasValue]: 'ExposureBiasValue',
        [EXIF_PRIVATE_TAG_MaxApertureValue]: 'MaxApertureValue',
        [EXIF_PRIVATE_TAG_SubjectDistance]: 'SubjectDistance',
        [EXIF_PRIVATE_TAG_MeteringMode]: 'MeteringMode',
        [EXIF_PRIVATE_TAG_LightSource]: 'LightSource',
        [EXIF_PRIVATE_TAG_Flash]: 'Flash',
        [EXIF_PRIVATE_TAG_FocalLength]: 'FocalLength',
        [EXIF_PRIVATE_TAG_SubjectArea]: 'SubjectArea',
        [EXIF_PRIVATE_TAG_MakerNote]: 'MakerNote',
        [EXIF_PRIVATE_TAG_UserComment]: 'UserComment',
        [EXIF_PRIVATE_TAG_SubSecTime]: 'SubSecTime',
        [EXIF_PRIVATE_TAG_SubSecTimeOriginal]: 'SubSecTimeOriginal',
        [EXIF_PRIVATE_TAG_SubSecTimeDigitized]: 'SubSecTimeDigitized',
        [EXIF_PRIVATE_TAG_FlashpixVersion]: 'FlashpixVersion',
        [EXIF_PRIVATE_TAG_ColorSpace]: 'ColorSpace',
        [EXIF_PRIVATE_TAG_PixelXDimension]: 'PixelXDimension',
        [EXIF_PRIVATE_TAG_PixelYDimension]: 'PixelYDimension',
        [EXIF_PRIVATE_TAG_RelatedSoundFile]: 'RelatedSoundFile',
        [EXIF_PRIVATE_TAG_InteroperabilityIFDPointer]: 'InteroperabilityIFDPointer',
        [EXIF_PRIVATE_TAG_FlashEnergy]: 'FlashEnergy',
        [EXIF_PRIVATE_TAG_SpatialFrequencyResponse]: 'SpatialFrequencyResponse',
        [EXIF_PRIVATE_TAG_FocalPlaneXResolution]: 'FocalPlaneXResolution',
        [EXIF_PRIVATE_TAG_FocalPlaneYResolution]: 'FocalPlaneYResolution',
        [EXIF_PRIVATE_TAG_FocalPlaneResolutionUnit]: 'FocalPlaneResolutionUnit',
        [EXIF_PRIVATE_TAG_SubjectLocation]: 'SubjectLocation',
        [EXIF_PRIVATE_TAG_ExposureIndex]: 'ExposureIndex',
        [EXIF_PRIVATE_TAG_SensingMethod]: 'SensingMethod',
        [EXIF_PRIVATE_TAG_FileSource]: 'FileSource',
        [EXIF_PRIVATE_TAG_SceneType]: 'SceneType',
        [EXIF_PRIVATE_TAG_CFAPattern]: 'CFAPattern',
        [EXIF_PRIVATE_TAG_CustomRendered]: 'CustomRendered',
        [EXIF_PRIVATE_TAG_ExposureMode]: 'ExposureMode',
        [EXIF_PRIVATE_TAG_WhiteBalance]: 'WhiteBalance',
        [EXIF_PRIVATE_TAG_DigitalZoomRatio]: 'DigitalZoomRatio',
        [EXIF_PRIVATE_TAG_FocalLengthIn35mmFilm]: 'FocalLengthIn35mmFilm',
        [EXIF_PRIVATE_TAG_SceneCaptureType]: 'SceneCaptureType',
        [EXIF_PRIVATE_TAG_GainControl]: 'GainControl',
        [EXIF_PRIVATE_TAG_Contrast]: 'Contrast',
        [EXIF_PRIVATE_TAG_Saturation]: 'Saturation',
        [EXIF_PRIVATE_TAG_Sharpness]: 'Sharpness',
        [EXIF_PRIVATE_TAG_DeviceSettingDescription]: 'DeviceSettingDescription',
        [EXIF_PRIVATE_TAG_SubjectDistanceRange]: 'SubjectDistanceRange',
        [EXIF_PRIVATE_TAG_ImageUniqueID]: 'ImageUniqueID',
        [EXIF_PRIVATE_TAG_CameraOwnerName]: 'CameraOwnerName',
        [EXIF_PRIVATE_TAG_BodySerialNumber]: 'BodySerialNumber',
        [EXIF_PRIVATE_TAG_LensSpecification]: 'LensSpecification',
        [EXIF_PRIVATE_TAG_LensMake]: 'LensMake',
        [EXIF_PRIVATE_TAG_LensModel]: 'LensModel',
        [EXIF_PRIVATE_TAG_LensSerialNumber]: 'LensSerialNumber',
        [EXIF_PRIVATE_TAG_Gamma]: 'Gamma',
    },

    [EXIF_TAGS_GPS_INFO_LEVEL]: {
        [GPS_INFO_TAG_GPSVersionID]: 'GPSVersionID',
        [GPS_INFO_TAG_GPSLatitudeRef]: 'GPSLatitudeRef',
        [GPS_INFO_TAG_GPSLatitude]: 'GPSLatitude',
        [GPS_INFO_TAG_GPSLongitudeRef]: 'GPSLongitudeRef',
        [GPS_INFO_TAG_GPSLongitude]: 'GPSLongitude',
        [GPS_INFO_TAG_GPSAltitudeRef]: 'GPSAltitudeRef',
        [GPS_INFO_TAG_GPSAltitude]: 'GPSAltitude',
        [GPS_INFO_TAG_GPSTimeStamp]: 'GPSTimeStamp',
        [GPS_INFO_TAG_GPSSatellites]: 'GPSSatellites',
        [GPS_INFO_TAG_GPSStatus]: 'GPSStatus',
        [GPS_INFO_TAG_GPSMeasureMode]: 'GPSMeasureMode',
        [GPS_INFO_TAG_GPSDOP]: 'GPSDOP',
        [GPS_INFO_TAG_GPSSpeedRef]: 'GPSSpeedRef',
        [GPS_INFO_TAG_GPSSpeed]: 'GPSSpeed',
        [GPS_INFO_TAG_GPSTrackRef]: 'GPSTrackRef',
        [GPS_INFO_TAG_GPSTrack]: 'GPSTrack',
        [GPS_INFO_TAG_GPSImgDirectionRef]: 'GPSImgDirectionRef',
        [GPS_INFO_TAG_GPSImgDirection]: 'GPSImgDirection',
        [GPS_INFO_TAG_GPSMapDatum]: 'GPSMapDatum',
        [GPS_INFO_TAG_GPSDestLatitudeRef]: 'GPSDestLatitudeRef',
        [GPS_INFO_TAG_GPSDestLatitude]: 'GPSDestLatitude',
        [GPS_INFO_TAG_GPSDestLongitudeRef]: 'GPSDestLongitudeRef',
        [GPS_INFO_TAG_GPSDestLongitude]: 'GPSDestLongitude',
        [GPS_INFO_TAG_GPSDestBearingRef]: 'GPSDestBearingRef',
        [GPS_INFO_TAG_GPSDestBearing]: 'GPSDestBearing',
        [GPS_INFO_TAG_GPSDestDistanceRef]: 'GPSDestDistanceRef',
        [GPS_INFO_TAG_GPSDestDistance]: 'GPSDestDistance',
        [GPS_INFO_TAG_GPSProcessingMethod]: 'GPSProcessingMethod',
        [GPS_INFO_TAG_GPSAreaInformation]: 'GPSAreaInformation',
        [GPS_INFO_TAG_GPSDateStamp]: 'GPSDateStamp',
        [GPS_INFO_TAG_GPSDifferential]: 'GPSDifferential',
        [GPS_INFO_TAG_GPSHPositioningError]: 'GPSHPositioningError',
    },

    [EXIF_TAGS_INTEROPERABILITY_LEVEL]: {
        [INTEROPERABILITY_TAG_InteroperabilityIndex]: 'InteroperabilityIndex',
        [INTEROPERABILITY_TAG_InteroperabilityVersion]: 'InteroperabilityVersion',
        [INTEROPERABILITY_TAG_RelatedImageFileFormat]: 'RelatedImageFileFormat',
        [INTEROPERABILITY_TAG_RelatedImageWidth]: 'RelatedImageWidth',
        [INTEROPERABILITY_TAG_RelatedImageLength]: 'RelatedImageLength',
    },

};

