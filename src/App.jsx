import React, { useState } from "react";
import "./App.css";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [editingText, setEditingText] = useState("");

  const handleCreate = () => {
    if (newItem.trim() !== "") {
      setItems([...items, { id: Date.now(), text: newItem }]);
      setNewItem("");
    }
  };

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleEdit = (item) => {
    setEditingItem(item.id);
    setEditingText(item.text);
  };

  const handleUpdate = () => {
    setItems(
      items.map((item) =>
        item.id === editingItem ? { ...item, text: editingText } : item
      )
    );
    setEditingItem(null);
    setEditingText("");
  };

  return (
    <div className="app-container">
      <h1 className="app-title">CRUD Operations in React</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Add new item"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          className="input-box"
        />
        <button onClick={handleCreate} className="add-button">
          Add <FaPlus />

        </button>
      </div>

      <ul className="item-list">
        {items.map((item) => (
          <li key={item.id} className="item">
            {editingItem === item.id ? (
              <input
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                className="edit-input"
              />
            ) : (
              <span className="item-text">{item.text}</span>
            )}
            {editingItem === item.id ? (
              <button onClick={handleUpdate} className="save-button">
                Save
              </button>
            ) : (
              <button
                onClick={() => handleEdit(item)}
                className="edit-button"
              >
                Edit <FaRegEdit />
              </button>
            )}
            <button onClick={() => handleDelete(item.id)} className="delete-button">
              Delete<MdDelete />

            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
