"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { serialize } from "v8";
import "../../styles/auth.pages.css";

export default function RegisterPage() {

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    if (res.ok) {
      alert("Cadastro realizado!");
      router.push("/auth/login");
    } else {
      alert("Erro ao cadastrar.");
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          
        }}
      >
        <div style={{display:"flex",flexDirection:"column",gap:"2rem", maxWidth: 800, padding: 32, fontSize: "1.5rem" }}>	
          <h1 style={{fontSize:"4rem",textAlign:"center"}}>TODO-list</h1>
          <h2 style={{textAlign:"center"}}>Rápido, Eficiente e Produtivo</h2>
          <p style={{textAlign:"center"}}>
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
          <h1>Cadastre-se</h1>
          <form onSubmit={handleRegister} className="container-form">
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
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
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