var selectedRow = null;

// Load the list from localStorage on page load
window.onload = function() {
    loadDataFromLocalStorage();
};

// Save data to localStorage when adding a new record
function onFormSubmit(event) {
    event.preventDefault();
    
    // Validate form before proceeding
    if (validateForm()) {
        var formData = readFormData();
        if (selectedRow == null) {
            insertNewRecord(formData);
        } else {
            updateRecord(formData);
        }
        saveDataToLocalStorage();  // Save updated data to localStorage
        resetForm();
    }
}

// Validate form fields before submitting
function validateForm() {
    var studentID = document.getElementById("StudentID").value;
    var studentName = document.getElementById("StudentName").value;
    var emailID = document.getElementById("EmailID").value;
    var contactNumber = document.getElementById("ContactNumber").value;

    // Check if any required field is empty
    if (studentID == "" || studentName == "" || emailID == "" || contactNumber == "") {
        alert("Please fill in all fields before submitting.");
        return false;  // Stop form submission
    }

    // Validate Student ID - Only numbers
    if (!/^\d+$/.test(studentID)) {
        alert("Student ID must be a valid number.");
        return false;
    }

    // Validate Contact Number - Only numbers
    if (!/^\d+$/.test(contactNumber)) {
        alert("Contact Number must be a valid number.");
        return false;
    }

    // Validate Student Name - Only alphabetic characters
    if (!/^[A-Za-z\s]+$/.test(studentName)) {
        alert("Student Name must only contain alphabetic characters.");
        return false;
    }

    // Validate Email ID - Proper email format
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(emailID)) {
        alert("Please enter a valid email address.");
        return false;
    }

    return true;  // Allow form submission
}

// Retrieve form data
function readFormData() {
    var formData = {};
    formData["StudentID"] = document.getElementById("StudentID").value;
    formData["StudentName"] = document.getElementById("StudentName").value;
    formData["EmailID"] = document.getElementById("EmailID").value;
    formData["ContactNumber"] = document.getElementById("ContactNumber").value;
    return formData;
}

// Insert a new record in the table
function insertNewRecord(data) {
    var table = document.getElementById("storeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    newRow.insertCell(0).innerHTML = data.StudentID;
    newRow.insertCell(1).innerHTML = data.StudentName;
    newRow.insertCell(2).innerHTML = data.EmailID;
    newRow.insertCell(3).innerHTML = data.ContactNumber;
    newRow.insertCell(4).innerHTML = `<button onClick="onEdit(this)">Edit</button> <button onClick="onDelete(this)">Delete</button>`;
}

// Edit an existing record
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("StudentID").value = selectedRow.cells[0].innerHTML;
    document.getElementById("StudentName").value = selectedRow.cells[1].innerHTML;
    document.getElementById("EmailID").value = selectedRow.cells[2].innerHTML;
    document.getElementById("ContactNumber").value = selectedRow.cells[3].innerHTML;
}

// Update an existing record
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.StudentID;
    selectedRow.cells[1].innerHTML = formData.StudentName;
    selectedRow.cells[2].innerHTML = formData.EmailID;
    selectedRow.cells[3].innerHTML = formData.ContactNumber;
}

// Delete a record
function onDelete(td) {
    if (confirm('Do you want to delete this record?')) {
        row = td.parentElement.parentElement;
        document.getElementById('storeList').deleteRow(row.rowIndex);
        saveDataToLocalStorage();  // Save updated data to localStorage after deletion
    }
}

// Save the current table data to localStorage
function saveDataToLocalStorage() {
    var table = document.getElementById("storeList").getElementsByTagName('tbody')[0];
    var data = [];
    for (var i = 0; i < table.rows.length; i++) {
        var row = table.rows[i];
        var rowData = {
            StudentID: row.cells[0].innerHTML,
            StudentName: row.cells[1].innerHTML,
            EmailID: row.cells[2].innerHTML,
            ContactNumber: row.cells[3].innerHTML
        };
        data.push(rowData);
    }
    localStorage.setItem("studentData", JSON.stringify(data));  // Save data to localStorage
}

// Load data from localStorage and populate the table
function loadDataFromLocalStorage() {
    var data = JSON.parse(localStorage.getItem("studentData"));
    if (data) {
        var table = document.getElementById("storeList").getElementsByTagName('tbody')[0];
        data.forEach(function(item) {
            var newRow = table.insertRow(table.length);
            newRow.insertCell(0).innerHTML = item.StudentID;
            newRow.insertCell(1).innerHTML = item.StudentName;
            newRow.insertCell(2).innerHTML = item.EmailID;
            newRow.insertCell(3).innerHTML = item.ContactNumber;
            newRow.insertCell(4).innerHTML = `<button onClick="onEdit(this)">Edit</button> <button onClick="onDelete(this)">Delete</button>`;
        });
    }
}

// Reset the form fields
function resetForm() {
    document.getElementById("StudentID").value = '';
    document.getElementById("StudentName").value = '';
    document.getElementById("EmailID").value = '';
    document.getElementById("ContactNumber").value = '';
    selectedRow = null;
}