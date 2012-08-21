(function(){var j,c,i,h,f,g="undefined",a=false,d=(typeof window.localStorage!==g),e=document.body.style,b=(typeof e.MozTransition!==g||typeof e.MsTransition!==g||typeof e.webkitTransition!==g||typeof e.OTransition!==g||typeof e.transition!==g);if(window.hopscotch){return}$(window).load(function(){if(a){window.hopscotch.startTour()}});h={getPixelValue:function(l){var k=typeof l;if(k==="number"){return l}if(k==="string"){return parseInt(l,10)}return 0},valOrDefault:function(l,k){return typeof l!==g?l:k},invokeCallbacks:function(n,k){var m=f[n],l=0;len=m.length;for(;l<len;++l){m[l].cb.apply(this,k)}},getScrollTop:function(){if(typeof window.pageYOffset!==g){return window.pageYOffset}else{return document.documentElement.scrollTop}},getScrollLeft:function(){if(typeof window.pageXOffset!==g){return window.pageXOffset}else{return document.documentElement.scrollLeft}},extend:function(l,k){var m;for(m in k){if(k.hasOwnProperty(m)){l[m]=k[m]}}},getStepTarget:function(k){if(typeof k.target==="string"){return $("#"+k.target)}return $(k.target)},setState:function(n,o,p){var k="",l,m;if(d){localStorage.setItem(n,o)}else{if(p){m=new Date();m.setTime(m.getTime()+(p*24*60*60*1000));k="; expires="+m.toGMTString()}document.cookie=n+"="+o+k+"; path=/"}},getState:function(l){var n=l+"=",k=document.cookie.split(";"),m,o;if(d){return localStorage.getItem(l)}else{for(var m=0;m<k.length;m++){o=k[m];while(o.charAt(0)===" "){o=o.substring(1,o.length)}if(o.indexOf(n)===0){return o.substring(n.length,o.length)}}return null}},clearState:function(k){if(d){localStorage.removeItem(k)}else{this.setState(k,"",-1)}}};f={next:[],prev:[],start:[],end:[],error:[],close:[]};i={stepNums:null,nextBtn:"Next",prevBtn:"Back",doneBtn:"Done",closeTooltip:"Close"};c=function(p){var l=false,k,o=function(s,r){var q=$("<input>");q.attr({id:s,type:"button",value:r});q.addClass("hopscotch-nav-button");if(s.indexOf("prev")>=0){q.addClass("prev")}else{q.addClass("next")}return q},m=function(r,q,t){var s=t?"hide-all":"hide";if(typeof q===g){q=true}if(q){r.removeClass(s)}else{r.addClass(s)}},n=function(x,s,E){var A,q,y,r,v,w,z,t,C=h.getStepTarget(s)[0],D=x.$element,u=x.$arrowEl,B=h.getPixelValue(s.arrowOffset);E=h.valOrDefault(E,true);A=h.getPixelValue(s.width)||p.bubbleWidth;y=h.valOrDefault(s.padding,p.bubblePadding);bubbleBorder=h.valOrDefault(s.padding,p.bubbleBorder);D.removeClass("bounce-down bounce-up bounce-left bounce-right");r=C.getBoundingClientRect();if(s.orientation==="top"){q=D.height();z=(r.top-q)-p.arrowWidth;t=r.left;w="bounce-down"}else{if(s.orientation==="bottom"){z=r.bottom+p.arrowWidth;t=r.left;w="bounce-up"}else{if(s.orientation==="left"){z=r.top;t=r.left-A-2*y-2*bubbleBorder-p.arrowWidth;w="bounce-right"}else{if(s.orientation==="right"){z=r.top;t=r.right+p.arrowWidth;w="bounce-left"}}}}if(!B){u.css({top:"",left:""})}else{if(s.orientation==="top"||s.orientation==="bottom"){u.css("left",B+"px")}else{if(s.orientation==="left"||s.orientation==="right"){u.css("top",B+"px")}}}t+=h.getPixelValue(s.xOffset);z+=h.getPixelValue(s.yOffset);z+=h.getScrollTop();t+=h.getScrollLeft();if(p.animate){if(!b&&p.animate){D.animate({top:z+"px",left:t+"px"})}else{D.css("top",z+"px");D.css("left",t+"px")}}else{D.css("top",z+"px");D.css("left",t+"px");if(E){v=p.smoothScroll?p.scrollDuration:0;setTimeout(function(){D.addClass(w)},v);setTimeout(function(){D.removeClass(w)},v+2000)}}};this.init=function(){var t=$("<div>"),r=$("<div>"),u=$("<div>"),s=this,v=false,q;this.$element=t;this.$containerEl=r;this.$titleEl=$("<h3>");this.$numberEl=$("<span>");this.$contentEl=$("<p>");this.$numberEl.attr("id","hopscotch-bubble-number");u.append(this.$titleEl,this.$contentEl).attr("id","hopscotch-bubble-content");r.attr("id","hopscotch-bubble-container").append(this.$numberEl,u);t.attr("id","hopscotch-bubble").addClass("animated").append(r);this.initNavButtons();if(p&&p.showCloseButton){this.initCloseButton()}this.initArrow();window.onresize=function(){if(v||!l){return}v=true;q=setTimeout(function(){n(s,k,false);v=false},200)};$("body").append(t);return this};this.initNavButtons=function(){var q=$("<div>");this.$prevBtnEl=o("hopscotch-prev",i.prevBtn);this.$nextBtnEl=o("hopscotch-next",i.nextBtn);this.$doneBtnEl=o("hopscotch-done",i.doneBtn);this.$doneBtnEl.addClass("hide");this.$prevBtnEl.click(function(r){window.hopscotch.prevStep()});this.$nextBtnEl.click(function(r){window.hopscotch.nextStep()});this.$doneBtnEl.click(window.hopscotch.endTour);q.attr("id","hopscotch-actions").append(this.$prevBtnEl,this.$nextBtnEl,this.$doneBtnEl);this.buttonsEl=q;this.$containerEl.append(q);return this};this.initCloseButton=function(){var q=$("<a>");q.text(i.closeTooltip).attr({id:"hopscotch-bubble-close",href:"#",title:i.closeTooltip}).click(function(s){var r=hopscotch.getCurrStepNum(),t=hopscotch.getCurrTour(),u=(r===t.steps.length-1);h.invokeCallbacks("close",[t.id,r]);window.hopscotch.endTour(true,u);if(s.preventDefault){s.preventDefault()}else{if(event){event.returnValue=false}}});this.closeBtnEl=q;this.$containerEl.append(q);return this};this.initArrow=function(){var r,q;this.$arrowEl=$("<div>").attr("id","hopscotch-bubble-arrow-container");q=$("<div>").addClass("hopscotch-bubble-arrow-border");r=$("<div>").addClass("hopscotch-bubble-arrow");this.$arrowEl.append(q,r);this.$element.append(this.$arrowEl);return this};this.renderStep=function(s,x,t,u,y){var z=this,r=h.valOrDefault(s.showNextButton,p.showNextButton),q=h.valOrDefault(s.showPrevButton,p.showPrevButton),w,v;k=s;this.setTitle(s.title?s.title:"");this.setContent(s.content?s.content:"");this.setNum(x);this.showPrevButton(this.$prevBtnEl&&q&&(x>0||t>0));this.showNextButton(this.$nextBtnEl&&r&&!u);if(u){this.$doneBtnEl.removeClass("hide")}else{this.$doneBtnEl.addClass("hide")}this.setArrow(s.orientation);w=h.getPixelValue(s.width)||p.bubbleWidth;v=h.valOrDefault(s.padding,p.bubblePadding);this.$containerEl.css({width:w+"px",padding:v+"px"});if(s.orientation==="top"){setTimeout(function(){n(z,s);if(y){y()}},5)}else{n(this,s);if(y){y()}}return this};this.setTitle=function(q){if(q){this.$titleEl.html(q).removeClass("hide")}else{this.$titleEl.addClass("hide")}return this};this.setContent=function(q){if(q){this.$contentEl.html(q).removeClass("hide")}else{this.$contentEl.addClass("hide")}return this};this.setNum=function(q){if(i.stepNums&&q<i.stepNums.length){q=i.stepNums[q]}else{q=q+1}this.$numberEl.html(q)};this.setArrow=function(q){if(q==="top"){this.$arrowEl.removeClass().addClass("down")}else{if(q==="bottom"){this.$arrowEl.removeClass().addClass("up")}else{if(q==="left"){this.$arrowEl.removeClass().addClass("right")}else{if(q==="right"){this.$arrowEl.removeClass().addClass("left")}}}}};this.show=function(){var q=this;if(p.animate){setTimeout(function(){q.$element.addClass("animate")},50)}this.$element.removeClass("hide");l=true;return this};this.hide=function(){this.$element.addClass("hide").removeClass("animate");l=false;return this};this.showPrevButton=function(q,r){m(this.$prevBtnEl,q,r)};this.showNextButton=function(q,r){m(this.$nextBtnEl,q,r)};this.showCloseButton=function(q,r){m(this.closeBtnEl,q,r)};this.initAnimate=function(){var q=this;setTimeout(function(){q.$element.addClass("animate")},50)};this.removeAnimate=function(){this.$element.removeClass("animate")};this.init()};j=function(l){var v,n,r,m,w,z,q,s,o,p=function(){if(!v){v=new c(n)}return v},y=function(){var A=r.steps[m];return(A.length>0)?A[w]:A},x=function(){var A=r.steps[m].length;if(w<A-1){++w;return true}else{if(m<r.steps.length-1){++m;w=k()?0:undefined;return true}}return false},u=function(){var A;if(w>0){--w;return true}else{if(m>0){A=r.steps[--m].length;if(A){w=A-1}else{w=undefined}return true}}return false},k=function(){return r.steps[m].length>0},t=function(){var E=p().$element,A=h.getPixelValue(E.css("top")),F=h.getStepTarget(y())[0],D=F.getBoundingClientRect(),G=D.top+h.getScrollTop(),C=(A<G)?A:G,B=C-n.scrollTopMargin;$("body, html").animate({scrollTop:B},n.scrollDuration)};this.init=function(){var A,B;if(l){this.configure(l)}return this};this.loadTour=function(D){var C={},A,E,B;r=D;for(E in D){if(D.hasOwnProperty(E)&&E!=="id"&&E!=="steps"){C[E]=D[E]}}n={};o.call(this,C,true);tourState=h.getState(n.cookieName);if(tourState){tourPair=tourState.split(":");z=tourPair[0];q=tourPair[1];s=undefined;B=q.split("-");if(B.length>1){q=parseInt(B[0],10);s=parseInt(B[1],10)}else{q=parseInt(q,10)}if(tourPair.length>2&&tourPair[2]==="mp"){if(s&&s<r.steps[q].length-1){++s}else{if(q<r.steps.length-1){++q;if(r.steps[q].length>0){s=0}else{s=undefined}}}}}A=p();A.showPrevButton(n.showPrevButton,true);A.showNextButton(n.showNextButton,true);return this};this.startTour=function(F,E){var B,D,C,A;if(!r){throw"Need to load a tour before you start it!"}if(document.readyState!=="complete"){a=true;return}if(typeof F!==g){m=F;w=E}else{if(r.id===z&&typeof q!==g){m=q;w=s;D=y();if(!h.getStepTarget(D)){u();D=y();if(!h.getStepTarget(D)){this.endTour(false);return}}}else{m=0}}if(!w&&k()){w=0}if(m===0&&!w){h.invokeCallbacks("start",[r.id])}this.showStep(m,w);B=p().show();if(n.animate){B.initAnimate()}this.isActive=true;return this};this.showStep=function(E,C){var H=r.steps,F=H[E],D=H.length,B=r.id+":"+E,A=p(),G;m=E;w=C;if(typeof C!==g&&k()){F=F[C];B+="-"+C}G=(E===D-1)||(C>=F.length-1);A.renderStep(F,E,C,G,t);if(F.multiPage){B+=":mp"}h.setState(n.cookieName,B,1);return this};this.prevStep=function(){var B=y(),A=false;h.invokeCallbacks("prev",[r.id,m]);if(B.onPrev){B.onPrev()}if(n.skipIfNoElement){while(!A&&u()){B=y();A=h.getStepTarget(B)}if(!A){this.endTour()}}else{if(u()){B=y();if(!h.getStepTarget(B)){h.invokeCallbacks("error",[r.id,m]);return}}}this.showStep(m,w);return this};this.nextStep=function(){var B=y(),A=false;h.invokeCallbacks("next",[r.id,m]);if(B.onNext){B.onNext()}if(n.skipIfNoElement){while(!A&&x()){B=y();A=h.getStepTarget(B)}if(!A){this.endTour()}}else{if(x()){B=y();if(!h.getStepTarget(B)){h.invokeCallbacks("error",[r.id,m]);this.endTour();return}}}this.showStep(m,w);return this};this.endTour=function(C,B){var A=p();C=h.valOrDefault(C,true);B=h.valOrDefault(B,true);m=0;w=undefined;q=undefined;A.hide();if(C){h.clearState(n.cookieName)}this.isActive=false;if(B){h.invokeCallbacks("end",[r.id])}hopscotch.removeCallbacks(true);return this};this.getCurrTour=function(){return r};this.getCurrStepNum=function(){return m};this.getCurrSubstepNum=function(){return w};this.hasTakenTour=function(A){if(d){h.getState(n.cookieName+"_history")}return false};this.setHasTakenTour=function(B){var A;if(d&&!this.hasTakenTour(B)){A=h.getState(n.cookieName+"_history");if(A){A+=";"+B}else{A=B}}};this.clearHasTakenTour=function(G){var F,E,B,A,C=n.cookieName+"_history",D=false;if(d){F=h.getState(C);if(F){E=F.split(";");for(B=0,A=E.length;B<A;++B){if(E[B]===G){E.splice(B,1);D=true;break}}if(D){h.setState(C,E.join(";"))}}}};this.addCallback=function(C,A,B){if(A){f[C].push({cb:A,fromTour:B})}return this};this.removeCallbacks=function(B){var E,C,A,D;for(D in f){if(B){E=f[D];for(C=0,A=E.length;C<A;++C){if(E[C].fromTour){E.splice(C--,1);--A}}}else{f[D]=[]}}return this};o=function(B,C){var A;if(!n){n={}}h.extend(n,B);n.animate=h.valOrDefault(n.animate,false);n.smoothScroll=h.valOrDefault(n.smoothScroll,true);n.scrollDuration=h.valOrDefault(n.scrollDuration,1000);n.scrollTopMargin=h.valOrDefault(n.scrollTopMargin,200);n.showCloseButton=h.valOrDefault(n.showCloseButton,true);n.showPrevButton=h.valOrDefault(n.showPrevButton,false);n.showNextButton=h.valOrDefault(n.showNextButton,true);n.bubbleWidth=h.valOrDefault(n.bubbleWidth,280);n.bubblePadding=h.valOrDefault(n.bubblePadding,15);n.bubbleBorder=h.valOrDefault(n.bubbleBorder,6);n.arrowWidth=h.valOrDefault(n.arrowWidth,20);n.skipIfNoElement=h.valOrDefault(n.skipIfNoElement,false);n.cookieName=h.valOrDefault(n.cookieName,"hopscotch.tour.state");if(B){h.extend(i,B.i18n)}this.addCallback("next",B.onNext,C);this.addCallback("prev",B.onPrev,C);this.addCallback("start",B.onStart,C);this.addCallback("end",B.onEnd,C);this.addCallback("error",B.onError,C);this.addCallback("close",B.onClose,C);A=p();if(n.animate){A.initAnimate()}else{A.removeAnimate()}A.showPrevButton(n.showPrevButton,true);A.showNextButton(n.showNextButton,true);A.showCloseButton(n.showCloseButton,true);return this};this.configure=function(A){o.call(this,A,false)};this.init(l)};window.hopscotch=new j()}());