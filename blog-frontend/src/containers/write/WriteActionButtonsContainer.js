import React, { useEffect } from 'react';
import WriteActionButtons from '../../components/write/WriteActionButtons';
import { useSelector, useDispatch } from 'react-redux';
import { writePost, updatePost } from '../../modules/write';
import { useNavigate } from 'react-router-dom';

const WriteActionButtonsContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { title, body, board, tags, post, postError, originalPostId } = useSelector(({ write }) => ({
    title: write.title,
    body: write.body,
    board: write.board,
    tags: write.tags,
    post: write.post,
    postError: write.postError,
    originalPostId: write.originalPostId,
  }));
  // 포스트 등록
  const onPublish = () => {
    if (originalPostId) {
      dispatch(updatePost({ title, body, board, tags, id: originalPostId }));
      return;
    }
    dispatch(
      writePost({
        title,
        body,
        board,
        tags,
      }),
    );
  };

  // 취소
  const onCancel = () => {
    navigate(-1);
  };

  // 성공 혹은 실패시 할 작업
  useEffect(() => {
    if (post) {
      const { _id, user } = post;
      navigate(`/@${user.username}/${_id}`);
    }
    if (postError) {
      console.log(postError);
    }
  }, [navigate, post, postError]);
  return <WriteActionButtons onPublish={onPublish} onCancel={onCancel} isEdit={!!originalPostId} />;
};

export default WriteActionButtonsContainer;
