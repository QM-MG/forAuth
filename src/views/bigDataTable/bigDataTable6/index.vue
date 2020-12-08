<template>
  <!-- 使用 useVirtual 属性开启虚拟滚动 使用虚拟滚动时，必须要固定表格高度和行高 -->
  <div style="height: 100%;width: 100%;padding: 0 30px">
     <div style="color:red;">pl-table在线预览，更多玩法请看文档哦，欢迎Star</div>
     <el-button @click="$router.push({ path: '/text' })">去子页面(为了测试缓存组件)</el-button>
     <div>
        <el-button @click="allSelection">全选</el-button>
        <el-button @click="clearSelection">清除选中</el-button>
        <el-button @click="setData(1)">变化数据为1条</el-button>
        <el-button @click="setData(3)">变化数据为3条</el-button>
        <el-button @click="setData(200)">变化数据为200条</el-button>
        <el-button @click="setData(1000)">变化数据为1000条</el-button>
        <el-button @click="pagingScrollTopLeft(1000)">滚动到1千位置</el-button>
        <el-button @click="pagingScrollTopLeft(2000)">滚动到2千位置</el-button>
         <el-button @click="pagingScrollTopLeft(0)">滚动到顶部</el-button>
        <el-button @click="scrollBottom">滚动到底部位置</el-button>
        <el-button @click="setHei(400)">设置高度为400</el-button>
        <el-button @click="setHei(300)">设置高度为300</el-button>
    </div>

      <!--我是Y轴虚拟-->
     <div v-if="true">
         <p style="color: red">我是Y轴虚拟</p>
         <pl-table ref="plTable"
                   :height="height"
                   :datas="tableData"
                   :dataChangesScrollTop="false"
                   use-virtual
                   border
                   :row-height="rowHeight">
             <pl-table-column
        prop="date"
        label="日期"
        width="180">
      </pl-table-column>
      <pl-table-column
        prop="name"
        label="姓名"
        width="180">
      </pl-table-column>
      <pl-table-column
        prop="address"
        label="地址">
      </pl-table-column>
         </pl-table>
     </div>
</div>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
        tableData: [{
            id:  1,
                date: '2016-05-03',
                name: 1,
                ab: '欢迎使用pl-table',
                address: 1 }],
        height:400,
        rowHeight: 50,
        columns: [
          {prop: 'address', label: '地址', width: 100, showOverflowTooltip: true},
          {prop: 'address', label: '噜噜噜', width: 230, showOverflowTooltip: true},
          {prop: 'address', label: '娃哈哈', width: 100, showOverflowTooltip: true},
          {prop: 'address', label: '地址', width: 100, showOverflowTooltip: true},
          {prop: 'address', label: '娃哈哈', width: 100, showOverflowTooltip: true},
          {prop: 'address', label: '娃哈哈', width: 100, showOverflowTooltip: true},
          {prop: 'address', label: '地址', width: 100, showOverflowTooltip: true},
          {prop: 'address', label: '娃哈哈', width: 100, showOverflowTooltip: true},
          {prop: 'address', label: '娃哈哈', width: 100, showOverflowTooltip: true},
          {prop: 'address', label: '噜噜噜', showOverflowTooltip: true},
          {prop: 'address', label: '娃哈哈', width: 100, showOverflowTooltip: true, fixed: 'right'}
         ],
      }
    },
    mounted() {
        console.log(this.tableData)

    },
    methods: {
       selectAll (val) {
            console.log(val)
        },
       selectable (row, index) {
            if (index === 1) {
                return false
            } else {
                return true
            }
        },
        // 合计
       summaryMethod ({ columns, data }) {
         // 平均值算法（不需要自己去掉）
          function cacl(arr, callback) {
              let ret;
              for (let i=0; i<arr.length;i++) {
                  ret = callback(arr[i], ret);
              }
              return ret;
          }
          // 平均值算法（不需要自己去掉）
          Array.prototype.sum = function () {
              return cacl(this, function (item, sum) {
                  if (typeof (sum) == 'undefined') {
                      return item;
                  }
                  else {
                      return sum += item;
                  }
              });
          };
           // 平均值算法（不需要自己去掉）
          Array.prototype.avg = function () {
              if (this.length == 0) {
                  return 0;
              }
              return this.sum(this) / this.length;
          };
          const means = [] // 合计
          const fenceSums = [] // 平均值
          columns.forEach((column, columnIndex) => {
                if (columnIndex === 0) {
                    means.push('合计')
                    fenceSums.push('平均值')
                } else {
                    const values = data.map(item => Number(item[column.property]));
                    // 合计
                    if (!values.every(value => isNaN(value))) {
                        means[columnIndex] = values.reduce((prev, curr) => {
                            const value = Number(curr);
                            if (!isNaN(value)) {
                                return prev + curr;
                            } else {
                                return prev;
                            }
                        }, 0);
                        // means[columnIndex] += ' 元'
                        // 改变了ele的合计方式，扩展了合计场景
                        // 你以为就只有上面这样玩吗？错啦，你还可以自定义样式哦
                        // means[columnIndex] = '<span style="color: red">' + means[columnIndex] + '元</span>'
                        means[columnIndex] = '<span style="color: red">' + means[columnIndex] + '元</span><br/><span>123</span>'
                    } else {
                        means[columnIndex] = '';
                    }
                    // 平均值
                    const precisions = [];
                    let notNumber = true;
                    values.forEach(value => {
                        if (!isNaN(value)) {
                            notNumber = false;
                            let decimal = ('' + value).split('.')[1];
                            precisions.push(decimal ? decimal.length : 0);
                        }
                    });
                    if (!notNumber) {
                        fenceSums[columnIndex] = values.avg()
                    } else {
                        fenceSums[columnIndex] = '';
                    }
                }
            })
          // 返回一个二维数组的表尾合计
          return [means, fenceSums]
      },
       setHei (val) {
           this.height = val
       },
       tableBodyScroll ({ scrollTop }, e) {
         this.top = scrollTop
       },
       allSelection () {
           this.$refs.plTable.toggleAllSelection()
       },
       clearSelection () {
         this.$refs.plTable.clearSelection()
         this.$refs.plTable2.clearSelection()
       },
       setData (num) {
           for (let i = 0; i <num;i++) {
               let obj = {
                   id: i + 1,
                    date: '2016-05-03',
                    name: 1,
                    ab: '欢迎使用pl-table',
                    address: 1 + i
               };
            this.tableData.push(obj)
           }
       },
       scrollBottom () {
          this.$refs.plTable.scrollBottom()
       },
       pagingScrollTopLeft (val) {
          this.$refs.plTable.pagingScrollTopLeft(val, 0)
       },
       // 分页事件
       handlePageSize ({page, size}) {
         console.log(page, size)
       },
        // 获取已经展开的节点
       getTreeExpansionEvent () {
          console.log(this.$refs.plTreeTable.getTreeExpandRecords())
       }
    }
  }
</script>
<style>
  body, html {
    margin: 0;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }
  body ::-webkit-scrollbar-thumb {
      -webkit-border-radius: 5px;
      border-radius: 5px;
      background-color: rgba(144, 147, 153, 0.5);
  }
    .selectTr td {
        background: #ccc !important;
        color: red !important;
    }
</style>