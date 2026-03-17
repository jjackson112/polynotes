# helper method for activity

def require_fields(data):
    if not data:
        return False, "Invalid JSON"
    
    