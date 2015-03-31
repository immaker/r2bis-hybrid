var GroupStat = {
	$userID: null,
	$flag:null,
	$grade:null,

	$fromDay:null,
	$toDay:null,
	$innerHtml:null,

	$chart:null,

	Init: function() {

		var oThis = this;

		oThis.$flag = true;
		oThis.$grade = Cookies.Get("__SavedGRADE__");

		// 버튼세팅
		oThis.setBindClick();

		slideMenus.Make();

		// today
		var d = new Date();
		oThis.$fromDay = PrtDate01(d);
		oThis.$toDay = PrtDate(d);
		$("#DATE_FROM").val(oThis.$fromDay);
		$("#DATE_TO").val(oThis.$toDay);


		//oThis.createChart();

		// 핸드폰사이즈에 따라 화면사이즈 세팅
		
		oThis.searchRecode();
		//oThis.showGraph();
		//$("#chartWrap").css("zoom", "2");

		oThis.setScreenSize();

		if (oThis.$grade < 3)
			$("#searchType").append("<option value=\"sub\">소속별</option>");
		
		
	},

	setScreenSize: function() {
		
		$("body").css("zoom", "0.5");
		
		//$("body").height(maxHeight-50);
		
	},

	setBindClick: function(){	
		var oThis = this;
		
		$("#extendMenu").bind("click", function() {slideMenus.slideMenu();});
		$("#layerbtn").bind("click", function() {oThis.searchBar();});
		$("#btnSearch").bind("click", function() {oThis.searchRecode();});

		$("#DATE_FROM").bind("click",function(){window.App.M_Date_Day('DATE_FROM','','Y');});
		$("#DATE_TO").bind("click",function(){window.App.M_Date_Day('DATE_TO','','Y');});

		//$("#searchType").bind("change",function(){oThis.searchRecode();});
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

	searchRecode: function(){
			
		var oThis = this;
		var searchUrl;

		oThis.$userID = Cookies.Get("__SavedID__"); 
		oThis.$fromDay = $("#DATE_FROM").val();
		oThis.$toDay = $("#DATE_TO").val();
		oThis.$innerHtml = "";

		var param = JSON.stringify({
			"fromYmd": oThis.$fromDay,
			"toYmd": oThis.$toDay
		});
		
		if ($("#searchType").val() == "grp") searchUrl = "../../Rs2_WebService.asmx/SalesTopGroup";
		else if ($("#searchType").val() == "man") searchUrl = "../../Rs2_WebService.asmx/SalesMgrGroup";
		else if ($("#searchType").val() == "sub"){
			searchUrl = "../../Rs2_WebService.asmx/SalesSubGroup";
			param = JSON.stringify({
			"uid": oThis.$userID,
			"fromYmd": oThis.$fromDay,
			"toYmd": oThis.$toDay
		});
		}
		
		$.ajax({
			type : "POST",
			dataType : "json",
			url : searchUrl,
			data: param,
			contentType: "application/json; charset=utf-8",
			beforeSend: function() {
			},
			success : function(HttpRequest) {

				//oThis.$list = $("#content").find("#list");

				var parseData = GetJSON(HttpRequest.d);
			
				oThis.searchBar();

				oThis.showGraph(parseData);
				oThis.showList(parseData);
				$("#searchInterval").html(oThis.$fromDay + " ~ " + oThis.$toDay + " 조회 결과입니다.");

			},
			error : function(xhr, ajaxOptions, thrownError) {
				//$("#result").val("Sorry there is an error: " + xhr.responseText);
				//LayerProgressBar.Alert("로그인중 오류가 발생했습니다.\n\n" + xhr["statusText"]);
			}
		});
	},
	
	showGraph: function(parseData) {
		//$("#chartWrap").css("zoom", "2");
		//$('#chart').jqbar({ label: 'Label', value: 90, barColor: '#D64747', orientation: 'h', barWidth: 20 });
		var oThis = this;
		//oThis.jsonData = "[";
		var names = [];
		var values = [];
		var maxVal = 0;
		for (var i=1; i<parseData.length;i++ )
		{
			if ($("#searchType").val() == "grp")names.push(parseData[i].상위그룹);
			else if ($("#searchType").val() == "man") names.push(parseData[i].매니저명);
			else if ($("#searchType").val() == "sub") names.push(parseData[i].소속명);
			values.push(parseData[i].KT);
			if (parseData[i].KT > maxVal) maxVal = parseData[i].KT;
		}
		
		$("#chartdiv").empty();

		var options = {
			'legend': {
				names: names,
	            hrefs: []
	        },
	        'dataset': {
	            title: 'sell phone',
	            values: values,
	            colorset: ['#56b4e9'],
	        },
	        'chartDiv': 'chartdiv',
	        'chartType': 'column',
	        'chartSize': { width: 700, height: 600 },
	        'maxValue': maxVal,
	        'increment': 50
		};

		

		Nwagon.chart(options);
	
	},

	showList: function(parseData){
		
		var innerHtml = "";
		if ($("#searchType").val() == "grp")
		{
			for (var i=0; i<parseData.length ;i++ )
			{
				if (parseData[i].상위그룹 != Cookies.Get("__SavedTOPNAME__"))
					innerHtml += "<ul class=\"tbl_list\">" +
					"<li><ul class=\"tbl list\"><li><div class=\"numwrap\"><span>"+i+"</span></div>" +
					"<h5>상위그룹:"+parseData[i].상위그룹+"</h5>" +
					"<div class='datewrap'><span class='date'>"+parseData[i].KT+"</span></div></li></ul></li></ul>";
				else
					innerHtml += "<ul class=\"tbl_list\">" +
					"<li><ul class=\"tbl list\" style=\"background-color: #B2CCFF;\"><li><div class=\"numwrap\"><span>"+i+"</span></div>" +
					"<h5>상위그룹:"+parseData[i].상위그룹+" <br></h5>" +
					"<div class='datewrap'><span class='date'>"+parseData[i].KT+"</span></div></li></ul></li></ul>";
				
			}	
		}
		else if ($("#searchType").val() == "man")
		{
			for (var i=0; i<parseData.length ;i++ )
			{
				if (parseData[i].매니저명 != Cookies.Get("__SavedNAME__"))
					innerHtml += "<ul class=\"tbl_list\">" +
					"<li><ul class=\"tbl list\"><li><div class=\"numwrap\"><span>"+i+"</span></div>" +
					"<h5>매니저명:"+parseData[i].매니저명+"</h5>" +
					"<div class='datewrap'><span class='date'>"+parseData[i].KT+"</span></div></li></ul></li></ul>";
				else
					innerHtml += "<ul class=\"tbl_list\">" +
					"<li><ul class=\"tbl list\" style=\"background-color: #B2CCFF;\"><li><div class=\"numwrap\"><span>"+i+"</span></div>" +
					"<h5>매니저명:"+parseData[i].매니저명+" <br></h5>" +
					"<div class='datewrap'><span class='date'>"+parseData[i].KT+"</span></div></li></ul></li></ul>";
				
			}	
		}
		else if ($("#searchType").val() == "sub")
		{
			for (var i=0; i<parseData.length ;i++ )
			{
				if (parseData[i].소속명 != Cookies.Get("__SavedSUBNAME__"))
					innerHtml += "<ul class=\"tbl_list\">" +
					"<li><ul class=\"tbl list\"><li><div class=\"numwrap\"><span>"+i+"</span></div>" +
					"<h5>소속명:"+parseData[i].소속명+"</h5>" +
					"<div class='datewrap'><span class='date'>"+parseData[i].KT+"</span></div></li></ul></li></ul>";
				else
					innerHtml += "<ul class=\"tbl_list\">" +
					"<li><ul class=\"tbl list\" style=\"background-color: #B2CCFF;\"><li><div class=\"numwrap\"><span>"+i+"</span></div>" +
					"<h5>소속명:"+parseData[i].소속명+" <br></h5>" +
					"<div class='datewrap'><span class='date'>"+parseData[i].KT+"</span></div></li></ul></li></ul>";
				
			}	
		}

		

		$("#list").html(innerHtml);
		
	}
	
}