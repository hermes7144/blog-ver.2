import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { boardActions } from '../../slices/boardSlice';
import { codeActions } from '../../slices/codeSlice';

function UpdateBoardList() {
  const { boardList, boardStatus, boardStatusText } = useSelector((state) => state.board);
  const { codeList, codeStatus, codeStatusText } = useSelector((state) => state.code);
  const [updatedBoardList, setUpdatedBoardList] = useState(boardList ?? []);
  const dispatch = useDispatch();

  function onChangeBoard(e) {
    const copiedBoardList = [...updatedBoardList];
    copiedBoardList[e.target?.dataset?.index] = {
      ...copiedBoardList[e.target?.dataset?.index],
      [e.target?.name]: e.target?.value,
    };
    setUpdatedBoardList(copiedBoardList);
  }

  function onSubmit(updatedBoard) {
    if (!updatedBoard?.name || !updatedBoard?.code || !updatedBoard?.name === '' || !updatedBoard?.code === '') {
      alert('빠짐없이 입력해주세요.');
    } else {
      dispatch(boardActions.putBoard(updatedBoard));
    }
  }
  function onRemove(boardId) {
    if (!window.confirm('삭제하시겠습니까?')) return false;
    dispatch(boardActions.deleteBoard(boardId));
  }

  useEffect(() => {
    dispatch(boardActions.getBoardList());
    dispatch(codeActions.getCodeList());
  }, [dispatch]);

  useEffect(() => {
    setUpdatedBoardList(boardList);
  }, [boardList]);

  return (
    <div>
      {boardStatus === 200 ? (
        updatedBoardList.length > 0 ? (
          updatedBoardList.map((updatedBoard, index) => (
            <>
              <div>
                <span>게시판 이름: </span>
                <input name="name" value={updatedBoard?.name ?? ''} data-index={index} onChange={onChangeBoard} />
              </div>
              <div>
                <span>게시판 코드값: </span>
                {codeStatus === 200 ? (
                  codeList.length > 0 ? (
                    <select name="code" value={updatedBoard?.code ?? ''} data-index={index} onChange={onChangeBoard}>
                      <option value="">선택</option>
                      {codeList.length > 0 && codeList.map((code) => <option value={code?.value}>{code?.description ?? ''}</option>)}
                    </select>
                  ) : (
                    <div>코드등록이 필요합니다.</div>
                  )
                ) : (
                  <>
                    <div>
                      <div>
                        <span>{codeStatus}</span>
                      </div>
                      <div>
                        <span>{codeStatusText}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div>
                <button onClick={() => onSubmit(updatedBoard)}>저장</button>
              </div>
              <div>
                <button onClick={() => onRemove(updatedBoard?._id ?? 0)}>삭제</button>
              </div>
            </>
          ))
        ) : (
          <div>수정할 게시판이 없습니다.</div>
        )
      ) : (
        <div>
          <div>
            <span>{boardStatus}</span>
          </div>
          <div>
            <span>{boardStatusText}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdateBoardList;
