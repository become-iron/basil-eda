<template>
  <div
    ref="graph"
    class="graph"
  />
</template>

<script>
  // import _ from 'lodash'
  import keycode from 'keycode'
  import mxgraph from '../../plugins/mxgraph'

  import defaultGraphSetting from './defaultSettings'


  export default {
    name: 'Editor',

    created () {
      this.editor = null
      this.graph = null
    },

    mounted () {
      this.setupEditor()
    },

    methods: {
      setupEditor () {
        let $container = this.$el
        // TODO: replace with HTML5 grid
        $container.style.backgroundImage = `url(${window.mxBasePath}/images/grid.gif)`  // setup grid

        this.setStyleOverrides()

        this.editor = new mxgraph.mxEditor()
        this.editor.setGraphContainer($container)
        this.graph = this.editor.graph

        this.setGraphOverrides()
        this.adjustGraphSettings()
        this.adjustGraphStyle()
        this.setListeners()

        this.$el.focus()  // set focus on graph
      },

      setStyleOverrides () {
        mxgraph.mxConstraintHandler.prototype.pointImage =
          new mxgraph.mxImage(`${window.mxBasePath}/images/dot.gif`, 10, 10)

        Object.entries(defaultGraphSetting.constants)
          .forEach(([key, value]) => { mxgraph.mxConstants[key] = value })


        // // mxgraph.mxConstants.DEFAULT_VALID_COLOR = '#343a40'
        // // mxgraph.mxConstants.HIGHLIGHT_COLOR = '#343a40'
        // // mxgraph.mxConstants.OUTLINE_HIGHLIGHT_COLOR = 'none'
        // mxgraph.mxConstants.VALID_COLOR = '#343a40'
        //
        // // the selection border
        // mxgraph.mxConstants.EDGE_SELECTION_COLOR = '#343a40'
        // mxgraph.mxConstants.VERTEX_SELECTION_COLOR = '#343a40'
        //
        // // connected end of edge
        // mxgraph.mxConstants.CONNECT_HANDLE_FILLCOLOR = '#343a40'
        // //
        // mxgraph.mxConstants.HANDLE_FILLCOLOR = '#343a40'
        //
        // // mxgraph.mxConstants.VERTEX_SELECTION_STROKEWIDTH = 2
        // // mxgraph.mxConstants.EDGE_SELECTION_STROKEWIDTH = 2
        //
        // // mxgraph.mxGraphHandler.prototype.guidesEnabled = true
        // // mxgraph.mxConstants.GUIDE_COLOR = '#FF0000'
        // // mxgraph.mxConstants.GUIDE_STROKEWIDTH = 1
        // // mxgraph.mxEdgeHandler.prototype.snapToTerminals = true
        // // mxgraph.mxVertexHandler.prototype.rotationEnabled = true
        //
        // // mxgraph.mxConnectionHandler.prototype.waypointsEnabled = true
        // // mxgraph.mxGraph.prototype.resetEdgesOnConnect = false
      },

      setGraphOverrides () {
        // custom value
        // const convertValueToString = this.graph.convertValueToString
        // this.graph.convertValueToString = function (cell) {
        //   if (cell != null && cell.value.name != null) {
        //     return cell.value.name === '' ?
        //       `${cell.value.componentName}` :
        //       `${cell.value.componentName}\n${cell.value.name}`
        //   } else {
        //     return convertValueToString.call(this, cell)
        //   }
        // }

        // get cell label
        this.graph.convertValueToString = function (cell) {
          return cell.value.title
        }

        // set cell label
        this.graph.cellLabelChanged = function (cell, newValue) {
          cell.value.title = newValue
        }

        // const cellLabelChanged = this.graph.cellLabelChanged
        // this.graph.cellLabelChanged = function (cell, newValue, autoSize) {
        //   if (cell != null && cell.value.name != null) {
        //     const name = newValue
        //     newValue = Object.assign({}, cell.value)
        //     newValue.name = name
        //   }
        //
        //   cellLabelChanged.call(this, cell, newValue, autoSize)
        // }

        // TODO: remove
        // const getInitialValue = mxgraph.mxCellEditor.prototype.getInitialValue
        // mxgraph.mxCellEditor.prototype.getInitialValue = function (state, trigger) {
        //   const cell = state.cell
        //
        //   if (cell != null && cell.value.name != null) {
        //     return cell.value.name
        //   } else {
        //     return getInitialValue.call(this, state, trigger)
        //   }
        // }

        // enables connect preview for the default edge style
        // source: anchors example
        this.graph.connectionHandler.createEdgeState = function () {
          const edge = this.graph.createEdge(null, null, null, null, null)
          return new mxgraph.mxCellState(this.graph.view, edge, this.graph.getCellStyle(edge))
        }

        // Makes sure non-relative cells can only be connected via constraints
        // source: wires example
        this.graph.connectionHandler.isConnectableCell = function(cell) {
          if (this.graph.getModel().isEdge(cell)) {
            return true
          } else {
            const geo = cell ? this.graph.getCellGeometry(cell) : null
            return geo ? geo.relative : false
          }
        }
        mxgraph.mxEdgeHandler.prototype.isConnectableCell = function(cell) {
          return this.graph.connectionHandler.isConnectableCell(cell)
        }

        // Adds oval markers for edge-to-edge connections.
        mxgraph.mxGraph.prototype.getCellStyle = function(cell) {
          let style = mxgraph.mxGraph.prototype.getCellStyle.call(this, cell)

          if (style != null && this.model.isEdge(cell)) {
            style = mxgraph.mxUtils.clone(style)

            if (this.model.isEdge(this.model.getTerminal(cell, true))) {
              style['startArrow'] = 'oval'
            }

            if (this.model.isEdge(this.model.getTerminal(cell, false))) {
              style['endArrow'] = 'oval'
            }
          }

          return style
        }
      },

      setListeners () {
        const keyHandler = this.editor.keyHandler
        
        keyHandler.bindAction(keycode('c'), 'copy', true)  // copy on Ctrl + C
        keyHandler.bindAction(keycode('v'), 'paste', true)  // paste on Ctrl + V
        keyHandler.bindAction(keycode('x'), 'cut', true)  // cut on Ctrl + X
        keyHandler.bindAction(keycode('delete'), 'delete')  // delete on Delete
        keyHandler.bindAction(keycode('a'), 'selectAll', true)  // select all on Ctrl + A
        this.editor.addListener(mxgraph.mxEvent.ESCAPE, () => { this.graph.clearSelection() })  // deselect on Esc

        // rotate on Space
        // keyHandler.handler.bindKey(keycode('space'), () => { this.rotateSelectedCells() })

        keyHandler.handler.bindKey(keycode('left'), () => { this.moveSelectedCells(-1, 0) })
        keyHandler.handler.bindKey(keycode('up'), () => { this.moveSelectedCells(0, -1) })
        keyHandler.handler.bindKey(keycode('right'), () => { this.moveSelectedCells(1, 0) })
        keyHandler.handler.bindKey(keycode('down'), () => { this.moveSelectedCells(0, 1) })

        // keyHandler.bindAction(keycode('n'), 'new', true) // Ctrl + N
        // keyHandler.bindAction(keycode('o'), 'open', true) // Ctrl + O

        // undo on Ctrl + Z
        keyHandler.bindAction(keycode('z'), 'undo', true)
        // redo on Ctrl + Shift + Z
        keyHandler.handler.bindControlShiftKey(keycode('z'), () => { this.editor.redo() })

        this.graph.getModel().addListener(
          mxgraph.mxEvent.CHANGE,
          () => { this.$store.dispatch('updateUndoManagerState') }
        )

        // this.graph.fireMouseEvent = function (evtName, me, sender) {
        //   console.log(evtName)
        //   console.log(me)
        //   console.log(sender)
        // }

        // cells selection
        // https://jgraph.github.io/mxgraph/docs/js-api/files/view/mxGraphSelectionModel-js.html#mxGraphSelectionModel.mxEvent.CHANGE
        this.graph.selectionModel.addListener(mxgraph.mxEvent.CHANGE, (sender, evt) => {
          let newSelection = evt.properties.removed != null ? evt.properties.removed: []
          let previousSelection = evt.properties.added != null ? evt.properties.added: []
          this.handleComponentsSelection(newSelection, previousSelection)
        })

        // this.$bus.$on('create-new-project', () => { this.createNewProject() })
        // this.$bus.$on('open-project', projectDescription => { this.openProject(projectDescription) })
        // this.$bus.$on('prepare-thumbnails', library => { this.prepareThumbnails(library) })
        // this.$bus.$on(
        //   'insert-shape',
        //   (shapeName, shapeValue, coordinates) => { this.addComponentByStencil(shapeName, shapeValue, coordinates) }
        // )
      },

      adjustGraphSettings () {
        this.graph.setConnectable(true)
        this.graph.setConnectableEdges(true)
        this.graph.setCellsResizable(false)
        this.graph.setPanning(true)
        this.graph.setEnterStopsCellEditing(true)
      },

      adjustGraphStyle () {
        this.editor.rubberband.defaultOpacity = 40

        // TODO
        const strokeWidth = 2
        const labelBackground = '#FFFFFF'
        const fontColor = '#000000'
        const strokeColor = '#343a40'

        let style = this.graph.getStylesheet().getDefaultEdgeStyle()
        style['edgeStyle'] = mxgraph.mxEdgeStyle.OrthConnector
        delete style['startArrow']
        delete style['endArrow']
        style['strokeColor'] = strokeColor
        style['labelBackgroundColor'] = labelBackground
        style['fontColor'] = fontColor
        style['fontSize'] = '9'
        style['movable'] = '0'
        style['strokeWidth'] = strokeWidth

        style = this.graph.getStylesheet().getDefaultVertexStyle()
        style['verticalAlign'] = 'bottom'
        style['verticalLabelPosition'] = 'top'

        style['gradientDirection'] = 'south'
        style['strokeColor'] = strokeColor
        style['fillColor'] = 'none'
        style['fontColor'] = fontColor
        style['fontStyle'] = '1'
        style['fontSize'] = '12'
        style['resizable'] = '0'
        style['rounded'] = '1'
        style['strokeWidth'] = strokeWidth
      },

      moveSelectedCells (dx = 0, dy = 0, byStep = true) {
        if (byStep) {
          const step = 10
          dx *= step
          dy *= step
        }

        const selectedCells = this.graph.getSelectionCells()
        this.graph.moveCells(selectedCells, dx, dy)
      },

      // FIXME: doesn't work
      // rotateSelectedCells () {
      //   // TODO: continuously increases 'rotation' in cell style
      //   const selectedCells = this.graph.getSelectionCells()
      //
      //   this.graph.model.beginUpdate()
      //   selectedCells.forEach(cell => {
      //     mxgraph.mxVertexHandler.prototype.rotateCell.call(this.editor, cell, 90)
      //   })
      //   this.graph.model.endUpdate()
      // },

      /** Resets graph model and other application properties */
      createNewProject () {
        this.graph.getModel().clear()
        this.editor.resetHistory()
        this.$store.dispatch('updateUndoManagerState')
        this.$store.dispatch('zoomReset')
      },

      // FIXME: doesn't work for some reason
      /** Takes project description and applies graph model from it */
      openProject (projectDescription) {
        // TODO: load libraries for project
        const scheme = projectDescription.scheme
        const doc = mxgraph.mxUtils.parseXml(scheme)
        const root = doc.documentElement
        const dec = new mxgraph.mxCodec(root.ownerDocument)
        dec.decode(root, this.graph.getModel())
      },

      /** Handles cells selection */
      handleComponentsSelection (selected, deselected) {
        [selected, deselected] = [selected, deselected].map(nodes => nodes.map(node => node.value))
        this.$emit('components:selection', { selected, deselected })
        // // TODO: consider edges selection
        // const deselectedComponents = deselected.filter(cell => cell.vertex)
        //
        // // remove deselected components
        // let selectedComponents = this.$store.state.selectedComponents.slice(0)  // shallow copy
        // selectedComponents = selectedComponents
        //   .filter(component => !deselectedComponents.find(cell => cell.value.id === component.id))
        //
        // // add new selected components
        // const components = selected
        //   .filter(cell => cell.vertex)
        //   .map(cell => cell.value)
        // selectedComponents.push(...components)
        //
        // this.$store.commit('setSelectedComponents', selectedComponents)
      },

      prepareThumbnails (library) {
        const noComponents = !library.components.length

        // first load stencils
        if (noComponents) {
          // TODO: take out loading in other function
          const req = mxgraph.mxUtils.load(library.url)
          const root = req.getDocumentElement()

          const components = []

          root.childNodes.forEach(shape => {
            if (shape.nodeType !== mxgraph.mxConstants.NODETYPE_ELEMENT) { return }

            const stencilName = shape.getAttribute('name')
            const stencil = new mxgraph.mxStencil(shape)
            const thumbnail = this.prepareThumbnailByStencil(stencilName, stencil)

            components.push({
              name: stencilName,
              // stencil: shape.outerHTML,
              el: thumbnail
            })
          })

          this.$store.commit('setLibraryComponents', { libraryID: library.id, components: components })
        } else {
          library.components.forEach(component => {
            const stencilName = component.name
            const stencil = component.stencil

            const parsedStencilDescription = mxgraph.mxUtils.parseXml(stencil).documentElement
            const preparedStencil = new mxgraph.mxStencil(parsedStencilDescription)
            const thumbnail = this.prepareThumbnailByStencil(stencilName, preparedStencil)
            // TODO: replace with mutation
            this.$set(component, 'el', thumbnail)
          })
        }
      },

      prepareThumbnailByStencil (stencilName, stencil) {
        mxgraph.mxStencilRegistry.addStencil(stencilName, stencil)

        const graph = new mxgraph.mxGraph(document.createElement('div'))

        // adjust style
        // TODO: optimize
        const strokeWidth = 1.5
        const fontColor = '#000000'
        const strokeColor = '#343a40'

        const style = graph.getStylesheet().getDefaultVertexStyle()
        style['strokeColor'] = strokeColor
        style['fillColor'] = 'none'
        style['fontColor'] = fontColor
        style['fontStyle'] = '4'
        style['fontSize'] = '30'
        style['resizable'] = '0'
        style['rounded'] = '1'
        style['strokeWidth'] = strokeWidth

        const parent = graph.getDefaultParent()
        // TEMP: prettify it
        const containerSize = 48  // TODO: not quite container size
        const baseOffset = 2
        const scale = containerSize / Math.max(stencil.w0, stencil.h0)
        const width = Math.trunc(stencil.w0 * scale)
        const height = Math.trunc(stencil.h0 * scale)
        const topOffset = Math.trunc((containerSize - height) / 2) + baseOffset
        const leftOffset = Math.trunc((containerSize - width) / 2) + baseOffset
        graph.insertVertex(parent, null, '', leftOffset, topOffset, width, height, `shape=${stencilName};`)

        return graph.container.innerHTML
      },

      // TODO: change function signature: it should take a component object and its coordinates
      addComponentByStencil (stencilName, shapeValue = '', coords) {
        const parent = this.graph.getDefaultParent()
        const model = this.graph.model
        const style = `shape=${stencilName};`

        const stencil = mxgraph.mxStencilRegistry.getStencil(stencilName)

        // TEMP: random coords
        if (coords == null) {
          const gridStep = 10
          coords = [
            Math.trunc(Math.random() * (this.$el.clientWidth - stencil.w0) / gridStep) * gridStep,
            Math.trunc(Math.random() * (this.$el.clientHeight - stencil.h0) / gridStep) * gridStep,
            stencil.w0,
            stencil.h0
          ]
        }
        const cellID = shapeValue.id != null ? shapeValue.id : null

        model.beginUpdate()
        try {
          this.graph.insertVertex(parent, cellID, shapeValue, ...coords, style)
        } finally {
          model.endUpdate()
        }
      },

      getCell (cellID) {
        return this.graph.model.getCell(cellID)
      },

      setCellLabel (cell, newValue) {
        this.graph.cellLabelChanged(cell, newValue)
      },

      undo () {
        this.editor.undo()
      },

      redo () {
        this.editor.redo()
      },

      graphToXML () {
        const encoder = new mxgraph.mxCodec()
        const result = encoder.encode(this.graph.getModel())
        return mxgraph.mxUtils.getXml(result)
      }
    }
  }
</script>

<style scoped>
  .graph {
    overflow: auto;
  }
</style>
