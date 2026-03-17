# helper method for activity 
# catch bad data before it hits the db

def require_fields(data):
    if not data:
        return "Invalid JSON"
    
    required_fields = ["title", "content", "language"]

    for field in required_fields:
        value = data.get(field)

        if not value or not str(value).strip():
            return f"{field.capitalize()} is required"


    allowed_languages = ["Spanish", "Mandarin", "Italian"]

    if data.get("language") not in allowed_languages:  
        return "Invalid language"  

    return None
