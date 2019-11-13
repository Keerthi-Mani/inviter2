var attachment_base = "";
$("#send-btn").on("click", async function (event) {
    event.preventDefault();

    // Make a new mail
    var person_name = $("#name").val().trim();
    var person_email_id = $("#email").val().trim();
    var person_relation = $("#relation").val().trim();
    var subject_text = $("#subject").val().trim();
    var text_area = $("#text-message").val().trim();

    //var file = $("#exampleFormControlFile1").val.trim();

    var files = document.getElementById('file').files;
    if (files.length > 0) {
        await getBase64(files[0]);
    }

    var details = {
        contact_name: person_name,
        contact_email: person_email_id,
        contact_relation: person_relation,
        contact_subject: subject_text,
        message: text_area,
        attachment_data: attachment_base,
        attachment_filename: files[0].name,
    }
    console.log(details);
    $.post("/sendemail", details)
        .then(function () {

        });

    async function getBase64(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            attachment_base = reader.result;
            console.log(attachment_base);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }
    //Empty each input box by replacing the value with an empty string
    $("#name").val("");
    $("#email").val("");
    $("#relation").val("");
    $("#subject").val("");
    $("#text-message").val("");
});

document.getElementById('button').addEventListener('click', function () {
    var files = document.getElementById('file').files;
    if (files.length > 0) {
        getBase64(files[0]);
    }
});

async function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {

        attachment_base = reader.result;
        console.log(attachment_base);
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}

//View all the emails that are sent through nodemailer
$.get("/all", function (data) {
    // console.log("GET /all");
    for (var i = 0; i < data.length; i++) {
        var emailSection = $("<div>");
        emailSection.addClass("section");
        emailSection.attr("id", "email-well-" + i);
        $("#example-list").append(emailSection);
        $("#email-well-" + i).append("<h2>" + (i + 1) + "." + "Name : " + data[i].contact_name + "</h2>");
        $("#email-well-" + i).append("<h3>" + "Email :" + data[i].contact_email + "</h3>");
        $("#email-well-" + i).append("<h3>" + "Relation :" + data[i].contact_relation + "</h3>");
        $("#email-well-" + i).append("<h3>" + "Message :" + data[i].message + "</h3>");
    }
});

//View emails by name
var url = "/sendemail/" + name;
$.get("url", function (data) {
    // console.log(data);
    for (var i = 0; i < data.length; i++) {
        var emailSection = $("<div>");
        emailSection.addClass("section");
        emailSection.attr("id", "email-well-" + i);

        $("#email-well-" + i).append("<h2>" + (i + 1) + "." + "Name : " + data[i].contact_name + "</h2>");
        $("#email-well-" + i).append("<h3>" + "Email :" + data[i].contact_email + "</h3>");
        $("#email-well-" + i).append("<h3>" + "Message :" + data[i].message + "</h3>");
        $("#email-section").append(emailSection);
    }
    //console.log();
});

//View emails by id
var url = "/sendemail/id" + id;
$.get("url", function (data) {
    for (var i = 0; i < data.length; i++) {
        var emailSection = $("<div>");
        emailSection.addClass("section");
        emailSection.attr("id", "email-well-" + i);
        $("#email-section").append(emailSection);
        $("#email-well-" + i).append("<h2>" + (i + 1) + "." + "Name : " + data[i].contact_name + "</h2>");
        $("#email-well-" + i).append("<h3>" + "Email :" + data[i].contact_email + "</h3>");
        $("#email-well-" + i).append("<h3>" + "Message :" + data[i].message + "</h3>");

    }
});

//View emails by relation
var url = "/sendemail/relation" + type;
$.get("url", function (data) {
for (var i = 0; i < data.length; i++) {
        var emailSection = $("<div>");
        emailSection.addClass("section");
        emailSection.attr("id", "email-well-" + i);
        $("#email-section").append(emailSection);
        $("#email-well-" + i).append("<h2>" + (i + 1) + "." + "Name : " + data[i].contact_name + "</h2>");
        $("#email-well-" + i).append("<h3>" + "Email :" + data[i].contact_email + "</h3>");
        $("#email-well-" + i).append("<h3>" + "Message :" + data[i].message + "</h3>");
}
});
