function redirect(){const r=window.location.search,e=new URLSearchParams(r);if(e.has("next")){const r=e.get("next");location.href=r}else location.href="/"}$("#login").click((function(r){r.preventDefault();var e=$("#username"),o=$("#password");""!=e.val()?(e.removeClass("input-error"),""!=o.val()?(o.removeClass("input-error"),$.ajax({url:"/login/",type:"POST",data:{username:e.val(),password:o.val(),csrfmiddlewaretoken:getCookie("csrftoken")},success:function(r){200==r.status?redirect():($(".error").show(),hide_error())},error:function(r){console.log("Network Error")}})):o.addClass("input-error")):e.addClass("input-error")}));