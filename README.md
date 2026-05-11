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
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

API local:

```text
http://127.0.0.1:8000
```

Health check:

```text
http://127.0.0.1:8000/health
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
uvicorn main:app --reload --host 127.0.0.1 --port 8000
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
http://127.0.0.1:8000/health
http://127.0.0.1:8000/countries
```

## URLs locais

`localhost` e `127.0.0.1` apontam para a propria maquina.
Essas URLs funcionam em qualquer computador desde que os servicos estejam rodando nas mesmas portas.

Neste projeto:

```text
Front-end: http://localhost:5173
Back-end:  http://127.0.0.1:8000
```

## Variaveis de ambiente

O front-end pode receber a URL da API em `front-end/.env`:

```env
VITE_API_URL=http://127.0.0.1:8000
```
