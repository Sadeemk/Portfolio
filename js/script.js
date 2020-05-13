const navSlideMobile = () => {
	const burger = document.querySelector('.burger');
	const nav = document.querySelector('.nav-links');
	const navLinks = document.querySelectorAll('.nav-links li');

	burger.addEventListener('click', () => {
		// Toggle nav on click of burger
		nav.classList.toggle('nav-active');

		//Animate in the nav links
		navLinks.forEach((link, index) => {
			if (link.style.animation) {
				link.style.animation = '';
			} else {
				link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
			}
		});

		//amimate burger to X
		burger.classList.toggle('toggle');
	});
};

const navFixedOnScroll = () => {
	window.addEventListener('scroll', () => {
		let nav = document.querySelector('nav');
		nav.classList.toggle('sticky', window.scrollY > 0);
	});
};

const navHighlight = () => {
	// cache the navigation links
	let $navigationLinks = document.querySelectorAll('nav > ul > li > a');
	// cache (in reversed order) the sections
	let $sections = document.getElementsByTagName('section');

	// map each section id to their corresponding navigation link
	let sectionIdTonavigationLink = {};
	for (let i = $sections.length - 1; i >= 0; i--) {
		let id = $sections[i].id;
		sectionIdTonavigationLink[id] = document.querySelectorAll('nav > ul > li > a[href=\\#' + id + ']') || null;
	}

	// throttle function, enforces a minimum time interval
	function throttle(fn, interval) {
		let lastCall, timeoutId;
		return function() {
			let now = new Date().getTime();
			if (lastCall && now < lastCall + interval) {
				// if we are inside the interval we wait
				clearTimeout(timeoutId);
				timeoutId = setTimeout(function() {
					lastCall = now;
					fn.call();
				}, interval - (now - lastCall));
			} else {
				// otherwise, we directly call the function
				lastCall = now;
				fn.call();
			}
		};
	}

	function getOffset(el) {
		let _x = 0;
		let _y = 0;
		while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
			_x += el.offsetLeft - el.scrollLeft;
			_y += el.offsetTop - el.scrollTop;
			el = el.offsetParent;
		}
		return { top: _y, left: _x };
	}

	function highlightNavigation() {
		// get the current vertical position of the scroll bar
		let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

		// iterate the sections
		for (let i = $sections.length - 1; i >= 0; i--) {
			let currentSection = $sections[i];
			// get the position of the section
			let sectionTop = getOffset(currentSection).top;

			// if the user has scrolled over the top of the section
			if (scrollPosition >= sectionTop - 250) {
				// get the section id
				let id = currentSection.id;
				// get the corresponding navigation link
				let $navigationLink = sectionIdTonavigationLink[id];
				// if the link is not active
				if (typeof $navigationLink[0] !== 'undefined') {
					if (!$navigationLink[0].classList.contains('active')) {
						// remove .active class from all the links
						for (i = 0; i < $navigationLinks.length; i++) {
							$navigationLinks[i].className = $navigationLinks[i].className.replace(/ active/, '');
						}
						// add .active class to the current link
						$navigationLink[0].className += ' active';
					}
				} else {
					// remove .active class from all the links
					for (i = 0; i < $navigationLinks.length; i++) {
						$navigationLinks[i].className = $navigationLinks[i].className.replace(/ active/, '');
					}
				}
				// we have found our section, so we return false to exit the each loop
				return false;
			}
		}
	}
	window.addEventListener('scroll', throttle(highlightNavigation, 150));
};

const app = () => {
	navSlideMobile();
	navFixedOnScroll();
	navHighlight();
};

app();
