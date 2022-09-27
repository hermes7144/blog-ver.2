import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { boardActions } from '../../slices/boardSlice';
import { codeActions } from '../../slices/codeSlice';

function CreateBoard({ setShowCreateBoard }) {
  const { codeList } = useSelector(({ code }) => ({
    codeList: code.codeList,
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
