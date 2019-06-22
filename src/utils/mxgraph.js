import mxgraph from '../plugins/mxgraph'


const thumbnailsGraph = new mxgraph.mxGraph(document.createElement('div'))

export function prepareThumbnailByStencil (stencilID, stencilScheme) {
  if (!mxgraph.mxStencilRegistry.getStencil(stencilID)) {
    mxgraph.mxStencilRegistry.addStencil(stencilID, stencilScheme)
  }

  // adjust style
  // TODO: optimize
  const strokeWidth = 1.5
  const fontColor = '#000000'
  const strokeColor = '#343a40'

  const style = thumbnailsGraph.getStylesheet().getDefaultVertexStyle()
  style['strokeColor'] = strokeColor
  style['fillColor'] = 'none'
  style['fontColor'] = fontColor
  style['fontStyle'] = '4'
  style['fontSize'] = '30'
  style['resizable'] = '0'
  style['rounded'] = '1'
  style['strokeWidth'] = strokeWidth

  // TEMP: prettify it
  const containerSize = 48  // TODO: not quite container size
  const baseOffset = 2
  const scale = containerSize / Math.max(stencilScheme.w0, stencilScheme.h0)
  const width = Math.trunc(stencilScheme.w0 * scale)
  const height = Math.trunc(stencilScheme.h0 * scale)
  const topOffset = Math.trunc((containerSize - height) / 2) + baseOffset
  const leftOffset = Math.trunc((containerSize - width) / 2) + baseOffset

  const parent = thumbnailsGraph.getDefaultParent()
  thumbnailsGraph.insertVertex(parent, null, '', leftOffset, topOffset, width, height, `shape=${stencilID};`)

  const thumbnail = thumbnailsGraph.container.innerHTML

  this.graph.getModel().clear()

  return thumbnail
}
