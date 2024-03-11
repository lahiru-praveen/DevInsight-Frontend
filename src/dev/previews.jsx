import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import CodePreview from "../pages/dashboard/CodePreview.jsx";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/CodePreview">
                <CodePreview/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews