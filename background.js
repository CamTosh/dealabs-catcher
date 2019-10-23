let tracker = "https://www.dealabs.com/mascotcards/see"

chrome.webRequest.onBeforeRequest.addListener(
	(request) => {
		console.log(request)

		if (request.method == "POST") {
			let body = request.requestBody

			if (body.raw) {
				let postedString = decodeURIComponent(
					String.fromCharCode.apply(null, new Uint8Array(body.raw[0].bytes))
				);

				try {
					let data = JSON.parse(postedString)
					console.log(data);
					let html = data.data.content;
					const regex = /"(mascotcards-(\w*.))\"/gm;
					let mastocard = html.match(regex)[0].replace('\\','').replace('"','').replace('"','')
					console.log(mastocard);

					fetch("https://www.dealabs.com/mascotcards/claim", {"credentials":"include","headers":{"accept":"*/*","accept-language":"fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7,de;q=0.6,la;q=0.5,ca;q=0.4","content-type":"application/x-www-form-urlencoded; charset=UTF-8","sec-fetch-mode":"cors","sec-fetch-site":"same-origin","x-requested-with":"XMLHttpRequest"},"referrer":"https://www.dealabs.com/hot","referrerPolicy":"no-referrer-when-downgrade","body":`key=${mastocard}`,"method":"POST","mode":"cors"});

				} catch(e) {
					console.log("Failed to parse posted string")
					console.log(postedString)
				}
			}
		}

	},
	{ urls: [tracker] },
	["requestBody"]
);
