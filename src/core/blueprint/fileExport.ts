import { fileSave } from 'browser-fs-access';
import useApp from 'hooks/useApp';
import useBlueprint from 'hooks/useBlueprint';
import { blueprintExportify } from './blueprintExportify';
import { WATERMARK_KEY, WATERMARK_VALUE } from './blueprintImportify';
import {
  FILE_EXTENSION_REGEX,
  UNNAMED_BLUEPRINT_FILE_NAME,
} from './fileSaveAs';

export const fileExport = async () => {
  const { fileHandle } = useApp.getState();
  const fileName =
    fileHandle?.name.replace(FILE_EXTENSION_REGEX, '') ??
    UNNAMED_BLUEPRINT_FILE_NAME.replace(FILE_EXTENSION_REGEX, '');
  const data = blueprintExportify(useBlueprint.getState());
  const blob = new Blob(
    [
      `{\n"${WATERMARK_KEY}": "${WATERMARK_VALUE}"\n\n,${JSON.stringify(
        data,
      ).slice(1)}`,
    ],
    {
      // TODO: formatting the JSON must be a settings option
      type: 'application/json',
    },
  );

  await fileSave(blob, {
    fileName: `${fileName}.txt`, // TODO: make this a settings option
    description: 'SFS blueprint file',
    mimeTypes: ['application/json'],
    extensions: ['.json', '.txt'],
  });
};
