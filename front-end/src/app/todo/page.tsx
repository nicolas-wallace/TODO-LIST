"use client";

import Image from "next/image";
import styles from "../styles/page.module.css"; // Adjust the path as necessary
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [todos, setTodos] = useState<{ id: number; title: string; done: boolean }[]>([]);
  const [todo, setTodo] = useState<string>("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  // Buscar todos do back-end
  const fetchTodos = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) return;
    const res = await fetch("http://localhost:8000/todos", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setTodos(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line
  }, []);

  // Adicionar tarefa
  const addTodo = async () => {
    if (!todo.trim()) return;
    const token = localStorage.getItem("token");
    if (!token) return;
    const res = await fetch("http://localhost:8000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: todo }),
    });
    if (res.ok) {
      setTodo("");
      fetchTodos();
    }
  };

  // Deletar tarefa
  const deleteTodo = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const res = await fetch(`http://localhost:8000/todos/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      fetchTodos();
    }
  };

  // Iniciar edição
  const startEdit = (index: number, currentText: string) => {
    setEditIndex(index);
    setEditText(currentText);
  };

  // Salvar edição (não implementado no back-end, apenas local)
  const saveEdit = (index: number) => {
    // Aqui você pode implementar uma chamada PATCH/PUT futuramente
    const updatedTodos = todos.map((item, i) =>
      i === index ? { ...item, title: editText } : item
    );
    setTodos(updatedTodos);
    setEditIndex(null);
    setEditText("");
  };

  // Função de logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <div className={styles.page}>
      <button
        onClick={handleLogout}
        style={{
          position: 'fixed',
          top: 32,
          right: 32,
          background: '#0098A9',
          color: 'white',
          border: 'none',
          borderRadius: 8,
          padding: '8px 16px',
          fontWeight: 'bold',
          cursor: 'pointer',
          zIndex: 1000,
        }}
      >
        Sair
      </button>
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
            <button className={styles.addButton} onClick={addTodo}>
              Adicionar
            </button>
          </div>
          {loading ? (
            <p>Carregando...</p>
          ) : (
            <ul className={styles.todoListing}>
              {todos.map((value, index) => (
                <div className={styles.todoItem} key={value.id}>
                  <div className={styles.todoTittle}>
                    <button>Completar</button>
                    <li>
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
                        value.title
                      )}
                    </li>
                  </div>
                  <div className={styles.todoActionButtons}>
                    <i
                      className={styles.renameIcon}
                      title="Renomear"
                      style={{ cursor: "pointer", marginRight: "8px" }}
                      onClick={() => startEdit(index, value.title)}
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
                      onClick={() => deleteTodo(value.id)}
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
          )}
        </div>
      </main>
    </div>
  );
}