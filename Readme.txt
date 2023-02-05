Instructions for Running Phase1:

Data files in following Folder:
1. 2015datasets 
2. data
Run the files in the following order: 
Preprocessing  Files: 
1. NHANES15-16.ipynb 
2. NHANES17-20.ipynb 
EDA Files:  
3. NHANES_MERGED_DATASET_EDA.ipynb


Instructions for Running Phase2:

Model files Run in following order:
1. Naives_bayes.ipynb
2. MLogistic_Regression
3. RFC.ipynb
4. SVM.ipynb
5. GB-ADA-XGBoost.ipynb



Instructions for Running Phase3:
Backend:
1.Install python along with pip
2.Go to backend folder and run the following commands in commandline:
 pip install -r requirements.in
 pip install -r requirements.txt
 uvicorn api_DPDB:app --reload

Frontend:

1. Install npm
2. Go to form-app(frontend) folder
2. run following commands in commandline:
 npm install --legacy-peer-deps
 npm run start

