"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exifr_1 = __importDefault(require("exifr"));
const fs_1 = require("fs");
const readline_1 = require("readline");
const rl = (0, readline_1.createInterface)({
    input: process.stdin,
    output: process.stdout
});
rl.question('Full path of the folder ', (path) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const filenames = yield fs_1.promises.readdir(path);
    const images = [];
    for (const filename of filenames) {
        const extension = getExtension(filename);
        if (!extension) {
            console.error('Unsupported extension: ', filename);
            continue;
        }
        const full = path + '\\' + filename;
        const exif = yield exifr_1.default.parse(full);
        if (extension) {
            console.log(exif);
            return;
        }
        const dateStr = (_a = exif === null || exif === void 0 ? void 0 : exif.DateTimeOriginal) !== null && _a !== void 0 ? _a : exif === null || exif === void 0 ? void 0 : exif.CreateDate;
        if (!dateStr) {
            console.error('EXIF problem: ', filename);
            continue;
        }
        const date = new Date(dateStr);
        images.push({
            filename,
            time: date.getTime(),
            date: date.toISOString().split('T')[0],
            extension
        });
    }
    images.sort((a, b) => b.time - a.time);
    const counter = {};
    for (const image of images) {
        counter[image.date] = counter[image.date] ? counter[image.date]++ : 1;
    }
    for (const image of images) {
        const filename = 1 < counter[image.date]
            ? `${image.date}_${counter[image.date]}.${image.extension}`
            : `${image.date}.${image.extension}`;
        console.log(image.filename, ' => ', filename);
        yield fs_1.promises.rename(path + '\\' + image.filename, path + '\\' + filename);
    }
    rl.close();
}));
const validExtension = ['png'];
function getExtension(filename) {
    const ss = filename.split('.');
    const extension = ss[ss.length - 1];
    return validExtension.includes(extension) ? extension : null;
}
