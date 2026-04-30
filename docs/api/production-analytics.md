---
sidebar_position: 5
title: Production analytics
---

# Production analytics

Aggregated production summary for a cooperative inside a date window — totals, monthly trend, and per-product breakdown.

## Get cooperative production analytics

<span class="api-method api-method--get">GET</span> `/cooperatives/{coop_id}/production-analytics/`

**Required scope:** `analytics:read`.

### Request

```bash
curl -X GET \
  "https://api.copa.rw/api/v1/cooperatives/73mcoo8tg/production-analytics/?from=2025-01-01&to=2026-04-30" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Path parameters

| Parameter | Type | Description |
|---|---|---|
| `coop_id` | string | Cooperative ID. |

### Query parameters

| Parameter | Type | Description |
|---|---|---|
| `from` | string | Start date (ISO `YYYY-MM-DD`). Defaults to 365 days ago. |
| `to` | string | End date. Defaults to now. |

### Response

```json
{
  "cooperative_id": "73mcoo8tg",
  "window": { "from": "2025-01-01", "to": "2026-04-30" },
  "totals": {
    "total_entries": 60,
    "total_quantity": "2154.814",
    "total_value": "838913.025",
    "active_members": 14,
    "registered_members": 1411,
    "participation_rate": 0.99
  },
  "monthly_trend": [
    { "month": "2026-01-01", "quantity": "264.185", "value": "100330.30", "entries": 12 },
    { "month": "2026-02-01", "quantity": "125.465", "value":  "47746.70", "entries":  5 },
    { "month": "2026-03-01", "quantity": "868.000", "value": "343900.00", "entries": 14 },
    { "month": "2026-04-01", "quantity": "897.164", "value": "346936.025","entries": 29 }
  ],
  "by_product": [
    {
      "product_id": "3hkfckqc6",
      "product_name": "Amata",
      "quantity": "1850.500",
      "value": "740200.00",
      "entries": 45
    }
  ]
}
```

### Top-level fields

| Field | Type | Notes |
|---|---|---|
| `cooperative_id` | string | Echoed from the path. |
| `window.from` / `window.to` | date | Resolved window after defaults are applied. |
| `totals` | object | Aggregates over the window. |
| `monthly_trend` | array | One bucket per calendar month, sorted ascending. |
| `by_product` | array | Sorted descending by `quantity`. |

### Totals

| Field | Type | Notes |
|---|---|---|
| `total_entries` | integer | Count of `entry_type=PRODUCTION` rows. |
| `total_quantity` | decimal string | Sum of kg. |
| `total_value` | decimal string | Sum of `quantity × unit_cost` in RWF. |
| `active_members` | integer | Distinct members who delivered in the window. |
| `registered_members` | integer | Active member roster size. |
| `participation_rate` | float | `active_members ÷ registered_members × 100`, rounded to 2dp. |

### Errors

| Status | Description |
|---|---|
| `400` | Invalid date format, or `to` &lt; `from`. |
| `403` | Key does not have `analytics:read`. |
| `404` | Cooperative not found. |
