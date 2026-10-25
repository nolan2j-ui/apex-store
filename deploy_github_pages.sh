#!/usr/bin/env bash
set -euo pipefail
# 1-Click Live Hosting Deploy Script for Apex Hybrid & Recovery Supply (nolan2j-ui.github.io/apex-store)
cd /workspace/store/apex_hybrid_and_dropship_store
if [ ! -d .git ]; then
  git init
  git branch -M main
fi
touch .nojekyll
git add -A
git commit -m "Deploy Apex Hybrid & Recovery Supply 30-SKU Storefront + 5 SEO Buyer Guides" || true
if ! git remote | grep -q origin; then
  gh repo create nolan2j-ui/apex-store --public --source=. --remote=origin --push
else
  git push -u origin main
fi
gh api -X POST repos/nolan2j-ui/apex-store/pages -f build_type=legacy -f 'source[branch]=main' -f 'source[path]=/' || true
echo "Live at: https://nolan2j-ui.github.io/apex-store/"
