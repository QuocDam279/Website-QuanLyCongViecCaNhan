// src/pages/Lichsu.jsx
import React, { useEffect, useState } from 'react';
import logApi from '../api/logApi';
import { ClockIcon, PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

const actionIcons = {
  'Thêm': <PlusIcon className="w-5 h-5 text-green-500" />,
  'Sửa': <PencilIcon className="w-5 h-5 text-yellow-500" />,
  'Xóa': <TrashIcon className="w-5 h-5 text-red-500" />,
};

const Lichsu = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await logApi.getAll();
        setLogs(res.data);
      } catch (err) {
        console.error('Lỗi lấy lịch sử:', err);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold text-blue-800 mb-4">🕓 Lịch sử thay đổi</h2>

      <div className="space-y-4">
        {logs.length === 0 ? (
          <div className="text-gray-500 italic">Không có lịch sử thay đổi nào.</div>
        ) : (
          logs.map((log, index) => (
            <div
              key={index}
              className="flex items-start bg-white shadow-sm border border-gray-200 rounded-lg p-4 gap-3 hover:shadow-md transition"
            >
              <div className="mt-1">
                {actionIcons[log.action] || <ClockIcon className="w-5 h-5 text-blue-500" />}
              </div>
              <div>
                <p className="text-sm text-gray-800">
                  <span className="font-semibold text-blue-600">{log.action}</span> công việc{' '}
                  <span className="font-semibold">{log.jobTitle || 'Không rõ'}</span>
                </p>
                {log.details && (
                  <p className="text-sm text-gray-600 mt-1">📋 {log.details}</p>
                )}
                <p className="text-xs text-gray-400 mt-1">
                  🕒 {new Date(log.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Lichsu;
