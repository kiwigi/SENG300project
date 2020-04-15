<script src="https://smtpjs.com/v3/smtp.js"></script>
function sendAccepted(student,scholarshipName) {
    Email.send({
    Host: "smtp.gmail.com",
    Username : "scholarshipapp20@gmail.com",
    Password : "sohaibrocks300",
    To : ''+student.email,                                  // Get user ID and email
    From : "scholarship.admin@scholarships.com",
    Subject : "Congratulations"+student.name+"!",
    Body : "You've been accepted for the scholarship"+scholarshipName,
    }).then(
        message => alert("mail sent successfully")
    );
}

function sendDeclined(student, scholarshipName) {
    Email.send({
    Host: "smtp.gmail.com",
    Username : "scholarshipapp20@gmail.com",
    Password : "sohaibrocks300",
    To : ''+email,                                  // Get user ID and email
    From : "scholarship.admin@scholarships.com",
    Subject : "Sorry"+name+"!",
    Body : "You've been declined for the scholarship"+scholarshipName,
    }).then(
        message => alert("mail sent successfully")
    );
}

