var RecodeSearch = {
	$userID: null,
	$flag:null,

	$fromDay:null,
	$toDay:null,
	$innerHtml:null,

	$list:null,
	$basicList:null,
	$basicHtml:null,

	Init: function() {

		var oThis = this;

		oThis.$flag = true;
		
		// 버튼세팅
		oThis.setBindClick();

		slideMenus.Make();

		// today
		var d = new Date();
		oThis.$fromDay = PrtDate01(d);
		oThis.$toDay = PrtDate(d);
		$("#DATE_FROM").val(oThis.$fromDay);
		$("#DATE_TO").val(oThis.$toDay);

		// 핸드폰사이즈에 따라 화면사이즈 세팅
		oThis.setScreenSize();
		
		// 검색
		oThis.searchRecode();


		//
		//oThis.searchSaleItem1();
		
		
	},

	setScreenSize: function() {
		
		$("body").css("zoom", "0.5");
		
	},

	setBindClick: function(){	
		var oThis = this;
		
		$("#extendMenu").bind("click", function() {slideMenus.slideMenu();});
		$("#layerbtn").bind("click", function() {oThis.searchBar();});
		$("#btnSearch").bind("click", function() {oThis.searchRecode();});

		$("#DATE_FROM").bind("click",function(){window.App.M_Date_Day('DATE_FROM','','Y');});
		$("#DATE_TO").bind("click",function(){window.App.M_Date_Day('DATE_TO','','Y');});

		//리스트 클릭 팝업
		$("#btnNoting").bind("click", function(){oThis.closePop();});
	},
	
	searchBar: function(){
		var oThis = this;

		if (oThis.$flag == true)
		{
			$("#layerPopup").hide();
			oThis.$flag = false;
		}
		else if (oThis.$flag == false)
		{
			$("#layerPopup").show();
			oThis.$flag = true;
		}
		
	},

	searchSaleItem1: function(flag) {
		
		var oThis = this;
		var innerHtml = "";

		$.ajax({
			type : "POST",
			dataType : "json",
			url : "../../Rs2_WebService.asmx/SalesItem1",
			//data: param,
			async: false,
			contentType: "application/json; charset=utf-8",
			beforeSend: function() {
			},
			success : function(HttpRequest) {
				 
				oThis.$basicList = $("#content").find("#list");
				var parseData = GetJSON(HttpRequest.d);
				oThis.$salesItem1 = parseData;
				oThis.$basicHtml = "<li>";
				oThis.$basicHtml = "<li><ul class=\"tbl list\"><li><h5 id=\"매장명_"+flag+"\"></h5>";
				oThis.$basicHtml += "<div class='fix9 ico'><div class='ico_stat green'><p class='img_tail'></p><p id=\"일자_"+flag+"\"></p></div></div></li></ul>";
				var chk = false;
				var listSize = parseData.length;
				for (var i=0; i<listSize ;i++ )
				{
					if (i%3 == 0)	{oThis.$basicHtml += "<ul class=\"tbl list\"><li>";chk=true;}
					oThis.$basicHtml += "<div class='datewrap daily'><span class='date'>"+parseData[i].ITEM+"</span></div><h5 class='hdaily' id=\""+parseData[i].ITEM+"_"+flag+"\"></h5>";
					if (i%3 == 2){ oThis.$basicHtml += "</li></ul>";chk=false;}
				}

				if (listSize%3 == 2){oThis.$basicHtml += "<div class='datewrap daily'></div><h5 class='hdaily' id=\"\"></h5>";}
				else if (listSize%3 == 1){oThis.$basicHtml += "<div class='datewrap daily'></div><h5 class='hdaily' id=\"\"></h5><div class='datewrap daily'></div><h5 class='hdaily' id=\"\"></h5>";}
				if (chk) oThis.$basicHtml += "</li></ul>";
				//oThis.$basicList.append(oThis.$basicHtml);

			},
			complete: function(){
				oThis.searchSaleItem2(flag);
		
			},
			error : function(xhr, ajaxOptions, thrownError) {
				//$("#result").val("Sorry there is an error: " + xhr.responseText);
				//LayerProgressBar.Alert("로그인중 오류가 발생했습니다.\n\n" + xhr["statusText"]);
			}
		});
	},

	searchSaleItem2: function(flag) {
		
		var oThis = this;
		var innerHtml = "";

		$.ajax({
			type : "POST",
			dataType : "json",
			url : "../../Rs2_WebService.asmx/SalesItem2",
			//data: param,
			async: false,
			contentType: "application/json; charset=utf-8",
			beforeSend: function() {
			},
			success : function(HttpRequest) {
				 
				oThis.$basicList = $("#content").find("#list");
			
				var parseData = GetJSON(HttpRequest.d);
				oThis.$salesItem2 = parseData;
				//oThis.$basicHtml = "";
				var chk = false;
				var listSize = parseData.length;
				for (var i=0; i<listSize ;i++ )
				{
					if (i%3 == 0)	{oThis.$basicHtml += "<ul class=\"tbl list\"><li>";chk=true;}
				
					oThis.$basicHtml += "<div class='datewrap daily'><span class='date'>"+parseData[i].ITEM+"</span></div><h5 class='hdaily' id=\""+oThis.replaceString(parseData[i].ITEM)+"_"+flag+"\"></h5>";
					//<div class='datewrap daily'><span class='date'>SKT</span></div><h5 class='hdaily'>"+parseData[i].SKT+"</h5>
					if (i%3 == 2)	{oThis.$basicHtml += "</li></ul>";chk=false;}
				}
				if (listSize%3 == 2){oThis.$basicHtml += "<div class='datewrap daily'></div><h5 class='hdaily' id=\"\"></h5>";}
				else if (listSize%3 == 1){oThis.$basicHtml += "<div class='datewrap daily'></div><h5 class='hdaily' id=\"\"></h5><div class='datewrap daily'></div><h5 class='hdaily' id=\"\"></h5>";}
				if (chk) oThis.$basicHtml += "</li></ul>";		
				//oThis.$basicList.append(oThis.$basicHtml);

			},
			complete: function(){
				oThis.searchSaleItem3(flag);
		
			},
			error : function(xhr, ajaxOptions, thrownError) {
				//$("#result").val("Sorry there is an error: " + xhr.responseText);
				//LayerProgressBar.Alert("로그인중 오류가 발생했습니다.\n\n" + xhr["statusText"]);
			}
		});
	},
	
	searchSaleItem3: function(flag) {
		
		var oThis = this;
		var innerHtml = "";

		$.ajax({
			type : "POST",
			dataType : "json",
			url : "../../Rs2_WebService.asmx/SalesItem3",
			//data: param,
			async: false,
			contentType: "application/json; charset=utf-8",
			beforeSend: function() {
			},
			success : function(HttpRequest) {
				 
				oThis.$basicList = $("#content").find("#list");
				var parseData = GetJSON(HttpRequest.d);
				oThis.$salesItem3 = parseData;
				//oThis.$basicHtml = "";
				var chk = false;
				var listSize = parseData.length;
				for (var i=0; i<listSize; i++ )
				{
					if (i%3 == 0)	{oThis.$basicHtml += "<ul class=\"tbl list\"><li>";chk=true;}
				
					oThis.$basicHtml += "<div class='datewrap daily'><span class='date'>"+parseData[i].ITEM+"</span></div><h5 class='hdaily' id=\""+parseData[i].ITEM+"_"+flag+"\"></h5>";
					//<div class='datewrap daily'><span class='date'>SKT</span></div><h5 class='hdaily'>"+parseData[i].SKT+"</h5>
					if (i%3 == 2)	{oThis.$basicHtml += "</li></ul>";chk=false;}
				}
				if (listSize%3 == 2){oThis.$basicHtml += "<div class='datewrap daily'></div><h5 class='hdaily' id=\"\"></h5>";}
				else if (listSize%3 == 1){oThis.$basicHtml += "<div class='datewrap daily'></div><h5 class='hdaily' id=\"\"></h5><div class='datewrap daily'></div><h5 class='hdaily' id=\"\"></h5>";}
		
				if (chk) oThis.$basicHtml += "</li></ul>";
				oThis.$basicHtml += "</li>";
				$("#list").append(oThis.$basicHtml);

			},
			error : function(xhr, ajaxOptions, thrownError) {
				//$("#result").val("Sorry there is an error: " + xhr.responseText);
				//LayerProgressBar.Alert("로그인중 오류가 발생했습니다.\n\n" + xhr["statusText"]);
			}
		});
	},

	searchRecode: function(){
			
		var oThis = this;

		oThis.$userID = Cookies.Get("__SavedID__"); 
		oThis.$fromDay = $("#DATE_FROM").val();
		oThis.$toDay = $("#DATE_TO").val();
		oThis.$innerHtml = "";
		var tempHtml = "";
		var param = JSON.stringify({
			"fromYmd": oThis.$fromDay,
			"toYmd": oThis.$toDay,
			"uid": oThis.$userID
		});

		$.ajax({
			type : "POST",
			dataType : "json",
			url : "../../Rs2_WebService.asmx/SalesDaily",
			data: param,
			async: false,
			contentType: "application/json; charset=utf-8",
			beforeSend: function() {
			},
			success : function(HttpRequest) {

				oThis.$list = $("#content").find("#list");
				
				var parseData = GetJSON(HttpRequest.d);

				var i = 0;
				$.each( parseData, function() {
						
					$.each(this, function(key, value) {
						if (key == "일자" && value == ""){
							oThis.searchSaleItem1(i);
						}
					});
					i++;
				});
				i = 0;

				$.each( parseData, function() {

					if (parseData[i].일자 != "")	oThis.searchSaleItem1(i);

					$.each(this, function(key, value) {
						oThis.$list.find("#"+key+"_"+i).html(value);
						if (key == "매장명" && value == "") oThis.$list.find("#매장명_"+i).html("전 체");
					});
					
					i++;
				});

				oThis.searchBar();

			},
			error : function(xhr, ajaxOptions, thrownError) {
				//$("#result").val("Sorry there is an error: " + xhr.responseText);
				//LayerProgressBar.Alert("로그인중 오류가 발생했습니다.\n\n" + xhr["statusText"]);
			}
		});
	},
	
	replaceString:function(str){
		str = str.replace("[","");
		str = str.replace("]","");

		return str;
	},
	
	//일일실적 클릭이벤트
	recodeClk: function(el,pid){
		var oThis = this;

		var temp = $('#layer1');
		//temp.find('.tit h2').html( "공지사항");
		var bg = temp.prev().hasClass('cal-bg');    //dimmed 레이어를 감지하기 위한 boolean 변수
		
		var screenHeight = 400;//window.App.getScreenSize();
		var currentHeight = $('body').height();
//		if (currentHeight < screenHeight) $('body').height(screenHeight);

		var nowHeight = oThis.getNowScroll();
		var endHeight = nowHeight + screenHeight;

		if(bg){
			$("#calLayer1").show();
			//$('.cal-layer').fadeIn();   //'bg' 클래스가 존재하면 레이어가 나타나고 배경은 dimmed 된다.
			}else{
			temp.show();
		}

		// 화면의 중앙에 레이어를 띄운다.
		if (temp.outerHeight() < $(document).height() ) temp.css('margin-top', (nowHeight+endHeight)/2-(currentHeight/2) +'px');
		else temp.css('top', '0px');
		if (temp.outerWidth() < $(document).width() ) temp.css('margin-left', '-'+temp.outerWidth()/2+'px');
		else temp.css('left', '0px');
		
		$("#btnDelete").unbind("click");

		$("#btnModify").bind("click", function(){oThis.recodeModify(el,pid);});
		$("#btnDelete").bind("click", function(){oThis.recodeDelete(pid);});
	},

	getNowScroll: function(){

		var de = document.documentElement;
		var b = document.body;
		var now = {};

		now.X = document.all ? (!de.scrollLeft ? b.scrollLeft : de.scrollLeft) : (window.pageXOffset ? window.pageXOffset : window.scrollX);
		now.Y = document.all ? (!de.scrollTop ? b.scrollTop : de.scrollTop) : (window.pageYOffset ? window.pageYOffset : window.scrollY);

		return now.Y;

	},
	
	closePop: function(){
		$('.cal-layer').fadeOut(); 
	},

	recodeModify: function(el,pid) {
		location.href = "RecodeModify.html?modifyDate="+el+"&pid="+pid;
	},

	recodeDelete: function(pid) {

		var oThis = this;
	
		var param = "{\"SalesItemDelete\":[";
		
		param += JSON.stringify({
			"pid": pid
		});				
					
		param += "]}";

		var jsonData = JSON.stringify({ 
			'json': param 
		}); 
	
		$.ajax({
			type : "POST",
			dataType : "json",
			url : "../../Rs2_WebService.asmx/SalesItemDelete",
			data: jsonData,
			contentType: "application/json; charset=utf-8",
			beforeSend: function() {
			},
			success : function(HttpRequest) {

				var parseData = GetJSON(HttpRequest.d);
				if (parseData.success == true)
					window.App.messageApp("일일실적이 삭제되었습니다.");
				else if (parseData.success == false)
					window.App.messageApp("일일실적 삭제중 문제가 발생하였습니다.");

				oThis.searchRecode();
				oThis.searchBar();
				oThis.closePop();

			},
			error : function(xhr, ajaxOptions, thrownError) {
				//$("#result").val("Sorry there is an error: " + xhr.responseText);
				//LayerProgressBar.Alert("로그인중 오류가 발생했습니다.\n\n" + xhr["statusText"]);
			}
		});
	}
	
}