// import { useState } from "react";
// import EditorComponent from "../../components/Editor";
import Label from "../../components/form/Label";

const EditorUse: React.FC = () => {
    // const [editorContent, setEditorContent] = useState("");

    // // Handle Editor content change
    // const handleEditorChange = (content: string) => {
    //     setEditorContent(content);
    // };

    return (
        <>
            <Label text="Editor (TinyMCE)" position="top" />
            {/* <EditorComponent
                value={editorContent}
                onEditorChange={handleEditorChange}
                theme="light"
                height="300px"
                placeholder="Start typing here..."
            /> */}
        </>
    );
};

export default EditorUse;
