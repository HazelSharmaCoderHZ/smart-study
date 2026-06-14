import json

def parse_quiz(response):
    try:
        return json.loads(response)
    except:
        return []