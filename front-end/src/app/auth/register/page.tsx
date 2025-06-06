"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "../../styles/auth.pages.css";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }
    const res = await fetch("http://localhost:8000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, email }),
    });
    if (res.ok) {
      alert("Cadastro realizado!");
      router.push("/auth/login");
    } else {
      alert("Erro ao cadastrar.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-info">
          <h1>TODO-list</h1>
          <h2>Rápido, Eficiente e Produtivo</h2>
          <p>
            Organize suas tarefas, aumente seu foco e alcance mais resultados
            todos os dias
          </p>
      </div>
      <div className="container-space-auth">
        <div className="container-auth">
          <h1>Cadastre-se</h1>
          <form onSubmit={handleRegister} className="container-form">
            <label htmlFor="username">Usuário</label>
            <input
              id="username"
              type="text"
              placeholder="Digite seu usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input
              id="confirmarSenha"
              type="password"
              placeholder="Confirme sua senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
            />
            <button type="submit">Cadastrar-se</button>
          </form>
          <p>
            Já tem conta? <a href="/auth/login">Entrar</a>
          </p>
        </div>
      </div>
    </div>
  );
}