import React from 'react';
import { useStateFunctionAny } from '../../types/common.types';

interface PhotoUploadInputI {
  cls: string;
  setFile: useStateFunctionAny;
}

function onChangeFile(
  event: React.ChangeEvent<any>,
  setFile: useStateFunctionAny
) {
  if (event.target.validity.valid) {
    setFile(event.target.files[0]);
  }
}

export function PhotoUploadInput(props: PhotoUploadInputI) {
  const { cls, setFile } = props;

  return (
    <div className='form-part'>
      <input
        type="file"
        className={`photo-upload-input ${cls}`}
        accept='.jpg, .jpeg, .png'
        onChange={e => onChangeFile(e, setFile)}
      />
    </div>
  );
}