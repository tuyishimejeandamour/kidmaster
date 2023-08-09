import { Message } from '@arco-design/web-react';
import { useMemoizedFn } from 'ahooks';
import { persist } from '../visualeditor';
import { useLayoutEffect, useState } from 'react';


export function usePersist() {
  const [fileHandle, setFileHandle] = useState<FileSystemFileHandle | null>(
    null
  );

  const currentFileName = fileHandle?.name ?? '';

  const open = useMemoizedFn(async () => {
    if (!window.showOpenFilePicker) {
      Message.error('Error occurred');
      return;
    }
    const [fileHandle] = await window.showOpenFilePicker({
      types: [
        {
          description: 'KidMaster',
          accept: {
            'application/codeck': ['.codeck'],
          },
        },
      ],
      excludeAcceptAllOption: true,
      multiple: false,
    });

    setFileHandle(fileHandle);

    const fileData = await fileHandle.getFile();
    const raw = await fileData.text();
    persist.load(JSON.parse(raw));
  });

  const save = useMemoizedFn(async () => {
    if (fileHandle) {
      await writeFile(fileHandle, JSON.stringify(persist.getCurrentData()));
    }
    persist.saveIntoLocalStorage();
    Message.success('Uploaded successful');
  });

  const saveAs = useMemoizedFn(() => {
    const raw = JSON.stringify(persist.getCurrentData());
    const blob = new Blob([raw], { type: 'text/plain;charset=utf-8' });
    // FileSaver.saveAs(blob, `codeck-${Date.now()}.codeck`);
  });

  useLayoutEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key == 's') {
        e.preventDefault();
        e.stopPropagation();

        await save();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return { open, save, saveAs, currentFileName };
}

async function writeFile(fileHandle: FileSystemFileHandle, contents: string) {
  // Create a FileSystemWritableFileStream to write to.
  const writable = await fileHandle.createWritable();

  // Write the contents of the file to the stream.
  await writable.write(contents);

  // Close the file and write the contents to disk.
  await writable.close();
}
