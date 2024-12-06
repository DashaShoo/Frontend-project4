

export function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener("keydown", closeByEsc);
}
export function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener("keydown", closeByEsc);
}

function closeByEsc(evt) {
	if (evt.key == "Escape") {
		closeModal(document.querySelector(".popup_is-opened"));
	}
}