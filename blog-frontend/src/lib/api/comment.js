import client from './client';

export const insertComment = ({ content, postId }) => client.post('/api/comment', { content, postId });
export const getComments = (id) => client.get(`/api/comment/${id}`);

export const deleteComment = (id) => client.delete(`/api/comment/${id}`);
