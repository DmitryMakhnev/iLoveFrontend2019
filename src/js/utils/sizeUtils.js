/**
 * @param {number} containerWidth
 * @param {number} containerHeight
 * @return {IElementBounds}
 */
export function calcMaxCenterSquareBounds(containerWidth, containerHeight) {
    let width;
    let height;
    let x;
    let y;

    if (containerHeight > containerWidth) {
        width = height = containerWidth;
        x = 0;
        y = (containerHeight - containerWidth) / 2;
    } else {
        width = height = containerHeight;
        x = (containerWidth - containerHeight) / 2;
        y = 0;
    }

    return {
        x,
        y,
        width,
        height,
    };
}
