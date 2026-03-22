---
sidebar_position: 2
title: Cooperatives
---

# Cooperatives API

Access cooperative organization data.

## The Cooperative Object

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "code": "COOP001",
  "name": "Koperative y'Abahinzi",
  "province": "Kigali",
  "district": "Gasabo",
  "sector": "Kimironko",
  "cell": "Kibagabaga",
  "activity": "Agriculture",
  "programme": "NAEB",
  "member_count": 150,
  "created_at": "2024-01-15T10:30:00Z"
}
```

### Attributes

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier (UUID) |
| `code` | string | Cooperative code |
| `name` | string | Cooperative name |
| `province` | string | Province location |
| `district` | string | District location |
| `sector` | string | Sector location |
| `cell` | string | Cell location |
| `activity` | string | Primary activity/sector |
| `programme` | string | Associated programme |
| `member_count` | integer | Number of active members |
| `created_at` | datetime | Creation timestamp |

---

## List Cooperatives

<span class="api-method api-method--get">GET</span> `/cooperatives`

Returns a list of all cooperatives.

**Required Scope:** `cooperatives:read`

### Request

```bash
curl -X GET "https://api.copa.rw/api/v1/cooperatives" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `province` | string | Filter by province |
| `district` | string | Filter by district |
| `sector` | string | Filter by sector |
| `activity` | string | Filter by activity |
| `page` | integer | Page number |
| `page_size` | integer | Items per page |

### Response

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
    "programme": "NAEB",
    "member_count": 150,
    "created_at": "2024-01-15T10:30:00Z"
  },
  {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "code": "COOP002",
    "name": "Twungubumwe",
    "province": "Eastern",
    "district": "Rwamagana",
    "sector": "Muhazi",
    "cell": "Cyanya",
    "activity": "Fishing",
    "programme": null,
    "member_count": 85,
    "created_at": "2024-02-20T14:00:00Z"
  }
]
```

---

## Get Cooperative

<span class="api-method api-method--get">GET</span> `/cooperatives/{id}`

Returns a single cooperative by ID.

**Required Scope:** `cooperatives:read`

### Request

```bash
curl -X GET "https://api.copa.rw/api/v1/cooperatives/550e8400-e29b-41d4-a716-446655440000" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Cooperative UUID |

### Response

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "code": "COOP001",
  "name": "Koperative y'Abahinzi",
  "province": "Kigali",
  "district": "Gasabo",
  "sector": "Kimironko",
  "cell": "Kibagabaga",
  "activity": "Agriculture",
  "programme": "NAEB",
  "member_count": 150,
  "created_at": "2024-01-15T10:30:00Z"
}
```

### Errors

| Status | Description |
|--------|-------------|
| `404` | Cooperative not found |

---

## List Cooperative Members

<span class="api-method api-method--get">GET</span> `/cooperatives/{id}/members`

Returns all members of a specific cooperative.

**Required Scope:** `members:read`

### Request

```bash
curl -X GET "https://api.copa.rw/api/v1/cooperatives/550e8400-e29b-41d4-a716-446655440000/members" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Cooperative UUID |

### Response

```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "member_code": "MEM001",
    "full_name": "Jean Uwimana",
    "first_name": "Jean",
    "last_name": "Uwimana",
    "identity_card": "1199880012345678",
    "mobile": "0788123456",
    "gender": "Male",
    "role": "Member",
    "status": "Active",
    "registration_date": "2024-01-20T08:00:00Z",
    "created_at": "2024-01-20T08:00:00Z"
  }
]
```
