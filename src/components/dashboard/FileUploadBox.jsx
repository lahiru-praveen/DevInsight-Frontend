import { useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { AiOutlineFolderAdd, AiOutlineFileAdd, AiFillFileAdd } from "react-icons/ai";
import { FaWindowClose } from "react-icons/fa";

export default function FileUploadBox() {
    const [uploadedFiles, setUploadedFiles] = useState([]); // Renamed local state to avoid conflict
    const allowedExtensions = ['.txt', '.pdf'];

    const handleDrop = (event) => {
        event.preventDefault();
        const fileList = event.dataTransfer.items;

        const droppedFiles = [];

        // Iterate through dropped items
        for (let i = 0; i < fileList.length; i++) {
            const item = fileList[i];

            // Check if the item is a file
            if (item.kind === 'file') {
                const file = item.getAsFile();
                const extension = file.name.split('.').pop().toLowerCase();
                // Check if the file extension is allowed
                if (allowedExtensions.includes('.' + extension)) {
                    droppedFiles.push(file);
                }
            }
        }

        // Add dropped files to the existing files state
        setUploadedFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleFileInputChange = (event) => {
        const selectedFiles = Array.from(event.target.files);

        // Filter selected files to allow only .txt and .pdf extensions
        const filteredFiles = selectedFiles.filter(file => {
            const extension = file.name.split('.').pop().toLowerCase();
            return allowedExtensions.includes('.' + extension);
        });

        // Add filtered files to the files state
        setUploadedFiles((prevFiles) => [...prevFiles, ...filteredFiles]);
    };

    const handleFileRemove = (index) => {
        const updatedFiles = [...uploadedFiles];
        updatedFiles.splice(index, 1);
        setUploadedFiles(updatedFiles);
    };

    const handleClearFiles = () => {
        setUploadedFiles([]);
    };

    return (
        <>
            <div>
                <Box onDrop={handleDrop} onDragOver={handleDragOver} mt={4} p={4} borderWidth="1px" borderRadius="md"
                     bgColor={'#EBEBEB'} color={'#646464'} fontSize="18px" className="min-h-[30rem]" overflow='hidden'>
                    <div>
                        <label htmlFor="fileInput">
                            <AiFillFileAdd className="size-10 p-2 bg-white"/>
                        </label>
                        <input id="fileInput" type="file" style={{display: 'none'}} onChange={handleFileInputChange}
                               multiple/>
                        {uploadedFiles.length === 0 && (
                            <div className="text-red-300 font-bold">No File Has Chosen:</div>
                        )}
                    </div>
                    {uploadedFiles.length > 0 ? (
                        <div>
                            <div className="text-red-300 font-bold">Files Chosen:
                                <Button size="sm" onClick={handleClearFiles} borderColor='blue.500' textColor='blue.500'
                                        className="border-2 ml-3" bgColor="'#EBEBEB'">
                                    Cancel
                                </Button>
                            </div>
                            <ul>
                                {uploadedFiles.map((file, index) => (
                                    <li className="flex" key={index}>
                                        <div className="pt-1"><FaWindowClose onClick={() => handleFileRemove(index)}/>
                                        </div>
                                        <div className="pl-4 text-red-400">{file.name}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-[45vh]">
                            <div className="flex-row flex">
                                <AiOutlineFolderAdd className="size-10"/>
                                <AiOutlineFileAdd className="size-10"/>
                            </div>
                            <div>
                                <text className="font-bold">You can drag and drop files here to add them.</text>
                            </div>
                        </div>
                    )}
                </Box>
            </div>
        </>
    );
}
