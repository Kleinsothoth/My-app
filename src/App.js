// src/App.js
import React, { useState } from 'react';
import { Modal, Form, Input, Select, message, Button } from 'antd';
import TopBar from './components/TopBar';
import SideBar from './components/SideBar';
import NoteList from './components/NoteList';

function App() {
  // 视图模式（网格 / 列表）
  const [viewMode, setViewMode] = useState('grid');

  // 排序方式（仅示例，无真正排序逻辑）
  const [sortBy, setSortBy] = useState('newest');

  // 所有便利贴数据
  const [notes, setNotes] = useState([
    {
      id: 1,
      content:
        '探索未来科技发展方向，关注人工智能、区块链等新兴技术的发展趋势和应用场景',
      track: 'innovative',
      favorite: false
    },
    {
      id: 2,
      content: '高效执行项目计划，确保项目按时交付，提高团队协作效率',
      track: 'project',
      favorite: true
    },
    {
      id: 3,
      content: '优化资源配置效率，合理分配人力物力，提升整体运营效能',
      track: 'resource',
      favorite: false
    }
  ]);

  // 赛道对应背景颜色
  const trackColors = {
    innovative: 'bg-[#98D8D6]',
    project: 'bg-[#FFD699]',
    resource: 'bg-[#FFB7C5]',
    marketing: 'bg-[#FF9E8E]',
    digital: 'bg-[#C5B3E6]'
  };

  // 赛道对应中文名称
  const trackNames = {
    innovative: '创新思维',
    project: '项目管理',
    resource: '资源整合',
    marketing: '营销策略',
    digital: '数字化转型'
  };

  // =========== 添加新便利贴 ===========
  function handleAddNote(values) {
    setNotes(prev => [
      {
        id: prev.length + 1,
        content: values.content,
        track: values.track,
        favorite: false
      },
      ...prev
    ]);
  }

  // =========== 切换收藏状态 ===========
  function handleToggleFavorite(id) {
    setNotes(prev =>
      prev.map(note =>
        note.id === id ? { ...note, favorite: !note.favorite } : note
      )
    );
  }

  // =========== 删除便利贴 ===========
  function handleDeleteNote(id) {
    setNotes(prev => prev.filter(note => note.id !== id));
    // 若正在查看/编辑的条目被删，也要关闭弹窗
    if (selectedNote && selectedNote.id === id) {
      setIsViewModalOpen(false);
      setIsEditModalOpen(false);
    }
  }

  // =========== 查看-放大 Modal 相关 ===========
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  // 点击便利贴本体 => 打开查看Modal
  function handleNoteClick(note) {
    setSelectedNote(note);
    setIsViewModalOpen(true);
  }

  // =========== 编辑 Modal 相关 ===========
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm] = Form.useForm();

  // 点击“编辑”按钮 => 打开编辑Modal，并预填表单
  function handleEditClick(note) {
    setSelectedNote(note);
    editForm.setFieldsValue({
      content: note.content,
      track: note.track
    });
    setIsEditModalOpen(true);
  }

  // 编辑完成，保存修改
  function handleEditOk() {
    editForm.validateFields().then(values => {
      if (!selectedNote) return;
      const { id } = selectedNote;
      setNotes(prev =>
        prev.map(note =>
          note.id === id ? { ...note, ...values } : note
        )
      );
      message.success('编辑已保存');
      setIsEditModalOpen(false);
      editForm.resetFields();
    });
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-[1440px] mx-auto px-6 py-8">

        {/* 顶部操作栏（含“新建便利贴”功能） */}
        <TopBar
          trackNames={trackNames}
          viewMode={viewMode}
          setViewMode={setViewMode}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onAddNote={handleAddNote}
        />

        {/* 左侧边栏 + 右侧便利贴列表 */}
        <div className="flex gap-6 mt-6">
          <SideBar
            trackNames={trackNames}
            trackColors={trackColors}
            notes={notes}
          />
          <NoteList
            notes={notes}
            trackColors={trackColors}
            viewMode={viewMode}
            onToggleFavorite={handleToggleFavorite}
            onNoteClick={handleNoteClick}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteNote}
          />
        </div>
      </div>

      {/* ========== 查看便利贴（放大）Modal ========== */}
      <Modal
        title="查看便利贴"
        open={isViewModalOpen}
        footer={null}
        onCancel={() => setIsViewModalOpen(false)}
        width="90%"
        style={{ top: 10 }}
        bodyStyle={{ height: '90vh', overflowY: 'auto' }}
      >
        {selectedNote && (
          // Flex居中，使蓝色便利贴整体放大
          <div className="flex items-center justify-center h-full">
            <div
              className={`
                rounded-lg p-6
                ${trackColors[selectedNote.track]} bg-opacity-40
                transform scale-125    /* 整体放大1.25倍 */
                origin-center
                min-w-[300px]
              `}
            >
              <p className="text-gray-800 mb-4">{selectedNote.content}</p>
              <p className="text-base text-gray-600">
                赛道：{trackNames[selectedNote.track]}
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2 mt-4">
          <Button
            danger
            onClick={() => {
              if (!selectedNote) return;
              handleDeleteNote(selectedNote.id);
            }}
          >
            删除
          </Button>
          <Button
            type="primary"
            onClick={() => {
              if (!selectedNote) return;
              handleEditClick(selectedNote);
              setIsViewModalOpen(false);
            }}
          >
            编辑
          </Button>
          <Button onClick={() => setIsViewModalOpen(false)}>关闭</Button>
        </div>
      </Modal>

      {/* ========== 编辑便利贴 Modal ========== */}
      <Modal
        title="编辑便利贴"
        open={isEditModalOpen}
        onOk={handleEditOk}
        onCancel={() => {
          setIsEditModalOpen(false);
          editForm.resetFields();
        }}
        width={600}
      >
        <Form form={editForm} layout="vertical">
          <Form.Item
            name="content"
            label="便利贴内容"
            rules={[{ required: true, message: '请输入便利贴内容' }]}
          >
            <Input.TextArea rows={4} maxLength={200} showCount />
          </Form.Item>
          <Form.Item
            name="track"
            label="选择赛道"
            rules={[{ required: true, message: '请选择赛道' }]}
          >
            <Select
              options={Object.entries(trackNames).map(([key, name]) => ({
                value: key,
                label: name
              }))}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default App;
