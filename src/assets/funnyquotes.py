import requests
from bs4 import BeautifulSoup
import json

# Base URL
base_url = "https://www.goodreads.com/quotes/tag/truth"

# Headers to mimic a real browser request
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

# Function to scrape quotes from multiple pages
def scrape_quotes(base_url, max_pages=70):
    all_quotes = []
    current_page = base_url
    page_count = 1  # Track page number

    while current_page and page_count <= max_pages:
        print(f"Scraping Page {page_count}: {current_page}")  # Debugging output

        # Send GET request
        response = requests.get(current_page, headers=headers)
        if response.status_code != 200:
            print("Failed to retrieve the webpage")
            break

        # Parse content
        soup = BeautifulSoup(response.text, 'html.parser')

        # Find all quote blocks
        quotes = soup.find_all('div', class_='quote')

        for quote in quotes:
            # Extract the quote text
            quote_text = quote.find('div', class_='quoteText').get_text(strip=True).split('―')[0].strip()

            # Extract the author
            author = quote.find('span', class_='authorOrTitle').get_text(strip=True)

            # Extract tags
            tags = [tag.get_text(strip=True) for tag in quote.find_all('a', class_='tag')]

            # Append data
            all_quotes.append({
                'quote': quote_text,
                'author': author,
                'tags': 'Humor'
            })

        # Check if we have reached the page limit
        if page_count >= max_pages:
            break

        # Find the "Next Page" button
        next_page = soup.find('a', class_='next_page')
        if next_page and 'href' in next_page.attrs:
            next_url = "https://www.goodreads.com" + next_page['href']
            current_page = next_url  # Update current page
            page_count += 1  # Increment page count
        else:
            break  # No more pages

    return all_quotes

# Function to save quotes to a JSON file
def save_to_json(data, filename='TruthQuotes.json'):
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

# Main execution
if __name__ == "__main__":
    max_pages = 70  # Limit to 70 pages
    quotes_data = scrape_quotes(base_url, max_pages)
    save_to_json(quotes_data)
    print(f"Scraped {len(quotes_data)} quotes from {max_pages} pages and saved to 'TruthQuotes.json'.")
