from httpx import AsyncClient

from schemas.schemas_country import CountryOptionSchema

COUNTRY_CODE_API_BASE_URL = "https://country-code.com"
COUNTRY_CODE_API_COUNTRIES_ENDPOINT = "/api/countries"


# Utilidade dessa função: 
# - monta a URL completa da API externa
# - abre um cliente HTTP assíncrono com httpx
# - faz GET nessa URL para receber os dados vindo da API
# - dispara erro se a resposta vier com status inválido
# - converte o JSON em lista Python
async def get_country_options() -> list[CountryOptionSchema]:
    url = f"{COUNTRY_CODE_API_BASE_URL}{COUNTRY_CODE_API_COUNTRIES_ENDPOINT}"

    async with AsyncClient(timeout=10.0) as client:
        response = await client.get(url)
        response.raise_for_status()

    countries = response.json()

    return [normalize_country_item(country) for country in countries]


# Utilidade dessa função: 
# - lê o 'code' vindo da API externa
# - converte para string e remove espaços
# - garante que o ddi saia com +
# - lê o flag 
def normalize_country_item(country: dict) -> CountryOptionSchema:
    ddi = str(country.get("code", "")).strip()
    flag = country.get("flag")

    # Esse IF verifica se o DDI tem algum valor se ainda não começa com o '+'
    # # Se não começar, adiciona o '+' na frente
    # Normaliza o DDI
    if ddi and not ddi.startswith("+"):
        ddi = f"+{ddi}"

    # Esse IF verifica se flag é texto (str) e se começa com '/'
    # Normaliza a URL da bandeira
    if isinstance(flag, str) and flag.startswith("/"):
        flag = f"{COUNTRY_CODE_API_BASE_URL}{flag}"

    return CountryOptionSchema(
        name=country.get("name", ""),
        ddi=ddi,
        flag=flag if isinstance(flag, str) and flag else None,
    )
