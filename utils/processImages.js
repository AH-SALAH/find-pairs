import Jimp from "jimp/es";
import fs from "fs/promises";
import path from "path";

// resize img
export const resizeImg = async (filePath = '', outputPath = '/assets/cards/', size = 200, filePrefix = Date.now()) => {
    try {
        let readImg = await Jimp.read(filePath);
        let file = outputPath + filePrefix + '_' + size + 'x.' + readImg.getExtension();
        let fPath = path.join(process.cwd() + '/public' + file);

        try {
            // if file found return it
            let notFound = await fs.access(fPath);
            if (!notFound) return file;
            // console.log("notFound err: ", notFound);
        } catch (error) {
            let processed = readImg.resize(size, Jimp.AUTO);
            await processed.writeAsync(fPath);
            return file;
        }

    } catch (error) {
        console.log("resizeImg Jimp Read err: ", error);
    }
};

// resize imgs from arr
export const resizeImgs = async (data = []) =>
    Promise.all(
        data.map(async (img, i) =>
            new Promise(async (resolve, reject) => {
                try {
                    let path = img.download_url || img.url || img.src;
                    let processed = await resizeImg(path, undefined, undefined, i + 1);

                    if (img.download_url) img.download_url = processed;
                    if (img.url) img.url = processed;
                    if (img.src) img.src = processed;

                    console.log("processed: ", processed);
                    resolve(img);
                } catch (error) {
                    reject(img);
                }
            })
        )
    );

// if dir exist return its files else do resize & create dir
export const resizeImgsIfNotExist = async (data = [], dir = '/public', filesPath = '/assets/cards/') =>
    new Promise(async (resolve, reject) => {
        try {
            let dirPath = path.join(process.cwd() + dir + filesPath);
            let files = data;

            try {
                let notFound = await fs.access(dirPath);
                if (!notFound) {
                    let fls = await fs.readdir(dirPath);
                    if (fls) files = data.map((img, i) => setParam(img, filesPath, fls, i));
                    // console.log("data: ", data, "found fls: ", files);
                    resolve(files);
                }
                else {
                    files = await resizeImgs(data);
                    resolve(files);
                }
            } catch (error) {
                files = await resizeImgs(data);
                resolve(files);
            }

        } catch (error) {
            console.log("resizeImgsIfNotExist err: ", error);
            reject(data);
        }
    });

const setParam = (img = {}, filesPath = '', fls = [], i = 0) => {
    switch (img) {
        case img.url:
            img.url = fls[i] ? filesPath + fls[i] : img.url;
            return img;
        case img.download_url:
            img.download_url = fls[i] ? filesPath + fls[i] : img.download_url;
            return img;
        case img.src:
            img.src = fls[i] ? filesPath + fls[i] : img.src;
            return img;
        default:
            img.url = fls[i] ? filesPath + fls[i] : img.url;
            return img;
    }
};