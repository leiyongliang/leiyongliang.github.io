
var CommentForm = React.createClass({
	setCookie(e){
		e.preventDefault();
		var author = this.refs.author.value.trim();
		var text = this.refs.text.value.trim();
		if(!text||!author){
			return;
		}
		var data = [{author:author,text:text}];
		var datas = localStorage.getItem("data");
		datas = JSON.parse(datas)
		if(!datas){
			datas=[];
		}
		datas = datas.concat(data);
		localStorage.setItem("data",JSON.stringify(datas));
		this.props.onCommentSubmit();
		this.refs.form.reset();
		return;
		},
	render(){
		return (
			<form className="commentform" onSubmit={this.setCookie} ref="form">
				<input type="text" placeholder="Your name" ref="author" className="comauthor"/>
				<input type="text" placeholder="Say something..." ref="text" className="comtext"/>
				<input type="submit" value="submit" className="comsubmit"/>
			</form>
			);
	}
});

var Comment = React.createClass({
	render(){
		return (
			<div className="comment">

				<h2 className="commentauthor">
					{this.props.author} Say:
				</h2>
				{this.props.children}
			</div>
			);
	}
})


var CommentList = React.createClass({
	render(){
		var commentNodes = this.props.data.map((comment,index)=><Comment author={comment.author} key={index}>{comment.text}</Comment>);
		return (
			<div className="commentlist">
				{commentNodes}
			</div>
			);
	}
});

var CommentBox = React.createClass({
	loadCommentsFromServer(){
		this.setState({data:this.state.data.concat(JSON.parse(localStorage.getItem("data")))})
	},
	handleCommentSubmit(){
		this.setState({data:JSON.parse(localStorage.getItem("data"))})
	},
	getInitialState(){
		return {data:[{author:"john",text:"不错，不错！"}]};
	},
	componentDidMount(){
		this.loadCommentsFromServer();
	},
	render(){
		return (
			<div className="commentbox">
				<CommentList data={this.state.data}/>
				<CommentForm onCommentSubmit={this.handleCommentSubmit} />
			</div>
			)
	}
})

ReactDOM.render(
	<CommentBox />,
	document.getElementById('example')
	);
