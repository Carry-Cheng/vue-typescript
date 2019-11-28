<template>
  <el-select
    v-model="keyword"
    filterable
    :clearable="clearable"
    remote
    reserve-keyword
    :placeholder="placeholder"
    :remote-method="remoteMethod"
    :loading="loading"
    class="custom-el-select"
    @change="$emit('change', $event)"
    @blur="$emit('blur', $event)"
    @input="$emit('input', $event)"
    @clear="handleClear()"
  >
      <i slot="prefix" class="el-icon-search custom-prefix-search"></i>
      <slot name="content"></slot>
  </el-select>
</template>

<script>
export default {
  name: 'BaseAutoSearch',
  props: {
    placeholder: {
      type: String,
      default: '请输入内容'
    },
    clearable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      keyword: '',
      loading: false
    }
  },
  methods: {
    remoteMethod(queryString) {
      this.$emit('remoteMethod', queryString)
    },
    handleClear() {
      this.$emit('clear')
    }
  }
}
</script>

<style lang="less" scoped>
.custom-el-select {
  .el-select__input {
    margin-left: 30px;
  }
}
.custom-prefix-search {
  margin-left: 5px;
}
</style>
