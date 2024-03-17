import {Select} from "@chakra-ui/react";

export default function LanguageSelectMenu() {
    return (
        <>
            <div className="w-[250px]">
                <Select placeholder='Select Language' style={{marginBottom: '1rem'}}>
                    <option value="python">Python</option>
                    <option value="javascript">JavaScript</option>
                    <option value="java">Java</option>
                    <option value="csharp">C#</option>
                    <option value="cpp">C++</option>
                    <option value="php">PHP</option>
                    <option value="ruby">Ruby</option>
                    <option value="swift">Swift</option>
                    <option value="go">Go</option>
                    <option value="typescript">TypeScript</option>
                    <option value="other">Other</option>
                </Select>
            </div>
        </>
    )
}