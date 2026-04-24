#!/usr/bin/env bash
#
# Apply the checked-in branch-protection configs to the long-lived branches.
# Source of truth: .github/branch-protection/<branch>.json
#
# Requires `gh auth login` with an account that has admin on the repo.
# Re-applies the exact ruleset every time — safe to run repeatedly.

set -euo pipefail

REPO="${REPO:-copa-platform/copa-docs}"
BRANCHES=(main)

cd "$(dirname "$0")/.."

for branch in "${BRANCHES[@]}"; do
    config=".github/branch-protection/${branch}.json"
    if [[ ! -f "$config" ]]; then
        echo "SKIP: $branch — no config at $config"
        continue
    fi
    echo "==> applying $config to $REPO:$branch"
    gh api --method PUT \
        "repos/${REPO}/branches/${branch}/protection" \
        --input "$config" > /dev/null
    echo "    ok"
done

echo
echo "done. verify with:"
echo "  gh api repos/${REPO}/branches/<branch>/protection | jq '{enforce_admins, required_pull_request_reviews, allow_force_pushes, allow_deletions}'"
