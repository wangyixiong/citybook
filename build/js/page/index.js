"use strict";function change(t){$(".header div span").eq(t).addClass("active").siblings().removeClass("active"),$(".content").css("transform","translate(-"+100*t+"%)")}define(["jquery","lazyload","bscroll","swiper","text!temp/banner.html","handlebars","text!temp/content.html","text!temp/expret.html","text!temp/dl-list.html"],function(o,t,a,e,i,c,l,s,r){function d(t,a,e){var n=c.compile(t)(a);".more1"===e?o(e).append(n):o(e).html(n)}function f(t,a,e){a>=t.length/5-1?o(e).attr("data-id",0):o(e).attr("data-id",a+1);var n=5*a,i=n+5;return t.slice(n,i)}o(".header div").on("click","span",function(){change(o(this).index())}),o(".header p").eq(1).on("click","em",function(){window.location.href="./myself/login.html"}),o.ajax({url:"/api/home",dataType:"json",success:function(n){d(i,n.items[0].data,".box4");new e(".swiper-container",{autoplay:!0,loop:!0});d(l,n.items[1],".week-hot"),d(l,n.items[1],".shlf-cont"),o("#tab").on("click",function(){o(this).toggleClass("active"),o("#tab").hasClass("active")?d(l,n.items[1],".shlf-cont"):d(r,n.items[1].data.data,".shlf-cont"),o(".img").lazyload({effect:"fadeIn",container:o(".two")})}),d(s,f(n.items[2].data.data,0),".cont"),d(r,f(n.items[3].data.data,0),".girl-cont"),d(r,f(n.items[4].data.data,0),".boy-cont"),o(".btn-change").on("click",function(){var t=1*o(this).attr("one"),a=2===t?s:r,e=1*o(this).attr("data-id");d(a,f(n.items[t].data.data,e,o(this)),"."+o(this).parent().prev().attr("class")),o(".img").lazyload({effect:"fadeIn",container:o("#one")})}),o(".img").lazyload({effect:"fadeIn",container:o("#one")}),o(".img").lazyload({effect:"fadeIn",container:o(".two")}),o(".week-hot1 dl").on("click",function(){var t=o(this).attr("id");window.location.href="./myself/pageinfo.html?id="+t})}});var n=1;!function e(){o("#one").on("scroll",function(){var t=o(this).scrollTop(),a=o(".box3").height()-o(".main").height();if(a-2200<t){if(o(this).off("scroll"),3<n)return void o(".load").html("暂无更多数据");o.ajax({url:"/api/load"+n,dataType:"json",success:function(t){d(r,t.items,".more1"),o(".img").lazyload({effect:"fadeIn",container:o("#one")}),n+=1,e()}})}})}(),o(".search-book").on("click",function(){window.location.href="./myself/search.html"})});