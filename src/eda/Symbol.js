export class Symbol {
  constructor (graph, type, cell) {
    this.graph = graph
    this.type = type
    this.cell = cell
  }

  get label () {
    return this.graph.convertValueToString(this.cell)
  }

  set label (newValue) {
    this.graph.cellLabelChanged(this.cell, newValue)
  }
}
