import React from 'react';
import Board from './Board';
import styled from 'styled-components';

const SideBarBlock = styled.div`
  /* for fixed side bar */
  position: fixed;
  top: 60px;
  left: 0;
  bottom: 0;
  width: 200px; /* 너비 고정 */
  padding-top: 25px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

function SideBar() {
  return (
    <SideBarBlock>
      <Board />
    </SideBarBlock>
  );
}

export default SideBar;
