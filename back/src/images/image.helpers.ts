import fs from 'fs';
import * as path from 'path';
import { finished } from 'stream/promises';
import { v4 as uuidv4 } from 'uuid';

export async function uploadImage(
  file,
  type: 'avatar' | 'post'
) {
  const { createReadStream, filename, mimetype, encoding } = await file;
  const stream = createReadStream();

  const fileExt = filename.split('.')[filename.split('.').length-1];
  const newName = `${type}-${uuidv4()}.${fileExt}`;

  const out = fs.createWriteStream(path.resolve(__dirname, type, newName));
  stream.pipe(out);
  await finished(out);

  // return { filename, mimetype, encoding };
  return newName;
}
