const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const cors = require("cors");
const app = express();

function checkHttps(req, res, next){
  // protocol check, if http, redirect to https
  
  if(req.get('X-Forwarded-Proto').indexOf("https") !=- 1){
    console.log("https, yo")
    return next()
  } else {
    console.log("just http")
    res.redirect('https://' + req.hostname + req.url);
  }
}
app.use(cors());
app.use(express.urlencoded({
    extended: true,
    limit: '50mb'
}));
app.use(express.json({limit: '50mb'}));
app.use(express.static('public'));
app.use(express.static('styles'));
app.use(express.static('src'));
//app.all('*', checkHttps);

//openai configurations
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

function answer(link) {
	console.log(link)
	return `convert ${link} it to text`;
}
// openai over

// routes
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});

app.post('/find', async (req, res) => {
	const completion = await openai.createCompletion({
	    model: "text-davinci-002",
	    prompt: answer(req.body.link),
	    temperature: 1,
	});
	res.status(200).json({ result: completion.data.choices[0].text });
});


// listen for requests :)
const listener = app.listen(8080, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
