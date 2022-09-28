import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';
import { Helmet } from 'react-helmet-async';
import Comments from '../common/Comments';
import { marked } from 'marked';
import hljs from 'highlight.js';

const PostViewerBlock = styled(Responsive)`
  margin-top: 4rem;
`;
const PostHead = styled.div`
  border-bottom: 1px solid ${palette.gray[2]};
  padding-bottom: 3rem;
  margin-bottom: 3rem;
  h1 {
    font-size: 3rem;
    line-height: 1.5;
    margin: 0;
  }
`;

const PostContent = styled.div`
  font-size: 1.3125rem;
  color: ${palette.gray[8]};
  padding: 2rem;
`;

marked.setOptions({
  langPrefix: 'hljs language-',
  highlight: function (code) {
    return hljs.highlightAuto(code, ['html', 'javascript']).value;
  },
});

const PostViewer = ({ post, error, loading, actionButtons }) => {
  // 에러 발생 시
  if (error) {
    if (error.response && error.response.status === 404) {
      return <PostViewerBlock>존재하지 않는 포스트입니다.</PostViewerBlock>;
    }
    return <PostViewerBlock>오류 발생!</PostViewerBlock>;
  }

  // 로딩중이거나, 아직 포스트 데이터가 없을 시
  if (loading || !post) {
    return null;
  }

  const { _id, title, body, user, publishedDate, tags } = post;

  let newBody = body
    .replaceAll('<pre>', `\r\n\r\n\`\`\`javascript\r\n`)
    .replaceAll('</pre>', `\r\n\`\`\`\r\n`)
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');

  return (
    <PostViewerBlock>
      <Helmet>
        <title>{title} - Front Dev.</title>
      </Helmet>
      <PostHead>
        <h1>{title}</h1>
        <SubInfo username={user.username} publishedDate={publishedDate} hasMarginTop />
        <Tags tags={tags} />
      </PostHead>
      {actionButtons}
      <PostContent dangerouslySetInnerHTML={{ __html: marked(newBody) }} />
      <div>
        <Comments postId={_id} />
      </div>
    </PostViewerBlock>
  );
};

export default PostViewer;
