from httpx import AsyncClient

from schemas.schemas_country import CountryOptionSchema

COUNTRY_CODE_API_BASE_URL = "https://country-code.com"
COUNTRY_CODE_API_COUNTRIES_ENDPOINT = "/api/countries"


async def get_country_options() -> list[CountryOptionSchema]:
    url = f"{COUNTRY_CODE_API_BASE_URL}{COUNTRY_CODE_API_COUNTRIES_ENDPOINT}"

    async with AsyncClient(timeout=10.0) as client:
        response = await client.get(url)
        response.raise_for_status()

    countries = response.json()

    return [normalize_country_item(country) for country in countries]


def normalize_country_item(country: dict) -> CountryOptionSchema:
    ddi = str(country.get("code", "")).strip()
    raw_flag = str(country.get("flag", "")).strip()
    flag_code = raw_flag.removeprefix("/flags/").removesuffix(".png").lower()
    flag = f"https://flagcdn.com/w40/{flag_code}.png" if flag_code else None

    if ddi and not ddi.startswith("+"):
        ddi = f"+{ddi}"

    return CountryOptionSchema(
        name=country.get("name", ""),
        ddi=ddi,
        flag=flag,
    )
