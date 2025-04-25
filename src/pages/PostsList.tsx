// src/pages/PostsList.tsx
import React, { useState, useEffect,useCallback } from 'react';
import { Table, Button, Space } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import { Link, useNavigate } from 'react-router-dom';
import { getPosts, deletePost } from '../api/blogApi';
import type { Blog } from '../types/blog';
import Loader from '../components/Loader';
import { notifySuccess, notifyError } from '../components/Notification';

const pageSizeOptions = ['5', '10', '20'];

const PostsList: React.FC = () => {
  const [data, setData] = useState<Blog[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  const fetchData = useCallback(
    async (p = page, ps = pageSize) => {
      setLoading(true);
      try {
        const res = await getPosts(p, ps);
        setData(res.data);
        setTotal(res.total);
      } catch {
        notifyError('Ошибка', 'Не удалось загрузить посты');
      } finally {
        setLoading(false);
      }
    },
    [page, pageSize] // зависим от page и pageSize
  );

  useEffect(() => {
    fetchData(); // теперь fetchData входит в массив зависимостей
  }, [fetchData]);

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      const ok = await deletePost(id);
      if (ok) {
        notifySuccess('Удалено', 'Пост удалён');
        fetchData(); // обновить текущую страницу
      } else {
        throw new Error();
      }
    } catch {
      notifyError('Ошибка', 'Не удалось удалить пост');
      setLoading(false);
    }
  };

  const columns: ColumnsType<Blog> = [
    {
      title: 'Заголовок',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => <Link to={`/posts/${record.id}`}>{text}</Link>,
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => navigate(`/posts/${record.id}/edit`)}>
            Редактировать
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>
            Удалить
          </Button>
        </Space>
      ),
    },
  ];

  const onTableChange = (pagination: TablePaginationConfig) => {
    if (pagination.current) setPage(pagination.current);
    if (pagination.pageSize) setPageSize(pagination.pageSize);
  };

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => navigate('/create')}>
          Создать запись
        </Button>
      </Space>

      {loading ? (
        <Loader fullScreen />
      ) : (
        <Table<Blog>
          columns={columns}
          dataSource={data}
          rowKey="id"
          pagination={{
            current: page,
            pageSize,
            total,
            showSizeChanger: true,
            pageSizeOptions,
          }}
          onChange={onTableChange}
        />
      )}
    </>
  );
};

export default PostsList;
