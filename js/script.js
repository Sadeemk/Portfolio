const navSlide = () => {
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

// const navFadeIn = () => {
// 	const nav = document.querySelector('nav');
// 	nav.addEventListener('scroll', () => {
// 		const section1 = document.querySelector('#profile');
// 		let y = section1.scrollTop;

// 		if (window.pageYOffset > x) {
// 			document.querySelector('pimg2').classList.remove('pimg2');
// 		} else {
// 			document.querySelector('pimg2').classList.remove('pimg2');
// 		}
// 	});
// };

const selectedHighlight = () => {
	const changeNav = (entries, observer) => {
		entries.forEach((entry) => {
			// verify the element is intersecting
			if (entry.isIntersecting && entry.intersectionRatio >= 0.75) {
				// remove old active class
				let currActive = document.querySelector('.active');
				if (currActive != null) {
					currActive.classList.remove('active');
				}
				//document.querySelector('.active').classList.remove('active');
				// get id of the intersecting section
				let id = entry.target.getAttribute('id');
				// find matching link & add appropriate class
				let newLink = document.querySelector(`[href="#${id}"]`).classList.add('active');
			}
		});
	};

	// init the observer
	const options = {
		threshold: 0.75
	};

	const observer = new IntersectionObserver(changeNav, options);

	// target the elements to be observed
	const sections = document.querySelectorAll('section');
	sections.forEach((section) => {
		observer.observe(section);
	});
};

const app = () => {
	navSlide();
	selectedHighlight();
};

app();
