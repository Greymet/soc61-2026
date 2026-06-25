def filterfunction(detections, threshold):
    filteredlist = []
    
    print(f"Starting process with confidence threshold: {threshold}")
    
    for det in detections:
        if det["confidence"] >= threshold:
            filteredlist.append(det)

    return filteredlist

initialdata = [
    {"name": "spiderman", "confidence": 0.68},
    {"name": "batmobile", "confidence": 0.44},
    {"name": "jarvis", "confidence": 0.83},
    {"name": "krypto", "confidence": 0.20}
]


lowerlimit = 0.61
finalresults = filterfunction(initialdata, lowerlimit)


print("Final filtered detections:")
for result in finalresults:
    print(result)