//js popup wrap
const togglePopupButtons = document.querySelectorAll('.js-btn-popup-toggle')
const closePopupButtons = document.querySelectorAll('.js-btn-popup-close')
const popupElements = document.querySelectorAll('.js-popup-wrap')
const wrapWidth = document.querySelector('.wrap').offsetWidth
const bodyElem = document.querySelector('body')

function popupElementsClear() {
	document.body.classList.remove('menu-show')
	document.body.classList.remove('filter-show')
	document.body.classList.remove('search-show')
	popupElements.forEach(element => element.classList.remove('popup-right'))
}

function popupElementsClose() {
	togglePopupButtons.forEach(element => {
		if (!element.closest('.no-close')) {
			element.classList.remove('active')
		}
	})
}

function popupElementsContentPositionClass() {
	popupElements.forEach(element => {
		let pLeft = element.offsetLeft
		let pWidth = element.querySelector('.js-popup-block').offsetWidth
		let pMax = pLeft + pWidth;
		if (pMax > wrapWidth) {
			element.classList.add('popup-right')
		} else {
			element.classList.remove('popup-right')
		}
	})
}

for (i = 0; i < togglePopupButtons.length; i++) {
	togglePopupButtons[i].addEventListener('click', function (e) {
		popupElementsClear()
		if (this.classList.contains('active')) {
			this.classList.remove('active')
		} else {
			popupElementsClose()
			this.classList.add('active')
			if (this.closest('.popup-menu-wrap')) {
				document.body.classList.add('menu-show')
			}
			if (this.closest('.popup-search-wrap')) {
				document.body.classList.add('search-show')
			}
			if (this.closest('.popup-filter-wrap')) {
				document.body.classList.add('filter-show')
			}
			popupElementsContentPositionClass()
		}
		e.preventDefault()
		e.stopPropagation()
		return false
	})
}
for (i = 0; i < closePopupButtons.length; i++) {
	closePopupButtons[i].addEventListener('click', function (e) {
		popupElementsClear()
		popupElementsClose()
		e.preventDefault()
		e.stopPropagation()
		return false;
	})
}
document.onclick = function (event) {
	if (!event.target.closest('.js-popup-block')) {
		popupElementsClear()
		popupElementsClose()
	}
}
popupElements.forEach(element => {
	if (element.classList.contains('js-popup-select')) {
		let popupElementSelectItem = element.querySelectorAll('.js-popup-block li a')
		if (element.querySelector('.js-popup-block .active')) {
			element.classList.add('select-active')
			let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
			let popupElementButton = element.querySelector('.js-btn-popup-toggle')
			popupElementButton.innerHTML = ''
			popupElementButton.insertAdjacentHTML('beforeend', popupElementActive)
		} else {
			element.classList.remove('select-active')
		}
		for (i = 0; i < popupElementSelectItem.length; i++) {
			popupElementSelectItem[i].addEventListener('click', function (e) {
				this.closest('.js-popup-wrap').classList.add('select-active')
				if (this.closest('.js-popup-wrap').querySelector('.js-popup-block .active')) {
					this.closest('.js-popup-wrap').querySelector('.js-popup-block .active').classList.remove('active')
				}
				this.classList.add('active')
				let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
				let popupElementButton = element.querySelector('.js-btn-popup-toggle')
				popupElementButton.innerHTML = ''
				popupElementButton.insertAdjacentHTML('beforeend', popupElementActive)
				popupElementsClear()
				popupElementsClose()
				if (!this.closest('.js-tabs-nav')) {
					e.preventDefault()
					e.stopPropagation()
					return false
				}
			})
		}
	}
})


$(window).on('load', function () {
	//tile-video
	$('.js-video').each(function() {
		let videoURL = $(this).attr('data-video');
		$(this).addClass('active');
		$(this).append('<iframe width="100%" height="100%" src="' + videoURL + '" frameborder="0" allowfullscreen></iframe>')
	})
	
	//header fixed
	$('.wrap').css('padding-top', $('.header').outerHeight())


	//main-news-box
	if (!!$('.main-news-box').offset()) {
		$('.main-news-box .slider').slick({
			dots: false,
			slidesToShow: 1,
			variableWidth: false,
			infinite: true,
			adaptiveHeight: false,
			rows: 1,
			swipeToSlide: true,
			autoplay: false,
			autoplaySpeed: 5000,
			prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-prev"></span>',
			nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-next"></span>',
		});

	}

	//gallery slider
	if (!!$('.photos-slider-box').offset()) {
		let pSlider = $('.photos-slider-box .slider-wrap .slider').slick({
			dots: false,
			slidesToShow: 1,
			infinite: false,
			prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-main ico-arrow-prev"></span>',
			nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-main ico-arrow-next"></span>',
		});
		let pSliderPreview = $('.photos-slider-box .slider-preview-wrap .slider').slick({
			dots: false,
			slidesToShow: 6,
			vertical: false,
			infinite: true,
			prevArrow: false,
			nextArrow: false,
			responsive: [
				{
					breakpoint: 1024,
					settings: {}
				},
				{
					breakpoint: 640,
					settings: {}
				},
			]
		});
		//pSlider.slick('refresh');
		//pSliderPreview.slick('refresh');
		$('.photos-slider-box .slider-wrap .slider').on('afterChange', function (event, slick, currentSlide, nextSlide) {
			$('.photos-slider-box .slider-preview-wrap .sl-wrap.active').removeClass('active');
			$('.photos-slider-box .slider-preview-wrap .elm-photo[data-slide="' + currentSlide + '"]').parent().addClass('active');
		});
		$('.photos-slider-box .slider-preview-wrap .slider .elm-photo').click(function () {
			let newSlide = $(this).attr('data-slide');
			$('.photos-slider-box .slider-preview-wrap .sl-wrap.active').removeClass('active');
			$(this).parent().addClass('active');
			$('.photos-slider-box .slider-wrap .slider').slick('slickGoTo', newSlide);
			return false;
		})
		$('.photos-slider-box .elm-photo[data-slide="0"]').parent('.sl-wrap').addClass('active');
	}
});