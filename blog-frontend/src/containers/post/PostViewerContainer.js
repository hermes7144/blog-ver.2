import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postActions } from '../../slices/postSlice';
import PostViewer from '../../components/post/PostViewer';
import PostActionButtons from '../../components/post/PostActionButtons';
import { writeActions } from '../../slices/writeSlice';
import { removePost } from '../../lib/api/posts';
import { useParams, useNavigate } from 'react-router-dom';

const PostViewerContainer = () => {
  // 처음 마운트될 때 포스트 읽기 API 요청
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { post, error, loading, user } = useSelector(({ post, loading, user }) => ({
    post: post.post,
    error: post.error,
    loading: loading['post/READ_POST'],
    user: user.user,
  }));

  useEffect(() => {
    dispatch(postActions.getReadPost(postId));
    // 언마운트될 때 리덕스에서 포스트 데이터 없애기
    return () => {
      dispatch(postActions.unloadPost());
    };
  }, [dispatch, postId]);

  const onEdit = () => {
    dispatch(writeActions.setOriginalPost(post));
    navigate('/write');
  };

  const onRemove = async () => {
    try {
      await removePost(postId);
      navigate('/'); // 홈으로 이동
    } catch (e) {
      console.log(e);
    }
  };

  const ownPost = (user && user._id) === (post && post.user._id);

  return (
    <PostViewer
      post={post}
      loading={loading}
      error={error}
      user={user}
      actionButtons={ownPost && <PostActionButtons onEdit={onEdit} onRemove={onRemove} />}
    />
  );
};

export default PostViewerContainer;
