import logging

from fastapi import APIRouter, HTTPException

from schemas.schemas_country import CountryOptionSchema
from services.services_country import CountryServiceError, get_country_options

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/countries", tags=["countries"])


@router.get("", response_model=list[CountryOptionSchema])
async def list_countries() -> list[CountryOptionSchema]:
    try:
        return await get_country_options()
    except CountryServiceError as error:
        logger.exception("Erro ao buscar paises na API externa.")
        raise HTTPException(
            status_code=502,
            detail="Erro ao buscar países na API externa.",
        ) from error
