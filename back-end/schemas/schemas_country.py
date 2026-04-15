from pydantic import BaseModel

# schema que define o que o Front vai receber
class CountryOptionSchema(BaseModel):
    name: str # Nome do país
    ddi: str # Número do DDI
    flag: str | None = None # URL da img (bandeira de cada país)
