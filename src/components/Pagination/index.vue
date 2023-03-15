<template>
  <div class="pagination">
    <!-- 测试用的 -->
    <!-- <p>
      start: {{ startNumAndEndNum.start }},end:
      {{ startNumAndEndNum.end }},pageNo: {{ pageNo }} totalPage:
      {{ totalPage }}
    </p> -->
    <button v-if="pageNo >= paginationSize - 1" @click="changPageNo(1)">第一页</button>
    <button :disabled="pageNo == 1" @click="changPageNo(pageNo - 1)">上一页</button>
    <!-- v-if="pageNo > paginationSize - 1" -->
    <button :disabled="pageNo < paginationSize - 1">···</button>

    <button
      v-for="(number, index) in startNumAndEndNum.end"
      :key="index"
      v-show="number >= startNumAndEndNum.start"
      @click="changPageNo(number)"
      :class="{ active: pageNo == number }"
    >
      {{ number }}
    </button>

    <!-- v-if="pageNo < totalPage - Math.floor(paginationSize / 2)" -->
    <button
      :disabled="pageNo > totalPage - (Math.floor(paginationSize / 2) + 1)"
    >
      ···
    </button>
    <button @click="changPageNo(pageNo + 1)" :disabled="pageNo == totalPage">
      下一页
    </button>
    <button
      v-if="pageNo < totalPage"
      :disabled="pageNo == totalPage"
      @click="changPageNo(totalPage)"
    >
      最后一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
    <button>共 {{ totalPage }} 页</button>
    <div>{{startNumAndEndNum}}</div>
  </div>
  
</template>

<script>
export default {
  name: "Pagination",
  // :pageNo="8" :pageSize="10" :total="91"
  props: ["pageNo", "pageSize", "total", "paginationSize"],
  mounted() {},
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    startNumAndEndNum() {
      const { paginationSize, totalPage, pageNo } = this;
      let start = 1;
      let end = 5;
      if (totalPage < paginationSize) {
        start = 1;
        end = totalPage;
      } else {
        start = pageNo - Math.floor(paginationSize / 2);
        end = pageNo + Math.floor(paginationSize / 2);
        if (start < 1) {
          start = 1;
          end = paginationSize;
        }
        if (end > totalPage) {
          end = totalPage;
          start = totalPage - paginationSize + 1;
        }
      }
      return { start:parseInt(start), end:parseInt(end) };
    },
  },
  methods: {
    changPageNo(number) {
      this.$emit("changPageNo", number);
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>