# DESCRIPTION

Only frontend based codes, no backend or any data movement outside your browser. Vite, React and Typescript. Crypting by TweetNaCl.

# LIVE DEMO

1. https://kazoli.github.io/secret_storage
2. Download the serverless build, unzip it, go into the unzipped folder and click twice on index.html to run: https://github.com/kazoli/secret_storage/blob/master/secret-storage.zip

# FEATURES

1. You can change the surface language at any time and the browser stores that.
2. You can select an encoded file to decode or do not select any one and it will create a new one.
3. In case of a selected file, log in and decoding can be possible with the password of encoded data.
4. In case of a new file, entered password becomes the valid one to every operation.
5. Every time the data or password have been changed, you need to export the data to store into the encoded file. Export button will appear in the bottom right corner or always available in top right menu.
6. Password is necessary to add, modify or remove a data block, to no one can change or overwrite your data if you left your computer unattended. Password is not necessary to view a data block.
7. Password cannot be pasted into any of the password fields for security reasons. (If you better like that if passwords can be pasted everywhere, change the value of "onPaste" to true in src/components/form/FormPasswordBlock.tsx. Rebuild or compilation needed to work accordingly.)
8. Password can be modified.
9. Data stored in title and content divided blocks.
10. Categories can be added to blocks and list can be filtered by them too.
11. By clicking on a category link in list, you can filter the list by that category or you can remove category filtering.
12. Data can be searched by keywords in title, data or all.
13. List and grid layout available.
14. Every data block can be repositioned before or after an other one.

# BEFORE RUN ANY CODE

1. Use a command line, enter in the main folder and install packages: "npm i"

# RUN DEVELOPMENT

1. Use a command line, enter in the main folder and run this command: "npm run dev"
2. Open in browser: http://localhost:3000/

# RUN PRODUCTION

1. Use a command line, enter in the main folder and run this command: "npm run build"
2. You may serve it with a static server by typing in command line and run: "serve -s build"
3. App will start on that URL that static server will display in the command line

# BUILD A SERVERLESS PRODUCTION

1. Change "BrowserRouter" to "HashRouter" in this file: src/providers/RouterProvider/RouterProvider.tsx
2. Use a command line, enter in the main folder and run this command: "npm run sls-build"
3. In main folder a "build" subfolder will be created
4. Enter into the "build" subfolder and click twice on index.html and it will work
5. You can move the folder anywhere in your file system and rename it whatever you want eg.: secret-storage
