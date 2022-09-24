import React from 'react';
import Board from './Board';
import styled from 'styled-components';

const SideBarBlock = styled.div`
  /* for fixed side bar */
  position: fixed;
  top: 100px;
  left: 100px;
  bottom: 0;
  width: 200px; /* 너비 고정 */
  padding-top: 25px;
`;

function SideBar() {
  return (
    <SideBarBlock>
      <Board />
    </SideBarBlock>
  );
}

export default SideBar;
