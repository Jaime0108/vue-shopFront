<template>
  <div class="floor">
    <div class="py-container">
      <div class="title clearfix">
        <h3 class="fl">{{floorInfo.name}}</h3>
        <div class="fr">
          <ul class="nav-tabs clearfix">
            <li :class="activedIndex === index ? 'active' : ''" v-for="(nav, index) in floorInfo.navList" :key="index">
              <a :href="nav.url" data-toggle="tab">{{nav.text}}</a>
            </li>

          </ul>
        </div>
      </div>

      <div class="tab-content">
        <div class="tab-pane">
          <div class="floor-1">
            <div class="blockgary">
              <ul class="jd-list">
                <li v-for="(keyword, index) in floorInfo.keywords" :key="index">{{keyword}}</li>
              </ul>
              <img :src="floorInfo.imgUrl" />
            </div>
            <div class="floorBanner">

              <Carousel :list="floorInfo.carouselList"></Carousel>
            </div>

            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit">
                <img :src="floorInfo.recommendList[0]" />
              </div>
              <div class="floor-conver-pit">
                <img :src="floorInfo.recommendList[1]"/>
              </div>
            </div>
            <div class="split center">
              <img :src="floorInfo.bigImg" />
            </div>

            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit">
                <img :src="floorInfo.recommendList[2]" />
              </div>
              <div class="floor-conver-pit">
                <img :src="floorInfo.recommendList[3]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Floor",
  mounted(){
    // 这里为什么不用nextTick?
    // mounted执行的时候DOM已经挂载到页面上了，渲染已经完成了
    // 数据是在父组件请求传递过来的，所以不会发生数据改变
    // new Swiper(this.$refs.mySwiper, {
    //         loop: true, // 循环模式选项

    //         // 如果需要分页器
    //         pagination: {
    //           el: ".swiper-pagination",
    //           clickable: true,
    //         },

    //         autoplay: {
    //           delay: 3000,
    //           stopOnLastSlide: false,
    //           disableOnInteraction: false,
    //         },

    //         // 如果需要前进后退按钮
    //         navigation: {
    //           nextEl: ".swiper-button-next",
    //           prevEl: ".swiper-button-prev",
    //         },

    //         // 如果需要滚动条
    //         scrollbar: {
    //           el: ".swiper-scrollbar",
    //         },
    //       });
    // console.log('floor-mounted');
  },
  data(){
    return {
      activedIndex: 0,
    }
  },
  props:["floorInfo"],
  
}
</script>

<style lang="less" scoped>
.floor {
  margin-top: 15px;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .title {
      .fl {
        float: left;
        color: #c81623;
        font-size: 20px;
        line-height: 30px;
        margin: 9px 0;
        font-weight: 700;
      }

      .fr {
        float: right;

        .nav-tabs {
          margin: 10px 0 0;
          display: inline-block;

          li {
            float: left;
            line-height: 18px;

            a {
              padding-top: 1px;
              font-weight: 400;
              background-color: #fff;

              &::after {
                content: "|";
                padding: 0 10px;
              }
            }

            &:nth-child(7) {
              a {
                &::after {
                  content: "";
                }
              }
            }

            &.active {
              a {
                color: #e1251b;
              }
            }
          }
        }
      }
    }

    .tab-content {
      border-top: 2px solid #c81623;
      border-bottom: 1px solid #e4e4e4;

      .tab-pane {
        .floor-1 {
          height: 360px;
          display: flex;

          .blockgary {
            width: 210px;
            height: 100%;
            background: #f7f7f7;

            .jd-list {
              padding: 15px 0;
              overflow: hidden;

              li {
                list-style-type: none;
                float: left;
                width: 40%;
                margin: 0 10px;
                border-bottom: 1px solid #e4e4e4;
                text-align: center;
                line-height: 26px;
              }
            }

            img {
              width: 100%;
            }
          }

          .floorBanner {
            width: 330px;
            height: 100%;
          }

          .split {
            width: 220px;
            height: 100%;
            position: relative;

            .floor-x-line {
              position: absolute;
              background: #e4e4e4;
              width: 220px;
              height: 1px;
              top: 180px;
            }

            .floor-conver-pit {
              width: 100%;
              height: 50%;

              img {
                width: 100%;
                height: 100%;
                transition: all 400ms;

                &:hover {
                  opacity: 0.8;
                }
              }
            }
          }

          .center {
            border: 1px solid #e4e4e4;
          }
        }
      }
    }
  }
}
</style>