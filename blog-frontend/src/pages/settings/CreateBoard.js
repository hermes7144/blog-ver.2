import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { boardActions } from '../../slices/boardSlice';
import { codeActions } from '../../slices/codeSlice';

import palette from '../../lib/styles/palette';
import styled from 'styled-components';

function CreateBoard({ setShowCreateBoard }) {
  const { codeList, codeStatus, codeStatusText } = useSelector((state) => state.code);

  const [board, setBoard] = useState({});
  const dispatch = useDispatch();

  function onChangeArticle(e) {
    setBoard({
      ...board,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  }

  function onSubmit() {
    if (board?.name) {
      dispatch(boardActions.postBoard({ board, setShowCreateBoard }));
    } else {
      alert('게시판 이름은 필수값입니다.');
    }
  }

  useEffect(() => {
    dispatch(codeActions.getCodeList());
  }, [dispatch]);

  return (
    <>
      <div>
        {codeStatus === 200 ? (
          codeList.length > 0 ? (
            <div>
              <div>
                <span>게시판 명:</span>
                <input name="name" onChange={onChangeArticle} />
              </div>
              <div>
                <span>사용 코드: </span>
                <select name="code" onChange={onChangeArticle}>
                  <option value="">선택</option>
                  {codeList.map((code) => (
                    <option value={code?.value}>{code?.description ?? ''}</option>
                  ))}
                </select>
              </div>
              <div>
                <button onClick={onSubmit}>등록</button>
              </div>
            </div>
          ) : (
            <div>코드 등록이 필요합니다.</div>
          )
        ) : (
          <div>
            <div>
              <span>{codeStatus}</span>
            </div>
            <div>
              <span>{codeStatusText}</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CreateBoard;
