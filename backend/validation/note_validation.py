# helper method for activity + catch bad data before it hits the db
# split validation for POST + PATCH

ALLOWED_LANGUAGES = ["spanish", "mandarin", "italian"]

def validate_language(value):
    if not value or not str(value).strip():
        return None, "Language is required"
    
    normalized = value.strip().lower()

    if normalized not in ALLOWED_LANGUAGES:
        return None, "Invalid language"

    return normalized, None

def validate_create_note(data):
    if not data:
        return "Invalid JSON"
    
    required_fields = ["title", "content", "language"]

    for field in required_fields:
        value = data.get(field)

        if not value or not str(value).strip():
            return f"{field.capitalize()} is required"
        
    normalized, error = validate_language(data.get("language"))
    if error:
        return error

    data["language"] = normalized

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
        normalized, error = validate_language(data["language"])
        if error:
            return error
        
        data["language"] = normalized
        
    if "tags" in data:
        if not isinstance(data["tags"], list):
            return "Tags must be a list"
        
    return None
