---
sidebar_position: 3
title: Permissions & Scopes
---

# Permissions & Scopes

The COPA API uses a scope-based permission system. Each API key is granted specific scopes that control what data it can access.

## How Permissions Work

```
Request → Authentication → Scope Check → Rate Limiting → Response
              ↓                ↓
         Valid API key?   Has required scope?
              ↓                ↓
         401 Unauthorized  403 Forbidden
```

Every endpoint requires a specific scope. If your API key doesn't have the required scope, you'll receive a `403 Forbidden` error.

## Available Scopes

| Scope | Permission | Endpoints |
|-------|------------|-----------|
| `cooperatives:read` | Read cooperative data | `GET /cooperatives`, `GET /cooperatives/{id}` |
| `cooperatives:write` | Create/update cooperatives | `POST /cooperatives`, `PUT /cooperatives/{id}` |
| `members:read` | Read member data | `GET /members`, `GET /members/{id}`, `GET /cooperatives/{id}/members` |
| `members:write` | Create/update members | `POST /members`, `PUT /members/{id}` |
| `loans:read` | Read loan data | `GET /loans` (coming soon) |
| `loans:write` | Create/update loans | `POST /loans` (coming soon) |
| `payments:read` | Read payment data | `GET /payments` (coming soon) |
| `payments:write` | Create/update payments | `POST /payments` (coming soon) |
| `webhooks:receive` | Receive webhook events | Webhook endpoints |

## Endpoint Scope Requirements

| Method | Endpoint | Required Scope |
|--------|----------|----------------|
| `GET` | `/cooperatives` | `cooperatives:read` |
| `GET` | `/cooperatives/{id}` | `cooperatives:read` |
| `GET` | `/cooperatives/{id}/members` | `members:read` |
| `GET` | `/members` | `members:read` |
| `GET` | `/members/{id}` | `members:read` |

## Permission Errors

When your API key lacks the required scope:

**HTTP Status:** `403 Forbidden`

**Response:**
```json
{
  "detail": "You do not have permission to perform this action."
}
```

## Example: Scope Enforcement

```bash
# API key with only cooperatives:read scope

# ✅ This works
curl -H "Authorization: Bearer sk_copa_partner_xxx" \
  https://api.copa.rw/api/v1/cooperatives

# ❌ This fails (needs members:read)
curl -H "Authorization: Bearer sk_copa_partner_xxx" \
  https://api.copa.rw/api/v1/members
# Response: {"detail": "You do not have permission to perform this action."}
```

## Requesting Scopes

When requesting an API key, specify which scopes you need:

### Common Use Cases

| Use Case | Recommended Scopes |
|----------|-------------------|
| Read-only integration | `cooperatives:read`, `members:read` |
| Cooperative management | `cooperatives:read`, `cooperatives:write` |
| Member management | `members:read`, `members:write` |
| Full access | All scopes (rarely needed) |

:::tip Best Practice
Request only the scopes you need. This follows the principle of least privilege and improves security.
:::

## Checking Your Scopes

Your API key's scopes are configured when the key is created. To check or modify your scopes, contact the COPA team at [partners@copa.rw](mailto:partners@copa.rw).

## Additional Security Features

Beyond scopes, API keys can have additional restrictions:

| Feature | Description |
|---------|-------------|
| **IP Allowlist** | Restrict API key to specific IP addresses |
| **Host Allowlist** | Restrict API key to specific domains |
| **Rate Limits** | Custom request limits per hour/day |
| **Active/Inactive** | Keys can be disabled instantly |

These restrictions are configured by the COPA team when your API key is created.

## Next Steps

- [Quickstart](/getting-started/quickstart) — Make your first API call
- [Rate Limits](/reference/rate-limits) — Understand request limits
