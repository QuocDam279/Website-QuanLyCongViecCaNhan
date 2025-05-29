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
    <div className="p-5">
      <h1 className="text-[20px] font-bold mb-4 text-blue-700">LOẠI CÔNG VIỆC</h1>

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

      {/* Bảng */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="border p-2 w-20">STT</th>
            <th className="border p-2">Tên công việc</th>
            <th className="border p-2 w-40">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={task.id} className="hover:bg-gray-50">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">
                {editingTask?.id === task.id ? (
                  <input 
                    type="text" 
                    className="border p-1 rounded w-full"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                ) : (
                  task.name
                )}
              </td>
              <td className="border p-2 flex gap-2">
                {editingTask?.id === task.id ? (
                  <button 
                    onClick={handleSaveEdit}
                    className="bg-green-500 text-white px-2 py-1 rounded text-sm"
                  >
                    Lưu
                  </button>
                ) : (
                  <button 
                    onClick={() => handleEditTask(task)}
                    className="bg-yellow-400 text-white p-1 rounded"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                )}
                <button 
                  onClick={() => handleDeleteTask(task.id)}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Loaicongviec
