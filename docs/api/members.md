---
sidebar_position: 3
title: Members
---

# Members API

Look up cooperative members by **National ID** (NID). The same person can legitimately belong to more than one cooperative — for example, a coffee coop and a savings coop — so the canonical member endpoint returns one consolidated record per NID with a `memberships[]` array.

## Get member by NID (aggregate)

<span class="api-method api-method--get">GET</span> `/members/{nid}/`

Returns every cooperative the NID belongs to, plus optional financial blocks per membership.

**Required scope:** `members:read`. Add `members:financials` to populate `production_summary`, `loan_history`, and `savings_summary` (otherwise those fields are returned as `null`).

### Request

```bash
curl -X GET "https://api.copa.rw/api/v1/members/{NID_PLACEHOLDER}/" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Path parameters

| Parameter | Type | Description |
|---|---|---|
| `nid` | string | Rwandan national ID (16 digits). |

### Response

```json
{
  "identity_card": "NID_PLACEHOLDER",
  "primary_full_name": "FULL_NAME_PLACEHOLDER",
  "name_variants": ["NAME_VARIANT_1"],
  "gender": "Male",
  "date_of_birth": "YYYY-MM-DD",
  "mobile": "PHONE_PLACEHOLDER",
  "memberships": [
    {
      "cooperative": { "id": "COOP_ID_PLACEHOLDER", "code": "COOP_CODE_1", "name": "Cooperative One" },
      "member_code": "MEMBER_CODE_PLACEHOLDER",
      "full_name": "FULL_NAME_PLACEHOLDER",
      "first_name": "FIRST_NAME_PLACEHOLDER",
      "last_name": "LAST_NAME_PLACEHOLDER",
      "role": "MEMBER",
      "status": "active",
      "registration_date": "YYYY-MM-DDTHH:MM:SS+00:00",
      "mobile": "PHONE_PLACEHOLDER",
      "production_summary": {
        "window_days": 365,
        "entries_count": 42,
        "total_kg": "1180.500",
        "last_delivery_at": "YYYY-MM-DDTHH:MM:SS+00:00"
      },
      "loan_history": [
        {
          "id": "LOAN_ID_PLACEHOLDER",
          "amount": "50000.00",
          "interest_rate": "5.00",
          "status": "approved",
          "paid_amount": "20000.00",
          "loan_start_date": "YYYY-MM-DDTHH:MM:SS+00:00",
          "loan_end_date": "YYYY-MM-DDTHH:MM:SS+00:00",
          "approved_at": "YYYY-MM-DDTHH:MM:SS+00:00"
        }
      ],
      "savings_summary": {
        "accounts_count": 1,
        "total_contributions_rwf": "75000.00",
        "total_withdrawals_rwf": "0.00",
        "last_transaction_at": "YYYY-MM-DDTHH:MM:SS+00:00"
      }
    },
    {
      "cooperative": { "id": "COOP_ID_PLACEHOLDER_2", "code": "COOP_CODE_2", "name": "Cooperative Two" },
      "member_code": "MEMBER_CODE_PLACEHOLDER_2",
      "role": "MEMBER",
      "status": "active",
      "production_summary": null,
      "loan_history": null,
      "savings_summary": null
    }
  ]
}
```

### Top-level fields

| Field | Type | Description |
|---|---|---|
| `identity_card` | string | The NID you queried. |
| `primary_full_name` | string | Name from the most recent registration. |
| `name_variants` | array&lt;string&gt; | All distinct full-name spellings across coops. Useful for flagging mismatches. |
| `gender`, `date_of_birth`, `mobile` | string \| null | Best-effort across memberships. |
| `memberships` | array | One entry per cooperative the NID belongs to. |

### Membership fields

| Field | Type | Notes |
|---|---|---|
| `cooperative` | object | `{id, code, name}` |
| `member_code` | string | The cooperative's own code for the member. |
| `role`, `status`, `registration_date` | varies | |
| `production_summary` | object \| null | Last-365-days `entries_count`, `total_kg`, `last_delivery_at`. **Requires `members:financials`**. |
| `loan_history` | array \| null | Latest 10 loans with `paid_amount`. **Requires `members:financials`**. |
| `savings_summary` | object \| null | `accounts_count`, total contributions / withdrawals, last transaction date. **Requires `members:financials`**. |

### Errors

| Status | Description |
|---|---|
| `404` | No active membership found for that NID anywhere in the system. |

---

## Get member in a specific cooperative

<span class="api-method api-method--get">GET</span> `/cooperatives/{coop_id}/members/{nid}/`

Returns a single canonical membership when you already know which cooperative you're querying. Useful for partners that only service one coop and don't need the cross-coop view.

**Required scope:** `members:read`. `members:financials` unlocks the production / loans / savings blocks.

### Request

```bash
curl -X GET "https://api.copa.rw/api/v1/cooperatives/{COOP_ID_PLACEHOLDER}/members/{NID_PLACEHOLDER}/" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Response

The response is the **single membership object** described above (cooperative, member_code, role, status, financial blocks). Same field semantics as a single entry of `memberships[]` in the aggregate endpoint.

### Errors

| Status | Description |
|---|---|
| `404` | No active membership for that NID inside the supplied cooperative. |

---

## List members filtered by NID

<span class="api-method api-method--get">GET</span> `/members/?identity_card={nid}`

Pre-aggregation list view that returns one row per `(NID × cooperative)`. Use the [aggregate endpoint](#get-member-by-nid-aggregate) above when you want the consolidated record.

**Required scope:** `members:read`.

### Request

```bash
curl -X GET "https://api.copa.rw/api/v1/members/?identity_card={NID_PLACEHOLDER}" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Query parameters

| Parameter | Type | Description |
|---|---|---|
| `identity_card` | string | Filter by NID. Optional but recommended — without it the endpoint returns every member, paginated. |
| `page` | integer | Page number. |
| `page_size` | integer | Items per page. |

### Response

```json
{
  "count": 2,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": "MEMBER_ID_PLACEHOLDER",
      "member_code": "MEMBER_CODE_PLACEHOLDER",
      "full_name": "FULL_NAME_PLACEHOLDER",
      "identity_card": "NID_PLACEHOLDER",
      "mobile": "PHONE_PLACEHOLDER",
      "gender": "Male",
      "role": "MEMBER",
      "status": "active",
      "cooperative": { "id": "COOP_ID_PLACEHOLDER", "name": "Cooperative One", "code": "COOP_CODE_1" },
      "registration_date": "YYYY-MM-DDTHH:MM:SS+00:00"
    }
  ]
}
```
