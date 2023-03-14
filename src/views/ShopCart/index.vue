<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(shopInfo, index) in cartInfoList"
          :key="shopInfo.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="shopInfo.isChecked"
              @click="changeSingleShopCheckedState(shopInfo, $event.target.checked)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="shopInfo.imgUrl" />
            <div class="item-msg">{{ shopInfo.skuName }}</div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ shopInfo.cartPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="changeSkuNum('minus', -1, shopInfo)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="shopInfo.skuNum"
              minnum="1"
              class="itxt"
              @change="
                changeSkuNum('change', $event.target.value * 1, shopInfo)
              "
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="changeSkuNum('add', 1, shopInfo)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ shopInfo.skuNum * shopInfo.cartPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a
              class="sindelet"
              @click="deleteShopInShopCartById(shopInfo.skuId)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllChecked"
          @change="changeAllShopCheckedState($event.target.checked)"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllSelectedShopInShopCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ totalSelectedNum }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link to="/trade" class="sum-btn" >结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ShopCart",
  mounted() {
    this.getCartList();
  },
  data() {
    return {};
  },
  computed: {
    // 拿数据还要套娃，真NMD恶心
    ...mapGetters(["realShopCartInfo"]),
    // 真正的购物车数据列表
    cartInfoList() {
      return this.realShopCartInfo.cartInfoList || [];
    },
    isAllChecked() {
      if(this.cartInfoList.length == 0){
        return false
      }
      return this.cartInfoList.every((shopInfo) => {
        return shopInfo.isChecked == 1;
      });
    },
    totalSelectedNum() {
      let totalSelectedNum = 0;
      this.cartInfoList.forEach((shopInfo) => {
        if (shopInfo.isChecked == 1) {
          totalSelectedNum++;
        }
      });
      return totalSelectedNum;
    },
    totalPrice() {
      let totalPrice = 0;
      this.cartInfoList.forEach((shopInfo) => {
        if (shopInfo.isChecked == 1) {
          totalPrice += shopInfo.cartPrice * shopInfo.skuNum;
        }
      });
      return totalPrice;
    },
  },
  methods: {
    getCartList() {
      this.$store.dispatch("getCartList");
    },
    // 还没做节流
    // 这里的做法为什么不能直接input绑定shopInfo的数据，直接改shopInfo的数据
    // 因为后端要求的数据是改变的差值，而不是改变后的值
    async changeSkuNum(type, changeNum, shopInfo) {
      let disNum;
      switch (type) {
        case "minus":
          disNum = shopInfo.skuNum > 1 ? -1 : 0;
          break;
        case "add":
          disNum = 1;
          break;
        case "change":
          if (isNaN(changeNum) || changeNum < 1) {
            disNum = 0;
          } else {
            disNum = parseInt(changeNum) - shopInfo.skuNum;
          }
          break;
      }
      try {
        await this.$store.dispatch("addOrUpdataShopCart", {
          skuId: shopInfo.skuId,
          skuNum: disNum,
        });
        // this.getCartList();
      } catch (error) {}
    },
    //删除单个商品操作
    deleteShopInShopCartById(skuId) {
      try {
        this.$store.dispatch("deleteShopInShopCartById", skuId).then((res) => {
          this.getCartList();
        });
      } catch (error) {}
    },
    //删除所有选中的商品
    deleteAllSelectedShopInShopCart(){
      this.$store.dispatch('deleteAllSelectedShopInShopCart').then(res=>{
        this.getCartList();
      })
    },

    //修改单个商品的选中状态
    changeSingleShopCheckedState(shopInfo, checkedValue) {
      let isChecked = checkedValue == true ? 1 : 0;
      try {
        this.$store
          .dispatch("changeSingleShopCheckedState", {
            skuId: shopInfo.skuId,
            isChecked: isChecked,
          })
          .then((res) => {
            this.getCartList();
          });
      } catch (error) {
        // shopInfo.isChecked = shopInfo.isChecked;
      }
    },
    // 全选修改状态,没发到后端啊，没保持
    changeAllShopCheckedState(checked) {
      this.$store.dispatch('changeAllShopCheckedState',checked).then(res=>{
        this.getCartList()
      })
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 4.1667%;
        }

        .cart-list-con2 {
          width: 25%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 12.5%;
        }

        .cart-list-con5 {
          width: 12.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>