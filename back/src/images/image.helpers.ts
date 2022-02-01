import fs from 'fs';
import * as path from 'path';
import { finished } from 'stream/promises';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';

const pathToImage = (
  type: 'avatar' | 'post',
  fileName: string
) => {
  return path.resolve(__dirname, type, fileName);
}

export async function makeSquare(
  type: 'avatar' | 'post',
  fileName: string
) {
  const buffer = fs.readFileSync(pathToImage(type, fileName));
  await sharp(buffer).resize(1000, 1000).toFormat('png').toFile(pathToImage(type, fileName));
}

export async function uploadImage(
  file,
  type: 'avatar' | 'post'
) {
  const { createReadStream, filename } = await file;
  const stream = await createReadStream();

  const fileExt = filename.split('.')[filename.split('.').length-1];
  const newName = `${type}-${uuidv4()}.${fileExt}`;

  const out = await fs.createWriteStream(pathToImage(type, newName));
  await stream.pipe(out);
  await finished(out);

  return newName;
}

export async function deleteImage(
  name: string,
  type: 'avatar' | 'post',
) {
  fs.unlink(path.resolve(__dirname, type, name), () => {});
}