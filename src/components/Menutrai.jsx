import React, { useState, useRef, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { 
  HomeIcon, 
  UserIcon, 
  ClipboardDocumentIcon, 
  ChartBarIcon, 
  CalendarDaysIcon, 
  LockClosedIcon, 
  ArrowRightOnRectangleIcon, 
  ChevronDownIcon,
  TagIcon
} from '@heroicons/react/24/solid';


const Menutrai = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 pr-2 w-[100%]">
      <div className="bg-blue-500 shadow-md w-[100%] text-white h-screen">
        <div className="h-28 bg-blue-600 flex justify-center items-center">
          <p className="text-xl sm:text-3xl font-bold">Quản lý công việc</p>
        </div>
        <div className="p-2 space-y-2 h-fit max-h-[70vh] overflow-auto">
          <p className="cursor-pointer hover:bg-white/80 p-2 rounded hover:text-black flex items-center" onClick={() => navigate('/tongquan')}>
            <HomeIcon className="w-5 h-5 mr-2" />
            Tổng Quan
          </p>
          <p className="cursor-pointer hover:bg-white/80 p-2 rounded hover:text-black flex items-center" onClick={() => navigate('/loaicongviec')}>
            <TagIcon className="w-5 h-5 mr-2" />
            Loại Công Việc
          </p>
          <p className="cursor-pointer hover:bg-white/80 p-2 rounded hover:text-black flex items-center">
            <ClipboardDocumentIcon className="w-5 h-5 mr-2" />
            Công Việc
          </p>
          <p className="cursor-pointer hover:bg-white/80 p-2 rounded hover:text-black flex items-center">
            <ChartBarIcon className="w-5 h-5 mr-2" />
            Tiến Độ Công Việc
          </p>
        </div>

        <div className="relative p-2" ref={menuRef}>
          <hr className="border-t-2 border-gray-300/60 my-2" />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded w-full flex text-white cursor-pointer"
          >
            <UserIcon className="w-5 h-5 mr-2" />
            Tài Khoản
            <ChevronDownIcon className="w-5 h-5 mr-2 mt-1" />
          </button>
          {isOpen && (
            <div className="absolute w-auto mt-2 bg-white border rounded shadow-lg text-black">
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer flex">
                <LockClosedIcon className="w-5 h-5 mr-2" />
                Đổi mật khẩu
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer flex" onClick={() => navigate('/')}>
                <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menutrai;
