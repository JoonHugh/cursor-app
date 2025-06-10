import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';

function BlogEditor({ onChange, initialValue = '' }) {

    const editorRef = useRef(null);

    return(
        <Editor
            apiKey="0pehyk85g0bctzq9juo8lak7238m17rb8zng3yy5yw7n09hj" // Optional, or get a free key from TinyMCE
            onInit={(evt, editor) => editorRef.current = editor}
            initialValue={initialValue}
            init={{
                height: 500,
                menubar: false,
                plugins: [
                'advlist autolink lists link image charmap preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste help wordcount'
                ],
                toolbar:
            'undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help | image',

          // Image upload setup
          images_upload_handler: async (blobInfo, success, failure) => {
            try {
              const formData = new FormData();
              formData.append('file', blobInfo.blob(), blobInfo.filename());

              const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
              });

              const data = await res.json();
              success(data.url); // URL of uploaded image
            } catch (err) {
              failure('Image upload failed: ' + err.message);
            }
          },
            }}
            onEditorChange={(content) => onChange(content)}
    />
    )
}

export default BlogEditor