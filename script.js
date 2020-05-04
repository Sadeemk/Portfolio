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

navSlide();

// $(document).ready(function() {
// 	// .scroll() creates an event when the user scrolls
// 	$(window).scroll(function() {
// 		// .scrollTop() retrieves vertical position of the scroll bar for the first element in a set of matched elements
// 		var scroll = $(window).scrollTop();

// 		var objectSelect = $('#profile');

// 		// .offset() retrieves current position of element relative to document
// 		var objectPosition = objectSelect.offset().top;

// 		if (scroll > objectPosition) {
// 			$('#menu').fadeIn(500);
// 		} else {
// 			$('#menu').fadeOut(500);
// 		}
// 	});
// });

// const app = () => {
// 	navSlide();
// };
