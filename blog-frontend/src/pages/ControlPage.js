import React, { useState } from 'react';
import Responsive from '../components/common/Responsive';
import { Helmet } from 'react-helmet-async';
import CreateBoard from './settings/CreateBoard';
import CreateCode from './settings/CreateCode';
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

  return (
    <Responsive>
      <Helmet>
        <title>설정 - REACTERS</title>
      </Helmet>
      <h1>설정</h1>
      <div>
        <div>
          <button onClick={onClickCreateCodeButton}>새 코드</button>
        </div>
        <div>
          {showCreateCode && (
            <CreateCode setShowCreateCode={setShowCreateCode} />
          )}
        </div>
        <div>
          <button onClick={onClickUpdateCodeButton}>코드 목록 수정</button>
        </div>

        <div>
          <button onClick={onClickCreateBoardButton}>새 게시판</button>
        </div>
        <div>
          {showCreateBoard && (
            <CreateBoard setShowCreateBoard={setShowCreateBoard} />
          )}
        </div>
        <div>
          <button onClick={onClickUpdateBoardList}>게시판 목록 수정</button>
        </div>
        {/* <div>
          {showCreateCode && (
            <UpdateCodeList setUpdateCodeList={setShowUpdateCodeList} />
          )}
        </div>
        <div>
          {showCreateCode && (
            <UpdateBoardList setUpdateBoardList={setShowUpdateBoardList} />
          )}
        </div> */}
      </div>
    </Responsive>
  );
};

export default ControlPage;
