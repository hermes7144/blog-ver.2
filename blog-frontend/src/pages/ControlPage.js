import React, { useState } from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import Responsive from '../components/common/Responsive';
import { Helmet } from 'react-helmet-async';
import CreateBoard from './settings/CreateBoard';
import CreateCode from './settings/CreateCode';
import UpdateCodeList from './settings/UpdateCodeList';
import UpdateBoardList from './settings/UpdateBoardList';

import styled from 'styled-components';

const ControlPage = () => {
  const [showCreateCode, setShowCreateCode] = useState(false);
  const [showCreateBoard, setShowCreateBoard] = useState(false);
  const [showUpdateCodeList, setShowUpdateCodeList] = useState(false);
  const [showUpdateBoardList, setShowUpdateBoardList] = useState(false);

  function onClickCreateCodeButton() {
    setShowCreateCode(!showCreateCode);
  }

  function onClickUpdateCodeButton() {
    setShowUpdateCodeList(!showUpdateCodeList);
  }

  function onClickCreateBoardButton() {
    setShowCreateBoard(!showCreateBoard);
  }

  function onClickUpdateBoardList() {
    setShowUpdateBoardList(!showUpdateBoardList);
  }

  const PostViewerBlock = styled(Responsive)`
    margin-top: 4rem;
  `;

  return (
    <>
      <Helmet>
        <title>설정 - REACTERS</title>
      </Helmet>
      <HeaderContainer />
      <PostViewerBlock>
        <h1>설정</h1>
        <div>
          <div>
            <button onClick={onClickCreateCodeButton}>새 코드</button>
          </div>
          <div>{showCreateCode && <CreateCode setShowCreateCode={setShowCreateCode} />}</div>
          <div>
            <button onClick={onClickUpdateCodeButton}>코드 목록 수정</button>
          </div>
          <div>{showUpdateCodeList && <UpdateCodeList setUpdateCodeList={setShowUpdateCodeList} />}</div>
          <div>
            <button onClick={onClickCreateBoardButton}>새 게시판</button>
          </div>
          <div>{showCreateBoard && <CreateBoard setShowCreateBoard={setShowCreateBoard} />}</div>
          <div>
            <button onClick={onClickUpdateBoardList}>게시판 목록 수정</button>
          </div>
          <div>{showUpdateBoardList && <UpdateBoardList setUpdateBoardList={setShowUpdateBoardList} />}</div>
        </div>
      </PostViewerBlock>
    </>
  );
};

export default ControlPage;
