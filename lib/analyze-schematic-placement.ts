import type { CircuitJson, SchematicBox } from "circuit-json"
import type {
  SchematicBoxPlacementLineItem,
  SchematicPlacementLineItem,
} from "./types"

const fmtNumber = (value: number): string => {
  if (Number.isInteger(value)) return String(value)

  return value
    .toFixed(3)
    .replace(/\.0+$/, "")
    .replace(/(\.\d*?)0+$/, "$1")
}

const isSchematicBox = (
  element: CircuitJson[number],
): element is SchematicBox => element.type === "schematic_box"

const schematicBoxToLineItem = (
  schematicBox: SchematicBox,
): SchematicBoxPlacementLineItem => ({
  lineItemType: "SchematicBoxPlacement",
  positionAnchor: "center",
  schX: schematicBox.x,
  schY: schematicBox.y,
  width: schematicBox.width,
  height: schematicBox.height,
  schematicComponentId: schematicBox.schematic_component_id,
  schematicSymbolId: schematicBox.schematic_symbol_id,
  subcircuitId: schematicBox.subcircuit_id,
})

const lineItemToString = (lineItem: SchematicBoxPlacementLineItem): string => {
  const attrs = [
    `positionAnchor="${lineItem.positionAnchor}"`,
    `schX="${fmtNumber(lineItem.schX)}"`,
    `schY="${fmtNumber(lineItem.schY)}"`,
    `width="${fmtNumber(lineItem.width)}"`,
    `height="${fmtNumber(lineItem.height)}"`,
  ]

  return `<SchematicBoxPlacement ${attrs.join(" ")} />`
}

export class SchematicPlacementAnalysis {
  constructor(private readonly lineItems: SchematicPlacementLineItem[]) {}

  getLineItems(): SchematicPlacementLineItem[] {
    return this.lineItems
  }

  getString(): string {
    return this.toString()
  }

  toString(): string {
    return [
      "<SchematicBoxPositions>",
      ...this.lineItems.map((lineItem) => {
        switch (lineItem.lineItemType) {
          case "SchematicBoxPlacement":
            return lineItemToString(lineItem)
          default:
            return ""
        }
      }),
      "</SchematicBoxPositions>",
    ].join("\n")
  }
}

export const analyzeSchematicPlacement = (
  circuitJson: CircuitJson,
): SchematicPlacementAnalysis => {
  const lineItems = circuitJson
    .filter(isSchematicBox)
    .map(schematicBoxToLineItem)

  return new SchematicPlacementAnalysis(lineItems)
}
