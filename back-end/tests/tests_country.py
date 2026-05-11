from fastapi.testclient import TestClient

from main import app
from services.services_country import CountryServiceError, normalize_country_item


client = TestClient(app)


def test_normalize_country_item_adds_plus_to_ddi():
    country = normalize_country_item({
        "name": "Brazil",
        "code": "55",
        "flag": "/flags/br.png",
    })

    assert country.name == "Brazil"
    assert country.ddi == "+55"
    assert country.flag == "https://flagcdn.com/w40/br.png"


def test_normalize_country_item_keeps_ddi_with_plus():
    country = normalize_country_item({
        "name": "Portugal",
        "code": "+351",
        "flag": "/flags/pt.png",
    })

    assert country.name == "Portugal"
    assert country.ddi == "+351"
    assert country.flag == "https://flagcdn.com/w40/pt.png"


def test_normalize_country_item_handles_missing_flag():
    country = normalize_country_item({
        "name": "Country without flag",
        "code": "1",
        "flag": "",
    })

    assert country.name == "Country without flag"
    assert country.ddi == "+1"
    assert country.flag is None


def test_normalize_country_item_handles_missing_fields():
    country = normalize_country_item({})

    assert country.name == ""
    assert country.ddi == ""
    assert country.flag is None


def test_list_countries_returns_country_options(monkeypatch):
    async def fake_get_country_options():
        return [
            {
                "name": "Brazil",
                "ddi": "+55",
                "flag": "https://flagcdn.com/w40/br.png",
            }
        ]

    monkeypatch.setattr(
        "routers.routers_country.get_country_options",
        fake_get_country_options,
    )

    response = client.get("/countries")

    assert response.status_code == 200
    assert response.json() == [
        {
            "name": "Brazil",
            "ddi": "+55",
            "flag": "https://flagcdn.com/w40/br.png",
        }
    ]


def test_list_countries_returns_502_when_service_fails(monkeypatch):
    async def fake_get_country_options():
        raise CountryServiceError("External API failed")

    monkeypatch.setattr(
        "routers.routers_country.get_country_options",
        fake_get_country_options,
    )

    response = client.get("/countries")

    assert response.status_code == 502
    assert response.json() == {
        "detail": "Erro ao buscar países na API externa.",
    }
