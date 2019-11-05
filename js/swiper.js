function Swiper(params) {

    //声明一个空元素接取元素,占位
    // 获取盒子元素
    this.ele = document.querySelector(params.ele);
    this.ulEle = null;

    // 获取到照片
    this.imgs = params.imgs;
    // 一张图片的宽
    this.w = this.ele.clientWidth;
    this.count = 0
    this.id = null;
    // && 遇到false返回    || 遇到true返回
    this.ifDots = params.ifDots || false;
    this.ifArrow = params.ifArrow || false, // 是否开启左右箭头
    this.ifAutoPlay = params.ifAutoPlay || false, // 是否开启自动轮播
    this.init();
}
Swiper.prototype = {
    init: function () {
        var that = this;
        this.creatEle();
        window.arrowClick = function (isRight) {
            that.bindArrow(isRight);
        }
        if (this.ifDots) this.bindDots();
    },

    creatEle: function () {
        var str = `<ul class="swiper-content" style="width:${this.imgs.length+"00%"}">`
        // item:表示数组内的每个元素
        this.imgs.forEach((item, index) => {
            str += `
            <li style = "width:${100/this.imgs.length+"%"}">
                <img src="${'./banner/' + item}">
            </li>                
            
            `
        });
        str += `</ul>`
     
        //生成圆点
        if (this.ifDots) {
            str += `<ul class="dots"> `;
            for (var i = 0; i < this.imgs.length - 1; i++) {
                str += `
                <li data-index="${i}" class="${i === 0 ? 'act' : ''}"></li>
            `;
            }
            str += `</ul>`;
        }
           //生成箭头
           if (this.ifArrow)
           str += `
               <div class="arrow arrow-l" onclick="arrowClick() "></div>
               <div class="arrow arrow-r" onclick="arrowClick(true) "></div>
       `;
        

        this.ele.innerHTML = str;
        this.ulEle = this.ele.children[0];
        // console.log(ulEle );

    },
    bindArrow: function (isRight) {
        if (isRight) {
            if (this.count === this.imgs.length - 1) {
                this.count = 0;
                this.ulEle.style.left = 0;
            }
            // console.log(111);

            this.count++
        } else {
            if (this.count === 0) {
                this.count = this.imgs.length - 1;
                this.ulEle.style.left = -this.count * this.w + 'px';
            }
            this.count--;
        }
        this.move();
        if (this.ifDots) this.changeDotsAct();
    },
		// 添加小点的点击事件  事件委托
		bindDots(){
			// 点击事件中不能使用this
			var that = this;
			var dots = this.ele.children[1];
			dots.onclick = function (){
				if(event.target.tagName === "LI"){
					// 先更改下标
					that.count = event.target.dataset.index;
					that.changeDotsAct();
					that.move();
				}
			}
		},
		// 转换小点的激活样式
		changeDotsAct(){
			var index = this.count === this.imgs.length - 1 ? 0 : this.count;
			document.querySelector(".dots .act").classList.remove("act");
			this.ele.children[1].children[index].classList.add("act");
		},
 		// 运动函数
         move(){
			var that = this;
			var target = -this.count * this.w;
			requestAnimationFrame(function fn(){
				// 取消上一个动画
				if(this.id) cancelAnimationFrame(this.id);
				var start = that.ulEle.offsetLeft;
				var step = (target - start) / 10;
				if(Math.abs(step) < 1){
					step = step > 0 ? 1 : Math.floor(step);
				}
				that.ulEle.style.left = start + step + "px";
				// 之前的判断是到终点停止
				// 现在是不到终点就执行
				if(start + step !== target){
					this.id = requestAnimationFrame(fn);
				}
			})
		}




}







// var swiper = new Swiper({
//     ele: '.box',
//     imgs: ['m1.jpg', 'm2.jpg', 'm3.jpg', 'm4.jpg', 'm1.jpg', ],
//     // ifDots: true, // 是否开启小点
//     // ifArrow: true, // 是否开启左右箭头
//     // autoPlay: true, // 是否开启自动轮播
// })
// var swiper = new Swiper({
//     ele: '.box', // 元素
//     arr: [], // 图片
//     ifDots: true, // 是否开启小点
//     ifArrow: true, // 是否开启左右箭头
//     autoPlay: true ,// 是否开启自动轮播
//     // duration:  自动轮播时间
// });

	