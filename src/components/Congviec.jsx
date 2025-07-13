import React, { useState, useEffect, useRef } from 'react'
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/solid'
import { useSearchParams } from 'react-router-dom'

const initialTaskState = {
    name: '',
    startDate: '',
    endDate: '',
    description: '',
    status: 'Chưa thực hiện',
    category: '',
    file: null,
  }

const CongViec = () => {
  const [searchParams] = useSearchParams()
  const selectedCategory = searchParams.get('category')

  const formRef = useRef(null)
  const tenCongViecRef = useRef(null)

  const [categories, setCategories] = useState(['Thiết kế', 'Phân tích', 'Thống kê'])

  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: 'Thiết kế Dashboard',
      startDate: '2025-07-10',
      endDate: '2025-07-12',
      description: 'Thiết kế giao diện trang tổng quan',
      status: 'Chưa thực hiện',
      category: 'Thiết kế',
      file: null
    },
  ])

  const [currentTask, setCurrentTask] = useState(initialTaskState)
  const [editingTask, setEditingTask] = useState(null)

  const [filters, setFilters] = useState({
    category: '',
    status: '',
    date: '', // lọc theo ngày
  })

  useEffect(() => {
    if (selectedCategory) {
      setFilters(prev => ({ ...prev, category: selectedCategory }))
    }
  }, [selectedCategory])

  useEffect(() => {
    if (editingTask) {
      setCurrentTask(editingTask)
    } else {
      setCurrentTask(initialTaskState)
    }
  }, [editingTask])

  const handleSaveTask = () => {
    if (!currentTask.name || !currentTask.category || !currentTask.startDate || !currentTask.endDate) {
      alert('Vui lòng nhập đầy đủ thông tin!')
      return
    }

    if (new Date(currentTask.endDate) < new Date(currentTask.startDate)) {
      alert('Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu!')
      return
    }

    if (editingTask) {
      setTasks(tasks.map(task => task.id === editingTask.id ? { ...currentTask, id: editingTask.id } : task))
      setEditingTask(null)
      alert('Cập nhật công việc thành công!')
    } else {
      const newId = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1
      setTasks([...tasks, { ...currentTask, id: newId }])
      alert('Thêm công việc thành công!')
    }

    setCurrentTask(initialTaskState)
    formRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  const handleDeleteTask = (id) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa công việc này không?')
    if (confirmDelete) {
      setTasks(tasks.filter(task => task.id !== id))
    }
  }

  const filteredTasks = tasks.filter(task => {
    const matchCategory = filters.category ? task.category === filters.category : true
    const matchStatus = filters.status ? task.status === filters.status : true

    const matchDate = filters.date
      ? new Date(task.startDate) <= new Date(filters.date) &&
        new Date(task.endDate) >= new Date(filters.date)
      : true

    return matchCategory && matchStatus && matchDate
  })

  return (
    <div className="p-4">
      <div className="text-xl ml-2 mt-2 font-bold text-blue-700">CÔNG VIỆC</div>
      <hr className="border-t-2 border-gray-300/30 my-4" />

      {/* Form thêm/sửa */}
      <div className="bg-white border rounded-xl p-6 shadow-lg mb-8" ref={formRef}>
        <h2 className="text-xl font-semibold text-blue-600 mb-4 flex justify-center">
          {editingTask ? 'Chỉnh sửa công việc' : 'Thêm công việc mới'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Tên công việc */}
          <div>
            <label className="block mb-1 font-medium text-gray-600">Tên công việc</label>
            <input
              type="text"
              placeholder="Nhập tên công việc"
              className="border p-2 rounded w-full"
              ref={tenCongViecRef}
              value={currentTask.name}
              onChange={(e) => setCurrentTask({ ...currentTask, name: e.target.value })}
            />
          </div>

          {/* Loại công việc */}
          <div>
            <label className="block mb-1 font-medium text-gray-600">Loại công việc</label>

            <div className="relative">
              <input
                type="text"
                list="category-options"
                placeholder="Nhập hoặc chọn loại công việc"
                className="border p-2 rounded w-full"
                value={currentTask.category}
                onChange={(e) => setCurrentTask({ ...currentTask, category: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    const newCat = currentTask.category.trim()
                    if (newCat) {
                      const exists = categories.some(cat => cat.toLowerCase() === newCat.toLowerCase())
                      if (!exists) {
                        setCategories([...categories, newCat])
                      }
                    }
                  }
                }}
              />
              <datalist id="category-options">
                {categories.map((cat, index) => (
                  <option key={index} value={cat} />
                ))}
              </datalist>
            </div>
          </div>

          {/* Ngày bắt đầu */}
          <div>
            <label className="block mb-1 font-medium text-gray-600">Ngày bắt đầu</label>
            <input
              type="date"
              className="border p-2 rounded w-full"
              value={currentTask.startDate}
              onChange={(e) => setCurrentTask({ ...currentTask, startDate: e.target.value })}
            />
          </div>

          {/* Ngày kết thúc */}
          <div>
            <label className="block mb-1 font-medium text-gray-600">Ngày kết thúc</label>
            <input
              type="date"
              className="border p-2 rounded w-full"
              value={currentTask.endDate}
              onChange={(e) => setCurrentTask({ ...currentTask, endDate: e.target.value })}
            />
          </div>

          {/* Trạng thái */}
          <div>
            <label className="block mb-1 font-medium text-gray-600">Trạng thái</label>
            <select
              className="border p-2 rounded w-full"
              value={currentTask.status}
              onChange={(e) => setCurrentTask({ ...currentTask, status: e.target.value })}
            >
              <option>Chưa thực hiện</option>
              <option>Đang thực hiện</option>
              <option>Đã hoàn thành</option>
            </select>
          </div>

          {/* File đính kèm */}
          <div>
            <label className="block mb-1 font-medium text-gray-600">File đính kèm</label>
            <input
              type="file"
              className="border p-2 rounded w-full"
              onChange={(e) => setCurrentTask({ ...currentTask, file: e.target.files[0] })}
            />
          </div>

          {/* Mô tả */}
          <div className="md:col-span-2">
            <label className="block mb-1 font-medium text-gray-600">Mô tả</label>
            <textarea
              placeholder="Nội dung công việc"
              className="border p-2 rounded w-full h-[90px]"
              value={currentTask.description}
              onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
            />
          </div>
        </div>

        {/* Nút lưu + huỷ */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSaveTask}
            className={`flex items-center ${editingTask ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'} text-white px-4 py-2 rounded shadow-lg transition`}
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            {editingTask ? 'Lưu công việc' : 'Thêm công việc'}
          </button>

          {editingTask && (
            <button
              onClick={() => {
                setEditingTask(null)
                setCurrentTask(initialTaskState)
              }}
              className="ml-4 bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
            >
              Huỷ
            </button>
          )}
        </div>
      </div>

      {/* Bộ lọc */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">-- Lọc theo loại --</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">-- Lọc theo trạng thái --</option>
          <option value="Chưa thực hiện">Chưa thực hiện</option>
          <option value="Đang thực hiện">Đang thực hiện</option>
          <option value="Đã hoàn thành">Đã hoàn thành</option>
        </select>

        <input
          type="date"
          value={filters.date}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          className="border p-2 rounded"
        />
      </div>

      {/* Danh sách công việc */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTasks.length === 0 ? (
          <div className="text-center text-gray-500 col-span-1 md:col-span-2 py-8">
            Không có công việc nào phù hợp với bộ lọc.
          </div>
        ) : (
          filteredTasks.map(task => (
            <div key={task.id} className="border rounded-lg p-4 shadow hover:shadow-lg">
              <h2 className="text-xl font-semibold text-blue-600">{task.name}</h2>
              <p className="text-gray-600">Loại: {task.category}</p>
              <p className="text-gray-600">Từ: {task.startDate} - đến: {task.endDate}</p>
              <p className="text-gray-600">
                Trạng thái:
                <span className={`ml-1 font-semibold ${
                  task.status === 'Đã hoàn thành' ? 'text-green-600' :
                  task.status === 'Đang thực hiện' ? 'text-yellow-600' : 'text-red-600'
                }`}>{task.status}</span>
              </p>
              {task.file && (
                <p className="text-gray-600 mt-2">
                  File: <span className="underline text-blue-500">{task.file.name}</span>
                </p>
              )}
              <p className="text-gray-700 mt-2">{task.description}</p>

              <div className="flex space-x-2 mt-3">
                <button
                  onClick={() => {
                    setEditingTask(task)
                    setTimeout(() => {
                      tenCongViecRef.current.focus()
                      formRef.current.scrollIntoView({ behavior: 'smooth' })
                    }, 100)
                  }}
                  className="bg-yellow-400 text-white p-1 rounded"
                >
                  <PencilIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="h-20" />
    </div>
  )
}

export default CongViec
