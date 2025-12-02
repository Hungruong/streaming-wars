# Streaming Wars - Data Scripts

## Quick Start

```bash
pip install -r requirements.txt
python run_all.py
```

## Scripts

| Script | Output | Source |
|--------|--------|--------|
| `fetch_geographic.py` | `geographic_availability.csv` | Streaming Availability API |
| `create_subscribers.py` | `subscribers_timeline.csv` | Earnings reports (manual) |
| `create_events.py` | `key_events.csv` | Manual |
| `create_platforms.py` | `platforms.csv`, `platforms.json` | Manual |

## Kaggle Datasets (Manual Download)

For content analysis features, download these:

- Movies: https://www.kaggle.com/datasets/ruchi798/movies-on-netflix-prime-video-hulu-and-disney
- TV Shows: https://www.kaggle.com/datasets/ruchi798/tv-shows-on-netflix-prime-video-hulu-and-disney
