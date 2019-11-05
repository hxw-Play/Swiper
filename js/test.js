function Swiper(params){
    // 获取最外面的大盒子
    this.ele = document.querySelector(params.ele);
    // 获取图片
    this.imgs = params.imgs;
    // 初始化函数 生成基本样式
    this.init();
}
 Swiper.prototype = {
     init(){
        this.creatEle();
     },
     creatEle(){
         var str=`<ul class="swiper-content" style = "width:${this.imgs.length+"00%"}">`;
        this.imgs.forEach(element => {
          str+=  `<li style="width:${100 / this.imgs.length+"%"} ">
                <img src = "${'./banner/'+element}">
            </li>`;
        });
        str+=`</ul>`;
        // if(this.ifArrow){
            
        // }
        str+=`<div class="arrow arrow-l"></div>
            <div class="arrow arrow-r"></div>
        `;

        this.ele.innerHTML = str;
     }
 }