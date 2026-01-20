def assess_severity(text: str) -> str:
    keywords = [
        "kill myself",
        "end my life",
        "suicide",
        "don't want to live",
        "worthless"
    ]

    lowered = text.lower()
    for k in keywords:
        if k in lowered:
            return "high"

    return "normal"
