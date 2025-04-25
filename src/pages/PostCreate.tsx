// src/pages/PostCreate.tsx
import React, { useState } from 'react';
import { Card, Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../api/blogApi';
import Loader from '../components/Loader';
import { notifySuccess, notifyError } from '../components/Notification';
import type { Blog } from '../types/blog';

const { TextArea } = Input;

const PostCreate: React.FC = () => {
  const [form] = Form.useForm<Pick<Blog, 'title' | 'text'>>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: Pick<Blog, 'title' | 'text'>) => {
    setLoading(true);
    try {
      const newPost = await createPost(values);
      notifySuccess('Создано', 'Пост успешно добавлен');
      navigate(`/posts/${newPost.id}`);
    } catch {
      notifyError('Ошибка', 'Не удалось создать пост');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Создание новой записи" style={{ maxWidth: 800, margin: '24px auto' }}>
      {loading && <Loader fullScreen />}
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ title: '', text: '' }}
      >
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
            Создать
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={() => navigate(-1)}>
            Отмена
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default PostCreate;
