import React, { useEffect, useCallback } from 'react';
import Editor from '../../components/write/Editor';
import { useSelector, useDispatch } from 'react-redux';
import { writeActions } from '../../slices/writeSlice';

const EditorContainer = () => {
  const dispatch = useDispatch();
  const { title, body } = useSelector(({ write }) => ({
    title: write.title,
    body: write.body,
  }));
  const onChangeField = useCallback((payload) => dispatch(writeActions.changeField(payload)), [dispatch]);
  // 언마운트될 때 초기화
  useEffect(() => {
    return () => {
      dispatch(writeActions.initialize());
    };
  }, [dispatch]);
  return <Editor onChangeField={onChangeField} title={title} body={body} />;
};

export default EditorContainer;
