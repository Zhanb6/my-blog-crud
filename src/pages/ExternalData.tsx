import React, { useState, useEffect, useCallback } from 'react';
import { Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import Loader from '../components/Loader';
import { notifyError } from '../components/Notification';
import { fetchExternalPosts, ExternalPost } from '../api/externalApi';

const pageSizeOptions = ['10', '20', '50'];

const ExternalData: React.FC = () => {
  const [data, setData] = useState<ExternalPost[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(
    async (p = page, ps = pageSize) => {
      setLoading(true);
      try {
        const res = await fetchExternalPosts(p, ps);
        setData(res.data);
        setTotal(res.total);
      } catch {
        notifyError('Ошибка', 'Не удалось загрузить данные');
      } finally {
        setLoading(false);
      }
    },
    [page, pageSize]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onTableChange = (pagination: TablePaginationConfig) => {
    if (pagination.current) setPage(pagination.current);
    if (pagination.pageSize) setPageSize(pagination.pageSize);
  };

  const columns: ColumnsType<ExternalPost> = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Название', dataIndex: 'title', key: 'title' },
    { title: 'Текст', dataIndex: 'body', key: 'body' },
  ];

  return loading ? (
    <Loader fullScreen />
  ) : (
    <Table<ExternalPost>
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
  );
};

export default ExternalData;
