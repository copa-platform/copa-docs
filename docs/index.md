---
slug: /
sidebar_position: 1
title: Welcome
---

# COPA API Documentation

Welcome to the COPA API. This REST API enables authorized partners — banks, government agencies, and other organizations — to securely access cooperative and member data from the COPA platform.

## What is COPA?

COPA (Cooperative Platform for Africa) is a comprehensive cooperative management system used by cooperatives across Rwanda. The platform manages:

- **Cooperatives** — Organizations, metadata, and operational data
- **Members** — Individual cooperative members and their profiles
- **Financial Data** — Savings, loans, and payment records
- **Production Data** — Agricultural and business production records

## API Overview

| Feature | Details |
|---------|---------|
| **Base URL** | `https://api.copa.rw/api/v1/` |
| **Authentication** | API Key (Bearer token or X-API-Key header) |
| **Format** | JSON |
| **Rate Limits** | 1,000/hour, 10,000/day (configurable) |

## Available Resources

| Resource | Endpoints | Description |
|----------|-----------|-------------|
| **Cooperatives** | `/cooperatives` | Access cooperative organizations |
| **Members** | `/members` | Access cooperative member data |

## Quick Example

```bash
curl -X GET "https://api.copa.rw/api/v1/cooperatives" \
  -H "Authorization: Bearer sk_copa_partner_your_api_key"
```

## Getting Started

1. [Introduction](/getting-started/introduction) — Learn about the API
2. [Authentication](/getting-started/authentication) — Get your API key
3. [Quickstart](/getting-started/quickstart) — Make your first API call

## Support

- **Technical Support:** [api-support@copa.rw](mailto:api-support@copa.rw)
- **Partnership Inquiries:** [partners@copa.rw](mailto:partners@copa.rw)
