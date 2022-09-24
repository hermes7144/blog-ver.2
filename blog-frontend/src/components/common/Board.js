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
      {boardStatus === 200 ? (
        <div>
          <ul>
            <li key={0}>
              <Link to="/">
                <span>Main</span>
              </Link>
            </li>
            {boardList.length > 0 ? (
              boardList.map((board) => (
                <li key={board?._id}>
                  <Link to={{ pathname: `/board/${board?.name}` }}>
                    <span>{board?.name}</span>
                  </Link>
                </li>
              ))
            ) : (
              <div> 게시판이 없습니다. </div>
            )}
          </ul>
        </div>
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
    </>
  );
}

export default Board;
