async function findMusic(videolink) {
	const res = await fetch("/find", {
		method: "post",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({link: videolink})
	});

	const json = await res.json();
	console.log(json);
}

const videolink = document.querySelector("#videolink");
const button = document.querySelector("#btn");
button.addEventListener("click", (e)=> {
	findMusic(videolink.value);
});