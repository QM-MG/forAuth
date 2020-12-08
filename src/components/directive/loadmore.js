import Vue from 'vue'
// 设置默认溢出显示数量
var spillDataNum = 5;

// 设置隐藏函数
var timeout = false;
let setRowDisableNone = function (topNum, showRowNum, binding) {
  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(() => {
    // console.log(topNum, topNum + showRowNum + spillDataNum)
    binding.value.call(null, topNum, topNum + showRowNum + spillDataNum); // topNum 开始行 topNum + showRowNum + spillDataNum 结束行
  });
};
Vue.directive('loadmore',{
  componentUpdated: function (el, binding, vnode, oldVnode) {
    setTimeout(() => {
      const dataSize = vnode.data.attrs['data-size']; // 总条数
      const oldDataSize = oldVnode.data.attrs['data-size'];
      // console.log(dataSize, oldDataSize)
      if(dataSize === oldDataSize){
        return;
      }
    console.log(1)
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
      createElementTR.setAttribute('style', `height: ${createElementTRHeight}px;`); // 将剩余不显示的行高设给一个大的tr?
      selectTbody.append(createElementTR);
      // 监听滚动后事件
      // console.log(selectWrap)
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
        setRowDisableNone(topNum, showRowNum, binding);
      })
    });
  }
})