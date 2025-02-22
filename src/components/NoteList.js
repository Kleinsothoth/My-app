// src/components/NoteList.jsx
import React from 'react';

function NoteList({
  notes,
  trackColors,
  viewMode,
  onToggleFavorite,
  onNoteClick,
  onEditClick,
  onDeleteClick
}) {
  return (
    <div
      className={`grid ${
        viewMode === 'grid' ? 'grid-cols-3' : 'grid-cols-1'
      } gap-4 flex-1`}
    >
      {notes.map(note => (
        <div
          key={note.id}
          // 点击卡片主体 => 查看详情
          onClick={() => onNoteClick(note)}
          className={`${trackColors[note.track]} rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow relative min-h-[180px] cursor-pointer`}
        >
          <div className="text-gray-800 mb-3">{note.content}</div>

          {/* 右下角区域：收藏、编辑、删除按钮 */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            {/* 收藏按钮 */}
            <button
              className="text-gray-500 hover:text-red-500 transition-colors"
              onClick={e => {
                e.stopPropagation(); // 防止触发父级 onClick
                onToggleFavorite(note.id);
              }}
            >
              <i className={`fa${note.favorite ? 's' : 'r'} fa-heart`}></i>
            </button>

            {/* 编辑按钮 */}
            <button
              className="text-gray-500 hover:text-blue-500 transition-colors"
              onClick={e => {
                e.stopPropagation(); // 防止触发父级 onClick
                onEditClick(note);
              }}
            >
              <i className="far fa-edit"></i>
            </button>

            {/* 删除按钮 */}
            <button
              className="text-gray-500 hover:text-red-600 transition-colors"
              onClick={e => {
                e.stopPropagation(); // 防止触发父级 onClick
                onDeleteClick(note.id);
              }}
            >
              <i className="far fa-trash-alt"></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NoteList;