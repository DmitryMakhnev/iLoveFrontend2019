/**
 * @implements EventListener
 */
import { getDataViewFromBlob } from '../lib/binaryUtils';
import { loadImageFromFile } from '../lib/imageUtils';
import { getEXIFDataFromJPG, isValidJPG } from '../lib/jpgUtils';
import { ExtendedError } from '../lib/ExtendedError';
import { ERROR_CODE_NOT_JPG_FILE_BY_BINARY_CHECKING } from '../lib/ErrorCodes';


export class ImagePreview {

    /**
     * @param {HTMLInputElement} fileInput
     * @param {HTMLElement} output
     */
    constructor(fileInput, output) {
        this._fileInput = fileInput;
        this._output = output;

        this._fileInput.addEventListener('change', this);
    }

    handleEvent(e) {
        switch (e.type) {
            case 'change':
                this._handleFileChange(e);
                break;
        }
    }

    /**
     * @param {Event} e
     * @private
     */
    _handleFileChange(e) {
        const file = /** @type {File} */ this._fileInput.files[0];

        // loadImageFromFile(file)
        //     .then(
        //
        //     );

        getDataViewFromBlob(file)
            .then(fileDataView => {
                if (!isValidJPG(fileDataView)) {
                    throw new ExtendedError(
                        ERROR_CODE_NOT_JPG_FILE_BY_BINARY_CHECKING,
                        'is not jpg file by binary checking',
                        fileDataView
                    );
                }


                const result = getEXIFDataFromJPG(fileDataView);
                console.log(result);

            })
            .catch(extendedError => {
                console.log(extendedError);
            });

        // TODO: [dmitry.makhnev] validate

        this._showImage(file);

    }

    /**
     * @param {File} file
     * @private
     */
    _showImage(file) {
        this._cleanOutput();

        const img = /** @type {HTMLImageElement} */ document.createElement('img');
        img.src = URL.createObjectURL(file);

        this._output.appendChild(img);
    }

    _cleanOutput() {
        const output = this._output;
        while (output.firstChild) {
            output.removeChild(output.firstChild);
        }
    }



}


