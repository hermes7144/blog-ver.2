import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import PostListContainer from '../containers/posts/PostListContainer';
import PaginationContainer from '../containers/posts/PaginationContainer';
import { Helmet } from 'react-helmet-async';
import SideBar from '../components/common/SideBar';

const PostListPage = () => {
  return (
    <>
      <Helmet>
        <title>REACTER</title>
      </Helmet>
      <HeaderContainer />
      <SideBar />
      <PostListContainer />
      <PaginationContainer />
    </>
  );
};

export default PostListPage;
