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

	<div class="focus">
		<h1>Version - Preview 0.4</h1>
		<ul>
			<li><h2>View your upcoming due orders on your <strong>schedule</strong></h2></li>
			<li><h2>Forecast your labor allocation after extracting bom labor and using <strong>labor</strong></h2></li>
			<li><h2>Toggle your <strong>detailed view</strong> in order to further inspect tabular data being viewed</h2></li>
			<li><h2>Choose number of <strong>days into future</strong> to filter upcoming work orders forecast</h2></li>
		</ul>
	</div>

	<div class="focus">
		<h2>Upcoming Features</h2>
		<ul>
			<li><h2>User login and authentication</h2></li>
			<li><h2>Automatic token refresh</h2></li>
			<li><h2>Improved chart sizing</h2></li>
			<li><h2>Filter data using tables</h2></li>
		</ul>
	</div>

	<h2>Change Log</h2>
	<ul>
		<li>
			<h2>Preview 0.4 - Change Forecast Date</h2>
			<ul>
				<li>Change Forecast Date - Add input to set number of days into future</li>
				<li>Change Forecast Date - Re-draw schedule on forecast date range change</li>
				<li>Change Forecast Date - Remember number of days between sessions</li>
			</ul>
		</li>
		<li>
			<h2>Preview 0.3 - Improved Query Speeds</h2>
			<ul>
				<li>Improve Query Speed - Support server side rendering of data</li>
				<li>Improve Query Speed - Client-side caching of inventory items; first time on a new device will take a while, next time will be quicker</li>
				<li>Improve Query Speed - Use server side or client side rendering, depending on context</li>
				<li>Improve Query Speed - Use a single client instance, reducing connection times and ability to easily swap data sources</li>
				<li>Decoupling from data source - Decouple from Saddle Oak as inventory source, allows testing on dummy data</li>
				<li>Add additional env settings needed for automatic token generation</li>
				<li>Updated tab image to CI8 logo</li>
			</ul>
		</li>
		<li>
			<h2>Preview 0.2 - Labor Chart Preview</h2>
			<ul>
				<li>Stacked bar chart data formatter</li>
				<li>Stacked bar chart hard coded labels</li>
			</ul>
		</li>
		<li>
			<h2>Preview 0.1 - Initial Preview</h2>
			<ul>
				<li>Private token storage to allow publishing</li>
				<li>Toggle detailed data</li>
				<li>Extract labor value from open work orders</li>
				<li>Add page routing and nav bar</li>
				<li>Add notification system</li>
				<li>Share data across template pages</li>
				<li>Add typescript support and models for SOS items</li>
				<li>Create SOS data client</li>
				<li>Port timeline from script import to webcomponent</li>
				<li>Port tables from script import to webcomponent</li>
				<li>Port token expiration notice</li>
			</ul>
		</li>
	</ul>

</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	h1, h2 {
		width: 100%;
	}

	li{
		margin: 1rem;
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

	ul, li{
		justify-content: left;
	}

	.focus{
		margin-bottom: 4rem;
	}
</style>
