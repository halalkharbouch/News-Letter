const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const https = require("https");

const mailChimpApi = "https://us21.api.mailchimp.com/3.0/lists/a65ba05d62"
const options = {
    method: "POST",
    auth: "halalkharbouch:aabcd814522926adf675da3d79e98bfb-us21"
}

app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function (req, res) {
    res.sendFile(`${__dirname}/signup.html`);
})

app.post("/", function (req, res) {

    const fName = req.body.firstName;
    const lName = req.body.lastName;
    const email = req.body.email;

    let data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fName,
                    LNAME: lName
                }
            }
        ]
    };

    let jsonData = JSON.stringify(data);
    const request = https.request(mailChimpApi, options, function (response) {
        if (response.StatusCode === 200) {
            res.sendFile(`${__dirname}/success.html`);
        } else {
            res.sendFile(`${__dirname}/failure.html`);
        }
        response.on("data", function (data) {

        })

    });
    request.write(jsonData);
    request.end();
});


app.listen(3000, function () {
    console.log("Server running on port 3000");
})



// "aabcd814522926adf675da3d79e98bfb-us21"
//
// a65ba05d62