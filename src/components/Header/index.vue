<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="nickName">
            <a>{{ nickName }}</a>
            <a class="register" @click="logout">退出登录</a>
          </p>
          <p v-else>
            <span>请</span>
            <router-link :to="{ name: 'Login' }">登录</router-link>
            <router-link :to="{ name: 'Register' }" class="register"
              >免费注册</router-link
            >
          </p>
        </div>
        <div class="typeList">
          <router-link :to="{path: '/center'}">我的订单</router-link>
          <router-link :to="{path: '/shopCart'}">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link :to="{ name: 'Home' }" class="logo" title="尚品汇">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form @submit.prevent autocomplete="off" class="searchForm">
          <input
            v-model="keyword"
            @keyup.enter="goToSearch"
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
          />
          <button
            @click="goToSearch"
            class="sui-btn btn-xlarge btn-danger"
            type="button"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",

  mounted() {
    this.$bus.$on("clearHeadSearchInput", () => {
      this.keyword = "";
    });
  },

  data() {
    return {
      keyword: "",
    };
  },
  computed: {
    nickName() {
      return this.$store.state.user.userInfo.nickName;
    },
  },
  methods: {
    goToSearch() {
      this.keyword = this.keyword.trim();
      this.$router.push({
        name: "Search",
        params: {
          keyword: this.keyword,
        },
        query: this.$route.query ? this.$route.query : "",
      });
    },
    logout() {
      this.$store.dispatch('logoutAndClearLocalToken').then(res=>{
        this.$router.replace('/home')
      })
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;
    min-width: 1200px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>