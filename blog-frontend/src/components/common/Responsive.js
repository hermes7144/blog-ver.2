import React from 'react';
import styled from 'styled-components';

const ResponsiveBlock = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  margin: 0 auto; /* 중앙 정렬 */
  margin-left: 200px;

  /* 브라우저 크기에 따라 가로 사이즈 변경 */

  @media screen and (max-width: 800px) {
    float: none;
    margin-left: 0;
    width: 100%;
  }
`;

const Responsive = ({ children, ...rest }) => {
  // style, className, onClick, onMouseMove 등의 props를 사용할 수 있도록
  // ...rest를 사용하여 ResponsiveBlock에게 전달
  return <ResponsiveBlock {...rest}>{children}</ResponsiveBlock>;
};

export default Responsive;
