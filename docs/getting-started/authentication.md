---
sidebar_position: 2
title: Authentication
---

# Authentication

The COPA API uses API keys to authenticate requests. Each API key has specific scopes that determine what data it can access.

## Getting an API Key

To obtain an API key:

1. Contact the COPA team at [partners@copa.rw](mailto:partners@copa.rw)
2. Provide your organization details and use case
3. Receive your API key with appropriate scopes

## API Key Format

API keys follow this format:

```
sk_copa_{type}_{32_random_characters}
```

**Example:** `sk_copa_partner_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`

### Key Types

| Type | Description |
|------|-------------|
| `partner` | Partner integrations (banks, government) |
| `webhook` | Webhook integrations |
| `mobile` | Mobile application access |
| `system` | System-to-system integrations |

## Using Your API Key

You can authenticate using either method:

### Option 1: Authorization Header (Recommended)

```bash
curl -X GET "https://api.copa.rw/api/v1/cooperatives" \
  -H "Authorization: Bearer sk_copa_partner_your_api_key"
```

### Option 2: X-API-Key Header

```bash
curl -X GET "https://api.copa.rw/api/v1/cooperatives" \
  -H "X-API-Key: sk_copa_partner_your_api_key"
```

## Scopes

API keys are granted specific scopes that control access. Each endpoint requires a specific scope — if your key doesn't have it, you'll get a `403 Forbidden` error.

| Scope | Permission |
|-------|------------|
| `cooperatives:read` | Read cooperative data |
| `cooperatives:write` | Create/update cooperatives |
| `members:read` | Read member data |
| `members:write` | Create/update members |
| `loans:read` | Read loan data |
| `loans:write` | Create/update loans |
| `payments:read` | Read payment data |
| `payments:write` | Create/update payments |
| `webhooks:receive` | Receive webhook events |

:::info
Most partner integrations only need `cooperatives:read` and `members:read` scopes.
:::

For detailed information about how permissions work, see [Permissions & Scopes](/getting-started/permissions).

## Security Best Practices

1. **Keep keys secret** — Never expose API keys in client-side code or public repositories
2. **Use environment variables** — Store keys in environment variables, not in code
3. **Rotate regularly** — Request new keys periodically
4. **Use minimal scopes** — Only request scopes you actually need

## Authentication Errors

| Status | Error | Description |
|--------|-------|-------------|
| `401` | Invalid API key | The API key is invalid or inactive |
| `403` | Insufficient scope | The API key lacks required scope |

**Example error response:**

```json
{
  "detail": "Invalid API key"
}
```

## Next Steps

- [Permissions & Scopes](/getting-started/permissions) — Understand scope requirements
- [Quickstart](/getting-started/quickstart) — Make your first API call
