import { fileSave } from 'browser-fs-access';
import { UNNAMED_BLUEPRINT_FILE_NAME } from 'functions/blueprint/constants/file';
import {
  WATERMARK_KEY,
  WATERMARK_VALUE,
} from 'functions/blueprint/constants/watermark';
import appStore from 'stores/app';
import blueprintStore from 'stores/blueprint';
import { declareNoUnsavedChanges } from './declareNoUnsavedChanges';
import { savifyBlueprint } from './savifyBlueprint';

export const fileSaveAs = async () => {
  const fileHandle = appStore.getState().fileHandle;
  const data = savifyBlueprint(blueprintStore.getState());
  const blob = new Blob(
    [
      `{\n"${WATERMARK_KEY}": "${WATERMARK_VALUE}"\n\n,${JSON.stringify(
        data,
      ).slice(1)}`,
    ],
    {
      type: 'application/json',
    },
  );
  const newFileHandle = (await fileSave(blob, {
    fileName: fileHandle?.name ?? UNNAMED_BLUEPRINT_FILE_NAME,
    description: 'Stellar blueprint file',
    mimeTypes: ['application/json'],
    extensions: ['.stbp'],
  })) as unknown as FileSystemFileHandle | null;

  appStore.setState({ fileHandle: newFileHandle ?? undefined });
  declareNoUnsavedChanges();
};
