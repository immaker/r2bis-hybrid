var WorkManage = {
	$fromDay: null,
	$toDay: null,
	$list: null,

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
		
	},

	setScreenSize: function() {
		
		$("body").css("zoom", "0.5");
		
	},

	setBindClick: function(){	
		var oThis = this;
		
		$("#extendMenu").bind("click", function() {slideMenus.slideMenu();});
		$("#layerbtn").bind("click", function() {oThis.searchBar();});
		$("#btnSearch").bind("click", function() {oThis.searchWork();});

		$("#btnSchedule").bind("click", function() {location.href = "Main.html";});
		$("#btnCancelWork").bind("click", function() {oThis.cancelAsk();})
		
		// 날짜 안드로이드 달력
		$("#DATE_FROM").bind("click",function(){window.App.M_Date_Day('DATE_FROM','','Y');});
		$("#DATE_TO").bind("click",function(){window.App.M_Date_Day('DATE_TO','','Y');});
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

	searchWork: function() {

		var oThis = this;

		oThis.$userID = Cookies.Get("__SavedID__"); 
		oThis.$fromDay = $("#DATE_FROM").val();
		oThis.$toDay = $("#DATE_TO").val();
		oThis.$innerHtml = "";
		
		var diff = DateDiff.Day(Str2Date(oThis.$fromDay),Str2Date(oThis.$toDay));
		if (diff < 0)
		{
			window.App.messageApp("시작날짜가 종료날짜보다 큽니다.");
			return;
		}
		var param = JSON.stringify({
			"fromYmd": oThis.$fromDay,
			"toYmd": oThis.$toDay,
			"uid": oThis.$userID
		});

		$.ajax({
			type : "POST",
			dataType : "json",
			url : "../../Rs2_WebService.asmx/WfmChangeList",
			data: param,
			contentType: "application/json; charset=utf-8",
			beforeSend: function() {
			},
			success : function(HttpRequest) {
				 
				oThis.$list = $("#list");
				var parseData = GetJSON(HttpRequest.d);
				
				for (var i=0; i<parseData.length ;i++ )
					oThis.$innerHtml += "<li onclick=\"WorkManage.confrimCancel('"+parseData[i].변경일+"','"+parseData[i].상태+"')\"><ul class=\"tbl list\"><li><h5>기존:"+parseData[i].변경전+" / 변경:"+parseData[i].변경후+"</h5>" +
						"<div class='fix9 ico'><div class=\"ico_stat "+oThis.setColor(parseData[i].상태)+"\"><p class='img_tail'></p><p>"+oThis.transStat(parseData[i].상태)+"</p></div></div></li></ul>" +
						"<ul class=\"tbl list\"><li><div class=\"bulwrap\"><p>신청일:"+parseData[i].신청일시+" <br> 변경일:"+parseData[i].변경일+"</p></div>" +
						"<div class=\"datewrap price\"><p>"+parseData[i].비고+"</p></div></li></ul></li>";
				
				if (!parseData.length)
					oThis.$innerHtml += "<li><ul class=\"tbl list\"><h5>검색결과가 없습니다.</h5></ul></li>";

				oThis.$list.html(oThis.$innerHtml);
				oThis.searchBar();

			},
			error : function(xhr, ajaxOptions, thrownError) {
				//$("#result").val("Sorry there is an error: " + xhr.responseText);
				//LayerProgressBar.Alert("로그인중 오류가 발생했습니다.\n\n" + xhr["statusText"]);
			}
		});
	},

	confrimCancel: function(askDay, stat) {
		var oThis = this;

		if (stat == 1) return;

		$("#cancelDay").val(askDay);
		$("#cancelStat").val(stat);
		
		var temp = $('#layer2');
		//temp.find('.tit h2').html( "안내");
		//temp.find(".lbl_con").html(str);
		var bg = temp.prev().hasClass('cal-bg');    //dimmed 레이어를 감지하기 위한 boolean 변수
		
		var screenHeight = window.App.getScreenSize();
		var currentHeight = $('body').height();
		if (currentHeight < screenHeight) $('body').height(screenHeight);
		
		if(bg){
			$("#calLayer2").show();
			//$('.cal-layer').fadeIn();   //'bg' 클래스가 존재하면 레이어가 나타나고 배경은 dimmed 된다.
			}else{
			temp.show();
		}
		 
		// 화면의 중앙에 레이어를 띄운다.
		if (temp.outerHeight() < $(document).height() ) temp.css('margin-top', '-'+temp.outerHeight()/2+'px');
		else temp.css('top', '0px');
		if (temp.outerWidth() < $(document).width() ) temp.css('margin-left', '-'+temp.outerWidth()/2+'px');
		else temp.css('left', '0px');
		 
		temp.find('a.cal-cbtn').click(function(e){
			if(bg){
				$("#calLayer2").fadeOut(); //'bg' 클래스가 존재하면 레이어를 사라지게 한다.
			}else{
				temp.fadeOut();
			}
				e.preventDefault();
		});
	},
	cancelAsk: function(){
		var oThis = this;

		if ($("#cancelStat").val() != 0)
			return;

		var param = "{\"WfmChangeCancel\":[";
		param += JSON.stringify({
			"chg_ymd": $("#cancelDay").val(),
			"user_id": Cookies.Get("__SavedID__")
		});
		param += "]}";

		var jsonData = JSON.stringify({ 
			'json': param 
		}); 
		
		
		$.ajax({
			type : "POST",
			dataType : "json",
			url : "../../Rs2_WebService.asmx/WfmChangeCancel",
			data: jsonData,
			contentType: "application/json; charset=utf-8",
			beforeSend: function() {
			},
			success : function(HttpRequest) {
				
				var parseData = GetJSON(HttpRequest.d);
				if (parseData.success == true)
					window.App.messageApp("복무변경이 취소 되었습니다.");
				else if (parseData.success == false)
					window.App.messageApp("복무변경 취소중 문제가 발생하였습니다.");

				oThis.closePop();
				oThis.searchWork();
				oThis.searchBar();
			
			},
			error : function(xhr, ajaxOptions, thrownError) {
				//$("#result").val("Sorry there is an error: " + xhr.responseText);
				//LayerProgressBar.Alert("로그인중 오류가 발생했습니다.\n\n" + xhr["statusText"]);
			}
		});
	},

	transStat: function(flag) {
		if (flag == 0) return "대기";
		else if (flag == 1) return "승인";
		else if (flag == 2) return "반려";
	},
	
	setColor: function(flag) {
		if (flag == 0) return "green";
		else if (flag == 1) return "blue";
		else if (flag == 2) return "red";
	},

	closePop: function(){
		$('.cal-layer').fadeOut(); 
	}
	
}