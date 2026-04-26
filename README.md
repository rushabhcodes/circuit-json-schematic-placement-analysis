# circuit-json-schematic-placement-analysis

Analyze `circuit-json` schematic placement and report schematic box positions.

This is intended for placement-focused diagnostics. The first version only emits
`<SchematicBoxPlacement />` rows inside `<SchematicBoxPositions>`, while future
versions can add placement issue nodes such as `<SchematicPlacementIssues>`,
`<SchematicBoxOverlap />`, and related checks.

## Install

```sh
bun add @tscircuit/circuit-json-schematic-placement-analysis
```

## Minimal Usage

```ts
import { analyzeSchematicPlacement } from "@tscircuit/circuit-json-schematic-placement-analysis"

const analysis = analyzeSchematicPlacement(circuitJson)

console.log(analysis.getLineItems())
console.log(analysis.toString())
```

## Sample Output

```xml
<SchematicBoxPositions>
<SchematicBoxPlacement positionAnchor="center" schX="10" schY="-3.125" width="2.5" height="1.25" />
</SchematicBoxPositions>
```

## Test

```sh
bun test
```
