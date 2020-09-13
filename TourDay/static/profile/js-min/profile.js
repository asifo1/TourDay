document.addEventListener("DOMContentLoaded",()=>{function e(e){if(value=document.querySelector("#btn-"+e),"Edit"===value.innerHTML)value.innerHTML="Save",$("#input-"+e).show(),$("#"+e).hide();else{if(!function(e,t){if(0==t.length)return $("#error-msg").text("Can't save empty field."),$(".error").show(),hide_error(),!1;if("password"===e&&t.length<8)return $("#error-msg").text("Password must contain at least 8 Characters."),$(".error").show(),hide_error(),!1;if("email"===e&&!validateEmail(t))return $("#error-msg").text("Invalid Email Address."),$(".error").show(),hide_error(),!1;if("bio"==e&&t.length>100)return $("#error-msg").text("Bio Must be in 100 Characters."),$(".error").show(),hide_error(),!1;return!0}(e,$("#input-"+e).val()))return;t=e,r=$("#input-"+e).val(),$.ajax({type:"POST",url:"/profile/"+t,data:{data:r,csrfmiddlewaretoken:getCookie("csrftoken")},success:function(e){400==e.status?($("#error-msg").text("Email address already exists."),$(".error").show(),hide_error(),btn_email.click()):201==e.status&&("password"!=t&&$("#"+t).text(r),"name"===t&&$("#name_pic").text(r))},error:e=>{$("#error-msg").text("Network error."),$(".error").show(),hide_error()}}),value.innerHTML="Edit",$("#input-"+e).hide(),$("#"+e).show()}var t,r}btn_name=$("#btn-name"),btn_email=$("#btn-email"),btn_fb=$("#btn-fb"),btn_password=$("#btn-password"),btn_bio=$("#btn-bio"),btn_city=$("#btn-city"),btn_insta=$("#btn-insta"),inputs=["name","email","fb","password","bio","city","insta"],inputs.forEach(t=>{document.querySelector("#input-"+t).addEventListener("keyup",(function(r){13===r.keyCode&&(r.preventDefault(),e(t))}))}),btn_name.on("click",()=>{e("name")}),btn_email.on("click",()=>{e("email")}),btn_fb.on("click",()=>{e("fb")}),btn_insta.on("click",()=>{e("insta")}),btn_password.on("click",()=>{e("password")}),btn_bio.on("click",()=>{e("bio")}),btn_city.on("click",()=>{e("city")})}),$(document).ready((function(){$image_crop=$("#image_demo").croppie({enableExif:!0,viewport:{width:200,height:200,type:"square"},boundary:{width:300,height:300}}),$("#selectedFile").on("change",(function(){let e=document.getElementById("selectedFile");var t=e.files[0].name.split(".").pop().toLowerCase();(new FileReader).readAsDataURL(e.files[0]);var r=e.files[0],i=r.size||r.fileSize;if(-1!=jQuery.inArray(t,["gif","png","jpg","jpeg"]))if(i>2e6)alert("Upload small size image");else{var n=new FileReader;n.onload=function(e){$image_crop.croppie("bind",{url:e.target.result}).then((function(){}))},n.readAsDataURL(this.files[0]),$("#uploadimageModal").modal("show")}else alert("Invalid Image File")})),$(".crop_image").click((function(e){$image_crop.croppie("result",{type:"canvas",size:"viewport"}).then((function(e){var t=new FormData;t.append("picture",e),t.append("csrfmiddlewaretoken",getCookie("csrftoken")),$.ajax({url:"/profile/picture",type:"POST",data:t,contentType:!1,cache:!1,enctype:"multipart/form-data",processData:!1,success:function(e){(e.status="201")&&(document.getElementById("pro_pic").src=e.new_img,$("#uploadimageModal").modal("hide"))}})}))}))}));