"""
Key events in the streaming wars for timeline overlay
"""

import csv
import os

OUTPUT_DIR = "output"

EVENTS = [
    ('2019-11-12', 'Disney+ Launch', 'disney_plus', 'launch', 'Disney+ launches with 10M subscribers on day one'),
    ('2020-03-11', 'WHO Declares Pandemic', 'all', 'external', 'COVID-19 pandemic begins, streaming boom starts'),
    ('2020-05-27', 'HBO Max Launch', 'hbo_max', 'launch', 'WarnerMedia launches HBO Max in the US'),
    ('2021-03-04', 'Paramount+ Launch', 'paramount_plus', 'launch', 'CBS All Access rebrands to Paramount+'),
    ('2022-04-19', 'Netflix First Loss', 'netflix', 'milestone', 'Netflix reports first subscriber loss in 10+ years'),
    ('2022-11-03', 'Netflix Ad Tier', 'netflix', 'launch', 'Netflix launches $6.99 ad-supported plan'),
    ('2022-11-08', 'Disney+ Peak', 'disney_plus', 'milestone', 'Disney+ reaches peak of 164.2M subscribers'),
    ('2023-05-23', 'Password Crackdown', 'netflix', 'strategy', 'Netflix enforces password sharing rules in US'),
    ('2024-01-23', 'Netflix WWE Deal', 'netflix', 'content', 'Netflix announces $5B deal for WWE Raw'),
    ('2024-11-15', 'Netflix 300M', 'netflix', 'milestone', 'Netflix surpasses 300 million subscribers'),
]


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    filepath = os.path.join(OUTPUT_DIR, 'key_events.csv')
    
    with open(filepath, 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(['date', 'event', 'platform', 'type', 'description'])
        writer.writerows(EVENTS)
    
    print(f"Saved {len(EVENTS)} events to {filepath}")


if __name__ == "__main__":
    main()
