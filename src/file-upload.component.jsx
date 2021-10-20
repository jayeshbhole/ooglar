import { useRef } from "react";
import {
    FileUploadContainer,
    FormField,
    DragDropText,
    UploadFileBtn,
} from "./file-upload.styles";

const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 5000000;

const convertNestedObjectToArray = (nestedObj) =>
    nestedObj && Object.keys(nestedObj).map((key) => nestedObj[key]);

const FileUpload = ({ updateFilesCb: setPhoto, multiple, accept }) => {
    const fileInputField = useRef(null);

    const handleUploadBtnClick = () => {
        fileInputField.current.click();
    };
    const handleNewFileUpload = (e) => {
        const { files: newFiles } = e.target;

        if (newFiles.length) {
            let updatedFiles;
            for (let file of newFiles) {
                if (
                    file.size <= DEFAULT_MAX_FILE_SIZE_IN_BYTES &&
                    file.type.split("/")[0] === "image"
                ) {
                    updatedFiles = { file };
                }
            }
            const filesAsArray = convertNestedObjectToArray(updatedFiles);
            setPhoto(filesAsArray);
        }
    };

    return (
        <>
            <FileUploadContainer>
                <DragDropText>
                    Drag and drop your files anywhere or
                </DragDropText>
                <UploadFileBtn type='button' onClick={handleUploadBtnClick}>
                    <i className='fas fa-file-upload' />
                    <span> Upload {multiple ? "files" : "a file"}</span>
                </UploadFileBtn>
                <FormField
                    type='file'
                    ref={fileInputField}
                    onChange={handleNewFileUpload}
                    title=''
                    value=''
                    multiple
                    accept={accept}
                />
            </FileUploadContainer>
        </>
    );
};

export default FileUpload;
