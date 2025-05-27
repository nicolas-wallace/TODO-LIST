"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "../../styles/auth.pages.css";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setSenha] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.token);
      router.push("/");
    } else {
      alert("Login falhou. Verifique suas credenciais.");
    }
  };

  return (
    <div className="auth-page">
      <div>
        <div className="auth-info">
          <h1>TODO-list</h1>
          <h2>Rápido, Eficiente e Produtivo</h2>
          <p>
            Organize suas tarefas, aumente seu foco e alcance mais resultados todos os dias
          </p>
        </div>
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="container-auth">
          <h1>Login</h1>
          <form onSubmit={handleLogin} className="container-form">
            <label htmlFor="email">Email</label>
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
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            <button type="submit">Entrar</button>
          </form>
          <p>
            Não tem conta? <a href="/auth/register">Cadastre-se</a>
          </p>
        </div>
      </div>
    </div>
  );
}