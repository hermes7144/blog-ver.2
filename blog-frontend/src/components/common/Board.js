import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { boardActions } from '../../slices/boardSlice';

function Board() {
  const { boardList, boardStatus, boardStatusText } = useSelector((state) => state.board);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(boardActions.getBoardList());
  }, [dispatch]);
  return (
    <>
      {boardList && (
        <div>
          <ul>
            <li key={0}>
              <Link to="/">
                <span>Main</span>
              </Link>
            </li>
            {boardList.map((board) => (
              <li key={board?._id}>
                <Link to={{ pathname: `/board/${board?.name}` }}>
                  <span>{board?.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Board;
