/* ----------------------------------------------
Sticky Sidebar
creds: https://codepen.io/cheryllaird/pen/nQZEvx
---------------------------------------------- */
var stickySidebar = $('.sticky');

if (stickySidebar.length > 0) {	
  var stickyHeight = stickySidebar.height(),
      sidebarTop = stickySidebar.offset().top;
}

// on scroll move the sidebar
$(window).scroll(function () {
  if (stickySidebar.length > 0) {	
    var scrollTop = $(window).scrollTop();
            
    if (sidebarTop < scrollTop) {
      stickySidebar.css('top', scrollTop - sidebarTop);

      // stop the sticky sidebar at the footer to avoid overlapping
      var sidebarBottom = stickySidebar.offset().top + stickyHeight,
          stickyStop = $('.main-content').offset().top + $('.main-content').height();
      if (stickyStop < sidebarBottom) {
        var stopPosition = $('.main-content').height() - stickyHeight;
        stickySidebar.css('top', stopPosition);
      }
    }
    else {
      stickySidebar.css('top', '0');
    } 
  }
});

$(window).resize(function () {
  if (stickySidebar.length > 0) {	
    stickyHeight = stickySidebar.height();
  }
});

/* ----------------------------------------------
Translation Feature
---------------------------------------------- */

class Translate {
	constructor(attribute, lng) {
		// initialization
		this.attribute = attribute;
		this.lng = lng;
	}
	// translate 
	process() {
		var attr = this.attribute;
		var xrhFile = new XMLHttpRequest();
		// load content data 
		xrhFile.open("GET", "https://rinareimer.com/" + this.lng + ".json", false);
		xrhFile.onreadystatechange = function () {
			if (xrhFile.readyState === 4) {
				if (xrhFile.status === 200 || xrhFile.status == 0) {
					var LngObject = JSON.parse(xrhFile.responseText);
					var allDom = document.getElementsByTagName("*");
					for (var i = 0; i < allDom.length; i++) {
						var elem = allDom[i];
						var key = elem.getAttribute(attr);
						if (key != null) { 
							elem.innerHTML = LngObject[key];
						}
					}

				}
			}
		};
		xrhFile.send();
	};
}

// This function will be called when user click changing language
function translate(lng, tagAttr){
  var translate = new Translate(tagAttr, lng);
  translate.process();
  if(lng == 'en'){
    $("#enTranslator").css('color', '#E97A60');
    $("#deTranslator").css('color', '#000');
  } 
  if(lng == 'de'){
    $("#deTranslator").css('color', '#E97A60');
    $("#enTranslator").css('color', '#000');
  }
}

$(document).ready(function(){
  // This is id of HTML element (English) with attribute lng-tag
  $("#enTranslator").click(function(){
  translate('en', 'lng-tag');
  })
  // This is id of HTML element (Deutsch) with attribute lng-tag
  $("#deTranslator").click(function(){
  translate('de', 'lng-tag');
  });
});

/* ----------------------------------------------
Draggable Content
creds: https://www.redblobgames.com/making-of/draggable/
---------------------------------------------- */

const draggableElements = document.querySelectorAll(".draggable");
draggableElements.forEach((el, index) => {
  let state = {
    eventToCoordinates(event) { return {x: event.clientX, y: event.clientY}; },
    dragging: false,
    _pos: {x: 0, y: 0},
    get pos() { return this._pos },
    set pos(p) {
        const container = el.parentNode.getBoundingClientRect();
        const bounds = el.getBoundingClientRect();
        this._pos = {
            x: clamp(p.x, -20, container.width - bounds.width - 10),
            y: clamp(p.y, index * -96, container.height - bounds.height - 96*index)
        };
        el.style.transform = `translate(${this._pos.x}px,${this._pos.y}px)`;
    },
  }
  makeDraggable(state, el, index);
});

function clamp(x, lo, hi) { return x < lo ? lo : x > hi ? hi : x; }

function makeDraggable(state, el, index) {
    function start(event) {
        if (event.button !== 0) return; // left button only
        let {x, y} = state.eventToCoordinates(event);
        state.dragging = {dx: state.pos.x - x, dy: state.pos.y - y};
        el.classList.add('dragging');
        el.setPointerCapture(event.pointerId);
    }

    function end(_event, index) {
        
        /*
          const container = el.parentNode.getBoundingClientRect();
          const bounds = el.getBoundingClientRect();
          const bottomPosition = container.height - bounds.height - 96 * index;
          const distance = bottomPosition - state.pos.y;
          const duration = 50000; // adjust the duration as needed
          const startTime = performance.now() + 10;
          
          function animate(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const newPosition = state.pos.y + distance * progress;
            state.pos = { x: state.pos.x, y: newPosition };
            
            if (progress < 2) {
              requestAnimationFrame(animate);
            }
          }
          
          requestAnimationFrame(animate);
        */
          state.dragging = null;
          el.classList.remove('dragging');
    }

    function move(event) {
        if (!state.dragging) { return; }
        let {x, y} = state.eventToCoordinates(event);
        state.pos = {x: x + state.dragging.dx, y: y + state.dragging.dy};
    }

    el.addEventListener('pointerdown', start);
    el.addEventListener('pointerup', end);
    // el.addEventListener('pointercancel', end);
    el.addEventListener('pointermove', move)
    el.addEventListener('touchstart', (e) => e.preventDefault());
}

/* ----------------------------------------------
General Functionality 
creds: BootstrapMade
---------------------------------------------- */
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

})()