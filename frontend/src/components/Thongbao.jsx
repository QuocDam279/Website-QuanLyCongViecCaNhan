import React, { useEffect, useState, useRef } from 'react';
import { BellIcon } from '@heroicons/react/24/solid';

// Dữ liệu mẫu
const sampleTasks = [
  { id: 1, title: 'Nộp báo cáo giữa kỳ', deadline: '2025-07-15' },
  { id: 2, title: 'Gửi email cho khách hàng', deadline: '2025-07-15' },
  { id: 3, title: 'Chuẩn bị slide thuyết trình', deadline: '2025-07-12' },
  { id: 4, title: 'Nộp báo cáo giữa kỳ 2025', deadline: '2025-07-15' },
  { id: 5, title: 'Báo cáo về thông tin là tất cả...', deadline: '2025-07-16' },
  { id: 6, title: 'Họp nhóm cập nhật tiến độ', deadline: '2025-07-17' },
  { id: 7, title: 'Thiết kế icon mới cho app', deadline: '2025-07-18' },
  { id: 8, title: 'Test cuối kỳ', deadline: '2025-07-20' },
  { id: 9, title: 'Báo cáo về thông tin là tất cả...', deadline: '2025-07-16' },
  { id: 10, title: 'Họp nhóm cập nhật tiến độ', deadline: '2025-07-17' },
  { id: 11, title: 'Thiết kế icon mới cho app', deadline: '2025-07-18' },
  { id: 12, title: 'Test cuối kỳ', deadline: '2025-07-20' },
];

const Thongbao = () => {
  const [notifications, setNotifications] = useState([]);
  const contentRef = useRef(null);

  useEffect(() => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    const getDateDiff = (d1, d2) => {
      const diffTime = new Date(d1) - new Date(d2);
      return Math.floor(diffTime / (1000 * 60 * 60 * 24));
    };

    const messages = sampleTasks.map(task => {
      const diffDays = getDateDiff(task.deadline, todayStr);
      let message = '';

      if (diffDays > 0) {
        message = `Còn ${diffDays} ngày nữa`;
      } else if (diffDays === 0) {
        message = `Hạn chót là hôm nay`;
      } else {
        message = `Đã quá hạn ${Math.abs(diffDays)} ngày`;
      }

      return {
        ...task,
        diffDays,
        message,
      };
    });

    const sorted = messages.sort((a, b) => a.diffDays - b.diffDays);
    setNotifications(sorted);
  }, []);

  return (
    <div className="h-full p-4 bg-yellow-50/90 border border-yellow-200 rounded-xl shadow relative flex flex-col">
      <h2 className="text-2xl font-bold mb-4 text-yellow-700 flex items-center gap-2">
        Thông báo công việc
      </h2>

      <div
        ref={contentRef}
        className="flex-1 pr-1 relative overflow-y-auto"
        style={{
          maxHeight: '300px',
          position: 'relative',
        }}
      >
        <div className="flex flex-col gap-2">
          {notifications.map(task => (
            <div
              key={`${task.id}-${task.deadline}`}
              className={`text-sm flex items-start gap-2 p-2 rounded ${
                task.diffDays < 0
                  ? 'bg-red-50 text-red-700 font-medium'
                  : task.diffDays === 0
                  ? 'bg-yellow-100 text-yellow-900'
                  : 'text-gray-700'
              }`}
            >
              <BellIcon className="w-4 h-4 mt-0.5 text-yellow-500 shrink-0" />
              <div>
                <span className="font-semibold">"{task.title}"</span> — {task.message}.
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Thongbao;