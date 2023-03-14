<template>
  <div class="spec-preview" @mousemove="maskMove" @mouseleave="leave" ref="container">
    <img :src="skuDefaultImg" />
    <!-- <div class="event"></div> -->
    <div class="mask" ref="mask"></div>

    <div class="big" ref="big">
      <img ref="bigImg" :src="skuDefaultImg" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: ["skuDefaultImg"],
  methods: {
    maskMove(e) {
      this.$refs.mask.style.display = 'block'
      this.$refs.big.style.display = 'block'

      let mousexInContainer = e.clientX - this.$refs.container.getBoundingClientRect().left
      let mouseyInContainer = e.clientY - this.$refs.container.getBoundingClientRect().top

      let maskLeft = mousexInContainer - (this.$refs.mask.getBoundingClientRect().width / 2)
      let maskTop = mouseyInContainer - (this.$refs.mask.getBoundingClientRect().height / 2)

      let containerWidth = this.$refs.container.getBoundingClientRect().width
      let containerHeight = this.$refs.container.getBoundingClientRect().height
      let maskWidth = this.$refs.mask.getBoundingClientRect().width
      let maskHeight = this.$refs.mask.getBoundingClientRect().height

      if(maskLeft < 0){
        maskLeft = 0
      }else if(maskLeft > containerWidth - maskWidth){
        maskLeft = containerWidth - maskWidth
      }

      if(maskTop < 0){
        maskTop = 0
      }else if(maskTop > containerHeight - maskHeight){
        maskTop = containerHeight - maskHeight
      }

      this.$refs.mask.style.left = maskLeft + 'px'
      this.$refs.mask.style.top = maskTop + 'px'

      this.$refs.bigImg.style.left = `-${maskLeft / (containerWidth - maskWidth) * 100}%`
      this.$refs.bigImg.style.top = `-${maskTop / (containerHeight - maskHeight) * 100}%`
    },
    leave(){
      this.$refs.mask.style.display = 'none'
      this.$refs.big.style.display = 'none'
    }
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  // .event:hover ~ .mask,
  // .event:hover ~ .big {
  //   display: block;
  // }
}
</style>