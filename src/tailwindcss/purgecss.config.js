/* 
for generate clean css file:
purgecss -c ./src/tailwindcss/purgecss.config.js 
 */

const purgecss = {};
purgecss.content = ['**/*.html', '**/*.ts'];
purgecss.css = ['./src/tailwindcss/tailwind.css'];
purgecss.output = './src/tailwindcss/useTailwind.css';
purgecss.defaultExtractor = (content) => {
	const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []
	const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || []
	return broadMatches.concat(innerMatches)
};

module.exports = purgecss;