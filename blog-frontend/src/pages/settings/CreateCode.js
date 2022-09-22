import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { boardActions } from '../../slices/boardSlice';
import { codeActions } from '../../slices/codeSlice';

import palette from '../../lib/styles/palette';
import styled from 'styled-components';

function CreateCode({ setShowCreateCode }) {
  const [code, setCode] = useState({});
  const dispatch = useDispatch();

  function onChangeCode(e) {
    setCode({
      ...code,
      [e.current.name]: e.currentTarget.value,
    });
  }

  function onSubmit() {
    if (code.value !== '' && code.desc !== '') {
      dispatch(codeActions.postBoard({ code, setShowCreateCode }));
    } else {
      alert('값을 입력해주세요');
    }
  }

  useEffect(() => {
    dispatch(codeActions.getCodeList());
  }, [dispatch]);

  return (
    <>
      <div>
        <div>
          <span>코드 설명:</span>
          <input name="desc" onChange={onChangeCode} value={code?.desc ?? ''} />
        </div>
        <div>
          <span>코드 설정값:</span>
          <input
            name="value"
            onChange={onChangeCode}
            value={code?.value ?? ''}
          />
        </div>
        <button onClick={onSubmit}></button>
      </div>
    </>
  );
}

export default CreateCode;
