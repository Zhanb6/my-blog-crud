// src/router.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';

import Header from './components/Header';
import PostsList from './pages/PostsList';
import PostView from './pages/PostView';
import PostEdit from './pages/PostEdit';
import PostCreate from './pages/PostCreate';
import ExternalData from './pages/ExternalData';

const { Content } = Layout;

export default function Router() {
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: '100vh' }}>
        <Header />
        <Content style={{ padding: '24px', background: '#fff' }}>
          <Routes>
            <Route path="/" element={<PostsList />} />
            <Route path="/create" element={<PostCreate />} />
            <Route path="/posts/:id" element={<PostView />} />
            <Route path="/posts/:id/edit" element={<PostEdit />} />
            <Route path="/fake-api" element={<ExternalData />} />
          </Routes>
        </Content>
      </Layout>
    </BrowserRouter>
  );
}
