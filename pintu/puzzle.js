
var Puzzle = function(option){
	this._init(option);
}

Puzzle.prototype = {

	_init:function(option){

		this.leverNow = option.leverNow <=2 ? 2 : option.leverNow || 2;

		this.leverArr = [this.leverNow,this.leverNow];

		this.imgOrigArr = [];

		this.imgRandomArr = [];
        this.stepnum = 0

		this.btnObj = document.getElementById('btn');
        this.main = document.getElementById('main');

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
	},

	gameStart:function(){

		this.getImageUrl();
	},

	getImageUrl:function(){

		var self = this;

		this.btnObj.onclick = function(){
			self.inputObj.click();
		}

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
        clearInterval(this.timer)
		this.hasStart = 0;
		setTimeout(function(){
			alert('恭喜完成游戏');
		},600);
	}

}
