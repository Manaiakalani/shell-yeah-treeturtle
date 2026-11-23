#!/usr/bin/env bash
# Syntax-check every JavaScript file with node --check.
set -euo pipefail

cd "$(dirname "$0")/.."

found=0
while IFS= read -r -d '' file; do
  found=1
  echo "node --check ${file}"
  node --check "${file}"
done < <(find . -name '*.js' -not -path '*/node_modules/*' -not -path './.git/*' -print0)

if [[ "${found}" -eq 0 ]]; then
  echo "No JavaScript files found" >&2
  exit 1
fi
