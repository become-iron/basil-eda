<template>
  <div class="editor-page">
    <ToolsPanel />

    <Split class="editor-page__content"
           :gutterSize="3">
      <SplitArea :size="20"
                 :minSize="100">
        <LeftPanel class="editor-page__column" />
      </SplitArea>

      <SplitArea :size="60">
        <Editor class="editor-page__column" />
      </SplitArea>

      <SplitArea :size="20">
        <RightPanel class="editor-page__column" />
      </SplitArea>
    </Split>
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
      // noinspection JSIgnoredPromiseFromCall
      this.$store.dispatch('editor/init')
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/variables';

  .editor-page {
    display: flex;
    flex-direction: column;

    .editor-page__content {
      flex: 1 1 auto;

      .editor-page__column {
        height: 100%;
      }
    }

    .gutter {
      border-color: $--border-color-base;
    }
  }
</style>
