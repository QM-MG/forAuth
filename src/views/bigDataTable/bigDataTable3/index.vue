<template>
  <div>
    <el-table
    :data="filteredData"
    @expand-change="expandChange"
    ref="bigTable"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    height="400"
    border
    :data-size="tableData.length"  v-loadmore="handelLoadmore"
    default-expand-all
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column
        prop="index"
        label="序号"
        width="180">
        </el-table-column>
        <el-table-column
        prop="date"
        label="日期"
        sortable
        width="180">
        </el-table-column>
        <el-table-column
        prop="name"
        label="姓名"
        sortable
        width="180">
        </el-table-column>
        <el-table-column
        prop="address"
        label="地址">
        </el-table-column>
  </el-table>
  </div>
</template>

<script>
import data from '../../../mock/bigDataTable3/index';
const spillDataNum = 5;
export default {
  name: 'test',
  components: {},
  data () {
    return {
      tableData: [],
      currentStartIndex: 0,
      currentEndIndex: 20
    };
  },
  created () {
      this.setIndex();
  },
  computed: {
    filteredData () {
      return this.tableData.filter((item, index) => {
        if (index < this.currentStartIndex) {
          return false;
        } else if (index > this.currentEndIndex) {
          return false;
        } else {
          return true;
        }
      });
    },
    filteredData2 () {
      return this.tableData1.filter((item, index) => {
          return true
      });
    }
  },
  methods: {
    handelLoadmore (currentStartIndex, currentEndIndex) {
        // console.log(currentStartIndex, currentEndIndex)
      this.currentStartIndex = currentStartIndex;
      this.currentEndIndex = currentEndIndex;
    },
    setIndex() {
        for (let i = 0; i < data.length; i++) {
            data[i].index = i;
        }
        setTimeout(() => {
            this.tableData = data;
        }, 10)
    },
    expandChange(row) {
        let el = this.$refs.bigTable.$el;
        let dataSize = this.tableData.length;
        const selectWrap = el.querySelector('.el-table__body-wrapper');
        const selectTbody = selectWrap.querySelector('table tbody');
        const selectRow = selectWrap.querySelector('table tr');
        if (!selectRow) {
            return;
        }
        const rowHeight = selectRow.clientHeight; // 单元格固定高度53
        let showRowNum = Math.round(selectWrap.clientHeight / rowHeight); // 页面能显示多少行

        const createElementTR = document.createElement('tr');
        let createElementTRHeight = (dataSize - showRowNum - spillDataNum) * rowHeight; // 不显示的行高
        createElementTR.setAttribute('style', `height: ${createElementTRHeight}px;`); // 将剩余不显示的行高设给一个大的tr
        // selectTbody.append(createElementTR);
        // 监听滚动后事件
        // console.log(selectWrap)
        let me = this;
        selectWrap.addEventListener('scroll', function () {
            let topPx = this.scrollTop - spillDataNum * rowHeight;
            let topNum = Math.round(topPx / rowHeight);
            let minTopNum = dataSize - spillDataNum - showRowNum;
        // console.log(topNum, minTopNum)
            if (topNum > minTopNum) {
                topNum = minTopNum; // 开始的行
            }
            if (topNum < 0) {
                topNum = 0;
                topPx = 0;
            }
            selectTbody.setAttribute('style', `transform: translateY(${topPx}px)`);
            createElementTR.setAttribute('style', `height: ${createElementTRHeight-topPx > 0 ? createElementTRHeight-topPx : 0}px;`);
            me.setRowDisableNone(topNum, showRowNum);
        })
    },
    setRowDisableNone(topNum, showRowNum) {
        let timeout = false;
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            this.handelLoadmore(topNum, topNum + showRowNum + spillDataNum);
            console.log(this.handelLoadmore)
        });
    }
  },
  watch: {}
}
</script>

<style scoped>
.el-table__body-wrapper .el-table__row td {
  display: none;
}
.el-table__body-wrapper .el-table__row {
  height: 38px;
}
</style>