from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import json
import uuid

def scrape_quotefancy(base_url, num_pages, output_file="NatureQuotes.json"):
    options = Options()
    options.add_argument("--headless")
    options.add_argument("--disable-blink-features=AutomationControlled")
    options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36")

    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)

    all_quotes = []

    try:
        for page_num in range(1, num_pages + 1):
            url = f"{base_url}/page/{page_num}" if page_num > 1 else base_url
            driver.get(url)
            WebDriverWait(driver, 20).until(
                EC.presence_of_all_elements_located((By.CLASS_NAME, "q-container"))
            )
            soup = BeautifulSoup(driver.page_source, "html.parser")
            quotes = []

            for q_container in soup.find_all("div", class_="q-container"):
                q_wrapper = q_container.find("div", class_="q-wrapper")
                if q_wrapper:
                    quote_p = q_wrapper.find("p", class_="quote-p")
                    author_p = q_wrapper.find("p", class_="author-p")
                    # category_links = q_wrapper.find_all('a', href=lambda href: href and "quotefancy.com/" in href)

                    if quote_p and author_p:
                        quote_text = quote_p.find("a").text.strip() if quote_p.find("a") else quote_p.text.strip()
                        author = author_p.find("a").text.strip() if author_p.find("a") else author_p.text.strip()
                        categories = ["nature"]

                        quotes.append({
                            "_id": str(uuid.uuid4()),
                            "quote": quote_text, 
                            "author": author, 
                            "tags": categories})

            all_quotes.extend(quotes)
            print(f"Scraped page {page_num}")

        with open(output_file, "w", encoding="utf-8") as f:
            json.dump(all_quotes, f, ensure_ascii=False, indent=4)
        print(f"Quotes saved to {output_file}")

    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        driver.quit()

base_url = "https://quotefancy.com/nature-quotes"
num_pages = 2  # Set the number of pages you want to scrape
scrape_quotefancy(base_url, num_pages)