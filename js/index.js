function ChangeBackground(i) {
	// 背景图中翔子小姐会出现两个(年龄)，但是最后一张会导致图片不好(对)看(称)，所以去掉
	if (i > 5) {
		return;
	}
	var img = new Image();
	img.src = 'img/Aobuta_Anime_Teaser' + i + '.png';
	img.onload = function() {
		$('.bg').css('background-image', 'url(img/Aobuta_Anime_Teaser' + i++ + '.png');
		setTimeout(function() {
			ChangeBackground(i);
		}, 5000);
	};
}

// (原)刮刮乐，鼠标移动上去显示，否则透明度高几乎不可见
function HideContent() {
	$('.ggl').mouseenter(function() {
		$(this).animate({opacity: '1.0'});
	}).mouseleave(function() {
		$(this).animate({opacity: '0.05'});
	});
}

// 是否使用谷歌搜索
var useGoogle = false;
// 搜索跳转
function Search(kw) {
	if(useGoogle) {
		location.href = 'https://www.google.com/search?ie=UTF-8&q=' + kw;
	} else {
		location.href = 'https://www.baidu.com/s?ie=UTF-8&wd=' + kw;
	}
}

// 检查是否自定义关键词
var beforeNextDisplay = null;
function CustomKeyWords(kw) {
	if (kw == '' || !kw) {
		return;
	}
	// 遍历
	$.each(kws, function(key, func) {
		// 如果是子串，进行相应操作
		if (key.indexOf(kw) != -1 || kw.indexOf(key) != -1) {
			if (beforeNextDisplay) {
				beforeNextDisplay();
			}
			func.func();
			HideContent();
			if (func.bndFunc) {
				beforeNextDisplay = func.bndFunc;
			}
			return false;
		}
	});
}

$(document).ready(function() {
	// 改变背景图
	ChangeBackground(1);
	// 搜索框回车进行搜索，设置搜索框的焦点
	var kw = '';
	$('#kw').keyup(function(ev) {
		if (ev.which == 13) {
			// 回车，进行搜索
			Search($(this).val());
		}
		else if (kw != $('#kw').val()) {
			// 内容变化了比较一下是不是自定义的关键词
			CustomKeyWords($(this).val());
		}
		kw = $(this).val();
	}).focus();
	// 双叶一下按钮
	$('.btn').click(function() {
		Search($(this).val());
	});
	// 随机显示，如果链接参数有 dprd 且为 0 则不显示
	if (location.href.indexOf('dprd=0') == -1) {
		var keys = Object.keys(kws);
		var func = kws[keys[Math.round(Math.random() * (keys.length - 1))]];
		if (func.bndFunc) {
			beforeNextDisplay = func.bndFunc;
		}
		func.func();
		HideContent();
	}
	// 检测谷歌
	var img = new Image();
	// 图片加上随机数避免关闭vpn后缓存造成的判断错误
	img.src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png?" + Math.random().toString();
	img.onload = function() {
		useGoogle = true;
	};
});