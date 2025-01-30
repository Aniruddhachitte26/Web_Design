document.addEventListener("DOMContentLoaded", function () {
    let table = document.getElementById("myTable");
    let addButton = document.getElementById("add");
    let submitButton = document.getElementById("button");
  
    // Display Name and NUID on Page Load
    let nameNUID = document.createElement("h2");
    nameNUID.innerHTML = "Full Name: Aniruddha Sanjeev Chitte | NUID: 002322111";
    document.body.insertBefore(nameNUID, table);
  
    // Disable submit button initially
    submitButton.disabled = true;
    submitButton.style.backgroundColor = "gray";
  
    let studentCount = 3; // Initial student count
  
    // Function to update row numbers to maintain order
    function updateStudentNumbers() {
        let rows = document.querySelectorAll("#myTable tr:not(:first-child):not(.dropDownTextArea)");
        studentCount = 0;
        rows.forEach((row, index) => {
            let studentNumber = index + 1;
            row.cells[1].textContent = `Student ${studentNumber}`;
            row.cells[2].textContent = `Teacher ${studentNumber}`;
            studentCount = studentNumber;
        });
    }
  
    // Add New Student Function
    addButton.addEventListener("click", function () {
        studentCount++;
        let newRow = table.insertRow(-1);
        newRow.innerHTML = `
            <td><input type="checkbox"><br><br><img src="down.png" width="25px"></td>
            <td>Student ${studentCount}</td>
            <td>Teacher ${studentCount}</td>
            <td>Approved</td>
            <td>Fall</td>
            <td>TA</td>
            <td>${10000 + studentCount}</td>
            <td>100%</td>
            <td></td>
            <td></td>
        `;
  
        // Insert DropDown Row
        let dropDownRow = table.insertRow(-1);
        dropDownRow.classList.add("dropDownTextArea");
        dropDownRow.innerHTML = `<td colspan="8">
            Student ${studentCount} Details:<br><br>Award Details: Honors Student<br />
			Fall 1-2024(TA)<br />
			Comments: Outstanding<br />
			Award Status: A <br><br>
        </td>`;

  
        alert(`Student ${studentCount} Record added successfully`);
        addEventListenersToRow(newRow);
    });
  
    function addEventListenersToRow(row) {
        let checkbox = row.querySelector("input[type='checkbox']");
        let arrowIcon = row.querySelector("img");
        let deleteCell = row.cells[8];
        let editCell = row.cells[9];
        


    
        // Initially hide the delete/edit columns and buttons
        deleteCell.style.display = "none";
        editCell.style.display = "none";

    
        checkbox.addEventListener("change", function () {
            if (this.checked) {
                row.style.backgroundColor = "yellow";
                submitButton.disabled = false;
                submitButton.style.backgroundColor = "orange";

                document.querySelectorAll("#myTable th:nth-child(9), #myTable th:nth-child(10)").forEach(th => {
                    th.style.display = "table-cell"; // Show column headers for Delete/Edit
                });    
                // Show the delete and edit columns and buttons
                deleteCell.style.display = "table-cell";  // Show column
                editCell.style.display = "table-cell";  // Show column

                
                // Add Delete and Edit buttons dynamically if not already added
                if (!deleteCell.innerHTML) {
                    let deleteBtn = document.createElement("button");
                    deleteBtn.textContent = "Delete";
                    deleteBtn.addEventListener("click", function () {
                        row.nextElementSibling.remove(); // Remove dropdown row
                        row.remove();
                        updateStudentNumbers();
                        alert(`Student ${row.cells[1].textContent.split(" ")[1]} Record deleted successfully`);
                    });
    
                    let editBtn = document.createElement("button");
                    editBtn.textContent = "Edit";
                    editBtn.addEventListener("click", function () {
                        let studentNumber = row.cells[1].textContent.split(" ")[1];
                        let newData = prompt(`Edit details of Student ${studentNumber}`, row.cells[1].textContent);
                        if (newData) {
                            alert(`Student ${studentNumber} data updated successfully`);
                        }
                    });
    
                    deleteCell.appendChild(deleteBtn);
                    editCell.appendChild(editBtn);
                }
            } else {
                row.style.backgroundColor = "white";
                deleteCell.innerHTML = "";  // Clear any existing buttons
                deleteCell.style.display = "none";  // Hide column again
                editCell.innerHTML = "";  // Clear any existing buttons
                editCell.style.display = "none";  // Hide column again
            
                // Hide the delete/edit column headers when no checkboxes are selected

                if (document.querySelectorAll("#myTable input[type='checkbox']:checked").length === 0) {
                    // Hide column headers for Delete/Edit
                    document.querySelectorAll("#myTable th:nth-child(9), #myTable th:nth-child(10)").forEach(th => {
                        th.style.display = "none";
                    });}
    
                if (document.querySelectorAll("#myTable input[type='checkbox']:checked").length === 0) {
                    submitButton.disabled = true;
                    submitButton.style.backgroundColor = "gray";
                }
            }
        });
    
        // Expand/collapse row details
        arrowIcon.addEventListener("click", function () {
            let dropDownRow = row.nextElementSibling;
            dropDownRow.style.display = dropDownRow.style.display === "none" ? "table-row" : "none";
        });
    
        // Hide dropdown details initially
        row.nextElementSibling.style.display = "none";
    }
    
    // Apply event listeners to existing rows
    let existingRows = document.querySelectorAll("#myTable tr:not(:first-child):not(.dropDownTextArea)");
    existingRows.forEach(row => addEventListenersToRow(row));
  });
  