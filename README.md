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
Save this in it :
```bash
EMAIL_USER = 'your email'
EMAIL_PASS = 'your password'
EMAIL_FROM = 'your email'
```
