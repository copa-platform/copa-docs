---
sidebar_position: 6
title: Financials
---

# Financials

Per-cooperative aggregated financial overview and balance sheet.

## Dashboard

<span class="api-method api-method--get">GET</span> `/financials/dashboard/`

Compact overview of revenue, expenses, payouts, and net income for one cooperative within a window.

**Required scope:** `financials:read`.

### Request

```bash
curl -X GET \
  "https://api.copa.rw/api/v1/financials/dashboard/?cooperative_id=73mcoo8tg&from=2026-01-01&to=2026-04-30" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Query parameters

| Parameter | Type | Description |
|---|---|---|
| `cooperative_id` | string | **Required.** |
| `from` | string | Start date (ISO `YYYY-MM-DD`). Default = start of current month. |
| `to` | string | End date. Default = now. Max 5-year window. |

### Response

```json
{
  "cooperative_id": "73mcoo8tg",
  "window": { "from": "2026-01-01", "to": "2026-04-30" },
  "totals": {
    "total_revenue": "22567527.53",
    "total_returns": "22159349.00",
    "net_revenue": "408178.53",
    "total_expenses": "3000.00",
    "member_payouts": "2392172.53",
    "supplier_payouts": "21158405.00",
    "total_payouts": "23550577.53",
    "net_income": "-23145399.00",
    "profit_margin_pct": -5670.41
  },
  "currency": "RWF"
}
```

### Totals

| Field | Type | Notes |
|---|---|---|
| `total_revenue` | decimal string | Sum of `SaleTransaction.total_amount` (status `COMPLETED`). |
| `total_returns` | decimal string | Sum of `SalesReturn.refund_amount` (status `PROCESSED` or `REFUNDED`). |
| `net_revenue` | decimal string | `total_revenue − total_returns`. |
| `total_expenses` | decimal string | Sum of `MemberExpense.amount` (status `APPROVED` or `APPLIED_TO_PAYOUT`). |
| `member_payouts` | decimal string | Sum of `MemberPayout.final_payout_amount` for periods inside the window. |
| `supplier_payouts` | decimal string | Same shape, on `SupplierPayout`. |
| `total_payouts` | decimal string | `member_payouts + supplier_payouts`. |
| `net_income` | decimal string | `net_revenue − total_expenses − total_payouts`. |
| `profit_margin_pct` | float | `net_income ÷ net_revenue × 100`, rounded to 2dp. Returns `0.0` when `net_revenue ≤ 0`. |
| `currency` | string | Always `RWF`. |

:::info
Period-over-period growth (revenue / expense growth) is **not** included in this v1 endpoint. Compute it client-side by querying two consecutive windows.
:::

### Errors

| Status | Description |
|---|---|
| `400` | Missing `cooperative_id`, invalid date, or `to` &lt; `from`. |
| `403` | Key does not have `financials:read`. |
| `404` | Cooperative not found. |

---

## Balance sheet

<span class="api-method api-method--get">GET</span> `/financials/balance-sheet/`

Assets / liabilities / equity at a specific date.

**Required scope:** `financials:read`.

### Request

```bash
curl -X GET \
  "https://api.copa.rw/api/v1/financials/balance-sheet/?cooperative_id=73mcoo8tg&as_of=2026-04-30" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Query parameters

| Parameter | Type | Description |
|---|---|---|
| `cooperative_id` | string | **Required.** |
| `as_of` | string | ISO date the snapshot should reflect. Defaults to now. |

### Response

```json
{
  "cooperative_id": "73mcoo8tg",
  "as_of_date": "2026-04-30",
  "currency": "RWF",
  "assets": {
    "current_assets": {
      "cash": 0.0,
      "inventory": 45788569.325,
      "loans_receivable": 650000.0
    },
    "total_assets": 46438569.325
  },
  "liabilities": {
    "member_equity": 3460.0
  },
  "equity": {
    "retained_earnings": -3460.0
  }
}
```

### Field semantics

| Field | Source |
|---|---|
| `assets.current_assets.cash` | Sum of `MoMoCollection.amount` where `status = SUCCESSFUL`. |
| `assets.current_assets.inventory` | Sum of `quantity × unit_cost` over all active StockEntry rows for the cooperative. |
| `assets.current_assets.loans_receivable` | Sum of `Loan.amount` where `status = approved` and not soft-deleted. |
| `assets.total_assets` | Sum of the three current-asset lines. |
| `liabilities.member_equity` | Sum of `Member.total_shares` for active members. |
| `equity.retained_earnings` | `cash − member_equity`. |

### Errors

| Status | Description |
|---|---|
| `400` | Missing `cooperative_id`, invalid `as_of` date, or the underlying calculation failed. |
| `403` | Key does not have `financials:read`. |
| `404` | Cooperative not found. |
