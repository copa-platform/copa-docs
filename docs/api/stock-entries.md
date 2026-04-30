---
sidebar_position: 4
title: Stock entries
---

# Stock entries

Paginated production-record log for cooperative deliveries. Each entry links to a member, a product, and a cooperative, and carries `quantity` (kg), `unit_cost`, plus a server-computed `estimated_value` (`quantity × unit_cost`).

## List stock entries

<span class="api-method api-method--get">GET</span> `/stock-entries/`

**Required scope:** `production:read`.

### Request

```bash
curl -X GET \
  "https://api.copa.rw/api/v1/stock-entries/?cooperative_id=73mcoo8tg&from=2026-01-01&to=2026-04-30&page_size=50" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Query parameters

| Parameter | Type | Description |
|---|---|---|
| `cooperative_id` | string | Optional. Filter to one cooperative. Omit to query system-wide. |
| `member_identity_card` | string | Optional. Filter to one member's deliveries. |
| `entry_type` | string | Optional. One of `PRODUCTION`, `PURCHASE`, `ADJUSTMENT`, `RETURN`, `OPENING_BALANCE`. |
| `from` | string | Start date (ISO `YYYY-MM-DD`). Defaults to 30 days ago. |
| `to` | string | End date (ISO `YYYY-MM-DD`). Defaults to now. |
| `page` | integer | Page number (1-indexed). |
| `page_size` | integer | Items per page. Default 50, max 200. |

:::caution Window cap
The endpoint enforces a **90-day window cap**. Requests with a wider `from`/`to` range are rejected with `400`. Paginate or narrow the range for longer histories.
:::

### Response

```json
{
  "count": 66,
  "next": "https://api.copa.rw/api/v1/stock-entries/?cooperative_id=73mcoo8tg&from=2026-04-01&page=2&page_size=50&to=2026-04-30",
  "previous": null,
  "results": [
    {
      "id": "48vfmtigw",
      "entry_type": "PRODUCTION",
      "entry_date": "2026-04-29T20:20:01.415218+02:00",
      "quantity": "123.000",
      "unit_cost": "400.00",
      "estimated_value": "49200.00",
      "product": { "id": "3hkfckqc6", "name": "Amata" },
      "member": {
        "id": "...",
        "identity_card": "1199680022162201",
        "member_code": "054",
        "full_name": "MUKUNDIREHE EZECHIEL"
      },
      "cooperative": { "id": "73mcoo8tg", "code": "122", "name": "COOP THE Test" }
    }
  ]
}
```

### Fields

| Field | Type | Notes |
|---|---|---|
| `entry_type` | string | One of the values listed above. |
| `entry_date` | datetime | When the produce was recorded. |
| `quantity` | decimal string | Net kg (or units of the product's `unit_of_measure`). |
| `unit_cost` | decimal string \| null | RWF per unit at the time of recording. |
| `estimated_value` | decimal string \| null | `quantity × unit_cost`. Null if either input is missing. |
| `product` | object | `{id, name}`. |
| `member` | object \| null | `{id, identity_card, member_code, full_name}`. Null for non-PRODUCTION entries. |
| `cooperative` | object | `{id, code, name}`. |

### Errors

| Status | Description |
|---|---|
| `400` | Invalid date format or window exceeds the 90-day cap. |
| `403` | Key does not have `production:read`. |
