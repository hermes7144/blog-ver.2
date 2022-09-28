import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import hljs from 'highlight.js';
import 'react-quill/dist/quill.core.css';
import 'react-quill/dist/quill.bubble.css';

import ReactQuill, { Quill } from 'react-quill';
import ImageResize from 'quill-image-resize';
Quill.register('modules/ImageResize', ImageResize);

hljs.configure({
  languages: ['javascript', 'ruby', 'python', 'rust'],
});

const modules = {
  syntax: {
    highlight: (text) => hljs.highlightAuto(text).value,
  },
  toolbar: [['bold', 'italic', 'underline', 'blockquote'], ['link', 'image', 'video'], ['clean'], ['code-block']],
  clipboard: {
    matchVisual: false,
  },
  ImageResize: {
    parchment: Quill.import('parchment'),
  },
};

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
  'code-block',
];

const EditorBlock = styled.div`
  /* 페이지 위 아래 여백 지정 */
  padding-top: 5rem;
  padding-bottom: 5rem;
`;
const TitleInput = styled.input`
  font-size: 3rem;
  outline: none;
  padding-bottom: 0.5rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[4]};
  margin-bottom: 2rem;
  width: 100%;
`;
const QuillWrapper = styled.div`
  /* 최소 크기 지정 및 padding 제거 */
  .ql-editor {
    min-height: 320px;
    font-size: 1.125rem;
    line-height: 1.5;
  }
  .ql-editor.ql-blank::before {
    left: 0px;
  }
`;

const Editor = ({ title, body, onChangeField }) => {
  const onChangeTitle = (e) => {
    onChangeField({ key: 'title', value: e.target.value });
  };
  const onChangeBody = (e) => {
    onChangeField({ key: 'body', value: e });
  };

  return (
    <EditorBlock>
      <TitleInput placeholder="제목을 입력하세요" onChange={onChangeTitle} value={title} />
      <QuillWrapper>
        <ReactQuill
          placeholder=" 내용을 작성하세요..."
          value={body}
          onChange={onChangeBody}
          theme="bubble"
          modules={modules}
          formats={formats}
        />
      </QuillWrapper>
    </EditorBlock>
  );
};

export default Editor;
