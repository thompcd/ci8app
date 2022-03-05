<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<h1>
		<div class="welcome">
			<picture>
				<source srcset="svelte-welcome.webp" type="image/webp" />
				<img src="svelte-welcome.png" alt="Welcome" />
			</picture>
		</div>
	</h1>

	<ul>
		<li>

			<h2>
				View your upcoming due orders on your <strong>schedule</strong>
			</h2>
		</li>
		<li>
			<h2>
				Forecast your labor allocation after extracting bom labor and using <strong>labor</strong>
			</h2>
		</li>
		<li>
			<h2>
				Toggle your <strong>detailed view</strong> in order to further inspect tabular data being viewed
			</h2>
		</li>
	</ul>

</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	h1, h2 {
		width: 100%;
	}

	li{
		margin: 2rem;
	}
	.welcome {
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
