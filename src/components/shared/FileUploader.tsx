import { convertFileToUrl } from "@/lib/utils";
import { useState, useCallback } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";

type FileUploaderProps = {
  fieldChange: (FILES: File[]) => void;
  mediaUrl: string;
};
const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>();
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      console.log(file);
      fieldChange(acceptedFiles);
      setFileUrl(convertFileToUrl(acceptedFiles[0]));
      console.log(fileUrl);
    },
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpeg", ".jpg"] },
  });
  return (
    <div
      {...getRootProps()}
      className="flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer"
    >
      <input {...getInputProps()} className="cursor-pointer" />

      {fileUrl ? (
        <>
          <div className="flex flex-1 justify-center w-full py-5 lg:p-10">
            <img
              src={fileUrl}
              alt="image"
              className="file-uploader-img w-[150px] h-[150px] object-fill rounded-[50%]"
            />
            <Trash className="relative right-0 h-4 w-4 " />
          </div>
          <p className="text-light-4 text-center small-regular w-full p-4 border-t border-t-dark-4">
            Click or drag photo to replace
          </p>
        </>
      ) : (
        <div className="flex flex-col items-center p-7 h-80">
          <img
            src="/assets/icons/file-upload.svg"
            alt="file upload"
            width={96}
            height={77}
          />

          <h3 className="base-medium text-light-2 mb-2 mt-6">
            Drag photo here
          </h3>
          <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>

          <Button
            type="button"
            className="h-12 bg-dark-4 px-5 text-light-1 flex gap-2 "
          >
            Select from computer
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
