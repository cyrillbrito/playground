import React, { Component } from 'react';
import './App.css';
import { RainyColors } from './RainyColors/RainyColors';
import { Layout, Menu } from 'antd';

export class App extends Component {

  render() {
    const { Header, Content } = Layout;
    return (
      <Layout className="layout">
        <Header>
          <div className="logo">React Sandbox</div>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '50px' }}>
          <RainyColors></RainyColors>
        </Content>
      </Layout>
    );
  }
}
