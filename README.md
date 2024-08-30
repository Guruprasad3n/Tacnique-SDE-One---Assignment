# Tacnique User Management System

## Overview

This React-based web application allows users to view, add, edit, and delete user details. It integrates with JSONPlaceholder for mock backend functionality and uses Chakra UI for responsive design and styling.

## Features

- **View Users**: Displays a paginated list of users in a table format with details such as ID, Name, Email, and Company.
- **Add User**: Provides a form for adding new users, with client-side validation.
- **Edit User**: Allows editing of user details through a modal form, with validation.
- **Delete User**: Enables user deletion with a confirmation prompt.
- **Pagination**: Supports pagination to navigate through user data.
- **Responsive Design**: Adapts the interface for mobile, tablet, and laptop screens.
- **Form Validation**: Ensures input fields are correctly filled out before submission.

## Technologies Used

- **Frontend**: React, Chakra UI
- **Backend API**: JSONPlaceholder
- **HTTP Requests**: Axios

## Installation and Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Guruprasad3n/Tacnique-SDE-One---Assignment
   cd Tacnique-SDE-One---Assignment
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run the Application**
   ```bach
   npm run dev
   ```

# Usage

## Viewing Users

- The user list is displayed in a table format.
- Use the pagination controls to navigate through the list of users.

## Adding Users

- Click the "Add User" button in the navbar to open the add user form.
- Fill in the required details and submit the form to add a new user.

## Editing Users

- Click the three dots in the last column of the user table to open the action menu.
- Select "Edit" to open the edit user form in a modal.
- Update the user details and save the changes.

## Deleting Users

- Click the three dots in the last column of the user table to open the action menu.
- Select "Delete" to open a confirmation popup.
- Confirm the deletion to remove the user from the list.

## Pagination

- Use the pagination controls at the bottom of the user list to navigate between pages.
- Select the number of items per page using the dropdown menu.
