---
sidebar_position: 2
title: Authentication
---

# Authentication

The COPA API uses hashed-storage API keys to authenticate requests. Each key is granted a specific set of scopes that determine which endpoints it can call and what fields appear in responses.

## Getting an API Key

API keys are issued from the COPA staff portal — there is no self-service signup.

1. Contact the COPA team at [partners@copa.rw](mailto:partners@copa.rw) with your organization name, contact email, and the data you need to access.
2. The team mints a key from the staff portal's **API Consumers** page (or the equivalent CLI command).
3. The raw key is delivered to your contact email exactly once. The COPA database stores only a SHA-256 hash — **the raw key cannot be recovered**. If you lose it, the team will rotate (which invalidates the old value and emails you a new one).

## API Key Format

```
sk_copa_{type}_{32_random_characters}
```

**Example:** `sk_copa_partner_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`

### Key Types

| Type | Used for |
|------|----------|
| `partner` | Bank / regulator / NGO integrations (most common) |
| `webhook` | Inbound webhook receivers |
| `mobile` | Mobile application backends |
| `system` | Internal system-to-system jobs |

## Using Your API Key

Both header forms work; the Authorization header is recommended.

### Option 1: Authorization header (recommended)

```bash
curl -X GET "https://api.copa.rw/api/v1/cooperatives/" \
  -H "Authorization: Bearer sk_copa_partner_your_api_key"
```

### Option 2: X-API-Key header

```bash
curl -X GET "https://api.copa.rw/api/v1/cooperatives/" \
  -H "X-API-Key: sk_copa_partner_your_api_key"
```

## Scopes

API keys carry an explicit list of scopes. Each endpoint requires one or more scopes — if your key lacks the required scope, the request returns `403 Forbidden`. Some scopes also unlock optional fields on responses.

| Scope | Grants access to |
|---|---|
| `cooperatives:read` | `GET /cooperatives/`, `GET /cooperatives/{id}/` |
| `members:read` | `GET /members/{nid}/`, `GET /cooperatives/{id}/members/{nid}/`, `GET /members/?identity_card=…` |
| `members:financials` | Adds `production_summary`, `loan_history`, `savings_summary` blocks to member responses |
| `production:read` | `GET /stock-entries/` |
| `analytics:read` | `GET /cooperatives/{id}/production-analytics/` |
| `financials:read` | `GET /financials/dashboard/`, `GET /financials/balance-sheet/` |

:::info
A key with `members:read` only sees identity, role, and cooperative on member endpoints. Add `members:financials` to populate the financial blocks. The two are independent so we can issue identity-only keys for KYC integrations.
:::

For deeper detail on what each scope unlocks, see [Permissions & Scopes](/getting-started/permissions).

## Lifecycle

| Action | Effect |
|---|---|
| **Issue** | Raw key emailed to your contact email; hash persisted in COPA. |
| **Rotate** | A new raw key is generated and emailed; the old key stops authenticating immediately. Use this if the old key was lost or possibly leaked. |
| **Revoke** | The key is invalidated permanently. Future requests return `401 Invalid API key`. The audit row stays in COPA for compliance. |
| **Expire** | Keys can have an `expires_at`. After that date, requests return `401 API key expired`. Default expiry is 90 days; ask the team if you need a different window. |

## Security best practices

1. Treat the raw key like a password. Store it in a secrets manager / `.env` (server-side only) — never in a public repo, mobile app bundle, or front-end code.
2. Use environment variables in your application; do not hard-code the key.
3. Use the **smallest scope set** that does the job. A KYC-only integration probably only needs `members:read`.
4. Rotate the key on a schedule (we'll honour any rotation request the same day).
5. If you suspect a leak, ask for an immediate rotation. The old key can be invalidated within minutes.

## Authentication errors

| Status | Body | Cause |
|---|---|---|
| `401` | `{"detail": "Invalid API key"}` | Bearer key not recognised, inactive, or revoked. |
| `401` | `{"detail": "API key expired"}` | The key was past its `expires_at`. |
| `403` | `{"detail": "Permission denied"}` | The key authenticates but lacks the scope this endpoint requires. |

:::note
Revoked and inactive keys return the same `401 Invalid API key` response as keys we never issued — we don't disclose whether a specific key once existed.
:::

## Next steps

- [Permissions & Scopes](/getting-started/permissions) — exact scope-to-endpoint matrix
- [Quickstart](/getting-started/quickstart) — make your first call
