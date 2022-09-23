import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { codeActions } from '../../slices/codeSlice';

function UpdateCodeList({ setShowUpdateCodeList }) {
  const { codeList, codeStatus, codeStatusText } = useSelector((state) => state.code);
  const [updateCodeList, setUpdateCodeList] = useState(codeList ?? []);
  const dispatch = useDispatch();

  function onChangeCode(e) {
    const copiedCodeList = [...updateCodeList];
    copiedCodeList[e.target?.dataset?.index] = { ...copiedCodeList[e.target?.dataset?.index], [e.target?.name]: e.target?.value };
    setUpdateCodeList(copiedCodeList);
  }

  function onSubmit(updatedCode) {
    if (!updatedCode?.value || !updatedCode?.description || updatedCode?.value === '' || updatedCode?.description === '') {
      alert('빠짐없이 입력해주세요.');
    } else {
      dispatch(codeActions.putCode(updatedCode));
    }
  }

  function onRemove(codeId) {
    if (!window.confirm('삭제하시겠습니까?')) return false;
    dispatch(codeActions.deleteCode(codeId));
  }

  useEffect(() => {
    dispatch(codeActions.getCodeList());
  }, [dispatch]);

  useEffect(() => {
    setUpdateCodeList(codeList);
  }, [codeList]);

  return (
    <div>
      {codeStatus === 200 ? (
        updateCodeList.length > 0 ? (
          updateCodeList.map((updatedCode, index) => (
            <div key={updatedCode._id}>
              <div>
                <span>코드 설명: </span>
                <input name="description" value={updatedCode?.description ?? ''} data-index={index} onChange={onChangeCode} />
              </div>
              <div>
                <span>게시판 코드값: </span>
                <input name="value" value={updatedCode?.value ?? ''} data-index={index} onChange={onChangeCode} />
              </div>
              <div>
                <button onClick={() => onSubmit(updatedCode)}>저장</button>
              </div>
              <div>
                <button onClick={() => onRemove(updatedCode?._id ?? 0)}>삭제</button>
              </div>
            </div>
          ))
        ) : (
          <div>수정할 코드가 없습니다.</div>
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
  );
}

export default UpdateCodeList;
