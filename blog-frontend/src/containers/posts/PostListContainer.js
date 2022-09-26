import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostList from '../../components/posts/PostList';
import { postsActions } from '../../slices/postsSlice';
import { useParams, useSearchParams } from 'react-router-dom';

const PostListContainer = () => {
  const { username, boardName } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { posts, error, user, boardList } = useSelector(({ posts, user, board }) => ({
    posts: posts.posts,
    error: posts.error,
    user: user.user,
    boardList: board.boardList,
  }));
  let boardId = '';
  if (boardName) {
    for (let i in boardList) {
      if (boardName === boardList[i].name) {
        boardId = boardList[i].code;
      }
    }
  }

  useEffect(() => {
    const tag = searchParams.get('tag');
    // page가 없으면 1을 기본값으로 사용
    const page = parseInt(searchParams.get('page'), 10) || 1;
    if (boardId !== '') {
      dispatch(postsActions.getBoardPostsList({ boardId, page }));
    } else {
      dispatch(postsActions.getPostsList({ tag, username, page }));
    }
  }, [dispatch, searchParams, username, boardId]);
  return <PostList error={error} posts={posts} showWriteButton={user} />;
};

export default PostListContainer;
