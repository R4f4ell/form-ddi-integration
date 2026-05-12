# form-ddi-integration

Projeto com React + Vite e back-end com python em FastAPI para carregar os paises/DDI de uma API externa

## Estrutura do projeto

```text
form-ddi-integration/
|-- back-end/
|   |-- core/
|   |-- routers/
|   |-- schemas/
|   |-- services/
|   |-- tests/
|   |-- main.py
|   `-- requirements.txt
|
|-- front-end/
|   |-- public/
|   |-- src/
|   |   |-- components/
|   |   |-- constants/
|   |   |-- lib/
|   |   |-- pages/
|   |   |-- styles/
|   |   |-- types/
|   |   `-- utils/
|   |-- .env.example
|   |-- package.json
|   `-- vite.config.ts
|
`-- README.md
```

## Back-end

```powershell
cd back-end
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

API local:

```text
http://localhost:8000
```

Health check:

```text
http://localhost:8000/health
```

## Front-end

```powershell
cd front-end
npm install
npm run dev
```

Aplicacao local:

```text
http://localhost:5173
```

O Vite pode usar outra porta automaticamente caso `5173` ja esteja ocupada.
Nesse caso, use a URL exibida no terminal.

## Como testar localmente

1. Suba o back-end:

```powershell
cd back-end
.\.venv\Scripts\Activate.ps1
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

2. Em outro terminal, suba o front-end:

```powershell
cd front-end
npm run dev
```

3. Acesse o front-end:

```text
http://localhost:5173
```

4. Teste diretamente a API:

```text
http://localhost:8000/health
http://localhost:8000/countries
```

## Variaveis de ambiente

O front-end pode receber a URL da API em `front-end/.env`:

```env
VITE_API_URL=http://localhost:8000
```

Para testar o front-end local consumindo a API de producao:

```env
VITE_API_URL=https://form-ddi-integration.onrender.com
```

Informe apenas a URL base da API, sem `/health`, `/countries` ou barra no final.
O front-end monta os endpoints internamente.

## Deploy

### Back-end - Render

URL de producao da API:

```text
https://form-ddi-integration.onrender.com
```

Rotas principais:

```text
GET /health
GET /countries
```

No plano Free do Render, o servico pode entrar em inatividade.
A primeira requisicao apos esse periodo pode demorar alguns segundos. Usei o render por questão financeira, a ideia era usar Railway mas optei por render mesmo por esse motivo.

### Front-end - Vercel

O front-end usa a variavel abaixo para consumir a API em producao:

```env
VITE_API_URL=https://form-ddi-integration.onrender.com
```
