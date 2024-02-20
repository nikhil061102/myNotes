# myNotes - MERN Stack Project 📝

myNotes is a versatile MERN Stack project, empowering users to create, save, edit, delete, and pin notes. With JWT authentication, users can securely sign in and log in to access the platform's features.

## About the Project 📝🚀

myNotes is a dynamic MERN Stack project designed to revolutionize note-taking experiences, inspired by the functionality of Google Keep. Users can seamlessly create, edit, and organize their notes, imbued with a plethora of text formatting options.

With myNotes, users enjoy the freedom to embed images, videos, and URLs into their notes, fostering richer content creation. The platform offers a delightful array of customizable backgrounds, allowing users to personalize their notes according to their preferences.

Embracing both light and dark mode themes, myNotes ensures optimal readability and visual comfort across various environments. Powered by JWT authentication, users can securely access their notes, fostering trust and reliability in their digital workspace.

Experience the future of note-taking with myNotes - where creativity meets functionality! 🌟📝

## Features
✅ Create, save, edit, delete, and pin notes  
✅ Support for various text formatting options  
✅ Ability to add images, videos, and URLs to notes  
✅ Custom background settings for notes  
✅ Dark and light mode options  

## Technologies Used
- MongoDB
- Express.js
- React.js
- Node.js
- JWT authentication  
- Chakra UI
- Quill.js

### Starting Backend:

1. **Setup Environment Variables**:
   - Create a `.env` file with the following parameters:
     - `MONGO_URI`: URL for MongoDB
     - `JWT_SECRET`: Any string for JWT secret
    - Here I have used :-
        ```
        MONGO_URI=mongodb://127.0.0.1:27017/notesapp
        JWT_SECRET=secretcode
        ```
2. **Navigate to Backend Directory**:
   - Open the main folder in the command prompt.
   - Type `cd backend` to navigate to the backend directory.

3. **Install Dependencies**:
   - Run `npm install` to install all required node_modules.

4. **Start the Server**:
   - Run `node ./server.mjs` to start the server-side application.

### Starting Frontend:

1. **Navigate to Frontend Directory**:
   - Open the main folder in the command prompt.
   - Type `cd frontend` to navigate to the frontend directory.

2. **Install Dependencies**:
   - Run `npm install` to install all required node_modules.

3. **Start the Client**:
   - Run `npm start` to start the client-side application.

4. **Access the Application**:
   - Visit `http://localhost:3000` in your web browser to access the application.
