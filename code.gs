function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}

function submitForm(data, sheetName) {
  var ss = SpreadsheetApp.openById('///');
  var sheet = ss.getSheetByName(sheetName);
  sheet.appendRow([data.firstName, data.lastName, data.email, data.phone, data.password, data.securityQuestion, data.securityAnswer, data.gender]);

 // Send email to the user who submitted the form
var subject = 'Thank you for your submission';
var body = '<html><body><p>Dear ' + data.firstName + ',</p>' +
           '<p>Thank you for submitting the form. Here is the data you submitted:</p>' +
           '<table style="border-collapse: collapse; width: 100%;">' +
           '<tr style="background-color: #f2f2f2;"><td><b>Field</b></td><td><b>Data</b></td></tr>' +
           '<tr><td>First Name</td><td>' + data.firstName + '</td></tr>' +
           '<tr><td>Last Name</td><td>' + data.lastName + '</td></tr>' +
           '<tr><td>Email</td><td>' + data.email + '</td></tr>' +
           '<tr><td>Phone</td><td>' + data.phone + '</td></tr>' +
           '<tr><td>Security Question</td><td>' + data.securityQuestion + '</td></tr>' +
           '<tr><td>Gender</td><td>' + (data.gender === 'male' ? 'Male' : 'Female') + '</td></tr></table>' +
           '<p>Your data has been received successfully.</p><p>Best regards,<br>[Your Company Name]</p></body></html>';
MailApp.sendEmail(data.email, subject, '', { htmlBody: body });

// Send email to the sheet owner
var ownerEmail = Session.getActiveUser().getEmail(); // Get the email of the sheet owner
var ownerSubject = 'New form submission: ' + sheetName;
var ownerBody = '<html><body><p>Hi,</p>' +
                '<p>A new form submission has been received for ' + sheetName + '. Here is the data:</p>' +
                '<table style="border-collapse: collapse; width: 100%;">' +
                '<tr style="background-color: #f2f2f2;"><td><b>Field</b></td><td><b>Data</b></td></tr>' +
                '<tr><td>First Name</td><td>' + data.firstName + '</td></tr>' +
                '<tr><td>Last Name</td><td>' + data.lastName + '</td></tr>' +
                '<tr><td>Email</td><td>' + data.email + '</td></tr>' +
                '<tr><td>Phone</td><td>' + data.phone + '</td></tr>' +
                '<tr><td>Security Question</td><td>' + data.securityQuestion + '</td></tr>' +
                '<tr><td>Security Answer</td><td>' + data.securityAnswer + '</td></tr>' +
                '<tr><td>Gender</td><td>' + (data.gender === 'male' ? 'Male' : 'Female') + '</td></tr></table>' +
                '<p>Please check the spreadsheet for details.</p><p>Best regards,<br>[Your Company Name]</p></body></html>';
MailApp.sendEmail(ownerEmail, ownerSubject, '', { htmlBody: ownerBody });
}
