import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import PostViewerContainer from '../containers/post/PostViewerContainer';
import SideBar from '../components/common/SideBar';

const PostPage = () => {
  return (
    <>
      <HeaderContainer />
      <SideBar />
      <PostViewerContainer />
    </>
  );
};

export default PostPage;
