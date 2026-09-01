const swipers = new Map();
const dialogTriggers = new WeakMap();

const CONTACT_LINKS = {
	mail: "mailto:sezigungormus@gmail.com",
	github: "https://github.com/sezigungormus",
	linkedin: "https://www.linkedin.com/in/sezigungormus/",
	cv: "./images/cv.pdf",
	kariyer: "https://www.kariyer.net/ozgecmis/sgza6jn8iu",
};

applyContactLinks();

document.querySelectorAll("[data-dialog-target]").forEach((button) => {
	button.addEventListener("click", () => {
		const dialog = document.querySelector(`#${button.dataset.dialogTarget}`);
		if (!dialog) return;

		dialogTriggers.set(dialog, button);
		dialog.showModal();
		document.body.classList.add("dialog-open");

		const swiper = initDialogSwiper(dialog);
		if (swiper) {
			swiper.slideTo(0, 0);
			swiper.update();
			swiper.keyboard?.enable();
		}

		dialog.querySelector("[data-close-dialog]")?.focus();
	});
});

document.querySelectorAll("[data-close-dialog]").forEach((button) => {
	button.addEventListener("click", () => {
		button.closest("dialog")?.close();
	});
});

document.querySelectorAll(".project-dialog").forEach((dialog) => {
	dialog.addEventListener("click", (event) => {
		if (event.target === dialog) {
			dialog.close();
		}
	});

	dialog.addEventListener("close", () => {
		const swiperElement = dialog.querySelector(".project-swiper");
		const swiper = swiperElement ? swipers.get(swiperElement) : null;
		swiper?.keyboard?.disable();

		if (!document.querySelector(".project-dialog[open]")) {
			document.body.classList.remove("dialog-open");
		}

		const trigger = dialogTriggers.get(dialog);
		if (trigger?.isConnected) {
			trigger.focus();
		}
	});
});

function initDialogSwiper(dialog) {
	if (!window.Swiper) return null;

	const swiperElement = dialog.querySelector(".project-swiper");
	if (!swiperElement) return null;
	if (swipers.has(swiperElement)) return swipers.get(swiperElement);

	const swiper = new Swiper(swiperElement, {
		loop: false,
		spaceBetween: 18,
		slidesPerView: 1,
		watchOverflow: true,
		keyboard: {
			enabled: true,
			onlyInViewport: false,
		},
		pagination: {
			el: dialog.querySelector(".swiper-pagination"),
			type: "fraction",
			formatFractionCurrent: (number) => String(number),
			formatFractionTotal: (number) => String(number),
			renderFraction: (currentClass, totalClass) =>
				`<span class="${currentClass}"></span><span aria-hidden="true"> / </span><span class="${totalClass}"></span>`,
		},
		navigation: {
			nextEl: dialog.querySelector(".swiper-button-next"),
			prevEl: dialog.querySelector(".swiper-button-prev"),
		},
		a11y: {
			enabled: true,
			prevSlideMessage: "Önceki proje ekranı",
			nextSlideMessage: "Sonraki proje ekranı",
			firstSlideMessage: "İlk proje ekranı",
			lastSlideMessage: "Son proje ekranı",
			slideLabelMessage: "{{index}} / {{slidesLength}}",
		},
	});

	swipers.set(swiperElement, swiper);
	return swiper;
}

function applyContactLinks() {
	document.querySelectorAll("[data-contact-link]").forEach((link) => {
		const key = link.dataset.contactLink;
		const href = CONTACT_LINKS[key];

		if (!href) {
			link.setAttribute("aria-disabled", "true");
			link.setAttribute("href", "#");
			return;
		}

		link.href = href;
		link.removeAttribute("aria-disabled");

		if (href.startsWith("http") || href.endsWith(".pdf")) {
			link.target = "_blank";
			link.rel = "noopener noreferrer";
		}
	});
}
