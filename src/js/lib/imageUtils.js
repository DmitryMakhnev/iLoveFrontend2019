/**
 * @param {string} url
 * @return {Promise<?Image>}
 */
export function loadImage(url) {
    return new Promise(resolve => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
        img.src = url;
    });
}

/**
 * @param {Blob} file
 * @return {Promise<?HTMLImageElement>}
 */
export function loadImageFromFile(file) {
    const url = URL.createObjectURL(file);
    return loadImage(url);
}