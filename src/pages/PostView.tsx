// src/pages/PostView.tsx
import React, { useState, useEffect } from 'react';
import { Card, Button, Modal } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById, deletePost } from '../api/blogApi';
import Loader from '../components/Loader';
import { notifySuccess, notifyError } from '../components/Notification';
import type { Blog } from '../types/blog';

const { confirm } = Modal;

const PostView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getPostById(id)
      .then(data => {
        if (data) setPost(data);
        else navigate('/'); // если запись не найдена, возвращаемся к списку
      })
      .catch(() => notifyError('Ошибка', 'Не удалось загрузить запись'))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleDelete = () => {
    confirm({
      title: 'Вы действительно хотите удалить этот пост?',
      onOk: async () => {
        setLoading(true);
        try {
          const ok = await deletePost(id!);
          if (ok) {
            notifySuccess('Удалено', 'Пост успешно удалён');
            navigate('/');
          } else {
            throw new Error();
          }
        } catch {
          notifyError('Ошибка', 'Не удалось удалить запись');
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const handleEdit = () => {
    navigate(`/posts/${id}/edit`);
  };

  if (loading || !post) {
    return <Loader fullScreen />;
  }

  return (
    <Card
      title={post.title}
      style={{ maxWidth: 800, margin: '24px auto' }}
      extra={
        <>
          <Button type="primary" onClick={handleEdit} style={{ marginRight: 8 }}>
            Редактировать
          </Button>
          <Button danger onClick={handleDelete}>
            Удалить
          </Button>
        </>
      }
    >
      <p>{post.text}</p>
    </Card>
  );
};

export default PostView;
