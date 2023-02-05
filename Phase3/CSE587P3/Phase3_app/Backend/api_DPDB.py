import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib


# Loading classifer model for classification of depression and diabetes
classifier = joblib.load(open("DPDB_classifer.pkl", "rb"))


app = FastAPI()

# For REACT as frontend using  cross origin resource sharing
# CORS middleware
origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:3000",
    "localhost:3000",
    "localhost:3000",
    "http://localhost:3000",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# routes


@app.get('/')
async def index():
    return {"PREDICTIVE ANALYSIS OF DIABETES AND DEPRESSION"}


@app.post('/classify')
# Post Request for entring values such as gender, age, ethnicity, sleep hours, dystolic pressure, systolic pressure, weight, height, BMI, speech frequency hearing loss, high frequency hearing loss
def classify(detail: dict):

    gen = detail['gen']
    age = detail['age']
    eth = detail['eth']
    sleep_hrs = detail['sleep_hrs']
    dpress = detail['dpress']
    spress = detail['spress']
    weight = detail['weight']
    height = detail['height']
    sfhl = detail['sfhl']
    hfhl = detail['hfhl']

    # Calculating BMI in backend
    height1 = height/100
    bmi = (weight/(height1*height1))

    # score = q1+q2+q3+q4+q5+q6+q7+q8+q9

    # Using the classifier model for input variables from the user
    result = classifier.predict(
        [[gen, age, eth, sleep_hrs, dpress, spress, weight, height, bmi, sfhl, hfhl]])
    # model used: XGBoost
    # model Accuracy 74.9%

    if result == 0.0:
        return {"message": 'CONGRATS YOU HAVE NO DIABETES & DEPRESSION'}
    if result == 1.0:
        return {"message": 'NO DEPRESSION BUT YOU MAY HAVE 74.9% CHANCES OF HAVING DIABETES'}
    if result == 2.0:
        return {"message": 'NO DIABETES BUT YOU MAY HAVE 74.9% CHANCES OF HAVING DEPRESSION'}
    if result == 3.0:
        return {"message": 'YOU MAY HAVE 74.9% CHANCES OF HAVING DIABETES AND DEPRESSION'}

    # Checking for different DPDB_Val:
    # Mappings:
    # NDPNDB: No Depression & No Diabetes :0
    # NDPDB: No Depression & Diabetes     :1
    # DPNDB: Depression & No Diabetes     :2
    # DPDB: Depression & Diabetes         :3


if __name__ == '__main__':
    # uvicorn.run(app)
    # Running application on specific host: 127.0.0.1 and port: 8000
    uvicorn.run(app, host="127.0.0.1", port=8000)
