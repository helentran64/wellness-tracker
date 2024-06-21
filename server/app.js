const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.status(200).send('Hello from the server side');
}); // when user hits this url, they will receive this message

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App booted...`)
});