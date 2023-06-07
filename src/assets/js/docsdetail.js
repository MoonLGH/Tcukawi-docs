let converter = new showdown.Converter({ tables: true });

let docsbase =
	"https://raw.githubusercontent.com/MoonLGH/Tcukawi-Api/main/docs/";
function joindocs(url) {
	return docsbase + url.replace("./docs/", "");
}
let paths = {};

async function main() {
	let path = new URLSearchParams(window.location.search).get("path");
	if (!path) {
		path = paths[paths["config"]["default"]];
		console.log(path);
	}

	if (!path.includes("API") && !path.includes("INTERFACE")) {
		let res = await (await fetch(joindocs(path))).text();
		console.log(res);
		res = converter.makeHtml(res);
		console.log(res);
		document.querySelector("#content").innerHTML = res;
	} else if (path.includes("API")) {
		let res = await (await fetch(joindocs(path))).text();

		console.log(res);
		if (res.includes("-Params")) {
			res = res.replace("-Params", "<br>\n### Using a params object");
		}
		if (res.includes("-Body")) {
			res = res.replace("-Body", "<br>\n### Using a Body object");
		}
		if (res.includes("-NPM:")) {
			const npmCodeRegex = /NPM: (.*)/; // Matches the text after "NPM: "
			const npmCodeMatch = res.match(npmCodeRegex);

			if (npmCodeMatch && npmCodeMatch.length >= 2) {
				const npmCode = npmCodeMatch[1].trim();
				res = res.replace(npmCode, `\n### NPM:\n\`\`\`js\n${npmCode}\n\`\`\` `);
			}

			res = res.replace("\n-NPM:", "");
		}

		res = res.replaceAll("## ", "<br>\n##");
		console.log(res);
		res = converter.makeHtml(res);
		const apisInfo = getMethodAndEndpoint(res)

        res = res.replace(apisInfo.actualText, `<h1><span class="text-dark method dark:text-white method-${apisInfo.method.toLowerCase()} inline">${apisInfo.method}</span> ${apisInfo.endpoint}</h1>`)
		console.log(res);

		document.querySelector("#content").innerHTML = res;
	}
}

function getMethodAndEndpoint(text) {
	let actualText = text
		.split("\n")
		.find(
			(e) =>
				e.includes("GET") ||
				e.includes("POST") ||
				e.includes("PUT") ||
				e.includes("DELETE")
		);
	console.log(actualText);

	const startTag = '">'; // Updated start tag
	const endTag = "</"; // Updated end tag

	const startIndex = actualText.indexOf(startTag) + startTag.length;
	const endIndex = actualText.indexOf(endTag, startIndex);
	const apiRequestString = actualText.substring(startIndex, endIndex);

	const parts = apiRequestString.split(" ");
	const method = parts[0].toUpperCase();
	const endpoint = parts[1];

	return {
		method,
		endpoint,
        actualText,
	};
}
