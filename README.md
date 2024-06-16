# MICASA
The project aims to develop a real estate system for various users, including system administrators, real estate agents, sellers, and buyers. By incorporating the B-C-E (Boundary, Controller, Entity) framework during development, the system is designed to streamline property management, enhancing efficiency and user experience

# DEVELOPMENT TOOLS:
- Frontend: React, Tailwind CSS, Flowbite
- Backend: Flask
- Database: SQLlite, SQLAlchemy

# SETUP
## 1. Libraries to install
### Frontend:
1. React Framework:  
```
npx create-react-app coolmathgames_fe
cd coolmathgames_fe
npm start
```
2.  React libraries required:
    - React Router Dom (To navigate through different pages):  
      `npm i react-router-dom`
    - ?
    

3. Tailwind CSS (for styling):  
- Please follow this tutorial: https://tailwindcss.com/docs/guides/create-react-app

4. Flowbite-React (download Tailwind first):
- Please follow this tutorial: https://flowbite-react.com/docs/guides/create-react-app

5. axios
```npm install axios```

#### To run
```
cd Boundary
cd coolmathgames_fe
npm start
```

#### To see which versions of packages, check:
`frontend/coolmathgames_fe/package.json`

### Backend:
```
pip install -U Flask
pip install -U Flask-SQLAlchemy
pip install flask-login
pip install -U Flask-WTF
pip install flask-bcrypt
pip install -U flask-cors
pip install jwt
pip install flask-jwt-extended
```
#### To run
1. Open new terminal
2. ```
    cd Server
    cd app
    flask run
    ```

### Database:
- SQLite
  `pip install SQLAlchemy`
- SQLAlchemy
#### To run
1. Open new terminal
2. Type in "sqlite3 (directory)/instance/database.db

### Test Driven Development (TDD)
```
pip install Selenium
pip install  Pytest
pip install pytest-html
pip install pytest-xdist
pip install Openpyxl
pip install Allure-pytest
```
#### To run
pytest filepath/testfile.py
