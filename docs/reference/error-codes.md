---
sidebar_position: 1
title: Error Codes
---

# Error Codes

The COPA API uses standard HTTP status codes to indicate success or failure.

## HTTP Status Codes

| Code | Status | Description |
|------|--------|-------------|
| `200` | OK | Request succeeded |
| `201` | Created | Resource created successfully |
| `400` | Bad Request | Invalid request parameters |
| `401` | Unauthorized | Invalid or missing API key |
| `403` | Forbidden | API key lacks required scope |
| `404` | Not Found | Resource doesn't exist |
| `429` | Too Many Requests | Rate limit exceeded |
| `500` | Internal Server Error | Server error |

## Error Response Format

All errors return a JSON response:

```json
{
  "detail": "Error message describing the issue"
}
```

## Common Errors

### 401 Unauthorized

**Invalid API Key**

```json
{
  "detail": "Invalid API key"
}
```

**Causes:**
- API key is incorrect
- API key has been deactivated
- API key is malformed

**Solution:** Verify your API key is correct and active.

---

### 403 Forbidden

**Insufficient Scope**

```json
{
  "detail": "You do not have permission to perform this action."
}
```

**Causes:**
- API key doesn't have required scope
- Attempting to access restricted resource

**Solution:** Contact COPA to request additional scopes.

---

### 404 Not Found

**Resource Not Found**

```json
{
  "detail": "Not found."
}
```

**Causes:**
- Resource ID doesn't exist
- Resource has been deleted
- Typo in the resource ID

**Solution:** Verify the resource ID is correct.

---

### 429 Too Many Requests

**Rate Limit Exceeded**

```json
{
  "detail": "Request was throttled. Expected available in 60 seconds."
}
```

**Causes:**
- Exceeded hourly rate limit (1,000/hour)
- Exceeded daily rate limit (10,000/day)

**Solution:** Wait and retry, or contact us for increased limits.

---

### 500 Internal Server Error

**Server Error**

```json
{
  "detail": "Internal server error"
}
```

**Causes:**
- Unexpected server issue

**Solution:** Retry the request. If persistent, contact support.

## Handling Errors

### Python Example

```python
import requests

response = requests.get(
    "https://api.copa.rw/api/v1/cooperatives",
    headers={"Authorization": "Bearer YOUR_API_KEY"}
)

if response.status_code == 200:
    data = response.json()
elif response.status_code == 401:
    print("Invalid API key")
elif response.status_code == 429:
    print("Rate limited, waiting...")
    time.sleep(60)
else:
    print(f"Error: {response.status_code}")
```

### JavaScript Example

```javascript
try {
  const response = await fetch("https://api.copa.rw/api/v1/cooperatives", {
    headers: { "Authorization": "Bearer YOUR_API_KEY" }
  });

  if (!response.ok) {
    const error = await response.json();
    console.error(`Error ${response.status}: ${error.detail}`);
  }

  const data = await response.json();
} catch (error) {
  console.error("Network error:", error);
}
```
