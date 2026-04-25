from datetime import datetime

from pydantic import BaseModel


class SiteSettingResponse(BaseModel):
    model_config = {"from_attributes": True}

    key: str
    value: str
    updated_at: datetime
