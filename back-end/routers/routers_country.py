from fastapi import APIRouter, HTTPException
from httpx import HTTPError

from schemas.schemas_country import CountryOptionSchema
from services.services_country import get_country_options

router = APIRouter(prefix="/countries", tags=["countries"])


@router.get("", response_model=list[CountryOptionSchema])
async def list_countries() -> list[CountryOptionSchema]:
    try:
        return await get_country_options()
    except HTTPError as error:
        raise HTTPException(
            status_code=502,
            detail="Erro ao buscar países na API externa.",
        ) from error
