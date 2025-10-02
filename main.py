from fastapi import FastAPI, Response, status
from fastapi.staticfiles import StaticFiles
from itemDict import items, weapons, shields, fieldMagics, offensiveMagics, defensiveMagics, monsters, accessories

app = FastAPI(title="page")
app_api = FastAPI(title="api")

app.mount("/dokaponcompanion", app_api)

app.mount("/", StaticFiles(directory="static", html=True), name="static")

@app_api.get("/item/{itemName}")
async def get_item(itemName: str, response: Response):
    if (itemName in items):
        return items[itemName]
    elif (itemName in weapons):
        return weapons[itemName]
    elif (itemName in shields):
        return shields[itemName]
    elif (itemName in accessories):
        return accessories[itemName]
    elif (itemName in offensiveMagics):
        return offensiveMagics[itemName]
    elif (itemName in defensiveMagics):
        return defensiveMagics[itemName]
    elif (itemName in fieldMagics):
        return fieldMagics[itemName]
    else:
        response.status_code = status.HTTP_404_NOT_FOUND
        return {"error": "item not found"}
    
@app_api.get("/monster/{monsterName}")
async def get_monster(monsterName: str, response: Response):
    if (monsterName in monsters):
        return monsters[monsterName]
    else:
        response.status_code = status.HTTP_404_NOT_FOUND
        return {"error": "monster not found"}