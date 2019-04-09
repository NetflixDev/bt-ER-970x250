import '@netflixadseng/wc-netflix-brand-logo'
import '@netflixadseng/wc-netflix-cta'
import '@netflixadseng/wc-netflix-text'
import '@netflixadseng/wc-netflix-img'
import { Styles, Markup, Align, Effects } from 'ad-view'
import { ImageManager } from 'ad-control'
import { Animation } from '@common/js/Animation.js'
import { Control } from '@common/js/Control.js'
import '@netflixadseng/wc-netflix-flushed-ribbon'
import '@netflixadseng/wc-netflix-video'
import { UIComponent, UIBorder, UIButton, UIImage, TextFormat, UITextField, UISvg } from 'ad-ui'
import { ObjectUtils } from 'ad-utils'
import CanvasIris from '@common/js/CanvasIris'

export function Main() {
	var T = Markup.get('main')
	Styles.setCss(T, {
		position: 'absolute',
		width: adParams.adWidth,
		height: adParams.adHeight,
		opacity: 0,
		left: '0px',
		top: '0px',
		overflow: 'hidden',
		userSelect: 'none'
	})
	Styles.setCss(T, { backgroundColor: '#000000' })

	return T
}

// ==============================================================================================================
export function EndFrame(arg) {
	const base = {
		id: 'end-frame-container',
		css: {
			width: 'inherit',
			height: 'inherit'
		}
	}
	const T = new UIComponent(ObjectUtils.defaults(arg, base, true))

	T.keyart = document.createElement('netflix-img')
	T.keyart.setAttribute('data-dynamic-key', 'Keyart')
	T.keyart.setAttribute('width', adParams.adWidth)
	T.appendChild(T.keyart)

	T.pedigree = new UITextField({
		target: T,
		id: 'pedigree',
		css: {
			width: 200,
			height: 50
		},
		fontSize: 16,
		fontFamily: 'Netflix Sans',
		format: TextFormat.INLINE_FIT_CLAMP,
		alignText: Align.CENTER,
		spacing: -0.2,
		text: 'A NETFLIX FILM'
	})

	// title treatment
	T.tt = document.createElement('netflix-img')
	T.tt.setAttribute('data-dynamic-key', 'Title_Treatment')
	T.tt.setAttribute('width', 300)
	T.appendChild(T.tt)

	// free trial messaging
	T.ftm = document.createElement('netflix-text')
	T.ftm.setAttribute('data-dynamic-key', 'FTM')
	T.appendChild(T.ftm)

	// tune-in
	T.tuneIn = document.createElement('netflix-text')
	T.tuneIn.setAttribute('data-dynamic-key', 'Tune_In')
	T.appendChild(T.tuneIn)

	// logo
	T.netflixLogo = document.createElement('netflix-brand-logo')
	T.netflixLogo.setAttribute('width', 112)
	T.appendChild(T.netflixLogo)

	// cta
	T.cta = document.createElement('netflix-cta')
	T.cta.setAttribute('data-dynamic-key', 'CTA')
	T.cta.setAttribute('arrow', '')
	T.cta.setAttribute('border', '')
	T.cta.setAttribute('width', 107)
	T.cta.setAttribute('max-width', 117)
	T.cta.setAttribute('height', 28)
	T.appendChild(T.cta)

	// ratings bug
	T.ratingsBug = document.createElement('netflix-img')
	T.ratingsBug.setAttribute('data-dynamic-key', 'Ratings_Bug_20x20')
	T.ratingsBug.setAttribute('id', 'ratings_bug')
	T.ratingsBug.setAttribute('width', 20)
	T.appendChild(T.ratingsBug)

	T.iris =
		window.Creative &&
		Creative.usesCanvasIris &&
		new CanvasIris({
			target: T,
			irisColor: Creative.irisColor
		})

	T.postMarkupStyling = function() {
		let T = View.endFrame

		// title treatment
		Align.set(T.tt, {
			x: Align.CENTER,
			y: Align.CENTER
		})

		Align.set(T.pedigree, {
			x: {
				type: Align.CENTER,
				against: T.tt
			},
			y: {
				type: Align.CENTER,
				against: 55
			}
		})

		if (adData.hasFTM) {
			// free trial messaging
			Styles.setCss(T.ftm, {
				color: '#fff',
				fontSize: 14,
				letterSpacing: 1,
				textAlign: 'center'
			})
			Align.set(T.ftm, {
				x: Align.CENTER,
				y: {
					type: Align.BOTTOM,
					offset: -65
				}
			})
			T.removeChild(T.tuneIn)
		} else {
			// tune-in
			Styles.setCss(T.tuneIn, {
				color: '#fff',
				fontSize: 16,
				letterSpacing: 1,
				textAlign: 'center'
			})
			Align.set(T.tuneIn, {
				x: Align.CENTER,
				y: {
					type: Align.BOTTOM,
					offset: -65
				}
			})
			T.removeChild(T.ftm)
		}

		// logo
		Align.set(T.netflixLogo, {
			x: {
				type: Align.LEFT,
				offset: 28
			},
			y: {
				type: Align.TOP,
				offset: 551
			}
		})

		// cta
		T.cta.resize()
		Align.set(T.cta, {
			x: {
				type: Align.LEFT,
				offset: 155
			},
			y: {
				type: Align.TOP,
				offset: 551
			}
		})

		// ratings bug
		if (adData.hasRatings) {
			Align.set(T.ratingsBug, {
				x: {
					type: Align.RIGHT,
					offset: -5
				},
				y: {
					type: Align.BOTTOM,
					offset: -5
				}
			})
		} else {
			T.removeChild(T.ratingsBug)
		}
	}

	return T
}

export function MainBorder() {
	new UIBorder({
		target: View.main,
		size: 1,
		color: '#000000'
	})
}
