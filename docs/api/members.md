---
sidebar_position: 3
title: Members
---

# Members API

Access cooperative member data.

## The Member Object

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "member_code": "MEM001",
  "full_name": "Jean Uwimana",
  "first_name": "Jean",
  "last_name": "Uwimana",
  "identity_card": "1199880012345678",
  "mobile": "0788123456",
  "gender": "Male",
  "role": "Member",
  "status": "Active",
  "cooperative": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Koperative y'Abahinzi",
    "code": "COOP001"
  },
  "registration_date": "2024-01-20T08:00:00Z",
  "created_at": "2024-01-20T08:00:00Z"
}
```

### Attributes

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier (UUID) |
| `member_code` | string | Member code within cooperative |
| `full_name` | string | Full name |
| `first_name` | string | First name |
| `last_name` | string | Last name |
| `identity_card` | string | National ID number |
| `mobile` | string | Phone number |
| `gender` | string | Gender (Male/Female) |
| `role` | string | Role in cooperative |
| `status` | string | Membership status |
| `cooperative` | object | Associated cooperative |
| `registration_date` | datetime | Membership registration date |
| `created_at` | datetime | Record creation timestamp |

### Status Values

| Status | Description |
|--------|-------------|
| `Active` | Active member |
| `Inactive` | Inactive member |
| `Suspended` | Suspended membership |
| `Pending` | Pending approval |

---

## List Members

<span class="api-method api-method--get">GET</span> `/members`

Returns a list of all members across cooperatives.

**Required Scope:** `members:read`

### Request

```bash
curl -X GET "https://api.copa.rw/api/v1/members" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string | Filter by status |
| `gender` | string | Filter by gender |
| `page` | integer | Page number |
| `page_size` | integer | Items per page |

### Response

```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "member_code": "MEM001",
    "full_name": "Jean Uwimana",
    "first_name": "Jean",
    "last_name": "Uwimana",
    "identity_card": "1199880012345678",
    "mobile": "0788123456",
    "gender": "Male",
    "role": "Member",
    "status": "Active",
    "cooperative": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Koperative y'Abahinzi",
      "code": "COOP001"
    },
    "registration_date": "2024-01-20T08:00:00Z",
    "created_at": "2024-01-20T08:00:00Z"
  }
]
```

---

## Get Member

<span class="api-method api-method--get">GET</span> `/members/{id}`

Returns a single member by ID.

**Required Scope:** `members:read`

### Request

```bash
curl -X GET "https://api.copa.rw/api/v1/members/123e4567-e89b-12d3-a456-426614174000" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Member UUID |

### Response

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "member_code": "MEM001",
  "full_name": "Jean Uwimana",
  "first_name": "Jean",
  "last_name": "Uwimana",
  "identity_card": "1199880012345678",
  "mobile": "0788123456",
  "gender": "Male",
  "role": "Member",
  "status": "Active",
  "cooperative": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Koperative y'Abahinzi",
    "code": "COOP001"
  },
  "registration_date": "2024-01-20T08:00:00Z",
  "created_at": "2024-01-20T08:00:00Z"
}
```

### Errors

| Status | Description |
|--------|-------------|
| `404` | Member not found |

---

## Search Members by National ID

To find a member by national ID, filter the members list:

```bash
curl -X GET "https://api.copa.rw/api/v1/members?identity_card=1199880012345678" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

:::tip
This is useful for verifying if a person is a registered cooperative member.
:::
