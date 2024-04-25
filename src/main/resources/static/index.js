// Funksjon for kjøp av billett
function kjøpAvBillett() {
    // Tømmer feilmeldingene før validering
    $("#ugyldigAntall").html("");
    $("#ugyldigTelefonnr").html("");
    $("#ugyldigFornavn").html("");
    $("#ugyldigEtternavn").html("");
    $("#ugyldigEpost").html("");

    const antall = $("#antall").val();
    const telefonnr = $("#telefonnr").val();
    const fornavn = $("#fornavn").val();
    const etternavn = $("#etternavn").val();
    const epost = $("#epost").val();

    // Boolean som sjekker om feilmeldinger skal kjøres
    let error = false;

    if (antall === "" || isNaN(antall) || parseInt(antall) <= 0) {
        error = true;
        $("#ugyldigAntall").html("Ugyldig, må fylle inn antall");
    }

    if (isNaN(telefonnr) || telefonnr.length !== 8) {
        error = true;
        $("#ugyldigTelefonnr").html("Ugyldig, telefonnr må bestå av 8 siffer");
    }

    if (fornavn.length === 0 || !isNaN(fornavn)) {
        error = true;
        $("#ugyldigFornavn").html("Ugyldig, må fylle inn fornavn");
    }

    if (etternavn.length === 0 || !isNaN(etternavn)) {
        error = true;
        $("#ugyldigEtternavn").html("Ugyldig, må fylle inn etternavn");
    }

    if (!epost.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(epost)) {
        error = true;
        $("#ugyldigEpost").html("Ugyldig e-postadresse");
    }

    if (!error) {
        regKinobillett();
    }
}

// Funksjon for å legge til billett i array ved klikk av kjøp billett knapp
function regKinobillett() {
    const kinobillett = {
        filmer: $("#filmer").val(),
        antall: $("#antall").val(),
        fornavn: $("#fornavn").val(),
        etternavn: $("#etternavn").val(),
        telefonnr: $("#telefonnr").val(),
        epost: $("#epost").val(),
    };

    $.post("/lagreKinobillett", kinobillett, function () {
       hentAlle();
    });

    // Viser den nye infoen i arrayet
    visKinobillettRegister();

    // Sletter info fra input-boksene
    $("#filmer").val("");
    $("#antall").val("");
    $("#fornavn").val("");
    $("#etternavn").val("");
    $("#telefonnr").val("");
    $("#epost").val("");
}

// Skriver ut array med registrerte
function visKinobillettRegister() {
    let ut = "<table class='table table-striped'><tr>" +
        "<th>Film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>Telefonnr</th><th>Epost</th>" +
        "</tr>";
    for (let r of kinobillettRegister) {
        ut += "<tr>";
        ut += "<td>" + r.filmer + "</td><td>" + r.antall + "</td><td>" + r.fornavn + "</td><td>" + r.etternavn + "</td><td>" + r.telefonnr + "</td><td>" + r.epost + "</td>";
        ut += "</tr>";
    }
    ut += "</table>";
    $("#kinobillettRegister").html(ut);
}

// Funksjon for å tømme arrayet for all registrert info
function slettAlle() {
    $.get("/slettAlle", function() {
        kinobillettRegister.length = 0;
        visKinobillettRegister();
    });
}

// Funksjon for å hente alle registrerte kinobilletter
function hentAlle() {
    $.get("/hentAlle", function(kinobilletter) {
        kinobillettRegister = kinobilletter;
        visKinobillettRegister();
    });
}

// Kaller hentAlle() funksjon ved lasting av siden for å laste inn tidligere registrerte kinobilletter
$(document).ready(function() {
    hentAlle();
});

// Funksjon for valg av film
function velgFilm() {
    const valgtFilm = $("#filmer").val();
}
