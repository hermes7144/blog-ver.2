import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { boardActions } from '../../slices/boardSlice';
import { useParams } from 'react-router-dom';
import palette from '../../lib/styles/palette';

function Board() {
  const { boardList, loading } = useSelector(({ board, loading }) => ({
    boardList: board.boardList,
    loading: loading['board/getBoardList'],
  }));
  const { boardName } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(boardActions.getBoardList());
  }, [dispatch]);
  return (
    <>
      {!loading && boardList && (
        <div>
          <ul>
            <li key={0}>
              <Link to="/">
                <span style={{ color: boardName === undefined ? `${palette.orange[7]}` : '' }}>Main</span>
              </Link>
            </li>
            {boardList.map((board) => (
              <li key={board._id}>
                <Link to={{ pathname: `/board/${board.name}` }}>
                  <span style={{ color: boardName === board.name ? `${palette.orange[7]}` : '' }}>{board?.name}</span>
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
