import { createRef } from 'react';
import { registerInjection } from 'diii';
import { action, observable } from 'mobx';
import { calcMaxCenterSquareBounds } from '../../../../utils/sizeUtils';
import { cropImageToCanvas } from '../../../../utils/cropUtils';


@registerInjection
export class SetAvatarExampleViewModel {

    minAvatarSize = 64;

    imgRef = createRef();

    @observable.ref
    imageFile = null;

    @observable.ref
    imgSrc = null;

    @action.bound
    setImage(imageFile) {
        this.imageFile = imageFile;
        this.imgSrc = URL.createObjectURL(imageFile);
    }

    @action.bound
    onImageChange(e) {
        this.isCroppedImageShowed = false;

        const imageFile = e.target.files[0];
        if (imageFile) {
            this.setImage(imageFile);
        }
    }

    isCroppedImageShowed = false;

    @action.bound
    onImageLoad() {
        if (!this.isCroppedImageShowed) {
            if (!this.showCrop) {
                this.setShowCrop(true);
            }
            if (this.showCrop) {
                const initialCropBounds = calcMaxCenterSquareBounds(this.imageSize.width, this.imageSize.height);
                this.currentCropBounds = this.initialCropBounds = initialCropBounds;
            }
        }
    }

    @observable
    imageSize = null;

    @action.bound
    onImageSizeChange(imageSize) {
        this.imageSize = imageSize;
    }

    @action.bound
    onSelectionChange(selectionBounds) {
        this.currentCropBounds = selectionBounds;
    }

    @observable.ref
    showCrop = false;

    @observable.ref
    initialCropBounds = null;
    currentCropBounds = null;

    @action.bound
    setShowCrop(showCrop) {
        this.showCrop = showCrop;
    }

    @action.bound
    onCrop() {
        const canvas = cropImageToCanvas(this.imgRef.current, this.currentCropBounds, this.imageSize.width);
        canvas.toBlob(blob => {
            this.setImage(blob);
            this.isCroppedImageShowed = true;
            this.setShowCrop(false);
        });
    }



}