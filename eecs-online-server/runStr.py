import pickle
def getAnswer(codeStr):
    exec(codeStr)
    with open("result.pkl","rb") as f:
            result = pickle.load(f)
    return result

