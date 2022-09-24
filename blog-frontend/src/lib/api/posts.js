import client from './client';

export const writePost = ({ title, body, board, tags }) => client.post('/api/posts', { title, body, board, tags });

export const readPost = (id) => client.get(`/api/posts/${id}`);

export const listPosts = ({ page, username, tag }) => {
  return client.get(`/api/posts`, {
    params: { page, username, tag },
  });
};

export const listBoardPosts = ({ boardId, page }) => {
  return client.get(`/api/board/${boardId}`, {
    params: { page },
  });
};

export const updatePost = ({ id, title, body, board, tags }) =>
  client.patch(`/api/posts/${id}`, {
    title,
    body,
    board,
    tags,
  });

export const removePost = (id) => client.delete(`/api/posts/${id}`);
