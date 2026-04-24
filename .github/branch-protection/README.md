# Branch protection — config as code

One JSON file describes the protection ruleset applied to this repo's
protected branch. The file is the source of truth; the live GitHub settings
are downstream.

## Why this exists

Protection was previously live-only — configured via the GitHub UI or a
one-shot `gh api` call, with no record of intent checked into the repo.
Checked-in JSON gives us two things missing:

1. **Audit.** `git log` shows who changed which rule when.
2. **Reproducibility.** Re-standing up a fork or recovering from a bad
   toggle doesn't require memory; it's just `./scripts/apply-branch-protection.sh`.

## Rules

| Rule | `main` |
|---|---|
| Require pull request to merge | yes |
| Required approving reviews | 0 |
| Required status checks | none (layer in per-repo when CI job names are stable) |
| Require conversation resolution | yes |
| **Enforce on admins** | **yes** |
| Allow force pushes | no |
| Allow deletions | no |

Automated review (CodeRabbit / claude-review if configured) still runs on
every PR. Admins use the PR flow like everyone else. The rule "no force
push, no delete" is the single most valuable guardrail — it prevents
catastrophic history loss regardless of role.

## Applying

```
./scripts/apply-branch-protection.sh
```

Requires `gh auth login` as someone with admin on the repo.

## Changing a rule

1. Edit the JSON
2. Open a PR
3. Merge (CI must pass)
4. Run `./scripts/apply-branch-protection.sh`
5. Verify: `gh api repos/OWNER/REPO/branches/main/protection`

Applying is deliberately manual — auto-applying on push risks silently
weakening protection if a bad config slips through review.
