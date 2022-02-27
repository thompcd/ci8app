// import chroma from 'chroma-js';

type ChannelDataType = {
	content?: any;
	section?: string;
	id?: string;
	title?: string;
	render?: boolean;
	active?: boolean;
	props?: any;
	order?: number;
};

type CreateChannelType = {
	sort?: boolean;
	sortBy?: string;
	data?: ChannelDataType[];
	current?: number;
	easing?: string;
	duration?: number;
	onReady?: (val: number) => void;
	onUpdate?: () => void;
};

export const createChannel = ({
	data = [],
	sort = false,
	sortBy = 'id',
	current = null,
	easing = 'cubicOut',
	duration = 400,
	onReady,
	onUpdate
}: CreateChannelType) => {
	if (sort) {
		data = data.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
	}

	const channelReady = (index) => {
		data = data.map((x, i) => {
			x.active = false;
			if (i === index) {
				x.active = true;
				x.render = true;
			}
			return x;
		});

		onReady && onReady(index);
	};

	const afterUpdate = !!onUpdate ? onUpdate : () => {};

	return {
		data,
		current,
		easing,
		duration,
		channelReady,
		afterUpdate
	};
};

type CreateDBType = {
	indexdb: any;
	createIfEmpty?: boolean;
	clearOnRefresh?: boolean;
	tables?: string[];
	data?: any;
	queryBy?: string | string[];
	onReady?: () => void;
	onUpdate?: () => void;
};

export const createDB = ({
	indexdb,
	createIfEmpty = false,
	clearOnRefresh = false,
	tables = [],
	data = {},
	queryBy = '_id',
	onReady = () => {},
	onUpdate = () => {}
}: CreateDBType) => {
	return {
		indexdb,
		queryBy,
		createIfEmpty,
		clearOnRefresh,
		tables,
		data,
		onReady,
		onUpdate
	};
};

export const capitalizeStr = (string: string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

// const colorSet = {
//   black:
//     theme === 'light' ? { start: '#10131b', end: '#eee' } : { start: '#10131b', end: '#eee' },
//   white:
//     theme === 'light' ? { start: 'white', end: '#bdc3c7' } : { start: 'white', end: '#bdc3c7' },
//   primary:
//     theme === 'light' ? { start: '#0fbcf9', end: 'black' } : { start: '#4bcffa', end: 'black' },
//   secondary:
//     theme === 'light' ? { start: '#3c40c6', end: 'black' } : { start: '#FD7272', end: 'black' },
//   magic:
//     theme === 'light' ? { start: '#9b59b6', end: 'black' } : { start: '#9b59b6', end: 'black' },
//   success:
//     theme === 'light' ? { start: '#4cd137', end: 'black' } : { start: '#4cd137', end: 'black' },
//   warning:
//     theme === 'light' ? { start: '#e67e22', end: 'black' } : { start: '#e67e22', end: 'black' },
//   danger:
//     theme === 'light' ? { start: '#ff073a', end: 'black' } : { start: '#d63031', end: 'black' }
// };

// export const createColorPallete = ({ colorSet, range = 10, theme = 'light' }) => {
// 	let colors = {};
// 	let scales = {};

// 	for (const key in colorSet) {
// 		colors[key] = [];
// 		scales[key] = chroma.scale([colorSet[key].start, colorSet[key].end]).mode('lch').colors(range);
// 	}

// 	// COLORS
// 	for (const [key] of Object.entries(scales)) {
// 		scales[key].forEach((color, index) => {
// 			let colorName = `--${key}-${index}`;
// 			let textName = `--${key}-${index}-text`;

// 			const whiteContrast = chroma.contrast(color, '#eee');
// 			const blackContrast = chroma.contrast(color, '#333');
// 			const textFriendlyColor = whiteContrast > blackContrast ? '#eee' : '#333';

// 			document.documentElement.style.setProperty(colorName, color);
// 			document.documentElement.style.setProperty(textName, textFriendlyColor);

// 			colors[key].push({ name: colorName, textColor: textName, color, textFriendlyColor });
// 		});
// 	}

// 	// HR
// 	document.documentElement.style.setProperty(
// 		'--hr',
// 		scales[theme === 'light' ? 'black' : 'black'][theme === 'light' ? 2 : 5]
// 	);

// 	return colors;
// };

export const assignColorsVars = (colors, theme = 'light') => {
	// COLORS
	for (const [key] of Object.entries(colors)) {
		colors[key].forEach((colorData, index) => {
			const { color, name, textColor, textFriendlyColor } = colorData;
			document.documentElement.style.setProperty(name, color);
			document.documentElement.style.setProperty(textColor, textFriendlyColor);
		});
	}
	// HR
	document.documentElement.style.setProperty(
		'--hr',
		colors[theme === 'light' ? 'black' : 'black'][theme === 'light' ? 2 : 5]
	);
};

export const assignFonts = (fonts) => {
	const fullNames = [];

	fonts.forEach((font, index) => {
		const fontName = `--font-${index}`;
		fullNames.push(font.replace(/ /g, '+'));
		document.documentElement.style.setProperty(fontName, font);
	});
};

export const readTextFile = (file, callback) => {
	var rawFile = new XMLHttpRequest();
	rawFile.overrideMimeType('application/json');
	rawFile.open('GET', file, true);
	rawFile.onreadystatechange = function () {
		if (rawFile.readyState === 4 && rawFile.status == '200') {
			callback(rawFile.responseText);
		}
	};
	rawFile.send(null);
};

export const debounce = (func, wait, immediate) => {
	var timeout;
	return function () {
		var context = this,
			args = arguments;
		var later = function () {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

export const returnKeyPair = (arr) => {
	const keypair = {};
	arr.forEach((x) => {
		const kp = x.split('=');
		if (!!kp[0]) {
			keypair[kp[0]] = kp[1];
		}
	});
	return keypair;
};

export const urlSearchParams = () => {
	const searchParams = new URLSearchParams(location.search);
	return searchParams;
};
