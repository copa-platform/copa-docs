---
sidebar_position: 3
title: Changelog
---

# Changelog

All notable changes to the COPA API.

## API Versioning

The API uses URL-based versioning:

```
https://api.copa.rw/api/v1/
```

We maintain backwards compatibility within major versions.

---

## v1.0.0 (March 2025)

**Initial Release**

### Endpoints

- `GET /cooperatives` — List all cooperatives
- `GET /cooperatives/{id}` — Get cooperative by ID
- `GET /cooperatives/{id}/members` — List cooperative members
- `GET /members` — List all members
- `GET /members/{id}` — Get member by ID

### Features

- API Key authentication with scopes
- Rate limiting (1,000/hour, 10,000/day)
- JSON response format
- Pagination support

### Scopes

- `cooperatives:read`
- `cooperatives:write`
- `members:read`
- `members:write`
- `loans:read`
- `loans:write`
- `payments:read`
- `payments:write`

---

## Upcoming

### Planned Features

- Webhook notifications for data changes
- Loan data endpoints
- Payment transaction endpoints
- Bulk data export

### Deprecation Policy

When we deprecate features:

1. We announce 6 months in advance
2. Deprecated features continue working
3. We provide migration guides
4. We remove after deprecation period

---

## Subscribe to Updates

Stay informed about API changes:

- Email: [api-updates@copa.rw](mailto:api-updates@copa.rw)
- Status page: [status.copa.rw](https://status.copa.rw)
