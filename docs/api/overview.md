---
sidebar_position: 1
title: Overview
---

# API Overview

The COPA REST API provides access to cooperative and member data.

## Base URL

```
https://api.copa.rw/api/v1/
```

## Available Endpoints

| Method | Endpoint | Description | Scope |
|--------|----------|-------------|-------|
| `GET` | `/cooperatives` | List all cooperatives | `cooperatives:read` |
| `GET` | `/cooperatives/{id}` | Get cooperative by ID | `cooperatives:read` |
| `GET` | `/cooperatives/{id}/members` | List cooperative members | `members:read` |
| `GET` | `/members` | List all members | `members:read` |
| `GET` | `/members/{id}` | Get member by ID | `members:read` |

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Authorization` | Yes | `Bearer {api_key}` |
| `Content-Type` | Yes | `application/json` |
| `Accept` | No | `application/json` |

## Pagination

List endpoints support pagination:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `page_size` | integer | 20 | Items per page (max 100) |

**Example:**

```bash
GET /api/v1/cooperatives?page=2&page_size=50
```

## Filtering

Some endpoints support filtering:

```bash
# Filter cooperatives by district
GET /api/v1/cooperatives?district=Gasabo

# Filter members by status
GET /api/v1/members?status=Active
```

## Response Format

### Success Response

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "code": "COOP001",
  "name": "Koperative y'Abahinzi",
  "created_at": "2024-01-15T10:30:00Z"
}
```

### List Response

```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "code": "COOP001",
    "name": "Koperative y'Abahinzi"
  },
  {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "code": "COOP002",
    "name": "Twungubumwe"
  }
]
```

### Error Response

```json
{
  "detail": "Not found."
}
```

## HTTP Status Codes

| Code | Description |
|------|-------------|
| `200` | Success |
| `401` | Unauthorized — Invalid API key |
| `403` | Forbidden — Insufficient scope |
| `404` | Not Found — Resource doesn't exist |
| `429` | Too Many Requests — Rate limit exceeded |
| `500` | Internal Server Error |

## Date Formats

All dates use ISO 8601 format:

```
2024-01-15T10:30:00Z
```
