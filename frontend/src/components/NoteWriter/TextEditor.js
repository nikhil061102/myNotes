import React, { useEffect } from "react";
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';

const TextEditor = () => {
  const { quill, quillRef } = useQuill();

  // Set initial value
  useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(``);
    }
  }, [quill]);

  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        console.log(quill.root.innerHTML);
      });
    }
  }, [quill]);

  return (
    <div style={{ margin: "5px" }}>
      <div ref={quillRef} />
    </div>
  );
};

export default TextEditor;
