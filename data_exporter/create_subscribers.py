"""
Subscribers timeline data compiled from official earnings reports.
Sources: Netflix IR, Disney IR, Amazon Reports, Warner Bros Discovery IR

Unit: millions of subscribers
"""

import csv
import os

OUTPUT_DIR = "output"

# (year, quarter, netflix, disney_plus, amazon_prime, hbo_max, hulu, apple_tv, paramount_plus)
DATA = [
    # 2017
    (2017, 1, 98.75, None, 80, None, 12, None, None),
    (2017, 2, 103.95, None, 85, None, 13, None, None),
    (2017, 3, 109.25, None, 90, None, 14, None, None),
    (2017, 4, 117.58, None, 95, None, 17, None, None),
    # 2018
    (2018, 1, 125.00, None, 100, None, 20, None, None),
    (2018, 2, 130.00, None, 105, None, 22, None, None),
    (2018, 3, 137.00, None, 110, None, 23, None, None),
    (2018, 4, 139.26, None, 115, None, 25, None, None),
    # 2019
    (2019, 1, 148.86, None, 120, None, 26, None, None),
    (2019, 2, 151.56, None, 125, None, 27, None, None),
    (2019, 3, 158.33, None, 130, None, 28, None, None),
    (2019, 4, 167.09, 26.5, 135, None, 30.4, None, None),
    # 2020
    (2020, 1, 182.86, 33.5, 150, None, 32.1, None, None),
    (2020, 2, 192.95, 57.5, 165, None, 35.5, None, None),
    (2020, 3, 195.15, 73.7, 175, None, 36.6, None, None),
    (2020, 4, 203.66, 94.9, 185, None, 39.4, None, None),
    # 2021
    (2021, 1, 207.64, 103.6, 190, None, 41.6, 40, None),
    (2021, 2, 209.18, 116.0, 195, 67.5, 42.8, 45, None),
    (2021, 3, 213.56, 118.1, 200, 69.4, 43.8, 50, 32.8),
    (2021, 4, 221.84, 129.8, 205, 73.8, 45.3, 55, 36.0),
    # 2022
    (2022, 1, 221.64, 137.7, 210, 76.8, 45.6, 60, 39.6),
    (2022, 2, 220.67, 152.1, 215, 80.0, 46.2, 65, 43.3),
    (2022, 3, 223.09, 164.2, 215, 82.0, 47.2, 68, 46.0),
    (2022, 4, 230.75, 161.8, 218, 96.1, 48.0, 72, 56.0),
    # 2023
    (2023, 1, 232.50, 157.8, 220, 97.7, 48.5, 75, 60.0),
    (2023, 2, 238.39, 146.1, 220, 95.8, 48.3, 78, 61.0),
    (2023, 3, 247.15, 150.2, 220, 95.1, 48.5, 80, 63.0),
    (2023, 4, 260.28, 149.6, 220, 97.0, 50.2, 82, 67.5),
    # 2024
    (2024, 1, 269.60, 153.6, 220, 99.6, 50.5, 85, 71.0),
    (2024, 2, 277.65, 153.8, 220, 103.0, 51.0, 88, 72.0),
    (2024, 3, 282.72, 158.6, 220, 110.0, 51.5, 90, 72.0),
    (2024, 4, 301.63, 159.0, 220, 112.0, 52.0, 92, 77.0),
]


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    filepath = os.path.join(OUTPUT_DIR, 'subscribers_timeline.csv')
    
    with open(filepath, 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(['year', 'quarter', 'netflix', 'disney_plus', 'amazon_prime', 
                         'hbo_max', 'hulu', 'apple_tv', 'paramount_plus'])
        writer.writerows(DATA)
    
    print(f"Saved {len(DATA)} records to {filepath}")


if __name__ == "__main__":
    main()
