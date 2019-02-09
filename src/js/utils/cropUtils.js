/**
 * @param {HTMLImageElement|HTMLCanvasElement} img
 * @param cropBounds
 * @return {HTMLCanvasElement}
 */
export function cropImageToCanvas(img, cropBounds, displayWidth) {
    const cropZoneCanvas = /** @type {HTMLCanvasElement} */ document.createElement('canvas');
    let top = Math.floor(cropBounds.y);
    let left = Math.floor(cropBounds.x);
    const width = Math.floor(cropBounds.width);
    const height = Math.floor(cropBounds.height);

    // fix crop bounds for correct image crop (size more than real source canvas area breaks drawImage in iOS)
    const canvasWithImageWidth = img.naturalWidth;
    const canvasWithImageHeight = img.naturalHeight;
    if (top + height > canvasWithImageHeight) {
        top = canvasWithImageHeight - height;
    }
    if (left + width > canvasWithImageWidth) {
        left = canvasWithImageWidth - width;
    }

    cropZoneCanvas.width = width;
    cropZoneCanvas.height = height;

    // in we have display with of croppingCanvas, we transform crop by display
    if (displayWidth) {

        const displayCoefficient = img.naturalWidth / displayWidth;
        cropZoneCanvas
            .getContext('2d')
            .drawImage(
                img,
                Math.floor(left * displayCoefficient),
                Math.floor(top * displayCoefficient),
                Math.floor(width * displayCoefficient),
                Math.floor(height * displayCoefficient),
                0,
                0,
                width,
                height,
            );
    } else {
        cropZoneCanvas.getContext('2d').drawImage(img, left, top, width, height, 0, 0, width, height);
    }


    return cropZoneCanvas;
}