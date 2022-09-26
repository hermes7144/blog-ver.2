import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { boardActions } from '../../slices/boardSlice';
import { writeActions } from '../../slices/writeSlice';

const SelectBoxBlock = styled.div`
  width: 100%;
  border-top: 1px solid ${palette.gray[2]};

  h4 {
    color: ${palette.gray[8]}
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
`;

const SelectForm = styled.select`
  border-radius: 4px;
  width: 280px;
  border: 1px solid ${palette.gray[9]}; /* 스타일 초기화 */
  font-size: 1.2rem;
`;

function CategorySelectBox() {
  const { boardList } = useSelector((state) => state.board);
  const board = useSelector((state) => state.write.board);

  const dispatch = useDispatch();

  const onChangeBoard = (e) => dispatch(writeActions.changeField({ key: 'board', value: e.target.value }));

  useEffect(() => {
    dispatch(boardActions.getBoardList());
  }, [dispatch]);

  return (
    <div>
      {boardList && (
        <SelectBoxBlock>
          <h4>카테고리</h4>
          <SelectForm value={board} onChange={onChangeBoard}>
            <option>--Select--</option>
            {boardList.map((board, index) => (
              <option value={board.code} key={index}>
                {board.name}
              </option>
            ))}
          </SelectForm>
        </SelectBoxBlock>
      )}
    </div>
  );
}

export default CategorySelectBox;
