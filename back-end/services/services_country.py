from asyncio import Lock
from time import monotonic

from httpx import AsyncClient

from schemas.schemas_country import CountryOptionSchema

COUNTRY_CODE_API_BASE_URL = "https://country-code.com"
COUNTRY_CODE_API_COUNTRIES_ENDPOINT = "/api/countries"
COUNTRY_OPTIONS_CACHE_TTL_SECONDS = 1800

_country_options_cache: list[CountryOptionSchema] = []
_country_options_cache_expires_at = 0.0
_country_options_cache_lock = Lock()


async def get_country_options() -> list[CountryOptionSchema]:
    cached_country_options = _get_cached_country_options()

    if cached_country_options is not None:
        return cached_country_options

    async with _country_options_cache_lock:
        cached_country_options = _get_cached_country_options()

        if cached_country_options is not None:
            return cached_country_options

        fresh_country_options = await _fetch_country_options()
        _set_country_options_cache(fresh_country_options)

        return list(fresh_country_options)


async def _fetch_country_options() -> list[CountryOptionSchema]:
    url = f"{COUNTRY_CODE_API_BASE_URL}{COUNTRY_CODE_API_COUNTRIES_ENDPOINT}"

    async with AsyncClient(timeout=10.0) as client:
        response = await client.get(url)
        response.raise_for_status()

    countries = response.json()

    return [normalize_country_item(country) for country in countries]


def _get_cached_country_options() -> list[CountryOptionSchema] | None:
    if _country_options_cache and monotonic() < _country_options_cache_expires_at:
        return list(_country_options_cache)

    return None


def _set_country_options_cache(country_options: list[CountryOptionSchema]) -> None:
    global _country_options_cache, _country_options_cache_expires_at

    _country_options_cache = list(country_options)
    _country_options_cache_expires_at = monotonic() + COUNTRY_OPTIONS_CACHE_TTL_SECONDS


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
