import {MenuOutlined, SettingOutlined, UserOutlined, BugOutlined, PlusCircleOutlined, SaveOutlined, DownloadOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Menu, Dropdown, Space } from 'antd';
import { useState } from 'react';
import '../assets/styles/leftside.css';


const menu = (
  <Menu className='leftside-dropdown'
    items={[
      {
        key: '1',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
            <Space>
              <SaveOutlined />
              <span>saved message</span>
            </Space>
          </a>
        ),
      },
      {
        key: '2',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
           <Space>
              <SettingOutlined />
              <span>Setting</span>
           </Space>
          </a>
        ),
      },
      {
        key: '3',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
            <Space>
              <DownloadOutlined />
              <span>Archived chats</span>
            </Space>
          </a>
        ),
      },
      {
        key: '4',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
            <Space>
              <UserOutlined />
              <span>contact</span>
            </Space>
          </a>
        ),
      },
      {
        key: '5',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
            <Space>
              <BugOutlined />
              <span>report bug</span>
            </Space>
          </a>
        ),
      },
      {
        key: '6',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
            <Space>
              <QuestionCircleOutlined />
              <span>Telegram Features</span>
            </Space>
          </a>
        ),
      },
      {
        key: '7',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
            <Space>
              <PlusCircleOutlined />
              <span>Install App</span>
            </Space>
          </a>
        ),
      },
    ]}
  />
);

const App = () => (
  <LeftSideMenu />
);

const LeftSideMenu = () => {
  const [visible, setVisible] = useState(false);

  return (
    <Space direction="vertical">
      <Space wrap>
        <Dropdown
          className="overlay"
          overlay={menu}
          placement="bottomLeft"
          visible={visible}
          onVisibleChange={setVisible}
        >
          <Button className="sidebar-button" type="text" aria-label="Open menu">
            <MenuOutlined />
          </Button>
        </Dropdown>
      </Space>
    </Space>
  );
};

export default App;
