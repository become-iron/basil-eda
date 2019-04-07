<template>
  <div class="flex flex-column">
    <ToolsPanel />

    <div class="flex flex-auto">
      <LeftPanel class="el-col el-col-5 bg-red" />

      <Editor class="el-col el-col-14" />

      <RightPanel class="el-col el-col-5 bg-hot-pink" />
    </div>
  </div>
</template>

<script>
  import ToolsPanel from './ToolsPanel'
  import LeftPanel from './LeftPanel'
  import RightPanel from './RightPanel'
  import Editor from '../../components/Editor'


  export default {
    name: 'EditorPage',
    components: { ToolsPanel, LeftPanel, RightPanel, Editor },

    created () {

    }
  }
</script>

<style scoped>

</style>
