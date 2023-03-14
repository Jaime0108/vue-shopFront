<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(skuImage, index) in skuImageList"
        :key="skuImage.id"
        @mouseover="changShowImg(skuImage, skuImageList)"
      >
        <img :class="{'active': skuImage.isDefault == 1}" :src="skuImage.imgUrl" />
      </div>
    </div>
    <button class="swiper-button-next"></button>
    <button class="swiper-button-prev"></button>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "ImageList",
  props: ["skuImageList"],
  watch: {
    skuImageList: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          new Swiper(this.$refs.mySwiper, {
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            slidesPerView: 5,
          });
        });
      },
    },
  },
  methods: {
    changShowImg(skuImage, skuImageList){
      skuImageList.forEach((item)=>{
        item.isDefault = '0'
      })
      skuImage.isDefault = '1'
      this.$bus.$emit('changskuDefaultImg',skuImage.imgUrl)
    }
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 402px;
  box-sizing: border-box;
  padding: 0 12px;
  .swiper-wrapper {
    // background-color: #000;
    text-align: center;
    display: flex;
    justify-content: space-between;
    .swiper-slide {
      // border: 1px solid red;
      width: 56px !important;
      height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }

        &:hover {
          border: 2px solid #f60;
          padding: 1px;
        }
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }
  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &:hover {
      cursor: pointer;
    }
    &::after {
      font-size: 12px;
    }
  }
}
</style>