<template>
  <div id="search">
    <!-- 窗口侧边栏 -->
    <div class="toolbar toolbar-wrap">
      <div class="content"></div>
      <div class="but list"></div>
      <div class="toolist">
        <div class="pull">
          <i class="tab-ico vip"></i>
          <em class="tab-text">商品会员</em>
        </div>
        <div class="pull">
          <i class="tab-ico cart"></i>
          <em class="tab-text">购物车</em>
        </div>
        <div class="pull">
          <i class="tab-ico follow"></i>
          <em class="tab-text">我的关注</em>
        </div>
        <div class="pull">
          <i class="tab-ico history"></i>
          <em class="tab-text">我的足迹</em>
        </div>
        <div class="pull">
          <i class="tab-ico message"></i>
          <em class="tab-text">我的消息</em>
        </div>
        <div class="pull">
          <i class="tab-ico jimi"></i>
          <em class="tab-text">咨询</em>
        </div>
      </div>
      <div class="back pull">
        <i class="tab-ico top"></i>
        <em class="tab-text">顶部</em>
      </div>
    </div>
    <TypeNav></TypeNav>
    <!--list-content-->
    <div class="main">
      <div class="py-container">
        <!-- 面包屑 -->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li
              class="with-x categoryName"
              v-show="searchReqParams.categoryName"
            >
              {{ searchReqParams.categoryName
              }}<i @click="removeCategoryName">×</i>
            </li>
            <li class="with-x" v-show="searchReqParams.keyword">
              {{ searchReqParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <li class="with-x" v-show="searchReqParams.trademark">
              {{ searchReqParams.trademark.split(":")[1]
              }}<i @click="removeTrademark">×</i>
            </li>
            <li
              class="with-x"
              v-for="(prop, index) in searchReqParams.props"
              :key="index"
            >
              {{ searchReqParams.props[index].split(":")[1]
              }}<i @click="removeProp(prop)">×</i>
            </li>
          </ul>
        </div>
        <!-- 品牌、参数列表 -->
        <Selector
          @getTrademarkFromSelector="getTrademarkFromSelector"
          @getPropsFromSelector="getPropsFromSelector"
        ></Selector>

        <div class="details clearfix">
          <!-- 排序 -->
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: one }" @click="changOrder(1)">
                  <a
                    >综合<i
                      v-show="one"
                      class="iconfont"
                      :class="{ 'icon-down': desc, 'icon-up': asc }"
                    ></i
                  ></a>
                </li>
                <li :class="{ active: two }" @click="changOrder(2)">
                  <a
                    >价格<i
                      v-show="two"
                      class="iconfont"
                      :class="{ 'icon-down': desc, 'icon-up': asc }"
                    ></i
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(good, index) in goodsList"
                :key="good.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`"><img :title="good.title" v-lazy="good.defaultImg" /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <router-link :to="`/detail/${good.id}`" :title="good.title">{{ good.title }}</router-link>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination
            :pageNo="$store.state.search.searchPageInfo.pageNo"
            :pageSize="$store.state.search.searchPageInfo.pageSize"
            :total="$store.state.search.searchPageInfo.total"
            :paginationSize="5"
            @changPageNo="changPageNo"
          ></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TypeNav from "@/components/TypeNav";
import Selector from "./Selector";
import { mapGetters } from "vuex";
export default {
  name: "Search",
  components: {
    TypeNav,
    Selector,
  },
  beforeMount() {
    this.searchReqParams = {
      ...this.searchReqParams,
      ...this.$route.query,
      ...this.$route.params,
    };
  },
  mounted() {
    this.getSearchPageInfo();
  },
  data() {
    return {
      searchReqParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        order: "1:desc",
        pageNo: 1,
        pageSize: 10,
        props: [],
        trademark: "",
      },
    };
  },
  computed: {
    // trademarkList(){
    //   return this.$store.state.search.searchPageInfo.trademarkList
    // }
    ...mapGetters(["goodsList"]),
    one() {
      return this.searchReqParams.order.indexOf("1") != -1;
    },
    two() {
      return this.searchReqParams.order.indexOf("2") != -1;
    },
    desc() {
      return this.searchReqParams.order.indexOf("desc") != -1;
    },
    asc() {
      return this.searchReqParams.order.indexOf("asc") != -1;
    },
  },
  watch: {
    // 监视路由变化，重新发送请求
    $route: {
      handler(newValue, oldValue) {
        // 清除上一次缓存的ID
        this.searchReqParams.category1Id = "";
        this.searchReqParams.category2Id = "";
        this.searchReqParams.category3Id = "";
        Object.assign(this.searchReqParams, newValue.query, newValue.params);
        this.getSearchPageInfo();
      },
    },
  },
  methods: {
    getSearchPageInfo() {
      this.$store.dispatch("getSearchPageInfo", this.searchReqParams);
      let str = "123";
      str.split;
    },
    removeCategoryName() {
      //想通过改变路由的query参数，触发监视路由，重发请求
      // this.$route.query = {}

      this.searchReqParams.category1Id = "";
      this.searchReqParams.category2Id = "";
      this.searchReqParams.category3Id = "";
      this.searchReqParams.categoryName = "";

      this.$router.replace({
        name: "Search",
        query: {},
        params: this.$route.params ? this.$route.params : "",
      });
    },
    removeKeyword() {
      this.searchReqParams.keyword = "";
      this.$router.replace({
        name: "Search",
        query: this.$route.query ? this.$route.query : "",
        params: {},
      });
      this.$bus.$emit("clearHeadSearchInput");
    },
    getTrademarkFromSelector(trademarkInfo) {
      this.searchReqParams.trademark = `${trademarkInfo.tmId}:${trademarkInfo.tmName}`;
      this.getSearchPageInfo();
    },
    removeTrademark() {
      this.searchReqParams.trademark = "";
      this.getSearchPageInfo();
    },
    getPropsFromSelector(propsInfo) {
      let exist = this.searchReqParams.props.indexOf(propsInfo);
      if (exist === -1) {
        this.searchReqParams.props.push(propsInfo);
        this.getSearchPageInfo();
      }
    },
    removeProp(prop) {
      // this.searchReqParams.props.splice(index,1)
      this.searchReqParams.props = this.searchReqParams.props.filter((item) => {
        return item != prop;
      });
      this.getSearchPageInfo();
    },
    // 改变排序
    changOrder(index) {
      let originOrderArray = this.searchReqParams.order.split(":");

      let originIndex = originOrderArray[0];
      let orderStr = originOrderArray[1];
      let newOrder;
      if (index == originIndex) {
        let newOrderStr = orderStr === "desc" ? "asc" : "desc";
        newOrder = `${originIndex}:${newOrderStr}`;
      } else {
        newOrder = `${index}:desc`;
      }
      this.searchReqParams.order = newOrder;
      this.getSearchPageInfo();
    },
    // 改变当前页
    changPageNo(pageNo) {
      this.searchReqParams.pageNo = pageNo;
      this.getSearchPageInfo();
    }
  },
};
</script>

