"use client";

import Image from "next/image";
import styles from "../styles/page.module.css"; // Adjust the path as necessary
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import * as React from "react";

export default function Home() {
  const router = useRouter();
  const [todos, setTodos] = useState<{ id: number; title: string; done: boolean }[]>([]);
  const [todo, setTodo] = useState<string>("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");

  // Buscar todos do back-end
  const fetchTodos = async (): Promise<void> => {
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
  const addTodo = async (): Promise<void> => {
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
  const deleteTodo = async (id: number): Promise<void> => {
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
  const startEdit = (id: number, currentText: string): void => {
    setEditIndex(id);
    setEditText(currentText);
  };

  // Salvar edição (agora persiste no back-end)
  const saveEdit = async (id: number): Promise<void> => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const res = await fetch(`http://localhost:8000/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: editText }),
    });
    if (res.ok) {
      fetchTodos();
      setEditIndex(null);
      setEditText("");
    }
  };

  // Atualiza toggleComplete para persistir no backend
  const toggleComplete = async (id: number): Promise<void> => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const todo = todos.find((item: { id: number; title: string; done: boolean }) => item.id === id);
    if (!todo) return;
    await fetch(`http://localhost:8000/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ done: !todo.done }),
    });
    fetchTodos();
  };

  // Função de logout
  const handleLogout = (): void => {
    localStorage.removeItem("token");
    router.push("/");
  };

  // Filtrar todos conforme busca
  const filteredTodos = todos.filter((t: { id: number; title: string; done: boolean }) => t.title.toLowerCase().includes(search.toLowerCase()));

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
          <input
            type="text"
            placeholder="Buscar tarefas..."
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            style={{ marginBottom: 16, width: '100%', padding: 8, borderRadius: 8, border: '1px solid #C5C5C5' }}
          />
          <div className={styles.addBar}>
            <input
              className={styles.input}
              type="text"
              value={todo}
              placeholder="Adicione uma tarefa"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTodo(e.target.value)}
            />
            <button className={styles.addButton} onClick={addTodo}>
              Adicionar
            </button>
          </div>
          {loading ? (
            <p>Carregando...</p>
          ) : (
            <ul className={styles.todoListing}>
              {filteredTodos.map((value: { id: number; title: string; done: boolean }) => (
                <div className={styles.todoItem} key={value.id}>
                  <div className={styles.todoTittle}>
                    <i
                      style={{ cursor: 'pointer', marginRight: 8 }}
                      onClick={() => toggleComplete(value.id)}
                      title={value.done ? 'Desmarcar como completo' : 'Marcar como completo'}
                    >
                      <Image
                        src={value.done ? '/filledRadio.svg' : '/emptyRadio.svg'}
                        alt={value.done ? 'Todo completo' : 'Todo não completo'}
                        width={20}
                        height={20}
                      />
                    </i>
                    <li
                      style={
                        value.done
                          ? { textDecoration: 'line-through', color: '#888' }
                          : {}
                      }
                    >
                      {editIndex === value.id && !value.done ? (
                        <span className={styles.editContainer}>
                          <input
                            value={editText}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)}
                            style={{ marginRight: "8px" }}
                          />
                          <i
                            className={styles.saveIcon}
                            title="Salvar"
                            style={{ cursor: "pointer", marginRight: "8px" }}
                            onClick={() => saveEdit(value.id)}
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
                    {!value.done && (
                      <i
                        className={styles.renameIcon}
                        title="Renomear"
                        style={{ cursor: "pointer", marginRight: "8px" }}
                        onClick={() => startEdit(value.id, value.title)}
                      >
                        <Image
                          src="./Edit icon.svg"
                          alt="Rename icon"
                          width={16}
                          height={16}
                        />
                      </i>
                    )}
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