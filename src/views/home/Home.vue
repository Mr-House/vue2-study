<template>
  <div>
    <div>主页</div>
    <div>
      <span>counter：</span>
      <button @click="$store.commit('sub')" style="width: 30px;margin: 0 5px;">
        -
      </button>
      <span>{{ $store.state.counter }}</span>
      <button
        @click="$store.dispatch('add')"
        style="width: 30px;margin: 0 5px;"
      >
        +
      </button>
    </div>
    <div>
      <span>doubleCounter：</span>
      <span>{{ $store.getters.doubleCounter }}</span>
    </div>
  </div>
</template>

<script>
export default {
  asyncData({store}) {
    return store.dispatch('getCount')
  }
}
</script>

<style></style>
