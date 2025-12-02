"""
Platform metadata for visualization (colors, names, etc.)
"""

import csv
import json
import os

OUTPUT_DIR = "output"

PLATFORMS = [
    ('netflix', 'Netflix', '#E50914'),
    ('disney_plus', 'Disney+', '#113CCF'),
    ('amazon_prime', 'Prime Video', '#00A8E1'),
    ('hbo_max', 'Max', '#B535F6'),
    ('hulu', 'Hulu', '#1CE783'),
    ('apple_tv', 'Apple TV+', '#555555'),
    ('paramount_plus', 'Paramount+', '#0064FF'),
]


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    # Save as CSV
    csv_path = os.path.join(OUTPUT_DIR, 'platforms.csv')
    with open(csv_path, 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(['id', 'name', 'color'])
        writer.writerows(PLATFORMS)
    print(f"Saved to {csv_path}")
    
    # Save as JSON
    json_path = os.path.join(OUTPUT_DIR, 'platforms.json')
    data = [{'id': p[0], 'name': p[1], 'color': p[2]} for p in PLATFORMS]
    with open(json_path, 'w') as f:
        json.dump(data, f, indent=2)
    print(f"Saved to {json_path}")


if __name__ == "__main__":
    main()
