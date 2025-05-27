"use client";

import Image from "next/image";
import styles from "../styles/page.module.css"; // Adjust the path as necessary
import { useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState<{ text: string; completed: boolean }[]>([]);
  const [todo, setTodo] = useState<string>("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");

  // Function to add a new todo
  const updateToDoList = () => {
    // Check to see if the input is empty, so we don't have an undefined value
    if (todo.trim()) {
      setTodos([...todos, { text: todo, completed: false }]);
      setTodo("");
    }
  };
  // Function to delete a todo
  const deleteTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  // Function to start editing a todo
  const startEdit = (index: number, currentText: string) => {
    setEditIndex(index);
    setEditText(currentText);
  };

  // Function to save the edited todo
  const saveEdit = (index: number) => {
    const updatedTodos = todos.map((item, i) =>
      i === index ? { ...item, text: editText } : item
    );
    setTodos(updatedTodos);
    setEditIndex(null);
    setEditText("");
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* Main page container */}
        <div className={styles.todoContainer}>
          <h1>To-do List</h1>
          {/* Text field and add button container */}
          <div className={styles.addBar}>
            <input
              className={styles.input}
              type="text"
              value={todo}
              placeholder="Adicione uma tarefa"
              onChange={(e) => setTodo(e.target.value)}
            />
            <button className={styles.addButton} onClick={updateToDoList}>
              Adicionar
            </button>
          </div>
          {/* Task list */}
          <ul className={styles.todoListing}>
            {todos.map((value, index) => (
              // Each todo item
              <div className={styles.todoItem} key={index}>
                {/* Title and action buttons container */}
                <div className={styles.todoTittle}>
                  <button>Completar</button>
                  <li>
                    {/* Display the todo text or edit input if in edit mode */}
                    {editIndex === index ? (
                      <span className={styles.editContainer}>
                        <input
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          style={{ marginRight: "8px" }}
                        />

                        <i
                          className={styles.saveIcon}
                          title="Salvar"
                          style={{ cursor: "pointer", marginRight: "8px" }}
                          onClick={() => saveEdit(index)}
                        >
                          <Image
                            src="./check-lg.svg"
                            alt="Save icon"
                            width={16}
                            height={16}
                          />
                        </i>

                        <i
                          className={styles.cancelIcon}
                          title="Cancelar"
                          style={{ cursor: "pointer", marginRight: "8px" }}
                          onClick={() => setEditIndex(null)}
                        >
                          <Image
                            src="./x-lg.svg"
                            alt="Cancel icon"
                            width={16}
                            height={16}
                          />
                        </i>
                      </span>
                    ) : (
                      value.text
                    )}
                  </li>
                </div>
                {/* Edit and delete button */}
                <div className={styles.todoActionButtons}>
                  <i
                    className={styles.renameIcon}
                    title="Renomear"
                    style={{ cursor: "pointer", marginRight: "8px" }}
                    onClick={() => startEdit(index, value.text)}
                  >
                    <Image
                      src="./Edit icon.svg"
                      alt="Rename icon"
                      width={16}
                      height={16}
                    />
                  </i>
                  <i
                    className={styles.deleteIcon}
                    title="Deletar"
                    style={{ cursor: "pointer", marginRight: "8px" }}
                    onClick={() => deleteTodo(index)}
                  >
                    <Image
                      src="./Delete icon.svg"
                      alt="Delete icon"
                      width={16}
                      height={16}
                    />
                  </i>
                </div>
              </div>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
