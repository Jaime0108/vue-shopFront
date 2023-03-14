<template>
  <div id="home">
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="(floor,index) in floorImgList" :key="floor.id" :floorInfo="floorImgList[index]"></Floor>
    <Brand></Brand>
    <!-- footer在根组件上 -->
    <!-- <Footer></Footer> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Brand from "./Brand";
import Floor from "./Floor";
import Like from "./Like";
import ListContainer from "./ListContainer";
import Rank from "./Rank";
import Recommend from "./Recommend";
export default {
  name: "Home",
  components: {
    Brand,
    Floor,
    Like,
    ListContainer,
    Rank,
    Recommend,
  },
  created(){
    this.$store.dispatch("getBannerImgList");
    this.$store.dispatch('getFloorImgList')
  },
  computed:{
    ...mapState({
      floorImgList: state=> state.home.floorImgList
    })
  }
};
</script>

<style lang="less" scoped>
</style>