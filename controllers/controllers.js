const userModel = require("../models/user.model")
const mailer = require("nodemailer");
const zoho = require('@trifoia/zcrmsdk');

const config = require('../zoho.config');
exports.getZoho = (req, res, next) => {
    zoho.initialize(config).then((client) => {
        client.API.MODULES.get({
            module: 'Contacts',
            params: {
                page: 0,
                per_page: 25,
            },
        }).then((response) => {
            res.json(JSON.parse(response.body));
        }).catch(console.log(next + "tsy mety rah io oh"));
    }).catch(console.log(next + "tsy mety rah io oh"));
}
exports.postZoho = (req, res) => {
    
    
    const user = new userModel({
        nom: req.body.nom || "No prof title",
        email: req.body.email

    });
    zoho.initialize(config).then((client) => {
        client.API.MODULES.post({
            module: 'Contacts',
            body: {
                // Pay ATTENTION! Data is an array!
                data: [
                    {
                        First_Name: req.body.nom,
                        Last_Name: req.body.nom,
                        Email: req.body.email,
                        Mobile: req.body.email,
                    }
                ],
            },
        }).then((data) => {
            const { donne } = JSON.parse(data.body);

            res.json({ donne });
        });
    });
    user.save()
    .then(data => {
        res.send(data);
        console.log(data)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the prof."
        });
});
}


exports.create = (req, res) => {
    let email = req.body.email
    console.log(email)
    let smtpTransport = mailer.createTransport({
        service: "Gmail",
        auth: {
            user: "tsikybr@gmail.com",
            pass: "3120annivk"
        }
    });
    let mail = {
        from: "tsikybr@gmail.com",
        to: email,
        subject: "test",
        text: 'exo 1 reussi, Bruno ihany'
    }
    smtpTransport.sendMail(mail, function (error, response) {
        if (error) {
            console.log("Erreur lors de l'envoie du mail!");
            console.log(error);
        } else {
            console.log("Mail envoyé avec succès!")
        }
        smtpTransport.close();
    });
    res.send(email)

};

