"""
Run all data scripts to generate datasets
"""

import subprocess
import sys

scripts = [
    'fetch_geographic.py',
    'create_subscribers.py', 
    'create_events.py',
    'create_platforms.py',
]

print("=" * 50)
print("THE STREAMING WARS - Data Generation")
print("=" * 50)

for script in scripts:
    print(f"\n>>> Running {script}...")
    result = subprocess.run([sys.executable, script], capture_output=True, text=True)
    print(result.stdout)
    if result.returncode != 0:
        print(f"Error: {result.stderr}")

print("\n" + "=" * 50)
print("Done! Check the 'output/' folder for CSV files.")
print("=" * 50)
