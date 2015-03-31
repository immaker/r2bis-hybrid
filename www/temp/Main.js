var Main = {
	$memberID: null,
	$memberName: null,
	$memberDept: null,
	$box: null,
	$dayBox: null,
	$todayBox: null,
	$today: null,
	$body: null,

	Init: function() {

		var oThis = this;	
	
		//oThis.setCal("");
		oThis.search();

		// 애니메이션 효과 메뉴
		//$( "#accordion" ).accordion();
		
		// 사이드 메뉴
		slideMenus.Make();
		//slideMenus.setMenu("workManage","근태관리",2);
		
		//today
		oThis.$today = new Date();
		oThis.$today = PrtDate(oThis.$today);
		
		oThis.searchWorkType();
		// 핸드폰사이즈에 따라 화면사이즈 세팅
		oThis.setScreenSize();	
		
	},

	setScreenSize: function() {
		
		$("body").css("zoom", "0.5");
		this.$body = top.document.getElementsByTagName("body")[0]
		
		
	},

	setBindClick: function(){	
		var oThis = this;

		$("#year").bind("change", function() { MonthScheduleTools.GenDay();});	//
		$("#month").bind("change", function() { MonthScheduleTools.GenDay(); oThis.search();});	//
		//$("#noticeLine_1").bind("click", function() {oThis.noticeClk(el);});
		$("#btnSave").bind("click", function() {oThis.changeWork();});
		$("#btn_addList").bind("click", function() {oThis.addList(); });
		$("#btnAskWork").bind("click", function() {oThis.workDailyChk();});
		$("#btn_exit").bind("click", function() {oThis.exit();});
		$("#btn_cancle").bind("click", function() {oThis.closePop();});
		$("#extendMenu").bind("click", function() {slideMenus.slideMenu();});
	},

	search: function() {
		var oThis = this;
		
		var date = $("#year").val() + "-" + $("#month").val();

		var param = JSON.stringify({
			"month": date,
			"uid": Cookies.Get("__SavedID__")
//			memberIP: this.$memberIP.val(),
//			memberPORT: this.$memberPORT.val()
		});

		$.ajax({
			type : "POST",
			dataType : "json",
			url : "../../Rs2_WebService.asmx/Schedule",
			data: param,
			contentType: "application/json; charset=utf-8",
			beforeSend: function() {
			},
			success : function(HttpRequest) {
				
				//$("#result").val(HttpRequest.d);
				var parseData = GetJSON(HttpRequest.d);
				
				var wfmMonth = parseData.WFM_MONTH; 
				var wfmChange = parseData.WFM_CHANGE;
				var wfmDaily = parseData.WFM_DAILY;

				//alert(parseData[5]);
				oThis.setCal(wfmMonth, wfmChange, wfmDaily);

			},
			error : function(xhr, ajaxOptions, thrownError) {
				//$("#result").val("Sorry there is an error: " + xhr.responseText);
				alert("Sorry there is an error: " + xhr.responseText);
				//LayerProgressBar.Alert("로그인중 오류가 발생했습니다.\n\n" + xhr["statusText"]);
			}
		});
	},

	changeWork: function(){
		
		var oThis = this;
		
		var param = "{\"WfmChangeInput\":[";
		param += JSON.stringify({
			"chg_ymd": $("#changeDay").val(),
			"user_id": Cookies.Get("__SavedID__"),
			"org_wtype": $("#beforeWork").val(),
			"chg_wtype": $("#afterWork").val(),
			"reason": $("#etc").val()
		});
		param += "]}";

		var jsonData = JSON.stringify({ 
			"json": param 
		}); 

		$.ajax({
			type : "POST",
			dataType : "json",
			url : "../../Rs2_WebService.asmx/WfmChangeInput",
			data: jsonData,
			contentType: "application/json; charset=utf-8",
			beforeSend: function() {
			},
			success : function(HttpRequest) {
				
				var parseData = GetJSON(HttpRequest.d);
				if (parseData.success == true)			
					window.App.messageApp("복무변경신청이 완료 되었습니다.");
				else if (parseData.success == false)
					window.App.messageApp("복무변경중 문제가 발생하였습니다.");

				if($("#layer2").prev().hasClass('cal-bg')){
					$("#calLayer2").fadeOut(); //
				}else{
					$("#layer2").fadeOut();
				}

			},
			error : function(xhr, ajaxOptions, thrownError) {
				//$("#result").val("Sorry there is an error: " + xhr.responseText);
				alert("Sorry there is an error: " + xhr.responseText);
				//LayerProgressBar.Alert("로그인중 오류가 발생했습니다.\n\n" + xhr["statusText"]);
			}
		});

//		 {`wfm_change` :  [{`chg_ymd`: `2014-07-27`,`user_id`:`48886`,`org_wtype`:`출근`,`chg_wtype`:`연차`,`reason`:`가사정리`}]}"; 
/*
공지사항 등록/삭제 
근태 변경신청 등록/취소 
출근 신청 등록/취소 

*/

	},
	
	searchWorkType: function(){
		var oThis = this;
		var innerHtml;
		$.ajax({
			type : "POST",
			dataType : "json",
			url : "../../Rs2_WebService.asmx/WfmTypeList",
			//data: param,
			contentType: "application/json; charset=utf-8",
			beforeSend: function() {
			},
			success : function(HttpRequest) {
				
				//$("#result").val(HttpRequest.d);
				var parseData = GetJSON(HttpRequest.d);

				for (var i=0;i <parseData.length ;i++ )
					innerHtml += "<option value=\""+parseData[i].WFM_NAME+"\">"+parseData[i].WFM_NAME+"</option>";
				
				$("#afterWork").html(innerHtml);
				

			},
			error : function(xhr, ajaxOptions, thrownError) {
				//$("#result").val("Sorry there is an error: " + xhr.responseText);
				alert("Sorry there is an error: " + xhr.responseText);
				//LayerProgressBar.Alert("로그인중 오류가 발생했습니다.\n\n" + xhr["statusText"]);
			}
		});

		
	},

	setMenu: function(){

		var menuTitleArr =  ["일정,공지사항,월복무변경내역","센터복무","급여검증"];
		var urlArr = ["/m/html/Main.html","/m/html/WorkChange.html","/m/html/Notice.html"];

		window.App.setMenuApp(menuTitleArr, urlArr);
		
	},
	
	//공지사항 리스트 클릭이벤트
	noticeClk: function(el){
		var oThis = this;
		
		var temp = $('#layer1');
		temp.find('.tit h2').html( "공지사항");
		var bg = temp.prev().hasClass('cal-bg');    //dimmed 레이어를 감지하기 위한 boolean 변수
		 
		if(bg){
			$("#calLayer1").show();
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
				$("#calLayer1").fadeOut(); //'bg' 클래스가 존재하면 레이어를 사라지게 한다.
			}else{
				temp.fadeOut();
			}
				e.preventDefault();
		});

		// data setting
		var titleCon = $("#"+el).find('h5').html();
		$("#noticeTitle").html(titleCon + "<input type='text' readonly />");

		var writeTime = $("#"+el).find('.bulwrap').html();
		var writePer  = $("#"+el).find('.datewrap').html();
		$("#noticeInfo").html(writeTime + " " + writePer);
		
		$("#noticeCon").html(titleCon);
		/*$('.cal-layer .cal-bg').click(function(e){  //배경을 클릭하면 레이어를 사라지게 하는 이벤트 핸들러
			$('.cal-layer').fadeOut();
			e.preventDefault();
		});
		*/
	},

	confrimPop: function(clkDay, dd){

		var oThis = this;
			
		this.$box = $("table.month_schedule tbody");
		this.$todayBox = this.$box.find(".select02");
		
		var workType = this.$todayBox.find("dd[event='"+dd+"']").html();
		if (workType != "출근") return;
		
		var temp = $('#layer1');
		temp.find('#todayWork').val(clkDay);
		
		var bg = temp.prev().hasClass('cal-bg');    //dimmed 레이어를 감지하기 위한 boolean 변수
		
		var screenHeight = window.App.getScreenSize();
		var currentHeight = $('body').height();
		if (currentHeight < screenHeight) $('body').height(screenHeight);
		 
		if(bg){
			$("#calLayer1").show();
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
				$("#calLayer1").fadeOut(); //'bg' 클래스가 존재하면 레이어를 사라지게 한다.
			}else{
				temp.fadeOut();
			}
				e.preventDefault();
		});

	},

	// 달력셀 클릭 이벤트
	moveDay: function( tempDay){
		var oThis = this;
		var dd;
		if (tempDay < 10)
			dd = "0" + tempDay;
		else 
			dd = tempDay;
		var clkDay = $("#year").val() +"-"+ $("#month").val() +"-"+ dd;

		var diff = DateDiff.Day(Str2Date(oThis.$today),Str2Date(clkDay));
	
		if ( diff == 0 )
		{
			//window.App.messageApp("today");
			oThis.confrimPop(clkDay, tempDay);
			return;
		}
		else if (diff < 1)
		{
			window.App.messageApp("복무변경 가능일이 아닙니다.");
			return;
		}

		//$("#innerContent").html('오늘은 ' + tempDay + ' 일 입니다.');
		//var temp = $('#' + el);
		var temp = $('#layer2');
		//temp.find('.tit h2').html("복무변경");
		var bg = temp.prev().hasClass('cal-bg');    //dimmed 레이어를 감지하기 위한 boolean 변수

		var screenHeight = window.App.getScreenSize();
		var currentHeight = $('body').height();
		if (currentHeight < screenHeight) $('body').height(screenHeight);

		if(bg){
			$("#calLayer2").show();   //'bg' 클래스가 존재하면 레이어가 나타나고 배경은 dimmed 된다.
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
		 
			$("#calLayer2").find('.cal-bg').click(function(e){  //배경을 클릭하면 레이어를 사라지게 하는 이벤트 핸들러
			$('.cal-layer').fadeOut();
			e.preventDefault();
		});

		this.$box = $("table.month_schedule tbody");
		
		var chkEvent = this.$box.find("dd[event='"+tempDay+"']").html();
	
		if (chkEvent.length == 0)
			$("#btnNotice").empty();
		else 
			$("#btnNotice").html("<button class='base' onclick=\"Main.noticeConfirm('"+dd+"');\"><p>공지사항</p></button>");
/*
		if (chkWork.length == 0)
			$("#btnWorkChange").empty();
		else 
			$("#btnWorkChange").html("<button class='base' onclick=\"Main.goWorkChange('"+tempDay+"');\"><p>복무변경</p></button>");

		if ((chkWork.length == 0 && chkEvent.length == 0))
			$("#btnNoting").html("<button class='base'><p>일정이 없습니다.</p></button>");
		else
			$("#btnNoting").empty();
*/
		
		//사번이름
		$("#userIdName").val(Cookies.Get("__SavedID__")+"/"+ Cookies.Get("__SavedNAME__"));
		$("#changeDay").val(clkDay);
		this.$box = this.$box.find("dd[event='"+dd+"']");
		$("#beforeWork").val(this.$box.find('span').html());

	},
	
	endApp: function(){

		var oThis = this;
		
		var temp = $('#layer3');
		//temp.find('.tit h2').html( "안내");
		var bg = temp.prev().hasClass('cal-bg');    //dimmed 레이어를 감지하기 위한 boolean 변수
		
		var screenHeight = window.App.getScreenSize();
		var currentHeight = $('body').height();
		if (currentHeight < screenHeight) $('body').height(screenHeight);

		if(bg){
			$("#calLayer3").show();
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
				$("#calLayer3").fadeOut(); //'bg' 클래스가 존재하면 레이어를 사라지게 한다.
			}else{
				temp.fadeOut();
			}
				e.preventDefault();
		});

	},
	
	// 어플 종료 
	exit: function() {

		window.App.exitApp();
	},

	noticeConfirm: function(tempDay){
		var oThis = this;
		oThis.closePop();
		oThis.noticeClk("noticeLine_3");
	},
		
	closePop: function(){
		$('.cal-layer').fadeOut(); 
	},

	selectInit: function(){

		var strYear = parseInt(PrtDate(today).substring(0,4));
		for (var i = strYear-1;i< strYear +2; i++)
		{
			var selected = "";
			if(i == strYear)
				selected = "selected";
			else
				selected = "";

			$("#year").append("<option value='"+i+"' " + selected + ">"+i +"</option>");
		}
		for (var i = 1;i < 13 ; i++)
		{
			var selected = "";
			var tempI = "";
			if(i < 10)
			{
				tempI = "0" + i;
			}
			else
				tempI = i;

			if( Number(tempI) == Number(PrtDate(today).substring(5,7)))
				selected = "selected";
		
			else
				selected = "";
		
			$("#month").append("<option value='"+ tempI +"' " + selected +">"+ tempI +"</option>");
		}

	},

	setCal: function(myData, wfmChange, wfmDaily){
		
		//var parseData = GetJSON(myData[1]);
		//alert(myData[3].length);
		// 달력 dom 값 세팅

		if (!myData)
			return;
		

		this.$box = $("table.month_schedule tbody");
		this.$todayBox = this.$box.find(".select02");
		
		if (!myData.length) return;

		for (var i=0;i<32 ;i++ )
		{
			if (myData[0][i] == "출근")
				this.$box.find("dd[event='"+(i)+"']").html("<span class='dateinfo colorv'>"+myData[0][i]+"</span>");
			else if (myData[0][i] == "휴무")
				this.$box.find("dd[event='"+(i)+"']").html("<span class='dateinfo'>"+myData[0][i]+"</span>");
			else 
				this.$box.find("dd[event='"+(i)+"']").html("<span class='dateinfo'>"+myData[0][i]+"</span>");

			if (wfmChange[0][i])
				this.$box.find("dd[chg='"+(i)+"']").html("<span class='dateinfo colorg'>"+wfmChange[0][i]+"</span>");

		}
		
	},
	
	// 출근 신청
	workDailyChk: function(){
		var oThis = this;
		
		//$("#changeDay").val(clkDay);

		var clkDay = $("#todayWork").val();
		clkDay = clkDay.split("-");
		this.$box = $("table.month_schedule tbody");
		this.$box = this.$box.find("dd[event='"+clkDay[2]+"']");
		
		//alert($("#todayWork").val() + "///" + this.$box.find('span').html());

		var param = "{\"WfmDailyInput\":[";
		param += JSON.stringify({
			"std_ymd": $("#todayWork").val(),
			"wtype": this.$box.find('span').html(),
			"user_id": Cookies.Get("__SavedID__")
		});
		param += "]}";

		var jsonData = JSON.stringify({ 
			'json': param 
		}); 
		
		
		$.ajax({
			type : "POST",
			dataType : "json",
			url : "../../Rs2_WebService.asmx/WfmDailyInput",
			data: jsonData,
			contentType: "application/json; charset=utf-8",
			beforeSend: function() {
			},
			success : function(HttpRequest) {
				
				var parseData = GetJSON(HttpRequest.d);
				if (parseData.success == true)
					window.App.messageApp("출근신청 되었습니다.");
				else if (parseData.success == false)
					window.App.messageApp("출근신청중 문제가 발생하였습니다.");

				oThis.closePop();
				
			},
			error : function(xhr, ajaxOptions, thrownError) {
				//$("#result").val("Sorry there is an error: " + xhr.responseText);
				//LayerProgressBar.Alert("로그인중 오류가 발생했습니다.\n\n" + xhr["statusText"]);
			}
		});
	},
};