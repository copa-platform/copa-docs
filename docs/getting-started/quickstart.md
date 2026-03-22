---
sidebar_position: 3
title: Quickstart
---

# Quickstart

Make your first COPA API request in minutes.

## Prerequisites

- An API key (contact [partners@copa.rw](mailto:partners@copa.rw))
- A tool to make HTTP requests (curl, Postman, or your programming language)

## Step 1: Test Your API Key

Verify your API key works by listing cooperatives:

```bash
curl -X GET "https://api.copa.rw/api/v1/cooperatives" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Expected Response:**

```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "code": "COOP001",
    "name": "Koperative y'Abahinzi",
    "province": "Kigali",
    "district": "Gasabo",
    "sector": "Kimironko",
    "cell": "Kibagabaga",
    "activity": "Agriculture",
    "member_count": 150,
    "created_at": "2024-01-15T10:30:00Z"
  }
]
```

## Step 2: Get a Specific Cooperative

```bash
curl -X GET "https://api.copa.rw/api/v1/cooperatives/550e8400-e29b-41d4-a716-446655440000" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Step 3: List Cooperative Members

```bash
curl -X GET "https://api.copa.rw/api/v1/cooperatives/550e8400-e29b-41d4-a716-446655440000/members" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Expected Response:**

```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "member_code": "MEM001",
    "full_name": "Jean Uwimana",
    "identity_card": "1199880012345678",
    "mobile": "0788123456",
    "gender": "Male",
    "status": "Active",
    "cooperative": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Koperative y'Abahinzi",
      "code": "COOP001"
    }
  }
]
```

## Code Examples

### Python

```python
import requests

API_KEY = "sk_copa_partner_your_api_key"
BASE_URL = "https://api.copa.rw/api/v1"

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

# List cooperatives
response = requests.get(f"{BASE_URL}/cooperatives", headers=headers)
cooperatives = response.json()

for coop in cooperatives:
    print(f"{coop['name']} - {coop['member_count']} members")
```

### JavaScript (Node.js)

```javascript
const API_KEY = "sk_copa_partner_your_api_key";
const BASE_URL = "https://api.copa.rw/api/v1";

const response = await fetch(`${BASE_URL}/cooperatives`, {
  headers: {
    "Authorization": `Bearer ${API_KEY}`,
    "Content-Type": "application/json"
  }
});

const cooperatives = await response.json();
console.log(cooperatives);
```

### PHP

```php
<?php
$apiKey = "sk_copa_partner_your_api_key";
$baseUrl = "https://api.copa.rw/api/v1";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "$baseUrl/cooperatives");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer $apiKey",
    "Content-Type: application/json"
]);

$response = curl_exec($ch);
$cooperatives = json_decode($response, true);
curl_close($ch);

print_r($cooperatives);
?>
```

## Next Steps

- [API Overview](/api/overview) — Full API reference
- [Cooperatives API](/api/cooperatives) — Cooperative endpoints
- [Members API](/api/members) — Member endpoints
