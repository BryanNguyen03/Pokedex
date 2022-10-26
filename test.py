import requests

url = "https://ghibliapi.herokuapp.com/films"
response = requests.get(url).json()

print(response[0]['title'])
