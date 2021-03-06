import useApp from 'hooks/useApp';
import { fileSaveAs } from './fileSaveAs';
import { fileWrite } from './fileWrite';

export const fileSave = () => {
  if (useApp.getState().fileHandle) {
    fileWrite();
  } else {
    fileSaveAs();
  }
};
