"use strict";define(["jquery","handlebars","text!temp/page.html"],function(a,o,c){var t,e=window.location.search;a.ajax({url:"/api/page?id="+(t=e,t.split("?")[1].split("=")[1]),dataType:"json",success:function(t){var e,n,r,i;e=c,n=t,r=".wrap",i=o.compile(e)(n),".more1"===r?a(r).append(i):a(r).html(i),a(".origin").on("click",function(){window.location.href="word.html?chapter_count="+a(this).attr("chapter")}),a(".new").on("click",function(){window.location.href="menu.html?chapter_id="+a(this).attr("chapter_id")+"&chapter_count="+a(this).attr("chapter")})}}),o.registerHelper("word_count",function(t,e){return Math.round(t/1e4)}),o.registerHelper("time",function(t,e){return new Date(t).toLocaleString()})});