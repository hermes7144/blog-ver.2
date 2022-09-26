import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/common/Header';
import { userActions } from '../../slices/userSlice';

const HeaderContainer = () => {
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(userActions.logout());
  };
  return <Header user={user} onLogout={onLogout} />;
};

export default HeaderContainer;
