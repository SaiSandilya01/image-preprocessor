import os
import shutil
from os.path import exists
from fastapi.responses import FileResponse
from fastapi import FastAPI, File, UploadFile
from preprocessimage import preprocess

app = FastAPI()


@app.post("/convert-image")
def convertImage(file: UploadFile = File(...)):
    filePath = f"../pictures/{file.filename}"

    if not exists("../pictures"):
        os.mkdir("../pictures")

    # save file to storage
    with open(filePath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Convert Image here
    preprocess(filePath)

    # return converted image
    return FileResponse(filePath, media_type="image/jpeg")
