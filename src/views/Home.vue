<template>
  <div class="home">
    <van-calendar
        title="日历"
        :poppable="false"
        :show-confirm="false"
        :style="{ height: '500px' }"/>
  </div>
</template>

<script>

export default {
  name: 'Home'
}
</script>
