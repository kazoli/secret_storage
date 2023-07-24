#DESCRIPTION

Only frontend based codes, no backend or any data movement outside your browser. Vite, React and Typescript. Crypting by TweetNaCl.

#FEATURES

1. You can select an encoded file to decode or creating a new one.
2. In case of a selected file, log in can be possible with the password of encoded data.
3. In case of a new file entered password becomes the valid one to every operation.
4. Password is necessary to every operation that no one can change or overwrite your data if you left your computer unattended.
5. Password cannot be pasted into any password field for security reasons. (If you better like that if passwords can be pasted everywhere, change the value of "onPaste" to true in src/components/form/FormPasswordBlock.tsx.)
6. Password can be modified.
7. Bucket like data storage blocks.
8. List and grid order available.
9. Blocks can be added, modified and deleted with the valid password.
10. Data can be searched by keywords in title, data or all.
11. Blocks can be moved or reordered inside list.

#BEFORE RUN ANY CODE

1. Use a command line, enter in the main folder and install packages: "npm i"

#RUN DEVELOPMENT

1. Use a command line, enter in the main folder and start the website: "npm run dev"
2. Open in browser: http://localhost:3000/

#RUN PRODUCTION

1. Use a command line, enter in the main folder and run this command: "npm run build"
2. You may serve it with a static server by typing in command line and run: serve -s build
3. App will start on that URL that static server will display in the command line

#BUILD A SERVERLESS PRODUCTION

1. Change "BrowserRouter" to "HashRouter" in this file: src/components/core/Router.tsx
2. Use a command line, enter in the main folder and run this command: "npm run sls-build"
3. In main folder a "build" subfolder will be created
4. Enter into the "build" subfolder and click twice on index.html and it will work
5. You can move it anywhere in your file system and rename the folder whatever you want eg.: secret-storage
