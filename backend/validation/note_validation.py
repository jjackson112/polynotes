# helper method for activity 
# catch bad data before it hits the db

def require_fields(data):
    if not data:
        return "Invalid JSON"
    
    if not data.get("title"):
        return "Title is required"
    
    if not data.get("content"):
        return "Content is required"
    
    if not data.get("language"):
        return "Selecting a language is required"

    return None