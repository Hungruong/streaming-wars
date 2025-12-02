"""
Fetch streaming platform availability data from Streaming Availability API
"""

import requests
import csv
import os

# Config
API_KEY = "ADD KEY HERE"
BASE_URL = "https://streaming-availability.p.rapidapi.com"
OUTPUT_DIR = "output"

HEADERS = {
    "X-RapidAPI-Key": API_KEY,
    "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com"
}

# Region mapping for countries
REGIONS = {
    'us': 'North America', 'ca': 'North America',
    'mx': 'Latin America', 'br': 'Latin America', 'ar': 'Latin America',
    'cl': 'Latin America', 'co': 'Latin America', 'pe': 'Latin America',
    'gb': 'Europe', 'de': 'Europe', 'fr': 'Europe', 'es': 'Europe',
    'it': 'Europe', 'nl': 'Europe', 'be': 'Europe', 'at': 'Europe',
    'ch': 'Europe', 'se': 'Europe', 'no': 'Europe', 'dk': 'Europe',
    'fi': 'Europe', 'pl': 'Europe', 'pt': 'Europe', 'ie': 'Europe',
    'cz': 'Europe', 'hu': 'Europe', 'ro': 'Europe', 'bg': 'Europe',
    'gr': 'Europe', 'tr': 'Europe', 'ru': 'Europe', 'ua': 'Europe',
    'au': 'Asia Pacific', 'nz': 'Asia Pacific', 'jp': 'Asia Pacific',
    'kr': 'Asia Pacific', 'sg': 'Asia Pacific', 'hk': 'Asia Pacific',
    'in': 'Asia Pacific', 'th': 'Asia Pacific', 'my': 'Asia Pacific',
    'ph': 'Asia Pacific', 'id': 'Asia Pacific', 'vn': 'Asia Pacific',
    'ae': 'Middle East', 'il': 'Middle East', 'za': 'Africa',
}


def fetch_countries():
    """Fetch all countries and their available streaming services"""
    print("Fetching countries from API...")
    
    response = requests.get(f"{BASE_URL}/countries", headers=HEADERS, timeout=30)
    response.raise_for_status()
    
    data = response.json()
    print(f"Received {len(data)} countries")
    
    return data


def get_service_ids(services_data):
    """Extract service IDs from services data (handles both list and dict)"""
    if isinstance(services_data, dict):
        return list(services_data.keys())
    elif isinstance(services_data, list):
        return [s.get('id', '') for s in services_data if isinstance(s, dict)]
    return []


def process_and_save(data):
    """Process API data and save to CSV"""
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    rows = []
    for code, info in data.items():
        services = get_service_ids(info.get('services', []))
        
        row = {
            'country_code': code,
            'country_name': info.get('name', code.upper()),
            'region': REGIONS.get(code, 'Other'),
            'netflix': 1 if 'netflix' in services else 0,
            'disney': 1 if 'disney' in services else 0,
            'prime': 1 if 'prime' in services else 0,
            'hbo': 1 if 'hbo' in services else 0,
            'hulu': 1 if 'hulu' in services else 0,
            'apple': 1 if 'apple' in services else 0,
            'paramount': 1 if 'paramount' in services else 0,
        }
        row['total_services'] = row['netflix'] + row['disney'] + row['prime'] + row['hbo'] + row['hulu'] + row['apple'] + row['paramount']
        rows.append(row)
    
    # Sort by total services desc
    rows.sort(key=lambda x: -x['total_services'])
    
    # Save CSV
    filepath = os.path.join(OUTPUT_DIR, 'geographic_availability.csv')
    with open(filepath, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=rows[0].keys())
        writer.writeheader()
        writer.writerows(rows)
    
    print(f"Saved to {filepath}")
    
    # Print summary
    print("\nSummary:")
    for svc in ['netflix', 'disney', 'prime', 'hbo', 'hulu', 'apple', 'paramount']:
        count = sum(1 for r in rows if r[svc] == 1)
        print(f"  {svc}: {count} countries")


def main():
    data = fetch_countries()
    process_and_save(data)
    print("\nDone!")


if __name__ == "__main__":
    main()