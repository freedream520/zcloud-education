	function drawTable(homeDir,model){
		
		var downloadAllUrl = "downloadmutil"+model;//downloadmutilweather
		var downloadUrl = "download"+model;//downloadweather
		var detailUrl = "detail"+model;//detailweather
		var deleteUrl = "delete"+model;//deleteweather
		
		function getFileSystem(){
			 $.ajax({//调用JQuery提供的Ajax方法 
				type : "GET",
				url : "filesystem",
				data : {command:'LISTSTATUS',parentDir:homeDir},
				dataType : "json",
				success : function(data){//回调函数 
					console.log('data：',data);
					printFileSystem(data.FileStatuses.FileStatus);
				},
				error : function() {
					alert("系统出现问题");
				}
			});
		}
		
		function formatsize(size){
			if(size > 1024){
				var num = new Number(size/1024);
				return  num.toFixed(2)+"KB";
			}else if(size > 1024*1024){
				var num = new Number(size/1024/1024);
				return num.toFixed(2)+"MB";
			}else if(size > 1024*1024*1024){
				var num = new Number(size/1024/1024/1024);
				return num.toFixed(2)+"GB";
			}else{
				return size+"B";
			}
		}
		
		function add0(m) {
			return m < 10 ? '0' + m : m
		}
		
		function formatdate(timestap) {
			var time = new Date(timestap);
			var y = time.getFullYear();
			var m = time.getMonth() + 1;
			var d = time.getDate();
			var h = time.getHours();
			var mm = time.getMinutes();
			var s = time.getSeconds();
			return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':'
					+ add0(mm) + ':' + add0(s);
		}
		
		function printFileSystem(data){
		   $("#tab_filesystem").html("");
		   $("#filecount").html("已全部加载，共"+data.length+"个");
		   for (var i=0; i<data.length; i++) {
				var tr1 = "<dd class='list-view-item'>"; 
				tr1 += "<input class='checkbox' name='filename' type='checkbox' value='"+data[i].pathSuffix+"' onclick=ChkSonClick('filename','chkAll') />";
				tr1 += "<span class='fileicon'></span>";
					tr1 += "<div class='file-name' style='width:62%'>";
						tr1 += "<div class='text'>";
							tr1 += "<a href='"+detailUrl+"?filename="+data[i].pathSuffix+"' title='"+data[i].pathSuffix+"'>"+data[i].pathSuffix+"</a>";
						tr1 += "</div>";
						tr1 += "<div class='operate'>";
						tr1 += "<a class='icon icon-download-blue' href='"+downloadUrl+"?filename="+data[i].pathSuffix+"' title='下载'></a>";
						tr1 += "<a class='icon icon-delete-blue' href='"+deleteUrl+"?filename="+data[i].pathSuffix+"' title='删除'></a>";						
						tr1 += "</div>";
					tr1 += "</div>";
					tr1 += "<div class='file-size' style='width:16%'>"+formatsize(data[i].length)+"</div>";
					tr1 += "<div class='ctime' style='width:22%'>"+formatdate(data[i].modificationTime)+"</div>";
				tr1 += "</dd>";
				$("#tab_filesystem").append(tr1);                          
			}
		}
		
		//批量删除
		function deleteAllAction(){
			var form = document.forms[0];
			form.action= deleteUrl;
			form.method= "get"; 
			var value=0;
			$("input[name='filename']").each(function () {
				if(this.checked){
					value=1;
				}
			});
			if(!value){
				alert("请选择删除项！");
			}else{
				form.submit();
			};
		}
		
		//批量下载
		function downloadAllAction(){//"downloadmutilweather"
			var form = document.forms[0];
			form.action= downloadAllUrl;
			form.method= "get"; 
			var value=0;
			$("input[name='filename']").each(function () {
				if(this.checked){
					value=1;
				}
			});
			if(!value){
				alert("请选择下载项！");
			}else{
				form.submit();
			};
		}
		
		return{
			getFileSystem:getFileSystem,
			downloadAllAction:downloadAllAction,
			deleteAllAction:deleteAllAction
		}
	}
	
	
	
	



	
	
	