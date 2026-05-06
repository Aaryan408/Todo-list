import React, { useState, useMemo } from 'react';
import { Brush, Laptop, ShoppingBasket, BookOpen, PlusSquare, Pencil, Trash2, Check } from 'lucide-react';
import './App.css';

const CATEGORIES = [
  { id: 'Cleaning', icon: <Brush size={24} /> },
  { id: 'Work', icon: <Laptop size={24} /> },
  { id: 'Errands', icon: <ShoppingBasket size={24} /> },
  { id: 'Learning', icon: <BookOpen size={24} /> },
  { id: 'Health', icon: <PlusSquare size={24} /> },
];

export default function TodoApp() {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Do the dishes', category: 'Cleaning', completed: true, isEditing: false },
    { id: 2, name: 'Vacuum floor', category: 'Cleaning', completed: false, isEditing: false },
  ]);
  const [activeCategory, setActiveCategory] = useState('Learning');
  const [newTaskName, setNewTaskName] = useState('');

  // --- Core Functions ---

  const addTask = () => {
    if (!newTaskName.trim()) return;
    const newTask = {
      id: Date.now(),
      name: newTaskName,
      category: activeCategory,
      completed: false,
      isEditing: false
    };
    setTasks([...tasks, newTask]);
    setNewTaskName('');
  };

  const toggleEdit = (id) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, isEditing: !t.isEditing } : t
    ));
  };

  const handleEditChange = (id, newName) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, name: newName } : t
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const progress = useMemo(() => {
    const categoryTasks = tasks.filter(t => t.category === activeCategory);
    if (categoryTasks.length === 0) return 0;
    const completed = categoryTasks.filter(t => t.completed).length;
    return Math.round((completed / categoryTasks.length) * 100);
  }, [tasks, activeCategory]);

  return (
    <div className="main-container">
      <h1 className="title">Simple TodoList</h1>

      <div className="layout-grid">
        {/* Left Side: Task List */}
        <div>
          <h3>List of {activeCategory} Tasks</h3>
          <div style={{ minHeight: '200px' }}>
            {tasks
              .filter(t => t.category === activeCategory)
              .map(task => (
                <div key={task.id} className="task-item">
                  <input 
                    type="checkbox" 
                    checked={task.completed} 
                    onChange={() => toggleTask(task.id)}
                    style={{ cursor: 'pointer' }}
                  />
                  
                  {task.isEditing ? (
                    <input 
                      className="edit-input"
                      value={task.name}
                      autoFocus
                      onChange={(e) => handleEditChange(task.id, e.target.value)}
                      onBlur={() => toggleEdit(task.id)}
                      onKeyDown={(e) => e.key === 'Enter' && toggleEdit(task.id)}
                    />
                  ) : (
                    <span className={`task-name ${task.completed ? 'completed' : ''}`}>
                      {task.name}
                    </span>
                  )}

                  <button className="icon-btn" onClick={() => toggleEdit(task.id)}>
                    {task.isEditing ? <Check size={18} color="green" /> : <Pencil size={18} />}
                  </button>
                  <button className="icon-btn" onClick={() => deleteTask(task.id)}>
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
          </div>
        </div>

        {/* Right Side: Actions */}
        <div>
          <div className="card">
            <h4>Today's Progress</h4>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="progress-text">{progress}%</p>
          </div>

          <div className="card">
            <h4>Add New Task</h4>
            <label className="input-label">TASK NAME:</label>
            <input 
              className="main-input"
              value={newTaskName}
              placeholder="What needs to be done?"
              onChange={(e) => setNewTaskName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
            />
            <button className="add-btn" onClick={addTask}>Add</button>
          </div>
        </div>
      </div>

      {/* Footer: Categories */}
      <div className="category-footer">
        {CATEGORIES.map(cat => (
          <button 
            key={cat.id} 
            className={`category-btn ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.icon}
            <span>{cat.id}</span>
          </button>
        ))}
      </div>
    </div>
  );
}