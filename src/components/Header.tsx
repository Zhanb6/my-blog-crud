// src/components/Header.tsx
import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <AntHeader style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ color: 'white', fontWeight: 'bold', fontSize: '18px', marginRight: 'auto' }}>
        Мой Блог
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[pathname === '/fake-api' ? '/fake-api' : '/']}
      >
        <Menu.Item key="/">
          <Link to="/">Блог</Link>
        </Menu.Item>
        <Menu.Item key="/fake-api">
          <Link to="/fake-api">FakeApi</Link>
        </Menu.Item>
      </Menu>
    </AntHeader>
  );
};

export default Header;
