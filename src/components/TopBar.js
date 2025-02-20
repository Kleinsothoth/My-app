// src/components/TopBar.jsx
import React, { useState } from 'react';
import { Input, Button, Select, Modal, Form, message } from 'antd';
import {
  SearchOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  PlusOutlined
} from '@ant-design/icons';

function TopBar({
  trackNames,
  viewMode,
  setViewMode,
  sortBy,
  setSortBy,
  onAddNote
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  function handleCreateNote() {
    form.validateFields().then(values => {
      onAddNote(values);
      message.success('创建成功');
      setIsModalOpen(false);
      form.resetFields();
    });
  }

  return (
    <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm">
      {/* 左侧：新建按钮 + Modal / 搜索框 */}
      <div className="flex items-center gap-4">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          className="!rounded-button whitespace-nowrap"
          onClick={() => setIsModalOpen(true)}
        >
          新建便利贴
        </Button>

        {/* 新建便利贴模态框 */}
        <Modal
          title="新建便利贴"
          open={isModalOpen}
          onOk={handleCreateNote}
          onCancel={() => {
            setIsModalOpen(false);
            form.resetFields();
          }}
          width={600}
        >
          <Form form={form} layout="vertical" className="mt-4">
            <Form.Item
              name="content"
              label="便利贴内容"
              rules={[{ required: true, message: '请输入便利贴内容' }]}
            >
              <Input.TextArea
                rows={4}
                placeholder="请输入便利贴内容..."
                maxLength={200}
                showCount
              />
            </Form.Item>
            <Form.Item
              name="track"
              label="选择赛道"
              rules={[{ required: true, message: '请选择赛道' }]}
            >
              <Select
                placeholder="请选择赛道"
                options={Object.entries(trackNames).map(([key, name]) => ({
                  value: key,
                  label: name
                }))}
              />
            </Form.Item>
          </Form>
        </Modal>

        {/* 搜索框（仅演示UI，暂无搜索逻辑） */}
        <Input
          placeholder="搜索便利贴内容..."
          prefix={<SearchOutlined className="text-gray-400" />}
          className="w-64 rounded-lg"
        />
      </div>

      {/* 右侧：视图切换 + 排序 */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 border rounded-lg p-1 bg-gray-50">
          <Button
            icon={<AppstoreOutlined />}
            type={viewMode === 'grid' ? 'primary' : 'text'}
            onClick={() => setViewMode('grid')}
            className="!rounded-button whitespace-nowrap"
          />
          <Button
            icon={<UnorderedListOutlined />}
            type={viewMode === 'list' ? 'primary' : 'text'}
            onClick={() => setViewMode('list')}
            className="!rounded-button whitespace-nowrap"
          />
        </div>
        <Select
          value={sortBy}
          style={{ width: 120 }}
          onChange={value => setSortBy(value)}
          options={[
            { value: 'newest', label: '最新创建' },
            { value: 'oldest', label: '最早创建' },
            { value: 'track', label: '按赛道' }
          ]}
        />
      </div>
    </div>
  );
}

export default TopBar;
