---
sidebar_position: 1
title: Introduction
---

# Introduction

The COPA API provides programmatic access to cooperative and member data for authorized partners. This API is designed for:

- **Government agencies** — Access cooperative data for reporting and compliance
- **Financial institutions** — Verify member information for loan processing
- **Partner organizations** — Integrate cooperative data into your systems

## Key Features

### Secure Access
All API requests require authentication via API keys with specific scopes. Data access is limited to what your API key is authorized to access.

### RESTful Design
The API follows REST conventions with predictable URLs, standard HTTP methods, and JSON responses.

### Rate Limiting
Built-in rate limiting protects the system while providing generous limits for normal operations.

## Base URLs

| Environment | URL |
|-------------|-----|
| **Production** | `https://api.copa.rw/api/v1/` |
| **Staging** | `https://api.staging.copa.rw/api/v1/` |

:::tip
Use the staging environment for development and testing. Contact us to get staging API credentials.
:::

## Request Format

All requests should include:

```http
GET /api/v1/cooperatives HTTP/1.1
Host: api.copa.rw
Authorization: Bearer sk_copa_partner_xxxxx
Content-Type: application/json
Accept: application/json
```

## Response Format

All responses are JSON:

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "code": "COOP001",
  "name": "Koperative y'Abahinzi",
  "created_at": "2024-01-15T10:30:00Z"
}
```

## Next Steps

- [Authentication](/getting-started/authentication) — Learn how to authenticate
- [Quickstart](/getting-started/quickstart) — Make your first API call
