#!/bin/bash
# HermesOS Self-Model Update Script
# Usage: update_self_model.sh "PATTERN: description" "EVIDENCE: what happened" "FIX: countermeasure"

SELF_MODEL="$HOME/.deepseek/skills/hermes-os/references/SELF_MODEL.md"
TIMESTAMP=$(date "+%Y-%m-%d %H:%M")

PATTERN="$1"
EVIDENCE="$2"
FIX="$3"

if [ -z "$PATTERN" ]; then
    echo "Usage: update_self_model.sh 'PATTERN: desc' 'EVIDENCE: what' 'FIX: countermeasure'"
    exit 1
fi

# Check if file exists
if [ ! -f "$SELF_MODEL" ]; then
    echo "ERROR: SELF_MODEL.md not found at $SELF_MODEL"
    exit 1
fi

# Append new calibration entry
cat >> "$SELF_MODEL" << ENTRY

### Pattern (auto-added ${TIMESTAMP})
**Trigger**: ${PATTERN}
**Evidence**: ${EVIDENCE}
**Countermeasure**: ${FIX}
ENTRY

echo "✓ Self-model updated at ${TIMESTAMP}"
echo "  Pattern: ${PATTERN}"
echo "  Fix: ${FIX}"
