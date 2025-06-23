# Base React Hook Tutorial

This project is a simple React application that demonstrates how to manage a list of users with functionalities for adding, editing, deleting, and searching users. It utilizes modals for user interactions and pagination for navigating through the user list.

## Project Structure

```
base-react-hook-tutorial
├── public
│   └── index.html          # Main HTML file for the application
├── src
│   ├── components          # Contains all React components
│   │   ├── ModalAddNew.js  # Modal for adding new users
│   │   ├── ModalConfirm.js  # Modal for confirming user deletion
│   │   ├── ModalEdit.js     # Modal for editing user information
│   │   └── TableUsers.js    # Component for displaying user list
│   ├── services             # Contains service files for API interactions
│   │   └── UserService.js   # Functions for fetching user data
│   ├── App.js               # Main App component
│   └── index.js             # Entry point of the React application
├── package.json             # npm configuration file
├── README.md                # Project documentation
└── vercel.json              # Configuration for Vercel deployment
```

## Getting Started

To get started with this project, follow these steps:

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd base-react-hook-tutorial
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run the application:**
   ```
   npm start
   ```
   This will start the development server and open the application in your default web browser.

## Features

- **User Management:** Add, edit, and delete users.
- **Search Functionality:** Search users by their first name.
- **Pagination:** Navigate through the user list with pagination.
- **CSV Export/Import:** Export user data to CSV and import users from a CSV file.

## Deployment

This project can be deployed on Vercel. Ensure you have a `vercel.json` file configured for your deployment settings. To deploy, follow these steps:

1. **Install Vercel CLI:**
   ```
   npm install -g vercel
   ```

2. **Deploy the project:**
   ```
   vercel
   ```

Follow the prompts to complete the deployment process.

## License

This project is open-source and available under the [MIT License](LICENSE).