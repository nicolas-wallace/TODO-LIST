"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState<{ text: string; completed: boolean }[]>(
    []
  );
  const [todo, setTodo] = useState<string>("");

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

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.todoContainer}>
          <h1>To-do List</h1>
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
          <ul className={styles.todoListing}>
            {todos.map((value, index) => (
              <div className={styles.todoItem} key={index}>
                <div className={styles.todoTittle}>
                  <button>Completar</button>
                  <li>{value.text}</li>
                </div>
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
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
