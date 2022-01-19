import exifr from 'exifr';
import { promises as fs } from 'fs';
import { createInterface } from 'readline';

// Make sure diferent extenssions dont count to the same counter
// use fs.stat to get the createdData


type ImageFile = {
  filename: string;
  time: number;
  date: string;
  extension: string;
}

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Full path of the folder ', async path => {

  const filenames = await fs.readdir(path);
  const images: ImageFile[] = [];

  for (const filename of filenames) {

    const extension = getExtension(filename);

    if (!extension) {
      console.error('Unsupported extension: ', filename);
      continue;
    }

    const full = path + '\\' + filename;
    const exif = await exifr.parse(full);

    if (extension) {
      console.log(exif);
      return
    }

    const dateStr = exif?.DateTimeOriginal ?? exif?.CreateDate;

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

  const counter: { [date: string]: number } = {};
  for (const image of images) {
    counter[image.date] = counter[image.date] ? counter[image.date]++ : 1;
  }

  for (const image of images) {

    const filename = 1 < counter[image.date]
      ? `${image.date}_${counter[image.date]}.${image.extension}`
      : `${image.date}.${image.extension}`;

    console.log(image.filename, ' => ', filename);

    await fs.rename(path + '\\' + image.filename, path + '\\' + filename);
  }

  rl.close();
});


const validExtension = ['png'];
function getExtension(filename: string): string {
  const ss = filename.split('.');
  const extension = ss[ss.length - 1];
  return validExtension.includes(extension) ? extension : null;
}
