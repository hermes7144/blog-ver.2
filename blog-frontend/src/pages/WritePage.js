import React from 'react';
import Responsive from '../components/common/Responsive';
import EditorContainer from '../containers/write/EditorContainer';
import TagBoxContainer from '../containers/write/TagBoxContainer';
import WriteActionButtonsContainer from '../containers/write/WriteActionButtonsContainer';
import CategorySelectBox from '../components/common/CategorySelectBox';

import { Helmet } from 'react-helmet-async';
import HeaderContainer from '../containers/common/HeaderContainer';

const WritePage = () => {
  return (
    <>
      <Helmet>
        <title>글 작성하기 - Front Dev.</title>
      </Helmet>
      <HeaderContainer />

      <Responsive>
        <EditorContainer />
        <CategorySelectBox />

        <TagBoxContainer />
        <WriteActionButtonsContainer />
      </Responsive>
    </>
  );
};

export default WritePage;
