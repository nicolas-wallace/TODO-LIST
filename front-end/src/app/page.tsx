'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/auth/register'); // Redireciona para a página de registro se não houver token
    } else {
      // Aqui você pode redirecionar para a tela de TODOs, por exemplo
      router.push('/todo'); // ou '/dashboard', etc.
    }
  }, []);

  return null; // Ou um <Loading /> se quiser
}