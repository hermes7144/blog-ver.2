import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const SelectBoxBlock = styled.div`
  width: 100%;
  border-top: 1px solid ${palette.gray[2]};

  h4 {
    color: ${palette.gray[8]}
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
`;

function SelectBox() {
  return (
    <SelectBoxBlock>
      <h4>카테고리</h4>
      <select>
        <option>dfd</option>
      </select>
    </SelectBoxBlock>
  );
}

export default SelectBox;
