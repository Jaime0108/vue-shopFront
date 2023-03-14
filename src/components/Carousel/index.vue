<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item, index) in list" :key="item.id">
        <img :src="item.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "Carousel",
  props: ["list"],
  // 因为ListContainer和ListContainer的Carousel挂载了数据才回来，所以要用watch+nextTick
  // ListContainer和Floor都用到了Carousel组件

  // Floor的轮播图用到的数据是由父组件通过props传递过来的,
  // v-for遍历的是轮播图用到的数据,
  // 组件能遍历出来,说明轮播图用到的数据已经回来了,
  // 所以可以直接在mounted中new Swiper,也不用$nextTick

  // ListContainer用到的数据直接从仓库中拿的,
  // 仓库有用到异步编程axios,所以渲染DOM的时候,数据很大可能是空数组
  // 所以用到了watch监视数据的变化,数据一改变,DOM重新渲染
  // 这时候new Swiper拿不到DOM,所以就要用到$nextTick,
  // 等到DOM渲染完成后才能拿DOM

  // 这里的immediate是因为Floor的数据是从父组件传递过来的,没变过
  mounted() {
    // console.log('Carousel-mounted',this.list);
  },
  watch: {
    list: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          // console.log("DOM渲染完成",this.list); // 因为ListContainer一上来执行一次和数据改变也执行了一次
          new Swiper(this.$refs.mySwiper, {
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },

            autoplay: {
              delay: 3000,
              stopOnLastSlide: false,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },

            // 如果需要滚动条
            scrollbar: {
              el: ".swiper-scrollbar",
            },
          });
        });
      },
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  .swiper-slide {
    cursor: pointer;
  }
}
</style>