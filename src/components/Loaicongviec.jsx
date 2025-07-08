import React, { useState } from 'react'
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/solid'

const Loaicongviec = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Thiết kế giao diện' },
    { id: 2, name: 'Phân tích yêu cầu' },
  ])

  const [newTaskName, setNewTaskName] = useState('')
  const [editingTask, setEditingTask] = useState(null)
  const [editedName, setEditedName] = useState('')

  const handleAddTask = () => {
    if (newTaskName.trim() === '') return
    const newTask = {
      id: tasks.length + 1,
      name: newTaskName
    }
    setTasks([...tasks, newTask])
    setNewTaskName('')
  }

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const handleEditTask = (task) => {
    setEditingTask(task)
    setEditedName(task.name)
  }

  const handleSaveEdit = () => {
    setTasks(tasks.map(task => 
      task.id === editingTask.id ? { ...task, name: editedName } : task
    ))
    setEditingTask(null)
    setEditedName('')
  }

  return (
    <div className="">
      <div className="text-xl sm:text-2xl ml-2 mt-2 font-bold text-blue-700">
            LOẠI CÔNG VIỆC
      </div>
      <hr className="border-t-2 border-gray-300/30 my-4 mx-4" />

      {/* Form thêm mới */}
      <div className="flex mb-4">
        <input 
          type="text"
          placeholder="Nhập tên công việc mới"
          className="border p-2 rounded mr-2 w-[300px]"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
        />
        <button 
          onClick={handleAddTask}
          className="flex items-center bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          <PlusIcon className="w-5 h-5 mr-1" />
          Thêm
        </button>
      </div>

      {/* Danh sách kiểu Badge / Tag */}
      <div className="flex flex-wrap gap-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="relative flex items-center justify-center rounded-full bg-gray-100 text-gray-800 font-bold px-4 py-2 hover:shadow-lg hover:bg-gray-200 group"
          >
            {editingTask?.id === task.id ? (
              <input
                type="text"
                className="border rounded-full px-3 py-1 focus:outline-none"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
            ) : (
              <span>{task.name}</span>
            )}
            <div className="absolute right-2 top-1 flex space-x-1 opacity-0 group-hover:opacity-100">
              {editingTask?.id === task.id ? (
                <button
                  onClick={handleSaveEdit}
                  className="bg-green-500 text-white p-1 rounded-full"
                  title="Lưu"
                >
                  ✅
                </button>
              ) : (
                <>
                  <button
                    onClick={() => handleEditTask(task)}
                    className="bg-yellow-400 text-white p-1 rounded-full"
                    title="Sửa"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="bg-red-500 text-white p-1 rounded-full"
                    title="Xóa"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Loaicongviec
