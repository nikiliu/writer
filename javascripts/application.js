!function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};window.Canvas=function(){function e(e){this.el=e,this.resize_listener=t(this.resize_listener,this),this.paste_listener=t(this.paste_listener,this),this.click_listener=t(this.click_listener,this),this.blur_listener=t(this.blur_listener,this),this.focus_listener=t(this.focus_listener,this),this.keyup_listener=t(this.keyup_listener,this),this.keydown_listener=t(this.keydown_listener,this),this.normalize=t(this.normalize,this),this.has_overflow=t(this.has_overflow,this),this.keypress_listener=t(this.keypress_listener,this),this.ensure_visible=t(this.ensure_visible,this),this.highlight_sentence=t(this.highlight_sentence,this),this.wordwrap=t(this.wordwrap,this),this.create_ios_input=t(this.create_ios_input,this),this.create_menu=t(this.create_menu,this),this.caret=new Caret(this.el),this.el.onclick=this.click_listener,this.el.onpaste=this.paste_listener,this.el.classList.add("focus"),this.el.classList.add("transition"),this.create_menu(),this.create_ios_input(),window.onkeypress=this.keypress_listener,window.onkeydown=this.keydown_listener,window.onkeyup=this.keyup_listener,window.onfocus=this.focus_listener,window.onblur=this.blur_listener,window.onresize=this.resize_listener,this.resize_listener()}return e.prototype.keys={},e.prototype.focus_mode=!1,e.prototype.create_menu=function(){var t,e=this;return this.menu=document.createElement("menu"),this.menu.classList.add("canvas-menu"),t=document.createElement("button"),t.classList.add("focus-toggle"),this.menu.appendChild(t),t.onclick=function(){return e.focus_mode=!e.focus_mode,e.el.classList.remove("focus-mode"),t.classList.remove("on"),e.focus_mode?(e.el.classList.add("focus-mode"),t.classList.add("on"),e.highlight_sentence(e.caret.pos)):void 0},document.querySelector("body").appendChild(this.menu)},e.prototype.create_ios_input=function(){var t;return t=document.createElement("input"),t.type="text",t.classList.add("ios-keyboard"),document.querySelector("body").appendChild(t)},e.prototype.wordwrap=function(){var t,e,s,i,r,n,h,o,a;for(e=0,r=parseInt((this.el.offsetWidth-110)/10),o=this.el.children,n=0,h=o.length;h>n;n++)s=o[n],s.classList.contains("newline")&&!s.classList.contains("enter")&&(this.el.insertBefore(Caret.new_char("&nbsp;"),s),this.el.removeChild(s));for(i=0,a=[];i<this.el.children.length;){if(s=this.el.children[i],s.classList.contains("character")&&(e+=1),s.classList.contains("newline")&&(e=0),e>r){for(t=this.el.children[i];"&nbsp;"!==t.innerHTML;)i-=1,t=this.el.children[i];this.el.insertBefore(Caret.new_break(),t),this.el.removeChild(t),e=0}a.push(i+=1)}return a},e.prototype.highlight_sentence=function(t){var e,s,i,r,n,h,o;for(e=[".","!","?"],o=this.el.children,n=0,h=o.length;h>n;n++)s=o[n],s.classList.remove("current");for(r=this.el.children[t-1];!(!r||e.indexOf(r.innerHTML)>-1||r.classList.contains("enter"));)t-=1,r=this.el.children[t-1];for(i=this.el.children[t];!(!i||e.indexOf(i.innerHTML)>-1||i.classList.contains("enter"));)i.classList.add("current"),t+=1,i=this.el.children[t];return this.caret.el.classList.remove("current")},e.prototype.ensure_visible=function(){var t,e,s;for(t=this.caret.get_coords(),e=50;!(t[1]>=this.el.scrollTop+e);)this.el.scrollTop-=10,t=this.caret.get_coords();for(s=[];!(t[1]-this.el.scrollTop<=this.el.offsetHeight-e);)this.el.scrollTop+=10,s.push(t=this.caret.get_coords());return s},e.prototype.keypress_listener=function(t){var e;return 13!==t.which&&32!==t.which?(e=String.fromCharCode(t.which),this.caret.type(e),this.normalize()):void 0},e.prototype.has_overflow=function(){return this.el.scrollWidth>this.el.clientWidth},e.prototype.normalize=function(){return this.has_overflow()&&this.wordwrap(),this.ensure_visible(),this.focus_mode&&this.highlight_sentence(this.caret.pos),window.getSelection().collapse()},e.prototype.keydown_listener=function(t){var e,s,i,r;switch(this.keys[t.which]=!0,s=!1,(this.keys[91]||this.keys[93]||this.keys[224]||this.keys[17])&&(s=!0),e=!1,this.keys[18]&&(e=!0),r=!1,this.keys[16]&&(r=!0),i=!1,t.which){case 8:s?this.caret.cmd_delete(t):e?this.caret.alt_delete(t):this.caret["delete"](t),i=!0;break;case 9:this.caret.tab(t),i=!0;break;case 13:this.caret.enter(),i=!0;break;case 32:this.caret.spacebar(t),i=!0;break;case 37:s?this.caret.move_cmd_left(t):e?this.caret.move_alt_left(t):this.caret.move_left(t),i=!0;break;case 38:s?this.caret.move_cmd_up(t):this.caret.move_up(t),i=!0;break;case 39:s?this.caret.move_cmd_right(t):e?this.caret.move_alt_right(t):this.caret.move_right(t),i=!0;break;case 40:s?this.caret.move_cmd_down(t):this.caret.move_down(t),i=!0}return i===!0?this.normalize():void 0},e.prototype.keyup_listener=function(t){return this.keys[t.which]=!1},e.prototype.focus_listener=function(){return this.el.classList.add("focus"),this.keys={}},e.prototype.blur_listener=function(){return this.el.classList.remove("focus")},e.prototype.click_listener=function(){return this.highlight_sentence(this.caret.pos)},e.prototype.paste_listener=function(t){var e,s,i,r;for(s=t.clipboardData.getData("text/plain"),i=0,r=s.length;r>i;i++)e=s[i]," "===e?this.caret.spacebar():"\n"===e?this.caret.enter():this.caret.type(e);return this.normalize()},e.prototype.resize_listener=function(){return this.has_overflow()&&this.wordwrap(),this.caret.recalculate_pos(),this.el.style.height=""+(window.innerHeight-this.menu.offsetHeight)+"px"},e.get_char_height=function(t){var e,s;return e=document.createElement("span"),e.className="character",e.innerHTML="&nbsp;",t.appendChild(e),s=e.offsetHeight,t.removeChild(e),s},e}.call(this)}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};window.Caret=function(){function e(e){this.canvas=e,this.recalculate_pos=t(this.recalculate_pos,this),this.get_coords=t(this.get_coords,this),this.error=t(this.error,this),this.move_cmd_up=t(this.move_cmd_up,this),this.move_up=t(this.move_up,this),this.move_cmd_down=t(this.move_cmd_down,this),this.move_down=t(this.move_down,this),this.move_alt_right=t(this.move_alt_right,this),this.move_cmd_right=t(this.move_cmd_right,this),this.move_right=t(this.move_right,this),this.move_alt_left=t(this.move_alt_left,this),this.move_cmd_left=t(this.move_cmd_left,this),this.move_left=t(this.move_left,this),this.alt_delete=t(this.alt_delete,this),this.cmd_delete=t(this.cmd_delete,this),this["delete"]=t(this["delete"],this),this.enter=t(this.enter,this),this.spacebar=t(this.spacebar,this),this.tab=t(this.tab,this),this.type=t(this.type,this),this.el=document.createElement("div"),this.el.className="caret",this.el.style.height=Canvas.get_char_height(this.canvas)+"px",this.canvas.appendChild(this.el)}return e.prototype.pos=0,e.prototype.tab_size=4,e.prototype.type=function(t){var s,i=this;return s=e.new_char(t),this.canvas.insertBefore(s,this.el),this.pos+=1,s.onclick=function(t){var e;return i.canvas.insertBefore(i.el,s),i.recalculate_pos(),e=i.canvas.offsetLeft+s.offsetLeft,e+s.offsetWidth/2<t.clientX?i.move_right():void 0}},e.prototype.tab=function(t){var e,s,i;for(t.preventDefault(),i=[],e=0,s=this.tab_size;s>=0?s>e:e>s;s>=0?e++:e--)i.push(this.spacebar());return i},e.prototype.spacebar=function(t){return t&&t.preventDefault(),this.type("&nbsp;")},e.prototype.enter=function(){var t;return this.pos+=1,t=e.new_break(),t.classList.add("enter"),this.canvas.insertBefore(t,this.el)},e.prototype["delete"]=function(t){var e,s,i,r,n,h,o,a,c;if(t.preventDefault(),o=window.getSelection(),0===o.toString().length)return e=this.canvas.children[this.pos-1],e?(this.pos-=1,this.canvas.removeChild(e),!0):this.error();for(r=o.getRangeAt(0),n=r.startContainer.parentNode,h=r.endContainer.parentNode,h!==this.canvas&&(this.canvas.insertBefore(this.el,h),this.recalculate_pos(),this.move_right()),s=Array.prototype.slice.call(this.canvas.children),i=s.indexOf(n),a=this.pos-i,e=this.canvas.children[this.pos-1],c=0;a>=0?a>c:c>a;a>=0?c++:c--)this.pos-=1,this.canvas.removeChild(e),e=this.canvas.children[this.pos-1];return o.collapse(),!0},e.prototype.cmd_delete=function(t){var e,s;for(t.preventDefault(),e=this.canvas.children[this.pos-1],s=[];e&&!e.classList.contains("newline");)this["delete"](t),s.push(e=this.canvas.children[this.pos-1]);return s},e.prototype.alt_delete=function(t){var e,s;for(t.preventDefault(),e=this.canvas.children[this.pos-1];e&&(!e.classList.contains("character")||"&nbsp;"===e.innerHTML);)this["delete"](t),e=this.canvas.children[this.pos-1];for(s=[];e&&"&nbsp;"!==e.innerHTML&&!e.classList.contains("newline");)this["delete"](t),s.push(e=this.canvas.children[this.pos-1]);return s},e.prototype.move_left=function(t){var e;return t&&t.preventDefault(),this.pos>0?(e=this.canvas.children[this.pos-1],this.pos-=1,this.canvas.insertBefore(this.el,e),!0):this.error()},e.prototype.move_cmd_left=function(t){var e,s;for(t.preventDefault(),e=this.get_left_count(),s=0;e>=0?e>s:s>e;e>=0?s++:s--)this.move_left();return this.el.className="caret"},e.prototype.move_alt_left=function(t){var e,s;if(t.preventDefault(),e=this.canvas.children[this.pos-1]){for(;"&nbsp;"===e.innerHTML||e.classList.contains("newline");)this.move_left(),e=this.canvas.children[this.pos-1];for(s=[];e&&"&nbsp;"!==e.innerHTML&&!e.classList.contains("newline");)this.move_left(),s.push(e=this.canvas.children[this.pos-1]);return s}},e.prototype.move_right=function(t){var e,s;return t&&t.preventDefault(),this.pos<=this.canvas.children.length-2?(e=this.pos===this.canvas.children.length-2,s=this.canvas.children[this.pos+2],this.pos+=1,e?this.canvas.appendChild(this.el):this.canvas.insertBefore(this.el,s),!0):this.error()},e.prototype.move_cmd_right=function(t){var e;for(t.preventDefault();;)if(e=this.canvas.children[this.pos+1],e&&e.classList.contains("newline")||!this.move_right())break;return this.el.className="caret"},e.prototype.move_alt_right=function(t){var e,s;if(t.preventDefault(),e=this.canvas.children[this.pos+1]){for(;"&nbsp;"===e.innerHTML||e.classList.contains("newline");)this.move_right(),e=this.canvas.children[this.pos+1];for(s=[];e&&"&nbsp;"!==e.innerHTML&&!e.classList.contains("newline");)this.move_right(),s.push(e=this.canvas.children[this.pos+1]);return s}},e.prototype.move_down=function(t){var e,s,i;if(t&&t.preventDefault(),!this.canvas.children[this.pos+1])return this.error();for(e=this.get_left_count();this.move_right()&&0!==this.get_left_count(););for(i=0;e>=0?e>i:i>e;e>=0?i++:i--)s=this.canvas.children[this.pos+1],s&&s.classList.contains("newline")||this.move_right();return this.el.className="caret"},e.prototype.move_cmd_down=function(t){return t.preventDefault(),this.canvas.appendChild(this.el),this.pos=this.canvas.children.length-1},e.prototype.move_up=function(t){var e,s,i,r;if(t&&t.preventDefault(),!this.canvas.children[this.pos-1])return this.error();if(e=this.get_left_count(),e>0)for(;this.move_left()&&0!==this.get_left_count(););if(this.move_left(),s=this.get_left_count(),i=s-e,i>0)for(r=0;i>=0?i>r:r>i;i>=0?r++:r--)this.move_left();return this.el.className="caret"},e.prototype.move_cmd_up=function(t){var e,s;if(t.preventDefault(),this.canvas.children.length>1){for(s=0,e=this.canvas.children[s];e.classList.contains("caret");)s+=1,e=this.canvas.children[s];return this.pos=0,this.canvas.insertBefore(this.el,e)}},e.prototype.error=function(){var t;return this.el.classList.add("error"),t=this.el,setTimeout(function(){return t.classList.remove("error")},200),!1},e.prototype.get_coords=function(){return[this.el.offsetLeft,this.el.offsetTop]},e.prototype.get_left_count=function(){var t,e;for(t=0,e=this.canvas.children[this.pos-t];e&&!e.classList.contains("newline");)t+=1,e=this.canvas.children[this.pos-t];return t-1},e.prototype.recalculate_pos=function(){var t;return t=Array.prototype.slice.call(this.canvas.children),this.pos=t.indexOf(this.el)},e.new_char=function(t){var e;return e=document.createElement("span"),e.className="character",e.innerHTML=t,e},e.new_break=function(){var t;return t=document.createElement("br"),t.className="newline",t},e}.call(this)}.call(this),function(){new Canvas(document.querySelector(".canvas"))}.call(this),function(){}.call(this);