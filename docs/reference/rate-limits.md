---
sidebar_position: 2
title: Rate Limits
---

# Rate Limits

The COPA API implements rate limiting to ensure fair usage and system stability.

## Default Limits

| Limit | Value | Reset |
|-------|-------|-------|
| **Per Hour** | 1,000 requests | Rolling window |
| **Per Day** | 10,000 requests | Rolling window |

## How Rate Limiting Works

Rate limits are applied per API key. Each API key has independent limits.

### Rolling Window

Limits use a rolling window approach:
- Hourly limit: Tracks requests in the last 60 minutes
- Daily limit: Tracks requests in the last 24 hours

### Example

If you make 1,000 requests at 10:00 AM:
- At 10:01 AM, you're rate limited (hourly limit reached)
- At 11:01 AM, your hourly quota resets

## Rate Limit Headers

Responses include headers to help track your usage:

| Header | Description |
|--------|-------------|
| `X-RateLimit-Limit` | Maximum requests allowed |
| `X-RateLimit-Remaining` | Requests remaining |
| `X-RateLimit-Reset` | Timestamp when limit resets |

## Exceeding Limits

When you exceed the rate limit:

**HTTP Status:** `429 Too Many Requests`

**Response:**
```json
{
  "detail": "Request was throttled. Expected available in 60 seconds."
}
```

## Best Practices

### 1. Cache Responses

Cache data that doesn't change frequently:

```python
import redis

cache = redis.Redis()

def get_cooperatives():
    cached = cache.get("cooperatives")
    if cached:
        return json.loads(cached)

    response = requests.get(API_URL, headers=headers)
    data = response.json()

    # Cache for 5 minutes
    cache.setex("cooperatives", 300, json.dumps(data))
    return data
```

### 2. Implement Exponential Backoff

When rate limited, wait before retrying:

```python
import time

def api_request_with_retry(url, max_retries=3):
    for attempt in range(max_retries):
        response = requests.get(url, headers=headers)

        if response.status_code == 429:
            wait_time = 2 ** attempt  # 1, 2, 4 seconds
            time.sleep(wait_time)
            continue

        return response

    raise Exception("Max retries exceeded")
```

### 3. Batch Requests

Instead of many small requests, use pagination efficiently:

```python
# Instead of fetching one by one
for coop_id in cooperative_ids:
    get_cooperative(coop_id)  # Bad: Many requests

# Fetch in batches
get_cooperatives(page_size=100)  # Good: One request
```

### 4. Monitor Your Usage

Track your API usage to avoid hitting limits:

```python
class APIClient:
    def __init__(self):
        self.requests_made = 0

    def request(self, url):
        self.requests_made += 1
        if self.requests_made > 900:  # 90% of limit
            print("Warning: Approaching rate limit")
        return requests.get(url, headers=headers)
```

## Increased Limits

If you need higher rate limits:

1. Contact [partners@copa.rw](mailto:partners@copa.rw)
2. Describe your use case
3. We'll configure custom limits for your API key

Custom limits are available for:
- High-volume integrations
- Real-time sync requirements
- Batch processing systems
