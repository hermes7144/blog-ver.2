import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { boardActions } from '../../slices/boardSlice';
import { codeActions } from '../../slices/codeSlice';
import { useNavigate } from 'react-router-dom';

import palette from '../../lib/styles/palette';
import styled from 'styled-components';

function CreateBoard({ setShowCreateBoard }) {
  const navigate = useNavigate();

  const { codeList, boardList, boardStatus } = useSelector(({ code, board }) => ({
    codeList: code.codeList,
    boardList: board.boardList,
    boardStatus: board.boardStatus,
  }));

  const [board, setBoard] = useState({});
  const dispatch = useDispatch();

  function onChangeBoard(e) {
    setBoard({
      ...board,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  }

  const onSubmit = () => {
    if (board?.name) {
      dispatch(boardActions.postBoard(board));
    } else {
      alert('게시판 이름은 필수값입니다.');
    }
  };

  useEffect(() => {
    dispatch(codeActions.getCodeList());
  }, [dispatch]);

  return (
    <>
      <div>
        {codeList &&
          (codeList.length > 0 ? (
            <div>
              <div>
                <span>게시판 명:</span>
                <input name="name" onChange={onChangeBoard} />
              </div>
              <div>
                <span>사용 코드: </span>
                <select name="code" onChange={onChangeBoard}>
                  <option value="">선택</option>
                  {codeList.map((code, index) => (
                    <option value={code?.value} key={index}>
                      {code?.description ?? ''}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <button onClick={onSubmit}>등록</button>
              </div>
            </div>
          ) : (
            <div>코드 등록이 필요합니다.</div>
          ))}
      </div>
    </>
  );
}

export default CreateBoard;