<style lang="less" scoped>
.toolbar {
  position: fixed;
  z-index: 999;
  width: 300px;
  height: 100%;
  background-color: #7a6e6e;
  transition: right 0.3s ease-in-out 0s;
  &.toolbar-out {
    top: 0px;
    right: 0px;
  }
  &.toolbar-wrap {
    top: 0px;
    right: -294px;
  }
  .content {
    position: relative;
    left: 6px;
    width: 294px;
    background-color: bisque;
    height: 100%;
    z-index: 99;
  }
  .but {
    position: relative;
    width: 35px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    margin-bottom: 1px;
    cursor: pointer;
    background-color: #7a6e6e;
    border-radius: 3px 0 0 3px;
    position: absolute;
    top: 0;
    /*right: -6px;*/
    left: -29px;
    &.list {
      background-image: url(./images/list.png);
      background-repeat: no-repeat;
      background-size: cover;
    }
    &.pull-wrap {
      background-image: url(./images/cross.png);
      background-repeat: no-repeat;
      background-size: cover;
    }
  }
  .toolist {
    position: absolute;
    top: 50%;
    left: -29px;
    width: 35px;
    margin-top: -80px;
    /*background-color: cadetblue;*/
    .pull {
      position: relative;
      width: 35px;
      height: 35px;
      line-height: 35px;
      text-align: center;
      margin-bottom: 1px;
      cursor: pointer;
      background-color: #7a6e6e;
      border-radius: 3px 0 0 3px;
      z-index: 66;
      .vip {
        background-image: url(~@/assets/toolbars.png);
        background-position: -88px -175px;
      }
      .cart {
        background-image: url(~@/assets/toolbars.png);
        background-position: -50px 0;
      }
      .follow {
        background-image: url(~@/assets/toolbars.png);
        background-position: -50px -50px;
      }
      .history {
        background-image: url(~@/assets/toolbars.png);
        background-position: -50px -100px;
      }
      .message {
        background-image: url(~@/assets/toolbars.png);
        background-position: -190px -150px;
      }
      .jimi {
        background-image: url(~@/assets/toolbars.png);
        background-position: -50px -150px;
      }
      .top {
        background-image: url(~@/assets/toolbars.png);
        background-position: -50px -250px;
      }

      .tab-text {
        width: 62px;
        height: 35px;
        line-height: 35px;
        color: #fff;
        text-align: center;
        font-family: 微软雅黑;
        position: absolute;
        /*position: relative;*/
        z-index: 1;
        left: 35px;
        top: 0;
        background-color: #7a6e6e;
        border-radius: 3px 0 0 3px;
        font-style: normal;
        -webkit-transition: left 0.3s ease-in-out 0.1s;
        transition: left 0.3s ease-in-out 0.1s;
      }
      .tab-ico {
        display: inline-block;
        position: relative;
        /*background-image: url(img/toolbars.png);*/
        background-color: #7a6e6e;
        border-radius: 3px 0 0 3px;
        z-index: 2;
        width: 35px;
        height: 35px;
      }
    }
  }

  & > .pull {
    position: relative;
    width: 35px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    margin-bottom: 1px;
    cursor: pointer;
    background-color: #7a6e6e;
    border-radius: 3px 0 0 3px;
    z-index: 66;
    .tab-ico {
      display: inline-block;
      position: relative;
      /*background-image: url(img/toolbars.png);*/
      background-color: #7a6e6e;
      border-radius: 3px 0 0 3px;
      z-index: 2;
      width: 35px;
      height: 35px;
    }
    .top {
      background-image: url(~@/assets/toolbars.png);
      background-position: -50px -250px;
    }

    .tab-text {
      width: 62px;
      height: 35px;
      line-height: 35px;
      color: #fff;
      text-align: center;
      font-family: 微软雅黑;
      position: absolute;
      /*position: relative;*/
      z-index: 1;
      left: 35px;
      top: 0;
      background-color: #7a6e6e;
      border-radius: 3px 0 0 3px;
      font-style: normal;
      -webkit-transition: left 0.3s ease-in-out 0.1s;
      transition: left 0.3s ease-in-out 0.1s;
    }
  }
  & > .back {
    position: absolute;
    bottom: 0;
    /*right: -6px;*/
    left: -29px;
    display: inline-block;
    background-image: url(~@/assets/toolbars.png);
  }
}
.main {
  margin: 10px 0;
  .py-container {
    width: 1200px;
    margin: 0 auto;
    .bread {
      margin-bottom: 5px;
      overflow: hidden;
      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;
        li {
          display: inline-block;
          line-height: 18px;
          a {
            color: #666;
            text-decoration: none;
            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }
      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;
        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;
          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }
          &:hover {
            color: #28a3ef;
          }
          &.categoryName {
            border-color: #c81623;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;
      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;
        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;
            li {
              float: left;
              line-height: 18px;
              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }
              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }
      .goods-list {
        margin: 20px 0;
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;
            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;
                a {
                  color: #666;
                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                    cursor: pointer;
                  }
                }
              }
              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;
                strong {
                  font-weight: 700;
                  i {
                    margin-left: -5px;
                  }
                }
              }
              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                a {
                  color: #333;
                  text-decoration: none;
                }
              }
              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;
                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }
              .operate {
                padding: 12px 15px;
                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }
                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;
                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }
                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;
                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
      .pagination {
        text-align: center;
      }
    }
  }
}
</style>