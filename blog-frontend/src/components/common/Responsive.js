import React from 'react';
import styled from 'styled-components';
import SideBar from './SideBar';

const ResponsiveBlock = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  margin-left: 200px;
  max-width: 1024px;

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
