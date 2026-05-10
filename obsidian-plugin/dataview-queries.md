# MetisOS Memory Dashboard

> Requires [Dataview](https://github.com/blacksmithgu/obsidian-dataview) plugin.

## All Facts by Confidence

```dataview
TABLE category, confidence, extracted
FROM "MetisOS/Memory"
SORT confidence DESC
```

## Identity Facts

```dataview
TABLE content AS "Fact", confidence AS "Confidence"
FROM "MetisOS/Memory/identity"
```

## Recent Sessions

```dataview
TABLE file.cday AS "Date"
FROM "MetisOS/Sessions"
SORT file.cday DESC
LIMIT 10
```

## Unlinked Facts (orphans)

```dataview
LIST
FROM "MetisOS/Memory"
WHERE length(file.outlinks) = 0
```
