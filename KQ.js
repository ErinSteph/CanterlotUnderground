 /* KQ.js - CanterlotUnderground.net javascript extension */
 /* function initX() derivative work of James Campos, everything else team-kittens, no license.*/
 
 
 function initKQ(){ 

	if(navigator.appName == "Microsoft Internet Explorer"){
		document.body.innerHTML = 'GET <a href="http://www.mozilla.org/en-US/firefox/new/" target="_blank">FIREFOX</a> YOU FUCKING CRETIN<br>we are not supporting your shitty microshill browser, cunt.';
		return false;
	}
	

    var d, db, h, $, $$;
     
    d = document;
    db = document.body;
    h = document.getElementsByTagName('head')[0];
     
    $ = function(s, p){
                    if(!p || p == null){
                            p = db;
                    }
                    return p.querySelector(s);
            }      
    $$ = function(s, p){
                    if(!p || p == null){
                            p = db;
                    }
                    return p.querySelectorAll(s);
            }
           
    $.getVal = function(k, v){
                    if(typeof(Storage) !=="undefined"){
                            if(!v || v == null){
								if(localStorage.getItem("" + k) != null){
                                    return localStorage.getItem("" + k);
								}else{
									return 'undefined';
								}
                            }else{
                                if(localStorage.getItem("" + k) != null){
                                    return localStorage.getItem("" + k);
								}else{
									return v;
								}
                            }
                    }else{
                            return 'storage unavailable';
                    }
            }
           
    $.setVal = function(k, v){
                    if(typeof(Storage) !=="undefined"){
                            if(v == null){
                                return 'undefined';
                            }else{
                                return localStorage.setItem("" + k, v);
                            }
                    }else{
                            return 'storage unavailable';
                    }
            }
           
    $.delVal = function(k){
                    return localStorage.removeItem(k);
            }
           
    $.htm = function(s, v){
                    if(!v || v == null){
                            return s.innerHTML;
                    }else{
                            s.innerHTML = v;
                    }
                    return s;
            }
			
    $$.htm = function(s, v, n){
                    if(!v || v == null){
                            return s.innerHTML;
                    }else{
                            if(!n || n == null){                   
                                    for (var i = 0; i < s.length; i++) {
                                            s[i].innerHTML = v;
                                    }
                            }else{
                                    s[n].innerHTML = v;
                            }
                    }
                    return s;
            }
           
    $.val = function(s, v){
                    if(!v || v == null){
                            return s.value;
                    }else{
                            s.value = v;
                    }
                    return s;
            }
           
    $.att = function(s, a, v){
                    if(!v || v == null){
                            return s.getAttribute(a);
                    }else{
                            s.setAttribute(a, v);
                            return s;
                    }
            }      
			
    $$.att = function(s, a, v, n){
                    if(!v || v == null){
                            if(!n && n != 0 || n == null && n != 0){
                                    var x = [];
                                    for (var i = 0; i < $$(s).length; i++) {
                                            x.push(s[i].getAttribute(a));
                                    }
                                    return x;
                            }else{
                                    return s[n].getAttribute(a);
                            }
                    }else{
                            if(!n || n == null){   
                                    for (var i = 0; i < $$(s).length; i++) {
                                            s[i].setAttribute(a, v);
                                    }
                            }else{
                                    s[n].setAttribute(a, v);
                            }
                            return s;
                    }
            }
           
    $.elm = function(t, a, s){
                    var e = d.createElement(t);
                    if(a){
                            for (key in a){
                                    e.setAttribute(key, a[key]);
                            }
                    }
                    if(s){
                            s.appendChild(e);
                    }
                    return e;
            }
           
    $.css = function(s){
                    var e = d.createElement('style');
                    e.type = 'text/css';
                    if (e.styleSheet){
                      e.styleSheet.cssText = s;
                    } else {
                      e.appendChild(d.createTextNode(s));
                    }
                    h.appendChild(e);
                    return e;
            }
	
	$.event = function(t, i, s) {
			if (i == null) {
				i = {};
			}
			if (s == null) {
				s = d;
			}
			return s.dispatchEvent(new CustomEvent(t, i));
		}
	
	$.exists = function(s){
		if(s.length > 0){
			return true;
		}else{
			return false;
		}
	}
    
	$.each = function(a, c, e){
		for(var i = 0; i < a.length; i++){
			c(a[i], i);
			if(i == (a.length)-1){
				if(e && e != null){
					return e(a[i], i);
				}else{
					return a;
				}
			}
		}
	}
	
	$.time = function(t, c, l){
		if(c == false){
			return clearInterval(t);
		}else{
			if(l == true){
				return setInterval(function(){ c(); },t);
			}else{
				return setTimeout(function(){ c(); },t);
			}
		}
	}
	
	$.hasClass = function(s, c){
		if(s.className.indexOf(c) > -1){
			return true;
		}else{
			return false;
		}
	}
	
	//get some page info
	var $board, $thread, $path, $site, $protocol;
	$protocol = window.location.protocol;
	$site = window.location.hostname;
	$path = window.location.href;
	if($path.split($site)[1].indexOf('/') > -1){
		if($path.split($site+'/')[1].indexOf('/') > -1){
			$board = $path.split('.net/')[1].split('/')[0];
			if($path.split($site+'/')[1].indexOf('/res/') > -1){
				$thread = $path.split('/res/')[1].split('.')[0];
				if($thread.indexOf('#') > -1){
					$thread = $thread.split('#')[0];
				}
			}else{
				$thread = null;
			}
		}else{
			$board = null;
			$thread = null;
		}
	}else{
		$board = null;
		$thread = null;
	}
	
	var $$ownPosts = {};
	
	
	var $CU_isMod = false;
	if(getCookie("kumod") == "allboards"){
		$CU_isMod = true;
	}else if(getCookie("kumod") != ""){
		var $modc = getCookie("kumod").split('|');
		for(var i = 0; i < $modc.length; i++){
			if($modc[i] == $board){
				$CU_isMod = true;
				break;
			}
		}
	}
	
 function initX() {
    var spoilerspan = document.getElementsByTagName('span');
    for (var k=0;k<spoilerspan.length;k++){
            if (spoilerspan[k].getAttribute('style') == 'color:black;background-color:#000;') {
                    spoilerspan[k].setAttribute('style','color:black;');
                    spoilerspan[k].setAttribute('onmouseover','');
            }
    }
     
      var aeQ, aeQaeQ, AEOS, BOARD, _i, _ref, aa, autoUpdate, changeCheckbox, changeInterval, checkboxListener, config, favDead, favDeadHalo, favHalo, favNormal, favicon, head, inBefore, intervalId, isDead, key, m, makeOptions, makeRow, makeUpdater, n, onloadUpdater, parseResponse, r, replace, request, scroll, timerF, toggleVerbose, unread, updateFavicon, x;
      var __hasProp = Object.prototype.hasOwnProperty;
      config = {
        'Verbose': true,
        'Update Title': true,
        'Auto Start': false,
        'Interval': 10
      };
      AEOS = {
        init: function() {
          if (typeof GM_deleteValue === 'undefined') {
            window.GM_setValue = function(name, value) {
              value = (typeof value)[0] + value;
              return localStorage.setItem(name, value);
            };
            window.GM_getValue = function(name, defaultValue) {
              var type, value;
              if (!(value = localStorage.getItem(name))) {
                return defaultValue;
              }
              type = value[0];
              value = value.substring(1);
              switch (type) {
                case 'b':
                  return value === 'true';
                case 'n':
                  return Number(value);
                default:
                  return value;
              }
            };
            window.GM_addStyle = function(css) {
              var style;
              style = document.createElement('style');
              style.type = 'text/css';
              style.textContent = css;
              return document.getElementsByTagName('head')[0].appendChild(style);
            };
          }
          return GM_addStyle('\
               div.dialog {\
                   border: 1px solid;\
               }\
               div.dialog > div.move {\
                   cursor: default;\
               }\
               div.dialog label,\
               div.dialog a {\
                   cursor: pointer;\
               }\
           ');
        },
        makeDialog: function(id, position) {
          var dialog, left, top;
          dialog = document.createElement('div');
          dialog.className = 'reply dialog';
          dialog.id = id;
          switch (position) {
            case 'topleft':
              left = '0px';
              top = '0px';
              break;
            case 'topright':
              left = null;
              top = '0px';
              break;
            case 'bottomleft':
              left = '0px';
              top = null;
              break;
            case 'bottomright':
              left = null;
              top = null;
              break;
          }
          left = GM_getValue("" + (id) + "Left", left);
          top = GM_getValue("" + (id) + "Top", top);
          if (left) {
            dialog.style.left = left;
          } else {
            dialog.style.right = '0px';
          }
          if (top) {
            dialog.style.top = top;
          } else {
            dialog.style.bottom = '0px';
          }
          return dialog;
        },
        move: function(e) {
          var div;
          div = this.parentNode;
          AEOS.div = div;
          AEOS.dx = e.clientX - div.offsetLeft;
          AEOS.dy = e.clientY - div.offsetTop;
          AEOS.width = document.body.clientWidth - div.offsetWidth;
          AEOS.height = document.body.clientHeight - div.offsetHeight;
          document.addEventListener('mousemove', AEOS.moveMove, true);
          return document.addEventListener('mouseup', AEOS.moveEnd, true);
        },
        moveMove: function(e) {
          var bottom, div, left, right, top;
          div = AEOS.div;
          left = e.clientX - AEOS.dx;
          if (left < 20) {
            left = '0px';
          } else if (AEOS.width - left < 20) {
            left = '';
          }
          right = left ? '' : '0px';
          div.style.left = left;
          div.style.right = right;
          top = e.clientY - AEOS.dy;
          if (top < 20) {
            top = '0px';
          } else if (AEOS.height - top < 20) {
            top = '';
          }
          bottom = top ? '' : '0px';
          div.style.top = top;
          return (div.style.bottom = bottom);
        },
        moveEnd: function() {
          var div, id;
          document.removeEventListener('mousemove', AEOS.moveMove, true);
          document.removeEventListener('mouseup', AEOS.moveEnd, true);
          div = AEOS.div;
          id = div.id;
          GM_setValue("" + (id) + "Left", div.style.left);
          return GM_setValue("" + (id) + "Top", div.style.top);
        }
      };
      x = function(path, root) {
        root || (root = document.body);
        return document.evaluate(path, root, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
      };
      aeQ = function(selector, root) {
        root || (root = document.body);
        return root.querySelector(selector);
      };
      aeQaeQ = function(selector, root) {
        var _i, _len, _ref, _result, node, result;
        root || (root = document.body);
        result = root.querySelectorAll(selector);
        _result = []; _ref = result;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          node = _ref[_i];
          _result.push(node);
        }
        return _result;
      };
      inBefore = function(root, el) {
        return root.parentNode.insertBefore(el, root);
      };
      replace = function(root, el) {
        return root.parentNode.replaceChild(el, root);
      };
      n = function(tag, properties) {
        var element;
        element = document.createElement(tag);
        if (properties) {
          m(element, properties);
        }
        return element;
      };
      m = function(element, properties) {
        var _ref, key, val;
        _ref = properties;
        for (key in _ref) {
          if (!__hasProp.call(_ref, key)) continue;
          val = _ref[key];
          (element[key] = val);
        }
        return element;
      };
      AEOS.init();
      GM_addStyle('\
       #updater {\
           padding: 5px;\
           position: fixed;\
           border: 1px solid;\
           text-align: right;\
       }\
       #updater label {\
           cursor: pointer;\
       }\
       #updater span.new {\
           background: lime;\
       }\
       #updater:not(:hover) > *:not(:first-child) {\
           display: none;\
       }\
       #updater input[type="text"] {\
           width: 50px;\
       }\
       .move {\
           cursor: move;\
       }\
       span.error {\
           color: red;\
       }\
    ');
      _ref = config;
      for (key in _ref) {
        if (!__hasProp.call(_ref, key)) continue;
        _i = _ref[key];
        config[key] = GM_getValue(key, config[key]);
      }
      _ref = location.pathname.substring(1).split('/');
      BOARD = _ref[0];
      unread = [];
      r = null;
      intervalId = null;
      head = aeQ('head', document);
      if (!(favicon = aeQ('link[rel="shortcut icon"]', head))) {
        favicon = n('link', {
          rel: 'shortcut icon',
          href: 'http =//34pchan.org/lib/javascript/faviconnew.png'
        });
        head.appendChild(favicon);
      }
      favNormal = favicon.href;
      favHalo = /ws/.test(favNormal) ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAZklEQVR4XrWRQQoAIQwD+6L97j7Ih9WTQQxhDqJQCk4Mranuvqod6LgwawSqSuUmWSPw/UNlJlnDAmA2ARjABLYj8ZyCzJHHqOg+GdAKZmKPIQUzuYrxicHqEgHzP9g7M0+hj45sAnRWxtPj3zSPAAAAAElFTkSuQmCC' : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAADFBMVEUAAABmzDP///8AAABet0i+AAAAAXRSTlMAQObYZgAAAExJREFUeF4tyrENgDAMAMFXKuQswQLBG3mOlBnFS1gwDfIYLpEivvjq2MlqjmYvYg5jWEzCwtDSQlwcXKCVLrpFbvLvvSf9uZJ2HusDtJAY7Tkn1oYAAAAASUVORK5CYII=';
      favDeadHalo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAWUlEQVR4XrWSAQoAIAgD/f+njSApsTqjGoTQ5oGWPJMOOs60CzsWwIwz1I4PUIYh+WYEMGQ6I/txw91kP4oA9BdwhKp1My4xQq6e8Q9ANgDJjOErewFiNesV2uGSfGv1/HYAAAAASUVORK5CYII=';
      favDead = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAACVBMVEUAAAAAAAD/AAA9+90tAAAAAXRSTlMAQObYZgAAADtJREFUCB0FwUERxEAIALDszMG730PNSkBEBSECoU0AEPe0mly5NWprRUcDQAdn68qtkVsj3/84z++CD5u7CsnoBJoaAAAAAElFTkSuQmCC';
      isDead = false;
      parseResponse = function(responseText) {
        var body, replies;
        body = n('body', {
          innerHTML: responseText
        });
        replies = aeQaeQ('td.reply', body);
        return replies;
      };
      onloadUpdater = function() {
        var _j, _len, _ref2, _ref3, br, id, info, input, inputs, l, newReplies, replies, reply, table, timer;
        info = aeQ('#info');
        timer = aeQ('#timer');
        if (this.status === 404) {
          isDead = true;
          m(info, {
            textContent: '404',
            className: 'error'
          });
          timer.textContent = '';
          clearInterval(intervalId);
          inputs = aeQaeQ('#updater input');
          _ref2 = inputs;
          for (_j = 0, _len = _ref2.length; _j < _len; _j++) {
            input = _ref2[_j];
            input.disabled = true;
          }
          inputs = aeQaeQ('input[type="submit"]');
          _ref2 = inputs;
          for (_j = 0, _len = _ref2.length; _j < _len; _j++) {
            input = _ref2[_j];
            m(input, {
              disabled: true,
              value: '404'
            });
          }
          updateFavicon();
          if (config['Update Title']) {
            l = unread.length;
            document.title = ("(" + (l) + ") /" + (BOARD) + "/ - 404");
          }
          return null;
        }
        if (this.status === 0) {
          info.textContent = 'retry';
          timer.textContent = '-1';
          return null;
        }
        br = aeQ('br[clear]');
        id = ((typeof (_ref3 = ((_ref2 = x('preceding::td[@id][1]', br)))) === "undefined" || _ref3 === null) ? undefined : _ref3.id) || 0;
        newReplies = [];
        replies = parseResponse(this.responseText);
        replies.reverse();
        _ref2 = replies;
        for (_j = 0, _len = _ref2.length; _j < _len; _j++) {
          reply = _ref2[_j];
          if (reply.id <= id) {
            break;
          }
          newReplies.push(reply);
        }
        l = newReplies.length;
        if (config['Verbose']) {
          info.textContent = ("+" + (l));
        }
        if (l === 0) {
          info.className = '';
        } else {
          if (config['Verbose']) {
            info.className = 'new';
			document.dispatchEvent(new CustomEvent('newPosts', { detail: { board: BOARD, thread: window.location.href.split('/res/')[1].split('.')[0], count: l} }));
          }
          newReplies.reverse();
          unread = unread.concat(newReplies);
          _ref2 = newReplies;
          for (_j = 0, _len = _ref2.length; _j < _len; _j++) {
            reply = _ref2[_j];
            table = x('ancestor::table', reply);
            inBefore(br, table);
          }
          updateFavicon();
          if (config['Update Title']) {
            window.addEventListener('scroll', scroll, true);
            document.title = document.title.replace(/\d+/, unread.length);
          }
        }
        updateBackLinks();
		if($.getVal('DEsetAnimaGifs') == 1){ animaGifs(); }
		if($.getVal('DEsetDespoilerImgs') == 1){ despoilerImgs(); }
		if($.getVal('DEsetImageHovs') == 1){ reHovers(); }
		if($.getVal('DEsetAnonymize') == 1){ anonymizeAll(); }
		addpreviewevents();
       
	   return (timer.textContent = ("-" + (config['Interval'])));
      };
      request = function() {
        var timer;
        (typeof r === "undefined" || r === null) ? undefined : r.abort();
        r = new XMLHttpRequest();
        r.onload = onloadUpdater;
        r.open('GET', location.href, true);
        r.send();
        timer = aeQ('#timer');
        return (timer.textContent = 0);
      };
      timerF = function() {
        var time, timer;
        timer = aeQ('#timer');
        time = Number(timer.textContent) + 1;
        timer.textContent = time;
        if (time === 0) {
          return request();
        } else if (time > 10) {
          request();
          return (aeQ('#info').textContent = 'retry');
        }
      };
      updateFavicon = function() {
        var clone;
        clone = favicon.cloneNode(true);
        if (isDead) {
          clone.href = unread.length ? favDeadHalo : favDead;
        } else {
          clone.href = unread.length ? favHalo : favNormal;
        }
        replace(favicon, clone);
        return (favicon = clone);
      };
      scroll = function() {
        var bodyY;
        bodyY = document.body.clientHeight;
        while (unread.length) {
          if (unread[0].getBoundingClientRect().bottom > bodyY) {
            return null;
          }
          unread.shift();
          document.title = document.title.replace(/\d+/, unread.length);
        }
        updateFavicon();
        return window.removeEventListener('scroll', scroll, true);
      };
      autoUpdate = function() {
        var info, timer;
        timer = aeQ('#timer');
        info = aeQ('#info');
        if (this.checked) {
          intervalId = setInterval(timerF, 1000);
          return (timer.textContent = ("-" + (config['Interval'])));
        } else {
          clearInterval(intervalId);
          timer.textContent = '';
          return (info.textContent = 'Thread Updater');
        }
      };
      toggleVerbose = function() {
        return (aeQ('#timer').style.display = config['Verbose'] ? '' : 'none');
      };
      changeCheckbox = function() {
        config[this.name] = this.checked;
        GM_setValue(this.name, this.checked);
        switch (this.name) {
          case 'Verbose':
            return toggleVerbose();
          case 'Auto Update':
            return autoUpdate.call(this);
        }
      };
      changeInterval = function() {
        var timer, value;
        value = Number(this.value) || 10;
        this.value = value;
        GM_setValue('Interval', value);
        config['Interval'] = value;
        timer = aeQ('#timer');
        return parseInt(timer.textContent) > 0 ? (timer.textContent = "-$value") : null;
      };
      makeOptions = function(id, obj) {
        var _j, _k, _len, _ref2, _ref3, box, type, value;
        box = n('div', {
          id: id,
          className: 'reply'
        });
        position(box);
        _ref2 = obj;
        for (type in _ref2) {
          if (!__hasProp.call(_ref2, type)) continue;
          _j = _ref2[type];
          _ref3 = obj[type];
          for (_k = 0, _len = _ref3.length; _k < _len; _k++) {
            value = _ref3[_k];
            box.appendChild(makeRow(type, value));
          }
        }
        document.body.appendChild(box);
        return box;
      };
      makeRow = function(type, value) {
        var _j, _len, _ref2, div, el, input, label, span;
        div = n('div');
        if (type === 'bar') {
          div.className = 'move';
          div.addEventListener('mousedown', AEOS.move, true);
          _ref2 = value;
          for (_j = 0, _len = _ref2.length; _j < _len; _j++) {
            el = _ref2[_j];
            span = n('span', {
              id: el
            });
            div.appendChild(span);
            div.appendChild(document.createTextNode(' '));
          }
          return div;
        }
        input = n('input', {
          name: value,
          type: type
        });
        if (type === 'button') {
          input.value = value;
          input.addEventListener('click', request, true);
          div.appendChild(input);
          return div;
        }
        if (type === 'checkbox') {
          input.checked = config[value];
          input.addEventListener('change', changeCheckbox, true);
        } else {
          input.value = config[value];
          input.addEventListener('change', changeInterval, true);
        }
        label = n('label', {
          textContent: value
        });
        label.appendChild(input);
        div.appendChild(label);
        return div;
      };
      checkboxListener = function() {
        return this.name === 'Auto Update' ? autoUpdate.call(this) : GM_setValue(this.name, this.checked);
      };
      makeUpdater = function() {
        var _j, _len, _ref2, box, checkbox, checked, html, updater;
        updater = AEOS.makeDialog('updater', 'bottomright');
        html = "<div class=move><span id=info></span> <span id=timer></span></div>";
        _ref2 = ['Update Title', 'Verbose', 'Auto Start', 'Auto Update'];
        for (_j = 0, _len = _ref2.length; _j < _len; _j++) {
          box = _ref2[_j];
          key = box === 'Auto Update' ? 'Auto Start' : box;
          checked = config[key] ? 'checked' : '';
          html += ("<div><label>" + (box) + "<input type=checkbox name='" + (box) + "' " + (checked) + "></label></div>");
        }
        html += "<div style='display:none;'><label>Interval<input id='updFl' type=text></label></div>";
        html += "<div><input type=button value='Update Now'></div>";
        updater.innerHTML = html;
        _ref2 = aeQaeQ('input[type=checkbox]', updater);
        for (_j = 0, _len = _ref2.length; _j < _len; _j++) {
          checkbox = _ref2[_j];
          checkbox.addEventListener('click', checkboxListener, true);
        }
        aeQ('input[type=button]', updater).addEventListener('click', request, true);
        return document.body.appendChild(updater);
      };
      makeUpdater();
      toggleVerbose();
      aa = aeQ('#updater input[name="Auto Update"]');
      autoUpdate.call(aa);
      if (config['Update Title']) {
        unread = aeQaeQ('td.reply');
        updateFavicon();
        document.title = ("(" + (unread.length) + ") ") + document.title;
        scroll();
        window.addEventListener('scroll', scroll, true);
      }
    }
	

//set default settings
	function setsDefaults(){
		if($.getVal('DEdefIsSet') != '1'){
			$.setVal('DEsetAnimaGifs', '1');
			$.setVal('DEsetAnonymize', '0');
			$.setVal('DEsetDeskNotes', '0');
			$.setVal('DEsetDespoilerImgs', '0');
			$.setVal('DEsetDespoilerTxt', '0');
			$.setVal('DEsetHighOwn', '1');
			$.setVal('DEsetImageHovs', '1');
			$.setVal('DEsetMinNav', '0');
			$.setVal('DEsetQR', '1');
				$.setVal('DEdefIsSet', '1');
		}
	}
	
//get desktop notification permissions
	var status;
	function getNotPerm(){
	  if (Notification && Notification.permission !== "granted") {
		Notification.requestPermission(function (status) {
		  if (Notification.permission !== status) {
			Notification.permission = status;
		  }
		});
		}
	}
	
//omfg DESKTOP NOTIFICATIONZZZ
	function dNotify(n){
	    if (Notification.permission === "granted" && $.getVal('DEsetDeskNotes') == 1) {
          var n = new Notification(n);
        }
	}
	
//if value is 1 execute function
	function issetThen(v, f){
		if($.getVal('DE'+v) === 1){
			f;
		}
		return false;
	}

//window notifications
	function winNote(m, c, t){
		if(!c || c == null){
			c = 'green';
		}
		if(!t || t == null){
			t = 5;
		}
		$n = {};
		$n['id'] = 'winNote';
		$n['style'] = 'top:5%;margin-left:-175px;left:50%;position:fixed;width:350px;background:'+c+';text-align:center;font-weight:bold;color:#ffffff;padding:10px;font-family:Arial,Helvetica,sans-serif;border-radius:15px;';
		$n = $.elm('div', $n, db);
		$.htm($n, m);
		$.time((t*1000), function(){ 
			$n.parentNode.removeChild($n);
		}, false);		
	}

//hide the manage link
	function hideMg(){
		var $nav = $.htm($('.navbar2')).split('Home</a>]')[0]+'Home</a>]';
		$.htm($('.navbar2'), $nav);
		var $li = $$('a');
		for (var i = 0; i < $li.length; i++) {
			if($.att($li[i], 'href') == 'http://canterlotunderground.net/manage.php'){
				$.att($li[i], 'style', 'display:none;');
				break;
			}
		}
	}
	
//a function for sending reports
	function reportPost(p){
		var r = prompt("Reason for reporting /"+$board+"/"+p+"?", null);
		if(r != null && r != ""){
			var reportData = new FormData();
			reportData.append("board", $board);
			reportData.append("post[]", p);
			reportData.append("postpassword", $$('[name="postpassword"]')[1].value);
			reportData.append("reportreason", r);
			reportData.append("reportpost", "Report");
			var reportxhr = new XMLHttpRequest();
			reportxhr.open("POST", $protocol + '//' + $site + '/board.php');
			reportxhr.onreadystatechange = function(){
				if (reportxhr.readyState == 4) {
					if(reportxhr.responseText.indexOf('successfully') > 0){
						return winNote("/"+$board+"/"+p+" reported.", 'green', 3);
					}else if(reportxhr.responseText.indexOf('already') > 0){
						return winNote("/"+$board+"/"+p+" report failed, this post is already reported.", 'orange', 3);
					}else{
						return winNote("/"+$board+"/"+p+" report failed.", 'red', 3);
					}
				}
			}
			reportxhr.send(reportData);
		}else if(r == ""){
			return winNote("/"+$board+"/"+p+" report failed, please specify a reason.", 'red', 3);
		}else{
			return winNote("/"+$board+"/"+p+" report aborted.", 'red', 3);
		}
	}
	
//a function for deleting posts
	function deletePost(p){
		var confirmed = confirm("You sure you want to delete /"+$board+"/"+p+"?");
		if (confirmed == true){
			var deleteData = new FormData();
				deleteData.append("board", $board);
				deleteData.append("post[]", p);
				deleteData.append("postpassword", $$('[name="postpassword"]')[1].value);
				deleteData.append("reportreason", '');
				deleteData.append("deletepost", "Delete");
				var deletexhr = new XMLHttpRequest();
				deletexhr.open("POST", $protocol + '//' + $site + '/board.php');
				deletexhr.onreadystatechange = function(){
					if (deletexhr.readyState == 4) {
						if(deletexhr.responseText.indexOf('successfully') > 0){
							var $cbx = $('label', $('#reply'+p)); 
							$cbx.innerHTML = '<b style="color:orange;">[DELETED]</b>' + $cbx.innerHTML;
							$.att($('#reply'+p), 'style', 'opacity:0.4');
							return winNote("/"+$board+"/"+p+" deleted.", 'green', 3);
						}else{
							return winNote("/"+$board+"/"+p+" deletion failed.", 'red', 3);
						}
					}
				}
				deletexhr.send(deleteData);
			}else{
				return winNote("/"+$board+"/"+p+" deletion aborted.", 'green', 3);
			}
	
	}
//build posts menus 
	function postMenuToggle(m, b){
		var $m = $('#'+m);
		var $b = $('#'+b);
		if($m.style.display == "none"){
			$.htm($('mentag', $b), '&#9650;');
			return $m.style.display = "";
		}else{
			$.htm($('mentag', $b), '&#9660;');
			return $m.style.display = "none";
		}
	}

	function buildPostMenu(s, b, t, p){
	
		var $button = {};
		$button['id'] = "postMenuButton-"+b+"-"+t+"-"+p;
		$button['class'] = "postMenuButton";
		$button = $.elm('span', $button, $('label', s));
		$.htm($button, '\
			<a title="Post Menu"><mentag>&#9660;</mentag></a>\
		');
		if($.getVal('CU_OWNER_'+b+'_'+p) == 'true' || $CU_isMod == true){
			var deletelink = '[&nbsp;<a id="menuDelete'+p+'">Delete</a>&nbsp;]&nbsp';
		}else{
			var deletelink = '';
		}
	
		var $menu = {};
		$menu['id'] = "postMenu-"+b+"-"+t+"-"+p;
		$menu['class'] = "postMenu";
		$menu['style'] = "display:none;padding:2px;border:1px outset;text-align:center;";
		$menu = $.elm('div', $menu, $('label', s));
		$.htm($menu, '\
			[&nbsp;<a id="menuReport'+p+'">Report</a>&nbsp;]&nbsp;\
			'+deletelink+'\
		');

		$('#menuReport'+p).addEventListener('click', function(){ reportPost(p); postMenuToggle("postMenu-"+b+"-"+t+"-"+p, "postMenuButton-"+b+"-"+t+"-"+p); }, false);
		if($.getVal('CU_OWNER_'+b+'_'+p) == 'true'){
			$('#menuDelete'+p).addEventListener('click', function(){ deletePost(p); postMenuToggle("postMenu-"+b+"-"+t+"-"+p, "postMenuButton-"+b+"-"+t+"-"+p); }, false);
		}
		
		$button.addEventListener('click', function(){ postMenuToggle("postMenu-"+b+"-"+t+"-"+p, "postMenuButton-"+b+"-"+t+"-"+p); }, false);	
		
	}
	
	function parseMenusPage(){
		var $replies = $$('.reply');
		$.each($replies, function($reply, i){
				buildPostMenu($reply, $board, $thread, $reply.id.split('reply')[1]);
		});
		
	}
	if(window.location.href.indexOf('/res/') > 0){ 
		parseMenusPage();
	}


//remove tripcodes and set all names to Anonymous	
	function anonymizeAll(){
		$$.htm($$('.postername'), 'Anonymous');
		$$.htm($$('.postertrip'), ' ');
	}
	
//remove image spoilers
	function despoilerImgs(){
		function $$desp(p){
			var p, f;
			for(var i = 0; i < (p.length)-1; i++){
				if($('.filesize', p[i]) != null){
					if($.htm($('.filesize', p[i])).indexOf(', Spoiler Picture.') > -1){
						f = $('.thumb', p[i]);
						f.src = f.src.replace("thumb", "src").replace("s.", ".");
						f.removeAttribute("height");
						f.removeAttribute("width"); 
						$.att($.att(f, 'style', 'max-height:200px;max-width:200px;border:2px dotted red;'), 'title', 'SPOILER!');
					}
				}
			}
			
		}
		function $$despOP(){
			f = $$('.thumb');
			for(var n = 0; n < f.length; n++){
				if(f[n].parentNode.parentNode.parentNode.id.split('d')[0] == 'threa'){
					if($.htm($('.filesize', f[n].parentNode.parentNode.parentNode)).indexOf(', Spoiler Picture.') > -1){
						f[n].src = f[n].src.replace("thumb", "src").replace("s.", ".");
						f[n].removeAttribute("height");
						f[n].removeAttribute("width"); 
						$.att($.att(f[n], 'style', 'max-height:255px;max-width:255px;border:2px dotted red;'), 'title', 'SPOILER!');
					}
				}
			}
		}
		$$desp($$('.reply'));
		$$despOP();
	}

//animate thumbnails, revised
	function animaGifs(){
	    var t = $$('.thumb');
        for(i = 0; i < t.length; i++){
			if(t[i].src.indexOf(".gif") > -1){
				if($.htm($('.filesize', t[i].parentNode.parentNode.parentNode)).indexOf(', Spoiler Picture.') < 0){
					t[i].src = t[i].src.replace("s.", ".").replace("thumb", "src");
					t[i].removeAttribute("height");
					t[i].removeAttribute("width"); 
					if(t[i].parentNode.parentNode.parentNode.className.indexOf('reply') == -1){
						$.att(t[i], 'style', 'max-height:255px;max-width:255px;');
					}else{
						$.att(t[i], 'style', 'max-height:200px;max-width:200px;');
					}
				}	
			}
        }
	}
	
//refresh the index

	function boardIndexRefresh(){
		$refreshing = true;
		$.htm($('#refInd'), 'Refreshing...');
		var xhr = new XMLHttpRequest();
		xhr.open('GET', window.location.href);
		xhr.onreadystatechange = function(e){
			if (this.readyState == 4 && this.status == 200){
				var xhrbody = this.responseText.split('<body>')[1].split('/<body>')[0];
				$.htm(db, xhrbody);
				initKQ();
				updateBackLinks();
				winNote('Index Refreshed', 'green', 5);
			}
			if (this.readyState == 4 && this.status != 200) {
				winNote('Index Refresh Failed', 'red', 5);
				$.htm($('#refInd'), 'Refresh Board Index');
			}
		}
		xhr.onabort = xhr.onerror = function(){
			winNote('Index Refresh Failed', 'red', 5);
			$.htm($('#refInd'), 'Refresh Board Index');
		}
		xhr.send();
	}
	
//clean the catalog 
	function cleanCatalog(){
		var $td = $$('td');
		for(var i = 0; i < $td.length; i++){
			if($('a', $td[i]).title != false){
				$('small', $td[i]).innerHTML += ' Replies - ' + $('a', $td[i]).title;
			}else{
				$('small', $td[i]).innerHTML += ' Replies.';
			}
		}
		document.title = '/'+$board+'/ catalog';
	
	}
	if(window.location.href.indexOf('catalog') > 0){
		cleanCatalog();
	}
	
	
	
	/*
//get mlpchan posts for hovers
	function hoverMlpchan(s, b, t, n){
		if(n && n != null){
			var xhr = new XMLHttpRequest();
			xhr.open("GET", "http://mlpchan.net/"+b+"/res/"+t+".html");
			xhr.onreadystatechange = function (){	
				if (xhr.readyState == 4) {
					var x = xhr.responseText;
					var reply = '<div id="replyC_'+n+x.split('<div id="replyC_'+n)[1].split('</div></div></div>')[0]+'</div></div></div>';
					return reply;
				}
			}
		}else{
			var xhr = new XMLHttpRequest();
			xhr.open("GET", "http://mlpchan.net/"+b+"/res/"+t+".html");
			xhr.onreadystatechange = function (){	
				if (xhr.readyState == 4) {
					var x = xhr.responseText;
					var reply = '<div id="replyC_'+t+x.split('<div id="replyC_'+t)[1].split('</div></div></div>')[0]+'</div></div></div>';
					return reply;
				}
			}
		}
	}
	
//parse quotes of mlpchan threads
	function parseMlpchan(){
		var $mq = $$('.externalMlpchan');
		$.each($mq, function(){
	
		});
	
	}
	*/
	
	
//despoiler text spoilers
	function despoilerTxt(){
		$.css('.spoiler{background-color:#FFFFFF !important');
	}
	
//re-arrange file info
	function readableFiles(){
		function parseFileInfo(a, i){
			if($.att(a, 'parsed') != 'true'){
				$.att(a, 'parsed', 'true');
				var l = $$('a', a);
				var inf = a.innerHTML.split('- (')[1].split(')')[0];
				var fSize = inf.split(',')[0];
				fSize = fSize.substring(0, (fSize.length-2))
				var fScale = inf.split(',')[1];
				fScale = fScale.substring(1, (fScale.length-2))
				var fName = inf.split(',')[2];
				fName = fName.substring(1, (fName.length-2));
				l[0].innerHTML = fName;
				var fLink = rLn(l[0]);
				var fSauce = rLn(l[1]) + rLn(l[2]) + rLn(l[3]) + rLn(l[4]);
				var newInfo = fLink + ' - (' + fSize + ', ' + fScale + ') - ' + fSauce;
				return a.innerHTML = newInfo;
			}else{
				return false;
			}
		}
	
		var f = $$('.filesize');
		function rLn(x){
			return x.outerHTML;
		}
		$.each(f, function(a, i){
				parseFileInfo(a, i);
		});
		//d.addEventListener('reflinkPreview', function(e){ alert(e.detail.id); }, false);	
	}
	d.addEventListener('extensionReady', function(){ readableFiles(); }, false);
	
//mark post's owners
	function markPosts(){
		var l = $$('a');
		for(var i = 0; i < l.length; i++){
			if(l[i].className.split('|')[0] == 'ref' && l[i].className.split('|')[1] == $board){
				if($.htm(l[i]).indexOf('OP') < 0 && $.htm(l[i]).indexOf('You') < 0){
					if(l[i].className.split('|')[3] == l[i].className.split('|')[2] && l[i].className.split('|')[2] == $thread){
						$.htm(l[i], $.htm(l[i])+'&nbsp;(OP)');
					}
					if($.getVal('CU_OWNER_'+$board+'_'+l[i].className.split('|')[3]) == 'true'){
						if(l[i].parentNode.className != "reflink"){
							$.htm(l[i], $.htm(l[i])+'&nbsp;(You)');
						}
					}
				}
			}
		}
	}

//create image hovers	
	function hovers(){
		var cs, $cs;
		var $img = $.att($.att($.elm('img', null, db), 'id', 'imageHov'), 'style', 'position:fixed;max-height:'+(window.innerHeight-200)+'px;max-width:'+(window.innerWidth-300)+'px;');
		function mmve(event){
			cs = window.getComputedStyle($img, null);
			$cs = parseFloat(cs.height.split('px')[0]);
			$img.style.left = (event.clientX + 20) + 'px';
			$img.style.top = (event.clientY - 100) + 'px';
			if((event.clientX + 20) < 100){
				$img.style.left = '100px';
			}
			if((event.clientY - 100) < 10){
				$img.style.top = '10px';
			}
			if((event.clientY - 100) > window.innerHeight - 10 - $cs){
				$img.style.top = (window.innerHeight - 10 - $cs)+'px';
			}
		}
		d.addEventListener('mousemove', mmve, false);

		$thumbs = $$('.imageLink');
		for(var i = 0; i < $thumbs.length; i++){
			$thumbs[i].addEventListener('mouseover', iHover, false);
		}
		function iHover(){
			if($('img', this).src.indexOf('s.') > 0 || $('img', this).title == 'SPOILER!' || $('img', this).src.indexOf('.gif') > -1){
				cs = window.getComputedStyle($.att($('#imageHov'), 'src', this.href), null);
				this.addEventListener('mouseleave', kHover, false);
				this.addEventListener('click', kHover, false);
				return $cs = parseFloat(cs.height.split('px')[0]);
			}else{
				return false;
			}
		}
		function kHover(){
			this.removeEventListener('mouseleave', kHover, false);
			return $('#imageHov').removeAttribute("src")
		}
	}
	
//re-apply hovers
	function reHovers(){
		$thumbs = $$('.imageLink');
		for(var i = 0; i < $thumbs.length; i++){
			$thumbs[i].removeEventListener('mouseover', iHover, false);
			$thumbs[i].addEventListener('mouseover', iHover, false);
		}
		function iHover(){
			if($('img', this).src.indexOf('s.') > 0 || $('img', this).title == 'SPOILER!' || $('img', this).src.indexOf('.gif') > -1){
				cs = window.getComputedStyle($.att($('#imageHov'), 'src', this.href), null);
				this.addEventListener('mouseleave', kHover, false);
				this.addEventListener('click', kHover, false);
				return $cs = parseFloat(cs.height.split('px')[0]);
			}else{
				return false;
			}
		}
		function kHover(){
			this.removeEventListener('mouseleave', kHover, false);
			this.removeEventListener('click', kHover, false);
			return $('#imageHov').removeAttribute("src")
		}
	}
	
//make nav height toggleable
	function navHTog(){
		var $n = $('#cssmenu');
		$.att($n, 'style', 'height:5px;overflow:hidden;');
		$n.addEventListener('mouseover', function(){
			$.att(this, 'style', 'height:37px;overflow:visible;');
		}, false);
		$n.addEventListener('mouseleave', function(){
			var av = false;
			$n.addEventListener('mouseover', function(){
				av = true;
			}, false);
			$.time(1000, function(){
				if(av == false){
					$.att($n, 'style', 'height:5px;overflow:hidden;');
				}
			}, false);
		}, false);
	}
	
//Highlight owner's posts
	function highOwn(){
		var $posts = $$('.reply');
		$.each($posts, function($post, i){
			var $num = $post.id.split('reply')[1];
			if($.getVal('CU_OWNER_'+$board+'_'+$num) == 'true'){
				$.att($post, 'style', 'border-left:3px solid;border-left-color:orange;');
			}			
		});
	}
	
//create QR
	function quickReply(){
		if($thread == null){
			var $replyThread = 0;
			var qrTitle = 'New Thread on /'+$board+'/';
		}else{
			var $replyThread = $thread;
			var qrTitle = 'Reply to /'+$board+'/'+$thread;
		}
		
		var $qrClass = $.css('\
			.qrContainer{\
				position:fixed;\
				border:1px solid;\
				top:50px;\
				left:' + (window.innerWidth - 340) + 'px;\
				width:303px;\
			}\
			#qrHandle{\
				width:100%;\
				margin-top:0px;\
				text-align:center;\
				cursor:move;\
			}\
			.qrPersonaField{\
				width:95px;\
				margin:0px;\
			}\
			.qrComField{\
				width:297px;\
				margin:0px;\
				height:100px;\
				resize:vertical;\
			}\
			.qrSubmit{\
				position:absolute;\
				right:0px;\
			}\
			.qrAbort{\
				position:absolute;\
				right:0px;\
			}\
			.qrFile{\
				width:220px;\
			}\
			#qrClearFile{\
				cursor:pointer;\
			}\
		');
		
		var $qrC = {};
		$qrC['id'] = 'qrContainer';
		$qrC['class'] = 'qrContainer postblock';
		$qrC = $.elm('div', $qrC, db);
		$.htm($qrC, '\
			<div class="postblock" id="qrHandle"><span style="float:left;left:3px;position:absolute;color:#606060;font-family:serif;font-size:12px;font-weight:800;"><input type="checkbox" id="qrHideBox" title="Hide"></span>'+qrTitle+'<span style="float:right;right:3px;position:absolute;color:#606060;font-family:serif;font-size:12px;font-weight:800;">[ <a title="Spoiler Image" style="cursor:help;">S</a>:<input type="checkbox" id="qrSpoiler">] </span></div>\
			<span id="qrBodyContainer"><span id="qrPersona" class="qrPersona">\
			<input type="text" class="qrPersonaField" placeholder="Name" id="qrName" /><input type="text" class="qrPersonaField" placeholder="Email" id="qrEmail" /><input type="text" class="qrPersonaField" placeholder="Subject" id="qrSub" />\
			</span><br>\
			<span id="qrInp" class="qrInp">\
			<textarea id="qrComField" class="qrComField" placeholder="Comment"></textarea>\
			</span>\
			<input type="file" id="qrFile" class="qrFile" multiple/><a id="qrClearFile" title="Clear Files" style="display:none;">&#10006;</a><span id="qrClearFileD" style="display:none;opacity:0.4;">&#10006;</span>\
			<button type="button" id="qrSubmit" class="qrSubmit">Submit</button><button type="button" id="qrAbort" class="qrAbort" style="display:none;">...</button></span>\
		');
	
		$('#postform').style.display = 'none';
		var isFormOpen = false;
	
		var $showPost = {};
		$showPost['id'] = 'showPostForm';
		$showPost['style'] = 'showPostForm';
		$showPost = $.htm($.elm('button', $showPost, $('#postbox')), 'Toggle Full Post Form');
		
		if($thread == null){
			var $refInd = {};
			$refInd['id'] = 'refInd';
			$refInd['style'] = 'refInd';
			$refInd = $.htm($.elm('button', $refInd, $('#postbox')), 'Refresh Board Index');
			$refInd.addEventListener('click', boardIndexRefresh, false);
		}
	
	
		$showPost.addEventListener('click', function(){
			if(isFormOpen == false){
				$('#postform').style.display = '';
				isFormOpen = true;
			}else{
				$('#postform').style.display = 'none';
				isFormOpen = false;
			}
		}, false);
	

	
		
		$('#qrComField').addEventListener('input', function(){
			$('#message1').value = $('#qrComField').value;
		}, false);
	
		if($.getVal('CU_QRNAME') != 'undefined'){ $('#qrName').value = $.getVal('CU_QRNAME'); }
		if($.getVal('CU_QREMAIL') != 'undefined'){ $('#qrEmail').value = $.getVal('CU_QREMAIL'); }
		if($.getVal('CU_QRSUB') != 'undefined'){ $('#qrSub').value = $.getVal('CU_QRSUB'); }
	
		$('#qrName').addEventListener('change', function(){
			$.setVal('CU_QRNAME', $('#qrName').value);
		}, false);
		$('#qrEmail').addEventListener('change', function(){
			$.setVal('CU_QREMAIL', $('#qrEmail').value);
		}, false);
		$('#qrSub').addEventListener('change', function(){
			$.setVal('CU_QRSUB', $('#qrSub').value);
		}, false);
		
		$('#qrName').addEventListener('mouseover', function(){
			$.att($('#qrName'), 'style', 'width:297px;');
			$.att($('#qrEmail'), 'style', 'display:none;');
			$.att($('#qrSub'), 'style', 'display:none;');
			
			$('#qrName').addEventListener('mouseleave', function(){
				$.att($('#qrName'), 'style', ' ');
				$.att($('#qrEmail'), 'style', ' ');
				$.att($('#qrSub'), 'style', ' ');
			}, false);					
		}, false);
	
		$('#qrEmail').addEventListener('mouseover', function(){
			$.att($('#qrName'), 'style', 'display:none;');
			$.att($('#qrEmail'), 'style', 'width:297px;');
			$.att($('#qrSub'), 'style', 'display:none;');
			
			$('#qrEmail').addEventListener('mouseleave', function(){
				$.att($('#qrName'), 'style', ' ');
				$.att($('#qrEmail'), 'style', ' ');
				$.att($('#qrSub'), 'style', ' ');
			}, false);					
		}, false);
	
		$('#qrSub').addEventListener('mouseover', function(){
			$.att($('#qrName'), 'style', 'display:none;');
			$.att($('#qrEmail'), 'style', 'display:none;');
			$.att($('#qrSub'), 'style', 'width:297px;');
			
			$('#qrSub').addEventListener('mouseleave', function(){
				$.att($('#qrName'), 'style', ' ');
				$.att($('#qrEmail'), 'style', ' ');
				$.att($('#qrSub'), 'style', ' ');
			}, false);					
		}, false);
	
		$('#qrHandle').addEventListener('mousedown', function(event){
			var fposX = event.clientX;
			var fposY = event.clientY;
			function mve(event){
				$qrC.style.left = (event.clientX - 40) + 'px';
				$qrC.style.top = (event.clientY - 5) + 'px';
			}
			d.addEventListener('mousemove', mve, false);
			$('#qrHandle').addEventListener('mouseup', function(){
				d.removeEventListener('mousemove', mve, false);
			}, false);
		}, false);
	
		$('#qrClearFile').addEventListener('click', function(){
			$('#qrFile').value = '';
			$('#qrClearFile').style.display = 'none';
		}, false);
	
		$("#qrFile").addEventListener('change', function(){
			if($("#qrFile").value != '' && $("#qrFile").value != null && $("#qrFile").value != 'undefined'){
				$('#qrClearFile').style.display = '';
			}else{
				$('#qrClearFile').style.display = 'none';
			}
		}, false);
	
		function qrAutoMin(){
			if($('#qrBodyContainer').style.display == "none"){
				return $('#qrBodyContainer').style.display = "";
			}else{
				return $('#qrBodyContainer').style.display = "none";
			}
		}
		$("#qrHideBox").addEventListener('change', function(){
			if($('#qrHideBox').checked == true){
				$('#qrBodyContainer').style.display = "none";
				$.setVal('CU_qrMinimized', 'true');
				$('#qrHandle').addEventListener('mouseover', qrAutoMin, false);
				$('#qrContainer').addEventListener('mouseleave', qrAutoMin, false);			
			}else{
				$('#qrBodyContainer').style.display = "";
				$.setVal('CU_qrMinimized', 'false');
				$('#qrHandle').removeEventListener('mouseover', qrAutoMin, false);
				$('#qrContainer').removeEventListener('mouseleave', qrAutoMin, false);
			}
		}, false);
		if($.getVal('CU_qrMinimized') == 'true'){
			$('#qrBodyContainer').style.display = "none";
			$('#qrHideBox').checked = true;
			$('#qrHandle').addEventListener('mouseover', qrAutoMin, false);
			$('#qrContainer').addEventListener('mouseleave', qrAutoMin, false);			
		}
		
		function modForm(){
			$.htm($('#qrInp'), $.htm($('#qrInp')) + '\
				<span id="qrModForm" style="color:#34345C;font-family:sans-serif;text-decoration:none;">\
				<br><input type="text" id="qrModPass" style="width:297px;" placeholder="Posting Password"><br>&nbsp;Mod - \
				<a title="Display">D</a>:<input type="checkbox" id="qrModDisplay"> / \
				<a title="Lock">L</a>:<input type="checkbox" id="qrModLock"> / \
				<a title="Sticky">S</a>:<input type="checkbox" id="qrModSticky"> / \
				<a title="Raw HTML">RH</a>:<input type="checkbox" id="qrModRaw"> / \
				<a title="Name">N</a>:<input type="checkbox" id="qrModName"> \
				</span>\
				');
		}
		if($CU_isMod == true){
			modForm();
		}
	
		function keyListener(e){
			if(!e){
				e = event;
			}
			if(e.altKey && e.ctrlKey && e.keyCode==66){ 
				//ctrl+alt+b
				return $.val($('#qrComField'), $('#qrComField').value+'[b][/b]');
			}else if (e.altKey && e.ctrlKey && e.keyCode == 73){
				//ctrl+alt+i
				return $.val($('#qrComField'), $('#qrComField').value+'[i][/i]');
			}else if (e.altKey && e.ctrlKey && e.keyCode == 85){
				//ctrl+alt+u
				return $.val($('#qrComField'), $('#qrComField').value+'[u][/u]');
			}else if (e.altKey && e.ctrlKey && e.keyCode == 84){
				//ctrl+alt+t
				return $.val($('#qrComField'), $('#qrComField').value+'[s][/s]');
			}else if (e.altKey && e.ctrlKey && e.keyCode == 83){
				//ctrl+alt+s
				return $.val($('#qrComField'), $('#qrComField').value+'[?][/?]');
			}else if (e.altKey && e.ctrlKey && e.keyCode == 72){
				//ctrl+alt+h		
				return $.val($('#qrComField'), $('#qrComField').value+'[#][/#]');
			}
		}
		$('#qrComField').onkeydown = keyListener;

		
		function qrSubmit(){
			var abrted = false;
			var fi = 0;
			function qrSubmitFi(ffi){
				if(ffi != 0){
					delete formData;
					delete xhr;
				}
				var formData = new FormData();
					formData.append("board", $board);
					formData.append("replythread", $replyThread);
					formData.append("name", $.val($('#qrName')));
					formData.append("em", $.val($('#qrEmail')));
					formData.append("subject", $.val($('#qrSub')));
					formData.append("message", $.val($('#qrComField')));
					formData.append("imagefile", $("#qrFile").files[ffi]);
					formData.append("postpassword", $.val($('[accesskey="p"]')));
					if($CU_isMod == true){
						formData.append("modpassword", $('#qrModPass').value);
						if($('#qrModDisplay').checked == true){ formData.append("displaystaffstatus", $('#qrModDisplay').value); }
						if($('#qrModLock').checked == true){ formData.append("lockonpost", $('#qrModLock').value); }
						if($('#qrModSticky').checked == true){ formData.append("stickyonpost", $('#qrModSticky').value); }
						if($('#qrModRaw').checked == true){ formData.append("rawhtml", $('#qrModRaw').value); }
						if($('#qrModName').checked == true){ formData.append("usestaffname", $('#qrModName').value); }

					}
					if($('#qrSpoiler').checked == true){ formData.append("spoiler", $('#qrSpoiler').value); }
				var xhr = new XMLHttpRequest();
				xhr.open("POST", $protocol + '//' + $site + '/board.php');
	
				function deact(){
					abrted = true;
					fi = $("#qrFile").files.length;
					xhr.abort();
					delete formData;
					delete xhr;
					$('#qrSubmit').disabled = false;
					$('#qrComField').disabled = false;
					$('#qrName').disabled = false;
					$('#qrEmail').disabled = false;
					$('#qrSub').disabled = false;
					$('#qrFile').disabled = false;				
					$('#qrSubmit').style.display = '';
					$('#qrAbort').style.display = 'none';
				}
				
				 function abortQR(){
					abrted = true;
					fi = $("#qrFile").files.length;
					xhr.abort();
					delete formData;
					delete xhr;
					$('#qrSubmit').disabled = false;
					$('#qrComField').disabled = false;
					$('#qrSubmit').style.display = '';
					$('#qrAbort').style.display = 'none';
					if(fi > 0){
						$('#qrClearFile').style.display = '';
					}
					$('#qrClearFileD').style.display = 'none';
					dNotify('CanterlotUnderground/' + $board + '/: Upload Aborted');
				}
				$('#qrAbort').addEventListener('click', abortQR, false);
				
				function updateProgress(e){
				  if (e.lengthComputable){
					var percentComplete = parseInt((e.loaded / e.total)*100);
					$.htm($('#qrAbort'), percentComplete+'%');
				  } else {
					$.htm($('#qrAbort'), 'unknown %');
				  }
				}
				xhr.upload.addEventListener("progress", updateProgress, false);
	
				function postingDelay(t, fi){
					$.time(1000, function(){
						if(t === 0){
							if(abrted == false){
								return qrSubmitFi(fi);
							}else{
								return deact();
							}
						}
						$.htm($('#qrAbort'), t);
						t = t-1;
						return postingDelay(t, fi);
					}, false);
				}
	
				function postIsError(x){
					if(x.indexOf('Error</h1>') > -1){
						var err = x.split('<h2')[1].split('>')[1].split('</h2')[0];
						return err;
					}else{
						return false;
					}
				}
	
				xhr.onreadystatechange = function () {
					if (xhr.readyState == 4) {
						if($("#qrFile").files.length <= 1 || $thread == null){
							$.htm($('#qrAbort'), '...');
							$('#qrSubmit').style.display = '';
							$('#qrAbort').style.display = 'none';
							$('#qrSubmit').disabled = false;
							$('#qrComField').disabled = false;
							$('#qrFile').disabled = false;
							$('#qrName').disabled = false;
							$('#qrEmail').disabled = false;
							$('#qrSub').disabled = false;
							$('#qrClearFileD').style.display = 'none';
							if(postIsError(xhr.responseText) != false){
								$('#qrClearFile').style.display = '';
								if($('#qrFile').value == ''){
									$('#qrClearFile').style.display = 'none';
								}
								winNote('Post Failed - ' + postIsError(xhr.responseText), 'red', 3);
								return dNotify('CanterlotUnderground/' + $board + '/: Post Failed - ' + postIsError(xhr.responseText));
							}else{
								$('#qrClearFile').style.display = 'none';
								$('#qrComField').value = '';
								$.event('input', null, $('#qrComField'));
								$('#qrFile').value = '';
								dNotify('CanterlotUnderground/' + $board + '/: Post Successful');
								if($thread == null){
									$.setVal('CU_OWNER_'+$board+'_'+xhr.responseText.split('<first post="')[1].split('"')[0], 'true'); 
									$.event('QR_Post', { detail: { board: $board, thread: $thread, post: xhr.responseText.split('<first post="')[1].split('"')[0] } });
									return window.location = 'http://canterlotunderground.net/'+$board+'/res/'+xhr.responseText.split('<first post="')[1].split('"')[0];
								}else{
									$.setVal('CU_OWNER_'+$board+'_'+xhr.responseText.split('<last post="')[1].split('"')[0], 'true');
									winNote('Post Successful', 'green', 5);
									$.event('QR_Post', { detail: { board: $board, thread: $thread, post: xhr.responseText.split('<last post="')[1].split('"')[0] } });
									return false;
								}								
							}
						}else{
							fi = (fi)+1;
							$('#qrComField').value = '';
							$.event('input', null, $('#qrComField'));
							if(postIsError(xhr.responseText) != false){
								winNote('Post ' + fi + '/' + $("#qrFile").files.length + ' Failed - ' + postIsError(xhr.responseText), 'red', 4);
								dNotify('CanterlotUnderground/' + $board + '/: Post ' + fi + '/' + $("#qrFile").files.length + ' Failed - ' + postIsError(xhr.responseText));
							}else{
								$.setVal('CU_OWNER_'+$board+'_'+xhr.responseText.split('<last post="')[1].split('"')[0], 'true');
								$.event('QR_Post', { detail: { board: $board, thread: $thread, post: xhr.responseText.split('<last post="')[1].split('"')[0] } });
								dNotify('CanterlotUnderground/' + $board + '/: Post Successful - ' + fi + '/' + $("#qrFile").files.length);
							}
							if(fi >= $("#qrFile").files.length || abrted == true){
								$('#qrSubmit').disabled = false;
								$('#qrComField').disabled = false;
								$('#qrFile').disabled = false;
								$('#qrName').disabled = false;
								$('#qrEmail').disabled = false;
								$('#qrSub').disabled = false;
								$('#qrFile').value = '';
								$('#qrClearFile').style.display = 'none';
								$('#qrClearFileD').style.display = 'none';
								$.htm($('#qrAbort'), '...');
								$('#qrSubmit').style.display = '';
								$('#qrAbort').style.display = 'none';
								return dNotify('CanterlotUnderground/' + $board + '/: Posting Complete.');
							}else{
								$('#qrComField').value = (fi+1) + '/' + $("#qrFile").files.length;
								postingDelay(7, fi);
							}
						} 
					}
				}
				
				xhr.send(formData);	
				if($('#qrFile').value != ''){
					$('#qrClearFileD').style.display = '';
				}
				$('#qrClearFile').style.display = 'none';
				$('#qrSubmit').style.display = 'none';
				$('#qrAbort').style.display = '';
				$('#qrSubmit').disabled = true;
				$('#qrFile').disabled = true;
				$('#qrComField').disabled = true;
				$('#qrName').disabled = true;
				$('#qrEmail').disabled = true;
				$('#qrSub').disabled = true;
			}
			qrSubmitFi(fi);
		}
	
		$('#qrSubmit').addEventListener('click', qrSubmit, false);
		
		var postQuotes = {};
		
		function qrSetQuotes(){
			var $$a = $$('a');
			for(var i = 0;i < $$a.length;i++){
				if($$a[i].parentNode.className == 'reflink'){
					if($$a[i].href.split('#')[1].indexOf('i') == 0){
						if(postQuotes[$$a[i].innerHTML] != 'set'){
							$$a[i].addEventListener('click', function(e){
								e.preventDefault();
								e.stopPropagation();
								$('#qrComField').value = $('#qrComField').value + '>>' + this.innerHTML + '\n';
								$.event('input', null, $('#qrComField'));
							}, false);
							postQuotes[$$a[i].innerHTML] = 'set';
						}
					}
				}
			}
		}
		qrSetQuotes();
		d.addEventListener('newPosts', function(){ $.time(1000, function(){ qrSetQuotes(); }, false); }, false);
	
	
	}
	
	function qrInit(){
		if(window.location.href.indexOf('catalog') < 0){
			return quickReply();
		}else{
			return false;
		}
	}
	
//a function to create menu settings checkboxes
	function menuCheckBox(i, f, t){
		$.htm($.att($.elm('li', null, $('#setUL')), 'style', 'cursor:default;'), '<a><input type="checkbox" id="'+i+'" value="1"> '+t+'</a>').addEventListener('change', function(){
			if($('#'+i).checked == true){ $.setVal('DE'+i, '1'); }else{ $.setVal('DE'+i, '0');}
		}, false);
		if($.getVal('DE'+i, 1) == 0){ $('#'+i).checked = false; }else{ $('#'+i).checked = true; }
		if($('#'+i).checked == true){ f(); }
		return false;
	}
	
//a function to create advanced menu settings checkboxes
	function advancedMenuCheckBox(i, f, t){
		$.htm($.elm('span', null, $('set')), '<input type="checkbox" id="adv-'+i+'" value="1"> '+t).addEventListener('change', function(){
			if($('#adv-'+i).checked == true){ $.setVal('DE'+i, '1'); }else{ $.setVal('DE'+i, '0');}
		}, false);
		if($.getVal('DE'+i, 1) == 0){ $('#adv-'+i).checked = false; }else{ $('#adv-'+i).checked = true; }
		if($('#adv-'+i).checked == true){ f(); }
		return false;
	}
	
//execute functions if user has enabled them
	function fireIfSet(v, f){
		if($.getVal('DE'+v) == 1){
			return f();
		}else{
			return false;
		}
	}
	
//a function to create menu settings links
	function menuButtonLink(t, f){
		$.htm($.att($.elm('li', null, $('#setUL')), 'style', 'cursor:pointer;'), '<a>'+t+'</a>').addEventListener('click', function(){ f(); }, false);
		return false;
	}
	
//create advanced menu

	function createAdvancedMenu(){
		var $menuCSS = $.css('\
			.settingsAdvanced{\
				width:300px;\
				height:300px;\
				position:fixed;\
				left:50%;\
				top:25%;\
				margin-left:-150px;\
				border:1px solid;\
				text-align:center;\
				background:#EEF2FF;\
			}\
		');
		var $menu = {};
		$menu['id'] = 'settingsAdvanced';
		$menu['class'] = 'settingsAdvanced';
		$menu['style'] = 'display:none;';
		$menu = $.elm('div', $menu, db);
		$.htm($menu, '\
			<h2>Advanced Settings</h2>\
			<set>\
			</set>\
			<button type="button" id="adv_Close">Close</button>\
		');
		$('#adv_Close').addEventListener('click', function(){ $('#settingsAdvanced').style.display = 'none'; }, false);
		//advancedMenuCheckBox('setAnimaGifs', animaGifs, 'Animate GIF Thumbs');
	}
	//createAdvancedMenu();
	
//create settings menu
	function createMenu(){
		setsDefaults();
		var $nav = $('ul', $('#cssmenu'));
		var $menu = {};
		$menu['class'] = 'has-sub last';
		$menu = $.elm('li', $menu, $nav);
		$.htm($menu, '\
			<a style="cursor:pointer;"><span>Settings</span></a>\
			<ul id="setUL">\
				<li id="cssLi"><a></a></li>\
			</ul>\
		');
		var $se = $$('select');
		for (var i = 0; i < $se.length; i++) {
			if($.htm($se[i]).indexOf('<option>Styles</option>') > -1){
				var $cssol = $se[i].parentNode;
				$('a', $.att($('#cssLi'), 'style', 'text-align:center;')).appendChild($se[i]);
				$nav.removeChild($cssol);
				break;
			}
		}
		
		//create menu checkboxes like menuCheckBox('box_and_storage_value_id', function_to_execute_if_checked, 'Text in menu');
		menuCheckBox('setAnimaGifs', animaGifs, 'Animate GIF Thumbs');
		menuCheckBox('setAnonymize', anonymizeAll, 'Anonymize All');	
		menuCheckBox('setDeskNotes', getNotPerm, 'Desktop Notifications');
		menuCheckBox('setDespoilerImgs', despoilerImgs, 'Despoiler Thumbs');
		menuCheckBox('setDespoilerTxt', despoilerTxt, 'Despoiler Text');
		menuCheckBox('setHighOwn', highOwn, 'Mark Own Posts');
		menuCheckBox('setImageHovs', hovers, 'Image Hover Expansion');
		menuCheckBox('setMinNav', navHTog, 'Minimise Navigation');
		menuCheckBox('setQR', qrInit, 'Quick Reply');
		
		//create menu links like menuButtonLink('Link Text', function(){ alert('link was clicked'); });
		//menuButtonLink('Advanced', function(){ if($('#settingsAdvanced').style.display == 'none'){$('#settingsAdvanced').style.display = 'block';}else{$('#settingsAdvanced').style.display = 'none';} });
			
		//add the "last" class to the last settings menu item
		var $su = $$('li', $('#setUL'));
		for (var j = 0; j < $su.length; j++) {
			if(j == ($su.length)-1){
				$.att($su[j], 'class', 'last');
			}
		}
		
		//menu is built, fire the event so other scripts can add to our settings menu
		//listen like: 	document.addEventListener('settingsReady', function(){alert('settings are ready');}, false);
		$.event('settingsReady');
		
	}		
	
	d.addEventListener('newPosts', function(e){
		if(e.detail.count > 1){var lpl = 's'}else{var lpl = '';}
		$.time(500, function(){
			fireIfSet('setHighOwn', function(){ highOwn(); });
			readableFiles();
			markPosts();
			if(window.location.href.indexOf('/res/') > 0){
				$.each($$('.reply'), function(a, i){
					var $pNo = a.id.split('reply')[1];
					if(a.innerHTML.indexOf('postMenuButton') < 0){
						buildPostMenu(a, $board, $thread, $pNo);
					}
				});
			}
		}, false);
		$.time(600, function(){
			var mentioned = false;
			var po = $$('.reply');
				for (var i = 0; i < po.length; i++){
					if(i >= (po.length - e.detail.count)-1){
						var poA = $('#'+po[i].id); 
						if(poA.innerHTML.indexOf('You)</a>') > 0){
							var mentioned = true;
						}
					}
				}
			if(mentioned == false){
				dNotify(e.detail.count + ' New Post' + lpl + ': CanterlotUnderground/' + e.detail.board + '/' + e.detail.thread);
			}else{
				dNotify('Mentioned: CanterlotUnderground/' + e.detail.board + '/' + e.detail.thread);
			}
		}, false);
	}, false);
	
//call the functions
	hideMg();
	markPosts();
	if(window.location.href.indexOf('/res/') > -1 ){ initX(); }
	createMenu();
	
//init is done, trigger the event and lets post ponies. it passes the board and thread number as details.
//listen like: document.addEventListener('extensionReady', function(e){alert('board: ' + e.detail.board + ', thread: ' + e.detail.thread + ', extension ready');}, false);
	$.event('extensionReady', { detail: { board: $board, thread: $thread } });
	
	
} document.addEventListener("DOMContentLoaded", initKQ, false);	