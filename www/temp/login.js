var Login = {
	$memberID: null,
	$memberPW: null,

	Init: function() {

		var oThis = this;

		this.$memberID = $("#memberID");
		this.$memberPW = $("#memberPW");

		oThis.SetBindClick();

		

		// 핸드폰사이즈에 따라 화면사이즈 세팅
		oThis.setScreenSize();	
		
		//
		oThis.setAppVersion();

		
	},

	setScreenSize: function() {
		var maxHeight = window.App.getScreenSize();
		$("body").height(maxHeight-50);
	},

	setAppVersion: function() {
		var oThis = this;

		var version = window.App.getVersionName();
		
		if (version < 1.2)
			$(".item-checkbox").hide();

		$("#appVersion").html("버전정보 : v" + version);

		//oThis.checkEmpNo();
		
	},

	checkEmpNo: function() {
		var oThis = this;

		var version = window.App.getVersionName();	
		if (Number(version) > 1.1)
		{
			var flag = window.App.getPreferences("temp","autoLoginFlag");
//$("#appVersion").html("버전정보 : v" + oThis.$version + "/" + flag);
			if (flag == "Y")
			{
				$("#auto_check").parents('.item-checkbox:eq(0)').find(' > [class*="wrp-checkbox"] span').attr('class', 'mask-check-on');
				id = window.App.getPreferences("temp", "userID");
				pw = window.App.getPreferences("temp", "userPW");
				$("#memberID").val(id);
				$("#memberPW").val(pw);

				oThis.Send();
			}
		}
		
	},

	SetBindClick: function(){
		var oThis = this;
	
		$("#emp_no_check").bind("click", function() { 
			if($(this).is(':checked')){
				$(this).parents('.item-checkbox:eq(0)').find(' > [class*="wrp-checkbox"] span').attr('class', 'mask-check-on');
			}else{
				$(this).parents('.item-checkbox:eq(0)').find(' > [class*="wrp-checkbox"] span').attr('class', 'mask-check');
			}
		} );

		$("#auto_check").bind("click", function() { 
			if($(this).is(':checked')){
				$(this).parents('.item-checkbox:eq(0)').find(' > [class*="wrp-checkbox"] span').attr('class', 'mask-check-on');
			}else{
				$(this).parents('.item-checkbox:eq(0)').find(' > [class*="wrp-checkbox"] span').attr('class', 'mask-check');
			}
		} );

		$("#btn_login").bind("click", function() {
			oThis.Send();
		});
		

	},

	Send: function() {
		
		//window.App.goMain();

		var oThis = this;
		
		if (this.$memberID.val().length == 0) {
			alert("아이디를 입력해주세요.");
			this.$memberID.focus();
			return false;
		}
		
		if (this.$memberPW.val().length == 0) {
			alert("비밀번호를 입력해주세요.");
			this.$memberPW.focus();
			return false;
		}
	
		this.$memberID.blur();
		this.$memberPW.blur();
		
		LayerProgressBar.Make();
		LayerProgressBar.Show("로그인중입니다. 잠시만 기다려주세요.");

		var param = JSON.stringify({
			"uid": this.$memberID.val(),
			"pwd": this.$memberPW.val()
		});

		$.ajax({
			type : "POST",
			dataType : "json",
			url : "../Rs2_WebService.asmx/LoginAuth",
			data: param,
			contentType: "application/json; charset=utf-8",
			beforeSend: function() {
			},
			success : function(HttpRequest) {
				 
				$("#result").val(HttpRequest.d);
				var parseData = GetJSON(HttpRequest.d);

				if (!parseData.success)
				{
					LayerProgressBar.Alert("로그인중 오류가 발생했습니다.");
					return;
				}

				var today = new Date();
				Cookies.Set("__SavedID__", parseData.AUTH_ID, new Date(today.getFullYear(), today.getMonth() + 1, today.getDate()));
				Cookies.Set("__SavedNAME__", parseData.AUTH_NAME, new Date(today.getFullYear(), today.getMonth() + 1, today.getDate()));
				Cookies.Set("__SavedTOPNAME__", parseData.AUTH_TOPGRP_NAME, new Date(today.getFullYear(), today.getMonth() + 1, today.getDate()));
				Cookies.Set("__SavedSUBNAME__", parseData.AUTH_SUBGRP_NAME, new Date(today.getFullYear(), today.getMonth() + 1, today.getDate()));
				Cookies.Set("__SavedGRADE__", parseData.AUTH_ROLE_GRADE, new Date(today.getFullYear(), today.getMonth() + 1, today.getDate()));
				Cookies.Set("__SavedTOPGRP__", parseData.AUTH_TOPGRP_ID, new Date(today.getFullYear(), today.getMonth() + 1, today.getDate()));
				Cookies.Set("__SavedSUBGRP__", parseData.AUTH_SUBGRP_ID, new Date(today.getFullYear(), today.getMonth() + 1, today.getDate()));
				Cookies.Set("__SavedAGENTID__", parseData.AUTH_AGENT_ID, new Date(today.getFullYear(), today.getMonth() + 1, today.getDate()));
				Cookies.Set("__SavedAGENTNAME__", parseData.AUTH_AGENT_NAME, new Date(today.getFullYear(), today.getMonth() + 1, today.getDate()));
				Cookies.Set("__SavedSelMenu__", "", new Date(today.getFullYear(), today.getMonth() + 1, today.getDate()));

				var version = window.App.getVersionName();

				if (Number(version) > 1.1)
				{
					var flag = window.App.getPreferences("temp","autoLoginFlag");

					if ($("#auto_check").is(':checked') || flag){
						Cookies.Set("__SavedAutoLogin__", true, new Date(today.getFullYear(), today.getMonth() + 1, today.getDate()));
						Cookies.Set("__SavedPW__", oThis.$memberPW.val(), new Date(today.getFullYear(), today.getMonth() + 1, today.getDate()));
						window.App.savePreferences("temp", "autoLoginFlag", "Y");
						window.App.savePreferences("temp", "userID", oThis.$memberID.val());
						window.App.savePreferences("temp", "userPW", oThis.$memberPW.val());
			
					}else {
						window.App.savePreferences("temp", "autoLoginFlag", "N");
					}
				}
				
				
				LayerProgressBar.HideAfterShow("로그인이 완료되었습니다. 메인페이지로 이동합니다.",
					function() {
						window.App.goMain();
						
					}
				);

				/*
				//console.log("test >> " );
				var parseData = GetJSON(HttpRequest);
				if (!parseData) {
					//LayerProgressBar.Alert("로그인중 오류가 발생했습니다.");
					return;
				}
				
				var ret = (parseData.result) ? parseData.result : "99";
				
				if (ret == "1") {
					if ($("#idSave").attr("checked")) {
						var today = new Date();
						Cookies.Set("__SavedID__", param.memberID, new Date(today.getFullYear(), today.getMonth() + 1, today.getDate()));
					}

					LayerProgressBar.HideAfterShow("로그인이 완료되었습니다. 메인페이지로 이동합니다.",
						function() {
							location.href = "/html/Main.html";
						}
					);
					
				}
				else {
					//LayerProgressBar.Alert(parseData.message);
					 $("#result").html("Sorry there is an error: " + xhr.responseText);
				}
				*/
			},
			error : function(xhr, ajaxOptions, thrownError) {
				$("#result").val("Sorry there is an error: " + xhr.responseText);
				//LayerProgressBar.Alert("로그인중 오류가 발생했습니다.\n\n" + xhr["statusText"]);
			}
		});
		
	
		return false;
	}
	
};