import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import PostListContainer from '../containers/posts/PostListContainer';
import { Helmet } from 'react-helmet-async';
import SideBar from '../components/common/SideBar';

const PostListPage = () => {
  return (
    <>
      <Helmet>
        <title>Front Dev.</title>
      </Helmet>
      <HeaderContainer />
      <SideBar />
      <PostListContainer />
    </>
  );
};

export default PostListPage;
