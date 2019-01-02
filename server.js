var express = require("express"),
  app = express();

var port = process.env.PORT || 8080;
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sasiwedspriya@gmail.com',
    pass: 'Qwerty@123'
  }
});
app.use(express.static(__dirname + '/public'));

app.get("/sayHello", function (request, response) {
  var user_name = request.query.user_name;
  response.end("Hello " + user_name + "!");
});


function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
app.get("/sendics", function (req, res) {
  if (req.query.email) {
    if (validateEmail(req.query.email)) {
      var event = "BEGIN:VCALENDAR\n" +
        "X-LOTUS-CHARSET:UTF-8\n" +
        "VERSION:2.0\n" +
        "BEGIN:VTIMEZONE\n" +
        "TZID:Asia/Calcutta\n" +
        "END:VTIMEZONE\n" +
        "METHOD:REQUEST\n" +
        "BEGIN:VEVENT\n" +
        "UID:ics.terminsysteme.de1544262195\n" +
        "DTSTAMP:20181208T104315\n" +
        "CLASS:PUBLIC\n" +
        "DTSTART;TZID=Asia/Calcutta:20190210T183000\n" +
        "DTEND;TZID=Asia/Calcutta:20190210T223000\n" +
        "LOCATION:R S Kalyana Mandapam,Oragadam Rd, Vijayalakshmi Puram, Ambattur, Chennai, Tamil Nadu 600053\n" +
        "SUMMARY:Sasi weds Priya\n" +
        "DESCRIPTION:wedding reception\n" +
        "BEGIN:VALARM\n" +
        "ACTION:DISPLAY\n" +
        "TRIGGER:-PT2880M\n" +
        "DESCRIPTION:Erinnerung\n" +
        "END:VALARM\n" +
        "END:VEVENT\n" +
        "END:VCALENDAR\n";

      const mailOptions = {
        from: 'sasiwedspriya@gmail.com', // sender address
        to: req.query.email, // list of receivers
        subject: 'Sasi weds Priya,Save the date 10th Feb 2019', // Subject line
        html: '<p>Hi,<br/>Thanks for time.We look forward for your blessings in person on the day of occassion.<br/><br/> With Love <br/>Sasi & Priya</p>', // plain text body
        attachments: [{ // file on disk as an attachment
          content: event,
          filename: 'SasiwedsPriya.ics',
          type: 'text/html',
          disposition: 'attachment',
          content_id: 'mytext'
        }, ]
      };
      transporter.sendMail(mailOptions, function (err, info) {
        if (err)
          console.log(err)
        else
          console.log(info);
      });
    }
  }
});
app.listen(port);
console.log("Listening on port ", port);

require("cf-deployment-tracker-client").track();