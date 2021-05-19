import React, { useState, useRef } from 'react';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { css } from '@emotion/react';
import 'tui-color-picker/dist/tui-color-picker.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { colors, fontSizes } from 'theme';
import { Link } from 'react-router-dom';
import Button from 'components/atoms/Button';
import PostTitle from 'components/atoms/PostTitle';
import { Select } from '@chakra-ui/react';

const Templates = () => {
  const [content, setContent] = useState('');
  const editorRef = useRef<Editor>();

  const handleSave = () => {
    if (editorRef.current) {
      setContent(editorRef.current.getInstance().getHtml());
    }
  };

  return (
    <div css={container}>
      <PostTitle />
      <Select variant="filled" size="lg" placeholder="캐릭터 타입">
        <option value="라이언">라이언</option>
        <option value="어피치">어피치</option>
        <option value="무지">무지</option>
        <option value="네오">네오</option>
        <option value="프로도">프로도</option>
      </Select>
      <Editor
        previewStyle="vertical"
        height="700px"
        initialEditType="wysiwyg"
        plugins={[colorSyntax]}
        ref={ref => ref && (editorRef.current = ref)}
      />
      <div css={btnContainer}>
        <Button
          borderRadius="20px"
          bgColor={colors.lightGray}
          color={colors.darkGray}
          css={buttonStyle}
        >
          취소
        </Button>
        <Link to="/" onClick={handleSave} css={linkStyle}>
          완료
        </Link>
      </div>
    </div>
  );
};

const container = css`
  max-width: 64rem;
  margin: 0 auto;
  padding-top: 3rem;

  label + div {
    margin-top: 1.5rem;
  }

  label::after {
    content: '';
    margin-top: 1rem;
    display: block;
    width: 100%;
    border-bottom: 1px solid ${colors.lightGray};
  }

  .chakra-select__wrapper {
    margin-bottom: 1rem;
  }
`;

const btnContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5rem 0;

  button + a {
    margin-left: 5rem;
  }
`;

const buttonStyle = css`
  padding: 1.7rem 6rem;
  font-size: ${fontSizes.base_16};
  transition: background-color 0.2s ease-in;

  &:hover {
    background-color: ${colors.yellow};
    color: ${colors.darkGray};
  }
`;

const linkStyle = css`
  display: block;
  background-color: ${colors.black};
  color: ${colors.white};
  padding: 2rem 6rem;
  border-radius: 20px;
  text-align: center;
  transition: background-color 0.2s ease-in;

  &:hover {
    background-color: ${colors.pink};
  }
`;

export default Templates;
