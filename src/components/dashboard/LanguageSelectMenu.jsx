import { Select } from "@chakra-ui/react";
import PropTypes from "prop-types";
import {MdArrowDropDown} from "react-icons/md";

export default function LanguageSelectMenu({ onLanguageChange, selectedLanguage }) {

    const handleChange = (event) => {
        const selectedLanguage = event.target.value;
        onLanguageChange(selectedLanguage); // Pass selected language to parent component
    };

    return (
        <div className="w-[250px]">
            <Select placeholder={selectedLanguage === 'Not given' ? ('Select Language') : (selectedLanguage)} onChange={handleChange} style={{marginBottom: '1rem'}} size='md' variant='filled' icon={<MdArrowDropDown />} >
                <option value="Python">Python</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Java">Java</option>
                <option value="HTML">HTML</option>
                <option value="C">C</option>
                <option value="C#">C#</option>
                <option value="C++">C++</option>
                <option value="PHP">PHP</option>
                <option value="Ruby">Ruby</option>
                <option value="Swift">Swift</option>
                <option value="Go">Go</option>
                <option value="TypeScript">TypeScript</option>
                <option value="Other">Other</option>
            </Select>
        </div>
    );
}

// Define propTypes outside the component
LanguageSelectMenu.propTypes = {
    onLanguageChange: PropTypes.func.isRequired, // Specify the type for onSelectFile
    selectedLanguage: PropTypes.string
};
