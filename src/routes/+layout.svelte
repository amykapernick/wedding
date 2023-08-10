<script>
	import '../styles/app.postcss';
	import top from '$lib/img/frame_top.svg'
	import bottom from '$lib/img/frame_bottom.svg'
</script>

<style lang="postcss">
	header {
		text-align: center;
		max-width: 500px;
		margin: 0 auto;
	}

	main {
		position: relative;
		min-height: 100vh;
		padding: 15vw 30px;
	}

	img {
		position: absolute;
		z-index: -1;
		display: block;
		width: 160vw;

		&.top {
			top: 0;
			right: 0;
		}

		&.bottom {
			bottom: 0;
			left: 0;
		}
	}

	@media(min-width: 40em) {
		main {
			padding: 20vw 90px;
		}

		header {
			max-width: unset;
		}

		img {
			width: 140vw;
		}
	}

	@media(min-width: 50em) {
		main {
			padding: 30vw 90px;
			font-size: 1.2em;
		}

		header {
			padding-top: 20px;
		}

		h1 {
			font-size: 2.2em;
		}

		img {
			width: 80vw;

			&.top {
				left: 0;
				right: auto;
			}

			&.bottom {
				left: auto;
				right: 0;
			}
		}
	}

	@media(min-width: 60em) {
		main {
			padding: 20vw 10vw;
		}

		header {
			padding: 0;
			max-width: 650px;
		}

		h1 {
			font-size: 2.5em;
		}

		img {
			width: 70vw;
		}
	}

	@media(min-width: 70em) {
		main {
			padding: 200px 120px;
		}

		img {
			width: 850px;
		}
	}

	@media(min-width: 90em) {
		header {
			padding-top: 50px;
			max-width: unset;
		}
	}
</style>

<main>
	<img src={top} alt="" class="top" />
	<header>
		<h1>Dan and Amy are getting married!</h1>
	</header>
	
	<slot />
	<img src={bottom} alt="" class="bottom" />
</main>