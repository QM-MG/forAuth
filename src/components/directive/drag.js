import Vue from 'vue'
Vue.directive('drag',{
  inserted: function (el) {
        // 指令的定义
          let odiv = el;  //获取当前元素
          odiv.onmousedown = (e) => {
            //算出鼠标相对元素的位置
            let disX = e.clientX - odiv.offsetLeft;
            let disY = e.clientY - odiv.offsetTop;
            document.onmousemove = (e)=>{
              //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
              let left = e.clientX - disX;  
              let top = e.clientY - disY;
              if(left < 0){
                left = 0;
                }
                //document.documentElement.clientWidth获取整个页面的宽度
                else if(left >= (document.documentElement.clientWidth - el.offsetWidth)){
                  left = document.documentElement.clientWidth - el.offsetWidth;
                }
    
                if(top < 0){
                  top =0;
                }
                else if(top > (document.documentElement.clientHeight - el.offsetHeight)){
                  top = document.documentElement.clientHeight - el.offsetHeight;
                }
              
              //移动当前元素
              odiv.style.left = left + 'px';
              odiv.style.top = top + 'px';
              console.log(left)
            };
            document.onmouseup = (e) => {
              document.onmousemove = null;
              document.onmouseup = null;
            };
          };
        }
});