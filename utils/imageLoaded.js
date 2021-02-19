// resolve after img loaded
const whenPhotosLoaded = photos => {
    return Promise.all(photos.map(photo => new Promise((resolve) => {
        const image = photo?.querySelector('img') || {};
        // image.src = photo.src;

        if(!image.src) return resolve(photo);

        if (image.naturalWidth > 0 || image.complete) {
            resolve(photo);
        } else {
            image.onload = () => {
                resolve(photo);
            };
        }
    })));
};

// chk 4 loaded imgs
export const checkLoadedImgs = async photos => {
    try {
        await whenPhotosLoaded(photos);
    } catch (error) {
        console.log(error);
    }
};