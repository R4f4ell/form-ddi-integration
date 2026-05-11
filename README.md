# form-ddi-integration

Projeto com front-end em React + Vite e back-end em FastAPI para carregar paises/DDI a partir de uma API externa.

## Back-end

```powershell
cd back-end
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
uvicorn main:app --reload --host 127.0.0.1 --port 8000
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

## Variaveis de ambiente

O front-end pode receber a URL da API em `front-end/.env`:

```env
VITE_API_URL=http://127.0.0.1:8000
```

Se essa variavel nao estiver definida, o front-end usa o proxy local do Vite em `/api`.
