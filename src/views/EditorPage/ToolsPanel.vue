<template>
  <div class="eda__tools-panel">
    <div class="tools-panel__item">
      <el-image class="tools-panel__logo" />
    </div>

    <div class="tools-panel__item">
      <el-input class="tools-panel__project-title" v-model="projectTitle" />
    </div>
  </div>
</template>

<script>
  import { sync } from 'vuex-pathify'


  export default {
    name: 'ToolsPanel',

    computed: {
      ...sync('editor', {
        projectTitle: 'project@title'
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/variables';

  .eda__tools-panel {
    display: flex;
    height: 2rem;
    border-bottom: 2px solid $--border-color-base;

    .tools-panel__item {
      height: 100%;
      padding-left: 0.25rem;
      padding-right: 0.25rem;

      .tools-panel__logo {
        height: 100%;
      }

      .tools-panel__project-title {
        max-width: 12rem;
        height: 100%;

        /deep/ .el-input__inner {
          font-size: 1.25rem;
          line-height: 1.25rem;
          height: 100%;
          padding: 0.25rem;
          color: $--color-text-primary;
          font-weight: 500;
          background: none;
          border: none;

          &:focus {
            background-color: rgba($--color-primary, 0.1);
            border-radius: 0;
          }
        }
      }
    }
  }
</style>
