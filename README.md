# Backend Config of TimeCapsule
## Virtual env
```bash
python3 -m venv .venv

# for windows
# python -m venv .venv

# to activate the virtual environment
source .venv/bin/activate

# for windows
# .venv\Scripts\activate
```
## Requirements:-
```bash
pip install -r requirements.txt
```

## Django :-
```bash
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

## admin:-
```bash
python manage.py createsuperuser
```


## Create .env file :-
EMAIL_USER = 'contact@geekyshows.com'
EMAIL_PASS = '123456'
EMAIL_FROM = 'contact@geekyshows.com'
