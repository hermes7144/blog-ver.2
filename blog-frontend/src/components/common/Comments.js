import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { commentActions } from '../../slices/commentSlice';

function Comments(props) {
  const [newComment, setNewComment] = useState('');
  const { commentList, status, statusText } = useSelector(
    (state) => state.commentReducer,
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
      <div>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={onClickInsertCommentButton}>등록</button>
      </div>
      <div>
        {status === 200 ? (
          commentList.length > 0 ? (
            commentList.map((comment, index) => (
              <>
                <div key={comment?._id ?? index}>
                  <span>{comment.user.username}</span>&nbsp;
                  <span>{comment?.content ?? ''}</span>
                  <button
                    onClick={() =>
                      onClickDeleteCommentButton(comment?._id ?? 0)
                    }
                  >
                    X
                  </button>
                </div>
              </>
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
