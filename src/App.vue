<template>
  <div id="app">
    <Header></Header>
    <!-- 
      缓存这两个组件是为了
     -->
    <!-- <keep-alive include="Home,Search"> -->
      <router-view></router-view>
    <!-- </keep-alive> -->
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default {
  //在开发者工具中显示App
  name: "App",
  components: {
    Header,
    Footer,
  },
  created() {
    this.$store.dispatch('getBaseCategoryList');
    // this.$store.dispatch('getUserInfo')
  },
  // 捕捉错误的生命钩子
  errorCaptured(errorMsg, vm, c) {
    console.log("报错的组件", vm.$el);
    console.log(errorMsg);
    console.log(c);
  },
};
</script>

<style>
</style>

-- 为什么在这里获取分类的数据？
* 数据是TypeNav组件要用的,多个页面都有用到TypeNav组件。
  如果放在TypeNav里获取会重复获取多次

-- keep-alive
* 这里不能用缓存路由啊,用到了params和query传参
  用输入框进入 再返回首页 再用TypeNav进入会缓存
