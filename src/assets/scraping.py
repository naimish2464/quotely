import requests
import json
from bs4 import BeautifulSoup

def scrape_quotes(url):
    response = requests.get(url)
    if response.status_code != 200:
        print("Failed to retrieve the webpage")
        return []
    
    soup = BeautifulSoup(response.text, 'html.parser')
    quotes_data = []
    
    quotes = soup.find_all('div', class_='quote')
    for quote in quotes:
        text = quote.find('span', class_='text').get_text(strip=True)
        author = quote.find('small', class_='author').get_text(strip=True)
        tags = [tag.get_text(strip=True) for tag in quote.find_all('a', class_='tag')]
        
        quotes_data.append({
            'quote': text,
            'author': author,
            'tags': tags
        })
    
    return quotes_data

def save_to_json(data, filename="funnyQuotes.json"):
    with open(filename, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)
    print(f"Quotes saved to {filename}")

if __name__ == "__main__":
    url = "https://www.goodreads.com/quotes/tag/funny"
    quotes = scrape_quotes(url)
    save_to_json(quotes)
