/* 일정관리 */
var MonthScheduleTools = {
	$title: null,
	$box: null,
	currentDate: null,
	items: null,
	
	Init: function() {
		
		this.$title = $("div.wrap_cont");
		this.$box = $("table.month_schedule tbody");
		
		// Button Event Bind
		var oThis = this;
		var buttons = this.$title.find("input.base");
		
		if (this.currentDate == null) this.currentDate = new Date();
		//this.GetData();
		oThis.GenDay();
	},
	 
	// 월별 달력생성
	GenDay: function() {
		this.$box.empty();
		
		this.currentDate = Str2Date($("#year").val() + "-" + $("#month").val()+"-01");

        var monthLastDay = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31); //각 달별 마지막날 저장
        var d = {
        	year: this.currentDate.getFullYear(),
        	month: this.currentDate.getMonth() + 1,
        	day: this.currentDate.getDate(),
        	lastDay: monthLastDay[this.currentDate.getMonth()]
        };

		var tempMonth = d.month;
		if(tempMonth < 10){
			tempMonth  = "0"+d.month;
		}
        $("#sc_date_month").html(d.year + "." + tempMonth);

        //윤년계산
        if (d.month == 2) {
            if ((d.year % 400) == 0)
                d.lastDayh = 29;
            else if (((d.year % 4) == 0) && ((d.year % 100) > 0))
                d.lastDay = 29;
        }

        //첫날에 요일 가져오기
        var startPos = new Date(d.year, d.month - 1, 1).getDay();

        // 가로 7, 세로 6
        var oThis = this;
        var count = 0;
        var $weekBox, $dayBox, $eventBox;
        var prtDay = "", checkDate;
        var today = new Date();
		var PROC_COUNT_TOTAL = 0;
		var PROC_DONE_TOTAL = 0; 
		var PROC_NOTDONE_TOTAL = 0; 
		var memorialTotal = 0;
        
        for (var i = 0; i < 6; i++) {
        	$weekBox = $("<tr></tr>");
        	for (var j = 0; j < 7; j++) {
        		//$dayBox = $("<td onclick='Main.moveDay("+(count+1)+")'><dl><dt></dt><dd event='"+(count+1)+"' class='eventinfo'></dd><dd></dd><dd work='"+(count+1)+"' class='workinfo'></dd></dl></td>");
				$dayBox = $("<td onclick='Main.moveDay("+(count+1)+")'><dl><dt></dt><dd event='' class='eventinfo'><dd chg='' class='chginfo'></dd></dl></td>");
        		//해당 월의 1일의 시작요일 이하면 공백출력하고 넘어가면 그때부터 일수를 출력함
        		if ( (i == 0) && (j < startPos) ) {
        			prtDay = "&nbsp;";
        		}
        		else { 
        			++count;
        			$dayBox.attr("day", count);
					$dayBox.find(".eventinfo").attr("event", count);
					$dayBox.find(".chginfo").attr("chg", count);
        			$dayBox.bind("mousedown", function() { oThis.ViewInfo(this); });
        			
                    //해당 달의 마지막날 이전까지만 일수 출력
                    if (count <= d.lastDay) {
                    	checkDate = new Date(d.year, d.month - 1, count);

                    	//해당 요일에 CSS 클래스부여, 일요일:sun, 토요일:sat
                    	switch (checkDate.getDay()) {
                    	case 0:
                    		$dayBox.find("td").addClass("colorR");
                    		break;
                    	case 6:
                    		$dayBox.find("td").addClass("colorB");
                    		break;
                    	}
                    	
                        //현재일 표시
                        if ((d.year == today.getFullYear()) && (d.month == today.getMonth() + 1) && (count == today.getDate())) {
                            $dayBox.addClass("select02");
                        }
                        
                        prtDay = count;
                        // 일별 일정수 표시
                        var currentItem = 0; //this.items[count - 1];
						
                        if (parseInt(currentItem.day) == count) {
                        	if (parseInt(currentItem.PROC_COUNT) > 0) {
								if(currentItem.PROC_DONE == currentItem.PROC_COUNT)
								{
                        			$dayBox.find("dd").append("<span class='dateinfo colorv'>"+ currentItem.PROC_DONE +"/" + currentItem.PROC_COUNT +"</span>");
								}
								else
								{
                        			$dayBox.find("dd").append("<span class='dateinfo'>"+ currentItem.PROC_DONE +"/" + currentItem.PROC_COUNT +"</span>");
								}
								//memorialTotal += parseInt(currentItem.specialCnt);

                        	}
							else
							{
								$dayBox.find("dl").append("<span>&nbsp;</span>");
							}

                        	if (parseInt(currentItem.PROC_COUNT) > 0) {
                        		$dayBox.addClass("select01");
								//$dayBox.find("dl").append("<dd>"+currentItem.bussinessOut+"</dd>");
								PROC_COUNT_TOTAL += parseInt(currentItem.PROC_COUNT);
                        	}

                        	if (parseInt(currentItem.PROC_DONE) > 0) {
                        		$dayBox.addClass("select01");
								//$dayBox.find("dl").append("<dd>"+currentItem.bussinessIn+"</dd>");
								 PROC_DONE_TOTAL += parseInt(currentItem.PROC_DONE);
                        	}	

                        	if (parseInt(currentItem.PROC_NOTDONE) > 0) {
                        		$dayBox.addClass("select01");
								//$dayBox.find("dl").append("<dd>"+currentItem.bussinessIn+"</dd>");
								 PROC_NOTDONE_TOTAL += parseInt(currentItem.PROC_NOTDONE);
                        	}	

                        }
                    }
                    else {
                    	//i = 6;
						$dayBox.attr('onclick', '');
                    	prtDay = "&nbsp;";
                    }
        		}
        		$("#tvTotal").val(PROC_COUNT_TOTAL);
				$("#tvProc").val(PROC_DONE_TOTAL);
				$("#tvNotProc").val(PROC_NOTDONE_TOTAL);
        		$dayBox.find("dt").html(prtDay);
        		$weekBox.append($dayBox);

        	}
        	
        	//if (count == d.lastDay) i = 6;
        	this.$box.append($weekBox);
        }
        
        //this.$box.append(" <tr class='info'><td colspan='7'><span class='dateinfo colorv'>처리</span><span class='dateinfo'>미처리</span></td></tr>");
		
           
        
	},
	
	// 월 & 월 이동
	MoveCal: function(type, direction) {
		var today = new Date();
		
        var d = {
        	year: this.currentDate.getFullYear(),
        	month: this.currentDate.getMonth() + 1
        };

		switch (type) {
		case "y":
			d.year = d.year + direction;
			break;
		case "m":
			d.month = d.month + direction;
			//alert(d.month);
			break;
		case "T":
			d.year = today.getFullYear();
			d.month = today.getMonth()+1;
			break;
		}

		this.currentDate = new Date(d.year, d.month - 1, 1);
		//this.GetData();
	},
	
	ViewInfo: function(el) {
		if (!el) return;

		var d = {
	    	year: this.currentDate.getFullYear(),
	    	month: this.currentDate.getMonth() + 1,
	    	day: parseInt($(el).attr("day"))
		};
		
		if (d.month < 10) d.month = "0" + d.month;
		if (d.day < 10) d.day = "0" + d.day;

		var param = {
			"date": d.year + "" + d.month + "" + d.day
		};

		//MemberScheduleView.Open(param);
	},
	
	DayResvCountUpdate: function(day, count) {
		var $item = this.$box.find("td[day='" + day + "'] dl");
		var $span = $item.find("dd.resv");

		if (count == 0)
			$span.remove();
		else {
			if ($span.length)
				$span.html("예약 (" + count + ")");
			else
				$item.append("<dd class=\"resv\">예약 (" + count + ")</dd>");
		}
	}
};