
var Puzzle = function(option){
	this._init(option);
}

Puzzle.prototype = {

	_init:function(option){
		var _this = this

		this.piclist = {
			hz: ['./hz1.jpg', './hz2.jpg','./hz3.jpg','./hz4.jpg'],
			xz: ['./xz1.jpg','./xz2.jpg','./xz3.jpg','./xz4.jpg'],
			zjj: ['./zjj1.jpg','./zjj2.jpg','./zjj3.jpg','./zjj4.jpg']
		}

		this.leverNow = option.leverNow <=2 ? 2 : option.leverNow || 2;

		this.leverArr = [this.leverNow,this.leverNow];

		this.imgOrigArr = [];

		this.imgRandomArr = [];
        this.stepnum = 0

		this.seconds = null
		this.minutes = null

		this.hz = document.getElementById('hz');
		this.xz = document.getElementById('xz');
		this.zjj = document.getElementById('zjj');
		this.pic_box = document.getElementById('pic_box');
		this.pic_item = document.getElementById('pic_item');

		this.btnObj = document.getElementById('btn');
		// this.btnInit = document.getElementById('btn_init');
        this.main = document.getElementById('main');

		this.score_box = document.getElementById('score_box');
		this.score = document.getElementById('score');
		this.score_ok = document.getElementById('score_ok');
		this.scoreNum = 0
		this.history_score_box = document.getElementById('history_score_box');
		this.history_score_btn = document.getElementById('history_score_btn');

		this.inputObj = document.getElementById('file');
        this.time = document.getElementById('time');
        this.timer = null;
        this.step = document.getElementById('step');

		this.imgArea = document.getElementById('imgArea');

		this.gameStartBtnObj = document.getElementById('gameStart');

		this.gameAreaObj = document.getElementById('gameArea');

		this.imgCells = '';


		this.imgAreaWidth = option.imgAreaSize<=400? 400 : option.imgAreaSize || 400;

		this.imgAreaHeight = option.imgAreaSize<=400? 400 : option.imgAreaSize || 400;


		this.gameAreaObj.style.width = this.imgAreaWidth+'px';
		this.gameAreaObj.style.height = this.imgAreaHeight+this.gameStartBtnObj.offsetHeight+30+'px';


		this.cellWidth = this.imgAreaWidth / this.leverArr[1];

		this.cellHeight = this.imgAreaHeight/this.leverArr[0];


		this.hasStart = 0;


		this.sel = null;


		this.imgUrl = '';
		this.score_ok.onclick = this.score_ok_click()
		this.history_score_btn.onclick = this.history_score_box_show()
		this.history_score_box.onclick = function () {
			_this.history_score_box.style.display = 'none'
		}
		this.pic_box.onclick = function () {
			_this.pic_box.style.transform = 'translateY(-100%)'
		}

	},
	gameStart:function(){

		this.getImageUrl();
	},

	getImageUrl:function(){

		var self = this;

		this.btnObj.onclick = function(){
			self.inputObj.click();
		}
		this.hz.onclick = function(){
			self.showpic('hz');
		}
		this.xz.onclick = function(){
			self.showpic('xz');
		}
		this.zjj.onclick = function(){
			self.showpic('zjj');
		}
		// this.btnInit.onclick = function(){
		// 	self.imgUrl = './' + Math.round( Math.random() * 5) +'.jpg'
		// 	self.imgSplit();
		// }

		this.inputObj.onchange = function(){

			var files = this.files;

			var reader = new FileReader();

			reader.readAsDataURL(files[0]);

			reader.onload = function(){

				self.imgUrl = reader.result;

				self.imgSplit();
			}
		};
	},

	showpic: function(type) {
		var self = this
		this.pic_item.innerHTML = ''
		this.pic_box.style.transform = 'translateY(0)'
		for (let i = 0; i < this.piclist[type].length; i++) {
			var div = document.createElement('div')
			div.setAttribute('class', 'pic_item_f')
			div.style.background = 'url(' + this.piclist[type][i] + ')'
			div.style.backgroundSize = '100%'
			div.onclick = function () {
				self.imgUrl = self.piclist[type][i]
				self.imgSplit()
			}
			this.pic_item.appendChild(div)
		}
	},

	imgSplit:function(){

		this.imgArea.innerHTML = '';

		var _cell = '';


		for (var i = 0, l =this.leverArr[0]; i<l ;i++) {

			for (var j = 0,l =this.leverArr[1]; j<l ;j++) {

				this.imgOrigArr.push(i*this.leverArr[0] + j);

				_cell = document.createElement('div');

				_cell.className = "imgCell";

				_cell.index = i*this.leverArr[0] + j;

				_cell.style.width = this.cellWidth+'px';
				_cell.style.height = this.cellHeight+'px';
				_cell.style.left =  j*this.cellWidth+'px';
				_cell.style.top = i*this.cellHeight + 'px';
				_cell.style.backgroundImage= "url("+this.imgUrl+")";

				_cell.style.backgroundSize = this.leverArr[1]+'00%';

				_cell.style.backgroundPosition = (-j)*this.cellWidth + 'px ' + (-i)*this.cellHeight+'px';

				_cell.style.backgroundOrigin = "border-box";
				this.imgArea.appendChild(_cell);
			}
		}


		this.imgCells = document.querySelectorAll('.imgCell');


		this.main.style.left= -this.main.offsetWidth+'px';

		this.gameAreaObj.style.left = '50%';
		this.gameAreaObj.style.transform= 'translateX(-50%)';


		document.body.style.overflowY = "auto";


		this.gameStartBtnObj.onclick = this.clickHandle();
	},

	clickHandle:function(){

		var _self = this;
		return function(){

			if(_self.hasStart == 0){
                clearInterval(_self.timer)
                _self.stepnum = 0
                _self.step.innerHTML = 0
                _self.timeStart()

				_self.hasStart = 1;

				_self.randomArr();

				_self.cellOrder();

				for(var i = 0,l = _self.imgCells.length;i<l;i++){
					_self.imgCells[i].onclick = function(){

						if(_self.sel === null){

							_self.sel = this.index;

							this.style.border = "2px solid red";
						}else{

							_self.imgCells.forEach(function(element){
								element.style.border = "1px solid #fff";
							});


							if(this.index === _self.sel){
								_self.sel = null;
								return ;
							}else{


								_self.cellExchange(_self.sel,this.index);
							}


							_self.sel = null;
						}

					}
				}
			}
		}
	},
	score_ok_click: function () {
		var self = this
		return function () {
			self.score_box.style.display = 'none'
			var scoreList = JSON.parse(localStorage.getItem('scoreList')) || []
			scoreList.push(Math.round(self.scoreNum))
			localStorage.setItem('scoreList', JSON.stringify(scoreList))
		}
	},
	history_score_box_show: function() {
		var self = this
		return function () {
			self.history_score_box.innerHTML = ''
			self.history_score_box.style.display = 'block'
			var scoreList = JSON.parse(localStorage.getItem('scoreList')) || []
			var newscoreList = scoreList.sort(function(a, b) {
				  return b - a;
				})
			if (scoreList.length) {
				for (var i = 0; i < scoreList.length; i++) {
					var div = document.createElement('div')
					div.setAttribute('class', 'history_score_item')
					div.innerHTML = '<div>' + (i + 1) + '</div><div>' + scoreList[i] +'</div>'
					self.history_score_box.appendChild(div)
				}
			} else {
				self.history_score_box.innerHTML = '暂时没有成绩记录，快去玩一局吧'
			}
		}
	},
    timeStart: function() {
        var _self = this;
        var startT = new Date().getTime()
        this.timer = setInterval(function() {
            var dist = new Date().getTime() - startT
            var days=Math.floor(dist/(24*3600*1000))
            var leave1=dist%(24*3600*1000)
            var hours=Math.floor(leave1/(3600*1000))
            var leave2=leave1%(3600*1000)
            var minutes=Math.floor(leave2/(60*1000))
            var leave3=leave2%(60*1000)
            var seconds=Math.round(leave3/1000)
			_self.seconds = seconds
			_self.minutes = minutes
            if (minutes) {
                _self.time.innerHTML = minutes +'分 '+seconds+"秒"
            } else {
                _self.time.innerHTML = seconds+"秒"
            }

        }, 1000)
    },

	randomArr:function(){

		this.imgRandomArr = [];

		var _flag = true;

		for(var i=0,l=this.imgOrigArr.length;i<l;i++){

			var order = Math.floor(Math.random()*this.imgOrigArr.length);

			if(this.imgRandomArr.length>0){
				while(this.imgRandomArr.indexOf(order) >-1){
					order = Math.floor(Math.random()*this.imgOrigArr.length);
				}
			}
			this.imgRandomArr.push(order);
		}


		if(this.imgRandomArr.length === this.imgOrigArr.length){

			for(var i=0,l=this.imgOrigArr.length;i<l;i++){
				if(this.imgRandomArr[i] != this.imgOrigArr[i]){
					_flag = false;
					break;
				}else{
					_flag = true;
				}
			}
		}else{
			_flag = true;
		}


		if(_flag){
			this.randomArr();
		}
	},

	cellOrder:function(){

		var _self = this;

		this.imgCells.forEach(function(element,index){

			element.style.left = _self.imgRandomArr[index] % _self.leverArr[1] * _self.cellWidth+'px';
			element.style.top = Math.floor(_self.imgRandomArr[index] / _self.leverArr[1]) * _self.cellHeight+'px';
		});
	},

	cellExchange:function(from,to){

		var _fromRow = Math.floor(this.imgRandomArr[from] / this.leverArr[1]);

		var _fromCol = this.imgRandomArr[from] % this.leverArr[1];

		var _toRow = Math.floor(this.imgRandomArr[to] / this.leverArr[1]);
		var _toCol = this.imgRandomArr[to] % this.leverArr[1];


		this.imgCells[from].style.left = _toCol*this.cellWidth + 'px';
		this.imgCells[from].style.top = _toRow*this.cellHeight + 'px';

		this.imgCells[to].style.left = _fromCol*this.cellWidth + 'px';
		this.imgCells[to].style.top = _fromRow*this.cellHeight + 'px';


		var _temp = this.imgRandomArr[from];
		this.imgRandomArr[from] = this.imgRandomArr[to];
		this.imgRandomArr[to] = _temp;
        this.stepnum += 1
        this.step.innerHTML = this.stepnum


		if(this.imgOrigArr.toString() === this.imgRandomArr.toString()){

			this.success();
		}
	},

	success:function(){
		var _this = this
		this.scoreNum = (6 * 10) / (this.minutes * 60 +  this.seconds) / this.stepnum * 1000
        clearInterval(this.timer)
		this.hasStart = 0;
		var scoreInit = 0
		setTimeout(function(){
			_this.score_box.style.display = 'block'
			var score_timer = setInterval(function() {
				if (scoreInit <= _this.scoreNum) {
					_this.score.innerHTML = scoreInit
					scoreInit += 1
				} else {
					clearInterval(score_timer)
				}

			}, 4)
		},600);
	}

}
