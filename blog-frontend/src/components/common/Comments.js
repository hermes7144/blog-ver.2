import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { commentActions } from '../../slices/commentSlice';
import palette from '../../lib/styles/palette';
import styled from 'styled-components';

const ActionButton = styled.button`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  color: ${palette.gray[6]};
  font-weight: bold;
  border: none;
  outline: none;
  font-size: 0.875rem;
  cursor: pointer;
  &:hover {
    background: ${palette.gray[1]};
    color: ${palette.cyan[7]};
  }
  & + & {
    margin-left: 0.25rem;
  }
`;

const Comment = styled.div`
  div {
    display: flex;
    justify-content: space-between;
  }
`;

const CommentArea = styled.textarea`
  resize: none;
  padding: 1rem 1rem 1.5rem;
  outline: none;
  border: 1px solid #333333;
  width: 100%;
  border-radius: 4px;
  min-height: 6.125rem;
  font-size: 1rem;
  color: #333333;
  line-height: 1.75;
  background: #ffffff;
`;

const SubmitButtonArea = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const SubmitButton = styled.button`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;
  background: #343a40;
`;

function Comments(props) {
  const [newComment, setNewComment] = useState('');
  const { user, commentList, status, statusText } = useSelector(
    ({ user, commentReducer }) => ({
      user: user.user,
      ...commentReducer,
    }),
  );

  const dispatch = useDispatch();

  function onClickInsertCommentButton() {
    dispatch(commentActions.insertComment(newComment));
    setNewComment('');
  }

  function onClickDeleteCommentButton(commentId) {
    if (!window.confirm('삭제하시겠습니까?')) return false;
    dispatch(commentActions.deleteComment(commentId));
  }
  useEffect(() => {
    dispatch(commentActions.getCommentList(props.postId));
  }, [dispatch, props.postId]);

  return (
    <>
      {user && (
        <div>
          <CommentArea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <SubmitButtonArea>
            <SubmitButton onClick={onClickInsertCommentButton}>
              등록
            </SubmitButton>
          </SubmitButtonArea>
        </div>
      )}
      <div>
        {status === 200 ? (
          commentList.length > 0 ? (
            commentList.map((comment, index) => (
              <Comment key={comment?._id ?? index}>
                <hr />
                <div>
                  <span>{comment.user.username}</span>&nbsp;
                  <span>
                    {new Date(comment?.createdAt).toLocaleString() ?? ''}
                  </span>
                </div>
                <div>
                  <span>{comment?.content ?? ''}</span>
                  {user && user._id === comment.user._id ? (
                    <ActionButton
                      onClick={() =>
                        onClickDeleteCommentButton(comment?._id ?? 0)
                      }
                    >
                      삭제
                    </ActionButton>
                  ) : (
                    ''
                  )}
                </div>
              </Comment>
            ))
          ) : (
            <div></div>
          )
        ) : (
          <div>
            <div>
              <span>{status}</span>
            </div>
            <div>
              <span>{statusText}</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Comments;
