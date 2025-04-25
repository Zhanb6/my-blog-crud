// src/pages/PostEdit.tsx
import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById, updatePost } from '../api/blogApi';
import Loader from '../components/Loader';
import { notifySuccess, notifyError } from '../components/Notification';
import type { Blog } from '../types/blog';

const { TextArea } = Input;

const PostEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm<Pick<Blog, 'title' | 'text'>>();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    getPostById(id)
      .then(post => {
        if (post) {
          form.setFieldsValue({ title: post.title, text: post.text });
        } else {
          notifyError('Ошибка', 'Запись не найдена');
          navigate('/');
        }
      })
      .catch(() => {
        notifyError('Ошибка', 'Не удалось загрузить запись');
        navigate('/');
      })
      .finally(() => setInitialLoading(false));
  }, [id, form, navigate]);

  const onFinish = async (values: Pick<Blog, 'title' | 'text'>) => {
    setLoading(true);
    try {
      const updated = await updatePost(id!, values);
      if (updated) {
        notifySuccess('Сохранено', 'Пост успешно обновлён');
        navigate(`/posts/${id}`);
      } else {
        throw new Error();
      }
    } catch {
      notifyError('Ошибка', 'Не удалось обновить пост');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <Loader fullScreen />;
  }

  return (
    <Card title="Редактирование записи" style={{ maxWidth: 800, margin: '24px auto' }}>
      {loading && <Loader fullScreen />}
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Заголовок"
          name="title"
          rules={[{ required: true, message: 'Пожалуйста, введите заголовок' }]}
        >
          <Input placeholder="Заголовок" />
        </Form.Item>

        <Form.Item
          label="Текст"
          name="text"
          rules={[{ required: true, message: 'Пожалуйста, введите текст' }]}
        >
          <TextArea rows={6} placeholder="Содержимое поста" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Сохранить
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={() => navigate(-1)}>
            Отмена
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default PostEdit;
