const swipers = new Map();

const CONTACT_LINKS = {
	mail: "mailto:sezigungormus@gmail.com",
	github: "https://github.com/sezigungormus",
	linkedin: "https://www.linkedin.com/in/sezigungormus/",
	cv: "#",
	kariyer: "https://www.kariyer.net/ozgecmis/sgza6jn8iu",
};

applyContactLinks();

document.querySelectorAll("[data-dialog-target]").forEach((button) => {
	button.addEventListener("click", () => {
		const dialog = document.querySelector(`#${button.dataset.dialogTarget}`);
		if (!dialog) return;

		dialog.showModal();
		initDialogSwiper(dialog);
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
});

function initDialogSwiper(dialog) {
	if (!window.Swiper) return;

	const swiperElement = dialog.querySelector(".project-swiper");
	if (!swiperElement || swipers.has(swiperElement)) return;

	swipers.set(
		swiperElement,
		new Swiper(swiperElement, {
			loop: true,
			spaceBetween: 18,
			pagination: {
				el: swiperElement.querySelector(".swiper-pagination"),
				clickable: true,
			},
			navigation: {
				nextEl: swiperElement.querySelector(".swiper-button-next"),
				prevEl: swiperElement.querySelector(".swiper-button-prev"),
			},
		})
	);
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

		if (href.startsWith("http")) {
			link.target = "_blank";
			link.rel = "noopener noreferrer";
		}
	});
}
