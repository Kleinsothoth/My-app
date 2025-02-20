// src/components/SideBar.jsx
import React from 'react';

function SideBar({ trackNames, trackColors, notes }) {
  return (
    <div className="w-64 bg-white rounded-lg p-4 shadow-sm h-fit">
      <h2 className="text-lg font-medium mb-4">赛道分类</h2>
      <ul className="space-y-2">
        {Object.entries(trackNames).map(([key, name]) => (
          <li
            key={key}
            className={`p-3 rounded-lg cursor-pointer flex items-center justify-between ${trackColors[key]} bg-opacity-20 hover:bg-opacity-30`}
          >
            <span>{name}</span>
            <span className="text-sm text-gray-500">
              {notes.filter(note => note.track === key).length}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideBar;
