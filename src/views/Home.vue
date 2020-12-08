<template>
  <div class="home">
    111
    <div id="app1" v-drag>
    </div>
    <input v-focus>
    <div>11</div>
    <img :src="'~@/assets/logo' + a  + '.png'" alt="">
    <img :src="require(`@/assets/logo${a}.png`)" alt="" />
  </div>
</template>

<script>
var positionX = 0;
var positionY = 0;
export default {
  name: 'Home',
  mounted() {
    let aaa = this.ChineseToNumber('一十二');
    console.log(aaa)
  },
  methods:{
    convertToChinaNum(num) {
      var arr1 = new Array('零', '一', '二', '三', '四', '五', '六', '七', '八', '九');
      var arr2 = new Array('', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千','万', '十', '百', '千','亿');//可继续追加更高位转换值
      if(!num || isNaN(num)){
          return "零";
      }
      var english = num.toString().split("")
      var result = "";
      for (var i = 0; i < english.length; i++) {
          var des_i = english.length - 1 - i;//倒序排列设值
          result = arr2[i] + result;
          var arr1_index = english[des_i];
          result = arr1[arr1_index] + result;
      }
      result = result.replace(/零(千|百|十)/g, '零').replace(/十零/g, '十');
      result = result.replace(/零+/g, '零');
      result = result.replace(/零亿/g, '亿').replace(/零万/g, '万');
      result = result.replace(/亿万/g, '亿');
      result = result.replace(/零+$/, '')
      result = result.replace(/^一十/g, '十');
      return result;
      },
      ChineseToNumber(chnStr){
          var chnNumChar = {
        零:0,
        一:1,
        二:2,
        三:3,
        四:4,
        五:5,
        六:6,
        七:7,
        八:8,
        九:9
      };

      var chnNameValue = {
        十:{value:10, secUnit:false},
        百:{value:100, secUnit:false},
        千:{value:1000, secUnit:false},
        万:{value:10000, secUnit:true},
        亿:{value:100000000, secUnit:true}
      }
			var rtn = 0;
			var section = 0;
			var number = 0;
			var secUnit = false;
			var str = chnStr.split('');

			for(var i = 0; i < str.length; i++){
				var num = chnNumChar[str[i]];
				if(typeof num !== 'undefined'){
					number = num;
					if(i === str.length - 1){
						section += number;
					}
				}else{
					var unit = chnNameValue[str[i]].value;
					secUnit = chnNameValue[str[i]].secUnit;
					if(secUnit){
						section = (section + number) * unit;
						rtn += section;
						section = 0;
					}else{
						section += (number * unit);
					}
					number = 0;
				}
			}
			return rtn + section;
		}
  },
  data() {
      return {
        a: 1

      };
  }
}
</script>
<style>
  #app1{
   width: 150px;
  height: 150px;
  position: absolute;
  background: #CCCCCC;
  }
</style>
