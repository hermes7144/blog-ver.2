import client from './client';

export const writeComment = ({ content, postId }) =>
  client.post('/api/comment', { content, postId });

export const listComments = (id) => client.get(`/api/comment/${id}`);

export const deleteComment = (id) => {
  client.delete(`/api/comment/${id}`);
};
