import { createContext, useContext, useState } from 'react';
import PropTypes from "prop-types";

export const CodeContext = createContext();

export const CodeProvider = ({ children }) => {
    const [selectedFileContent, setSelectedFileContent] = useState('');

    return (
        <CodeContext.Provider value={{ selectedFileContent, setSelectedFileContent }}>
            {children}
        </CodeContext.Provider>
    );
};

export const useCode = () => {
    return useContext(CodeContext);
};

CodeProvider.propTypes = {
    children: PropTypes.node
};
