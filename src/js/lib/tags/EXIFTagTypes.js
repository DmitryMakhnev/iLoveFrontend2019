

// An 8-bit unsigned integer
export const EXIF_TAG_TYPE_BYTE = 1;

// An 8-bit byte containing one 7-bit ASCII code. The final byte is terminated with NULL.
export const EXIF_TAG_TYPE_ASCII = 2;

// A 16-bit (2-byte) unsigned integer
export const EXIF_TAG_TYPE_SHORT = 3;

// A 32-bit (4-byte) unsigned integer
export const EXIF_TAG_TYPE_LONG = 4;

// Two LONGs. The first LONG is the numerator and the second LONG expresses the denominator
export const EXIF_TAG_TYPE_RATIONAL = 5;

// An 8-bit byte that may take any value depending on the field definition.
export const EXIF_TAG_TYPE_UNDEFINED = 7;

// (4-byte) signed integer (2's complement notation).
export const EXIF_TAG_TYPE_SLONG = 9;

// Two SLONGs. The first SLONG is the numerator and the second SLONG is the denominator.
export const EXIF_TAG_TYPE_SRATIONAL = 10;

