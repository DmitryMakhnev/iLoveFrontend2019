import { registerInjection } from 'diii';
import { action, observable } from 'mobx';
import { getDataViewFromBlob } from '../../../../libs/exif/binaryUtils';
import { readEXIFDataFormJPGDataView } from '../../../../libs/exif/jpgUtils';
import { EXIF_TAGS_TIFF_LEVEL, TIFF_TAG_Orientation } from '../../../../libs/exif/tags/EXIFTags';
import { STOP_LOOP_COMMAND } from '../../../../libs/exif/consts';
import { readEXIFTagValue } from '../../../../libs/exif/exifUtils';
import { TIFFTagOrientationValue } from '../../../../libs/exif/tags/TIFFTagOrientationValue';


/**
 * @param {number} orientation
 * @return {?Object}
 */
function calcCSSTransformByImageOrientation(orientation) {
    let style = null;

    switch (orientation) {
        case TIFFTagOrientationValue.ORIENTATION_TOPRIGHT:
            // horizontal flip
            style = 'scale(-1, 1)';
            break;
        case TIFFTagOrientationValue.ORIENTATION_BOTRIGHT:
            // 180° rotate left
            style = 'rotate(-180deg)';
            break;
        case TIFFTagOrientationValue.ORIENTATION_BOTLEFT:
            // vertical flip
            style = 'scale(1, -1)';
            break;
        case TIFFTagOrientationValue.ORIENTATION_LEFTTOP:
            // vertical flip + 90 rotate right
            style = 'rotate(90deg) scale(1, -1)';
            break;
        case TIFFTagOrientationValue.ORIENTATION_RIGHTTOP:
            // 90° rotate right
            style = 'rotate(90deg)';
            break;
        case TIFFTagOrientationValue.ORIENTATION_RIGHTBOT:
            // horizontal flip + 90 rotate right
            style = 'rotate(90deg) scale(-1, 1)';
            break;
        case TIFFTagOrientationValue.ORIENTATION_LEFTBOT:
            // 90° rotate left
            style = 'rotate(-90deg)';
            break;
    }

    return style;
}


@registerInjection
export class WithOrientationExampleViewModel {

    /**
     * @type {?string}
     */
    @observable.ref
    errorMessage = null;

    /**
     * @param {?string} errorMessage
     */
    @action.bound
    setErrorMessage(errorMessage) {
        this.errorMessage = errorMessage;
    }


    /**
     * @type {?number}
     */
    @observable.ref
    orientation = null;

    @action.bound
    setOrientation(orientation) {
        this.orientation = orientation;
    }


    @observable.ref
    imageFile = null;

    @observable.ref
    imgSrc = null;

    @observable.ref
    imgCustomStyle = null;

    /**
     * @param {File} imageFile
     * @param {?Object} [imgCustomStyle]
     */
    @action.bound
    setImage(imageFile, imgCustomStyle) {
        this.imageFile = imageFile;
        this.imgSrc = URL.createObjectURL(imageFile);
        this.imgCustomStyle = imgCustomStyle || null;
    }


    @action.bound
    onImageChange(e) {
        console.log('?');
        const imageFile = e.target.files[0];
        if (imageFile) {
            getDataViewFromBlob(imageFile)
                .then(fileDataView => {
                    let orientation = null;
                    readEXIFDataFormJPGDataView(
                        fileDataView,
                        {
                            common(tagId, tagByteIndex, baseEXIFReadingData, tagLevel) {
                                if ((tagLevel === EXIF_TAGS_TIFF_LEVEL)
                                    && (tagId === TIFF_TAG_Orientation)
                                ) {
                                    orientation = readEXIFTagValue(baseEXIFReadingData, tagByteIndex);
                                    return STOP_LOOP_COMMAND;
                                }
                            }
                        }
                    );

                    const transform = calcCSSTransformByImageOrientation(orientation);
                    const styles = transform
                        ? {
                            transform: transform,
                        }
                        : null;

                    this.setImage(imageFile, styles);

                    this.setOrientation(orientation);
                })
                .catch(e => {
                    this.setErrorMessage(e.message);
                })
        }
    }

}

