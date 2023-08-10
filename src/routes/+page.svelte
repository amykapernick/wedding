<script>
	import photo_mobile_webp from '$lib/img/amy_dan.jpg?w=300&format=webp'
	import photo_large_webp from '$lib/img/amy_dan.jpg?w=500&format=webp'
	import photo_mobile from '$lib/img/amy_dan.jpg?w=300'
	import photo_large from '$lib/img/amy_dan.jpg?w=500'
	import photo from '$lib/img/amy_dan.jpg'
</script>

<style lang="postcss">
	section {
		text-align: center;
		font-size: 1.5em;
		max-width: 500px;
		margin: 0 auto;
	}

	img {
		border-radius: 1em;
		max-width: 100%;
	}

	@media(min-width: 40em) {
		section {
			max-width: unset;
		}
	}

	@media(min-width: 50em) {
		section {
			font-size: 1.2em;
		}
	}
</style>

<section>
	<p>Watch this space, more info to come soon</p>
	<picture>
		<source 
			srcset={photo_mobile_webp} 
			media="(max-width: 800px)" 
			type="image/webp" 
		/>
		<source 
			srcset={photo_large_webp} 
			type="image/webp" 
		/>

		<source 
			srcset={photo_mobile} 
			media="(max-width: 800px)" 
		/>
		<source 
			srcset={photo_large} 
		/>

		<img 
			src={photo} 
			alt="Amy and Dan smiling happily on a boat with a fjord in the background and sun setting behind the hills making everything glow orange" 
		/>
	</picture>
</section>