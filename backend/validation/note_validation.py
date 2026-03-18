# helper method for activity + catch bad data before it hits the db
# split validation for POST + PATCH

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

# validate what is in the fields - PATCH
def validate_update_note(data):
    if not data:
        return "Invalid JSON"
    
    allowed_fields = ["title", "content", "language", "tags"]

    for key in data:
        if key not in allowed_fields:
            return f"Invalid field: {key}"

    if "title" in data:
        if not data["title"] or not str(data["title"]).strip():
            return "Title cannot be empty"
        
    if "content" in data:
        if not data["content"] or not str(data["content"]).strip():
            return "Content cannot be empty"
        
    if "language" in data:
        if not data["language"] or not str(data["language"]).strip():
            return "Language cannot be empty"
        
    return None