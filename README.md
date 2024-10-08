# Welcome to My Dropbox
***

## Task
The challenge is to create a user-friendly file synchronization and management application that allows users to upload, manage, and share files seamlessly. The goal is to provide an intuitive interface for users to organize their files into folders, view them online, and maintain version control, while also ensuring that files can be accessed from anywhere.

## Description
This project solves the problem of inefficient file management and sharing by providing a robust web application that allows users to upload files, create folders for organization, and view files online. By implementing features such as file versioning and expiration dates, users can maintain a clear history of their documents. The application utilizes Firebase for backend services, including file storage and database management, ensuring that files are securely stored and easily retrievable.

## Installation
To install this project, follow these detailed steps:

1. **Clone the Repository:** First, you need to clone the repository to your local machine. Open your terminal or command prompt and run:
   ```bash
   git clone https://github.com/yourusername/my-dropbox.git
Replace yourusername with your GitHub username.

** Navigate to the Project Directory: Change your directory to the project folder you just cloned:

bash
..Copy code
..cd my-dropbox
..Install Node.js and npm: Ensure you have Node.js and npm installed on your machine. You can check if they are installed by running:

.bash
Copy code
node -v
npm -v
If you don’t have them installed, download and install them from Node.js Official Website.

**Install Project Dependencies: Once you're in the project directory, install all necessary dependencies using npm. This will install all the packages defined in package.json:

bash
Copy code
npm install
This process may take a few moments as it downloads and installs the required packages.

Set Up Firebase: To use Firebase services, you need to set up a Firebase project:

**Go to Firebase Console.
**Click on "Add project" and follow the prompts to create a new project.
After creating the project, go to the "Project settings" and obtain your Firebase configuration details.
Create a .env File: In the root of your project directory, create a file named .env to store your Firebase configuration variables. Add the following lines with your actual Firebase config values:

plaintext
Copy code
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
Replace the placeholder values with your actual Firebase project credentials.

Run the Application: After completing the above steps, you can start the application with the following command:

bash
Copy code
npm start
This command will start the development server, and you can access the application in your web browser at http://localhost:3000.

##Usage
To run the application, use the following command:

bash
Copy code
npm start
This will start the development server, and you can access the application in your web browser at http://localhost:3000.
## also you can use the link to my hosted site  
https://frolicking-biscuit-0597f2.netlify.app/

The Core Team
Abdulkarim Madinah - otni

<span><i>Made at <a href='https://qwasar.io'>Qwasar SV -- Software Engineering School</a></i></span> <span><img alt='Qwasar SV -- Software Engineering School's Logo' src='https://storage.googleapis.com/qwasar-public/qwasar-logo_50x50.png' width='20px' /></span>