/************************************************************
 * 自動的に目次を作成するスクリプト                         *
 ************************************************************/
//var min=2;			 最も外側の見出しレベル
//var max=4;			 最も内側の見出しレベル
var h=new Array();	// 見出しに必要な node を入れる配列
var str='<h2>Contents</h2>';	// 目次を入れる変数
/************************************************************
 * 目次を作成する関数                                       *
 ************************************************************/
function mktoc(min,max){
	var i;		// カウンタ
	// body 直下の node をすべて取得
	var elmnts=document.body.childNodes;
	// 目次の作成に必要な node のみを選択し，global 変数 h に代入
	for(i=0;i<elmnts.length;i++){
		if(elmnts[i].nodeName.charAt(0)=='H'&&min<=elmnts[i].nodeName.charAt(1)&&elmnts[i].nodeName.charAt(1)<=max){
			h.push(elmnts[i]);
		}
	}
	// 目次を出力(配列の先頭から始めるので pointer は 0)
	opt_ul(0);
	document.getElementById('toc').innerHTML=str;
}
/************************************************************
 * 目次を ul の形式で出力する関数                           *
 * 見出しの階層は1つずつ増加すると仮定している※            *
 * (例えば h2 の次に h4 以下は出現しないと仮定している)     *
 ************************************************************/
function opt_ul(ptr){
	var l=h[ptr].nodeName.charAt(1);
	//alert(l);
	str+='<ul>';
	do{
		// ここで上の※を仮定
		// (すなわち必ず1つは li 要素が存在すると仮定)
		str+='<li><a href=\"#'+h[ptr].id+'\">'+h[ptr].innerHTML+'</a>';
		if(ptr+1<h.length&&l<h[ptr+1].nodeName.charAt(1)){
			ptr=opt_ul(ptr+1);	// 処理が終了した node のポインタを返す＊
		}
		str+='</li>';
	}while(ptr+1<h.length&&l==h[ptr+1].nodeName.charAt(1)&&++ptr);
	str+='</ul>';
	return ptr;	// 現在のポインタを返す＊
}
