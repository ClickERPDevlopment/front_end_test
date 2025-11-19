/*
import React from "react";
import { Editor } from "@tinymce/tinymce-react";

interface EditorProps {
  value: string;
  onEditorChange: (content: string) => void;
  theme?: "light" | "dark";
  height?: string;
  placeholder?: string;
}

const EditorComponent: React.FC<EditorProps> = ({
  value,
  onEditorChange,
  theme = "light",
  height = "300px",
  placeholder = "Start typing...", // Default placeholder text
}) => {
  const themeStyles = theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black";

  return (
    <div className={`relative ${themeStyles}`}>
      <Editor
        apiKey="fwghoog8i6jgmbjpflh5p60wragxgsckfzf1ncpd8ld1yckj"
        value={value}
        init={{
          height,
          menubar: false,
          plugins: [
            "advlist", "autolink", "lists", "link", "image", "charmap", "preview", "anchor"
          ],
          toolbar:
            "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
          placeholder, // Correct way to set placeholder
        }}
        onEditorChange={onEditorChange}
      />
    </div>
  );
};

export default EditorComponent;
*/