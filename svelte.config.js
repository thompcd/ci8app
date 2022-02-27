import adapter from '@sveltejs/adapter-netlify';
import preprocess from 'svelte-preprocess';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		vite: () => ({
			resolve: {
			  alias: {
				// SVELTETIP ALIASES
				'@button': path.resolve('./src/lib/SvelteTip/@Buttons'),
				'@cards': path.resolve('./src/lib/SvelteTip/@Cards'),
				'@chart': path.resolve('./src/lib/SvelteTip/@Charts'),
				'@examples': path.resolve('./src/lib/SvelteTip/@Examples'),
				'@external': path.resolve('./src/lib/SvelteTip/@External'),
				'@form': path.resolve('./src/lib/SvelteTip/@Form'),
				'@images': path.resolve('./src/lib/SvelteTip/@Images'),
				'@layout': path.resolve('./src/lib/SvelteTip/@Layout'),
				'@link': path.resolve('./src/lib/SvelteTip/@Links'),
				'@panel': path.resolve('./src/lib/SvelteTip/@Panels'),
				'@shopping': path.resolve('./src/lib/SvelteTip/@Shopping'),
				'@system': path.resolve('./src/lib/SvelteTip/@System'),
				'@text': path.resolve('./src/lib/SvelteTip/@Text'),
				'@utility': path.resolve('./src/lib/SvelteTip/@Utility'),
				// SVELTETIP SUPPORTING FILES
				'@st-stores': path.resolve('./src/lib/SvelteTip/stores'),
				'@st-js': path.resolve('./src/lib/SvelteTip/js'),
			  }
			}
		  }),
					

		// Override http methods in the Todo forms
		methodOverride: {
			allowed: ['PATCH', 'DELETE']
		}
	}
};

export default config;
