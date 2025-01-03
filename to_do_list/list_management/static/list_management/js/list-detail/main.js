////////////////////////////// List delete confirmation modal //////////////////////////////

// Get the form and modal elements
const listDeleteForm = document.getElementById('list-delete-form');
const listDeleteModal = new bootstrap.Modal(document.getElementById('list-delete-modal'));
const confirmListDelete = document.getElementById('confirm-list-delete');

// Add submit event listener to the form
listDeleteForm.addEventListener('submit', function (event) {
    // Prevent the form from submitting immediately
    event.preventDefault();
    // Stop the event from bubbling up
    event.stopPropagation();
    // Show the confirmation modal
    listDeleteModal.show();
});

// Add click event listener to the confirm delete button
confirmListDelete.addEventListener('click', function () {
    // Submit the form when confirmed
    listDeleteForm.submit();
});

////////////////////////////// Task delete confirmation modal //////////////////////////////

// Get the form and modal elements
const taskDeleteForm = document.getElementById('task-delete-form');
const taskDeleteModal = new bootstrap.Modal(document.getElementById('task-delete-modal'));
const confirmTaskDelete = document.getElementById('confirm-task-delete');

// Add submit event listener to the form
taskDeleteForm.addEventListener('submit', function (event) {
    // Prevent the form from submitting immediately
    event.preventDefault();
    // Stop the event from bubbling up
    event.stopPropagation();
    // Show the confirmation modal
    taskDeleteModal.show();
});

// Add click event listener to the confirm delete button
confirmTaskDelete.addEventListener('click', function () {
    // Submit the form when confirmed
    taskDeleteForm.submit();
});

////////////////////////////// Task offcanvas //////////////////////////////

// Handle task click and populate offcanvas
const taskLinks = document.querySelectorAll('.list-group-item-action');
taskLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        const taskId = this.dataset.taskId;
        const description = this.dataset.taskDescription;
        const dueDate = this.dataset.taskDueDate;

        // Populate form fields
        document.getElementById('taskIdInput').value = taskId;
        document.getElementById('deleteTaskIdInput').value = taskId;
        document.getElementById('descriptionInput').value = description;
        document.getElementById('dueDateInput').value = dueDate;


    });
});

////////////////////////////// Task status form //////////////////////////////

// Get all checkboxes
const checkboxes = document.querySelectorAll('.task-checkbox');

// Add change event listener to each checkbox
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        // Get the parent form and submit it
        this.closest('.task-status-form').submit();
    });
});
