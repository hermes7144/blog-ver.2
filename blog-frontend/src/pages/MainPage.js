import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeaderContainer from '../containers/common/HeaderContainer';
import styled from 'styled-components';
import Button from '../components/common/Button';

const MainPage = () => {
  const MainBlock = styled.div`
    width: 100%;
    margin: 0 auto; /* 중앙 정렬 */
    /* 브라우저 크기에 따라 가로 사이즈 변경 */
    @media (max-width: 1024px) {
    }
    @media (max-width: 768px) {
    }
  `;
  const HeaderBlock = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 600px;
    background: url('img/food_main.jpg');
    background-size: cover;
    background-color: #0005;
    background-blend-mode: darken;
    h1 {
      color: white;
      font-size: 50px;
      margin: 0;
    }
    p {
      color: white;
      font-size: 25px;
      font-weight: bold;
      margin: 0;
    }
  `;

  const SubBlock = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 20px;

    @media (max-width: 1024px) {
      flex-direction: column;
      align-items: center;
    }
  `;

  const SubItemBlock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 15%;
    img {
      color: #243c64;
      backgroundcolor: #243c64;
      width: 150px;
      height: 150px;
    }
    p {
      font-size: 17px;
      font-weight: bold;
    }
  `;
  const ButtonWithMarginTop = styled(Button)`
    margin-top: 1rem;
    text-align: center;
  `;
  return (
    <div>
      <Helmet>
        <title>MUKDA</title>
      </Helmet>
      <HeaderContainer />
      <MainBlock>
        <HeaderBlock>
          <h1>MUKDA</h1>
          <p>건강하고 맛있는 삶을 위하여</p>
          <ButtonWithMarginTop main to="/post">
            시작하기
          </ButtonWithMarginTop>
        </HeaderBlock>
        <SubBlock>
          <SubItemBlock>
            <img src="img/pyramid.png" alt="MDN logo" />
            <p>균형잡힌 맛있는 식단</p>
          </SubItemBlock>
          <SubItemBlock>
            <img src="img/diet.png" alt="MDN logo" />

            <p>나를 위한 건강한 먹거리</p>
          </SubItemBlock>
          <SubItemBlock>
            <img src="img/market.png" alt="MDN logo" />

            <p>현명한 고객이 현명한 기업을 만든다</p>
          </SubItemBlock>
        </SubBlock>
      </MainBlock>
    </div>
  );
};

export default MainPage;
