# TODO-LIST

Este projeto é uma aplicação completa de lista de tarefas (To-do List) com autenticação, desenvolvida com FastAPI (back-end) e Next.js (front-end).

## Funcionalidades
- Cadastro e login de usuários com autenticação JWT
- Criação, listagem, busca, edição, conclusão e remoção de tarefas
- Marcação de tarefas como concluídas (com persistência no banco de dados)
- Interface moderna, responsiva e intuitiva
- Busca de tarefas em tempo real
- Logout seguro
- Integração total entre front-end e back-end
- Pronto para rodar com Docker ou manualmente

## Estrutura do Projeto
```
TODO-LIST/
├── back-end/         # Código do FastAPI
│   ├── app/          # Aplicação principal
│   │   ├── domain/   # Entidades e repositórios de domínio
│   │   ├── application/ # Casos de uso
│   │   ├── infrastructure/ # Implementações e serviços
│   │   ├── interfaces/ # APIs e schemas
│   │   └── ...
│   ├── requirements.txt
│   └── Dockerfile
├── front-end/        # Código do Next.js
│   ├── src/
│   │   ├── app/      # Páginas e componentes
│   │   └── styles/   # Estilos globais e de página
│   ├── public/       # Imagens e ícones
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
└── app.db            # Banco SQLite (gerado automaticamente)
```

## Como rodar com Docker
1. Certifique-se de ter o Docker e o Docker Compose instalados.
2. Na raiz do projeto, execute:

```powershell
docker-compose up --build
```
Ou rode o arquivo run.bat na pasta raiz do projeto.

- O back-end estará disponível em: http://localhost:8000
- O front-end estará disponível em: http://localhost:3000

## Como rodar manualmente (sem Docker)
### Back-end (FastAPI)
1. Instale o Python 3.12.
2. No terminal, navegue até a pasta `back-end`:
   ```powershell
   cd back-end
   pip install -r requirements.txt
   uvicorn app.main:app --reload
   ```
3. O back-end estará em http://localhost:8000

### Front-end (Next.js)
1. Instale o Node.js (recomendado v20).
2. No terminal, navegue até a pasta `front-end`:
   ```powershell
   cd front-end
   npm install
   npm run dev
   ```
3. O front-end estará em http://localhost:3000

## Configurações importantes
- O front-end faz requisições para o back-end em `http://localhost:8000` por padrão.
- O banco de dados SQLite é criado automaticamente na primeira execução.
- As tarefas concluídas são salvas no banco de dados e mantidas após logout/login.
- Os ícones utilizados estão na pasta `front-end/public`.
- O sistema de autenticação utiliza JWT para proteger as rotas e operações.

## Observações
- Para produção, ajuste variáveis de ambiente e configurações de CORS conforme necessário.
- O projeto pode ser facilmente adaptado para outros bancos de dados.
- O código está organizado para facilitar a manutenção e expansão.
- Dúvidas ou sugestões? Fique à vontade para abrir uma issue!

---
