;(function (){
	function Swiper(params){
		this.imgs = params.imgs;
		// 获取盒子元素
		this.ele = document.querySelector(params.ele);
		this.ulEle = null;
		// 计数器
		this.count = 0;
		// 一张图片的宽度
		this.w = this.ele.clientWidth;
		// requestAnimationFrame 的序列号 用于取消上一个动画
		this.id = null;
		// && 遇到false返回    || 遇到true返回
		this.ifDots = params.ifDots || false;
		this.ifArrow = params.ifArrow || false, // 是否开启左右箭头
		this.ifAutoPlay = params.ifAutoPlay || false ,// 是否开启自动轮播
		this.duration = params.duration > 3000 ? params.duration : 3000 // 自动轮播时间
		
		// 自动轮播的定时器序列号
		this.timer = null;
		// 开启原型初始化
		this.init();
	}
	
	Swiper.prototype = {
		// init: function (){}
		// es6 给对象添加方法可以省略冒号和function
		init(){
			var that = this;
			this.createEle();
			// 嫁接法
			window.arrowClick = function (isRight){
				that.bindArrow(isRight);
			}
			if(this.ifDots) this.bindDots();
			if(this.ifAutoPlay){
				this.autoPlay();
				// 开启关闭自动轮播事件
				this.bindMouse();
			}
		},
		createEle(){
			// 生成imgs  生成小点  生成箭头
			var str = `<ul class="swiper-content" style="width: ${this.imgs.length + "00%"}">`;
			this.imgs.forEach((item,index) => {
				str += `
					<li style="width: ${100 / this.imgs.length + "%"}">
						<img src="${'./banner/' + item}">
					</li>
				`;
			})
			str += "</ul>";
			
			// 添加小点
			if(this.ifDots){
				str += `<ul class="dots">`;
				for(var i = 0; i < this.imgs.length - 1; i ++){
					// 小点点击需要下标, data-index绑定下标
					str += `
						<li data-index="${i}" class="${i === 0 ? 'act' : ''}"></li>
					`;
				}
				str += `</ul>`;
			}
			
			// 添加箭头
			if(this.ifArrow) str += `<div class="arrow arrow-l" onclick="arrowClick()"></div><div class="arrow arrow-r" onclick="arrowClick(true)"></div>`;
			
			this.ele.innerHTML = str;
			
			this.ulEle = this.ele.children[0];
		},
		
		// 绑定左右箭头事件
		bindArrow(isRight){
			if(isRight){
				// 右边
				if(this.count === this.imgs.length - 1){
					this.count = 0;
					this.ulEle.style.left = 0;
				}
				this.count ++;
			}else{
				// 左边
				if(this.count === 0){
					this.count = this.imgs.length - 1;
					this.ulEle.style.left = -this.count * this.w + "px";
				}
				this.count --;
			}
			this.move();
			if(this.ifDots) this.changeDotsAct();
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
		// 鼠标放上去停.离开执行
		bindMouse(){
			var that = this;
			this.ele.onmouseenter = function (){
				clearInterval(that.timer);
			};
			this.ele.onmouseleave = function (){
				that.autoPlay();
			}
		},
		// 开启自动轮播
		autoPlay(){
			var that = this;
			// 定时器无法使用this
			console.log(this.duration);
			this.timer = setInterval(function (){
				that.bindArrow(true);
			},this.duration);
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

	// 将构造函数暴露给全局对象
	window.Swiper = Swiper;
})()