<script setup>
import {useUserStore , demoDemoStore} from "@/stores";


const demoStore = demoDemoStore()

</script>

<template>
<!--    <router-view></router-view>-->
    <div>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </div>
    <div>
      {{ demoStore.name }}
      {{ demoStore.age}}
    </div>
</template>

<style scoped></style>
