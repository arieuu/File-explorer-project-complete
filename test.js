// <!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title>File Explorer</title>
//     <link rel="stylesheet" href="styles.css" />
//   </head>
//   <body>
//     <div class="explorer">
//       <div class="actions">
//         <button id="createFolder">Create Folder</button>
//       </div>
//       <div class="folder-container" id="folderContainer">
//         <!-- Folders and Files will be displayed here -->
//       </div>
//     </div>
//     <script src="index.js"></script>
//   </body>
// </html>

// // script.js
// const folderContainer = document.getElementById("folderContainer");
// const createFolderButton = document.getElementById("createFolder");

// createFolderButton?.addEventListener("click", createFolder);

// function createFolder() {
//   const folderName = prompt("Enter folder name:");
//   if (folderName) {
//     const folder = createFolderElement(folderName);
//     folderContainer.appendChild(folder);
//   }
// }

// function createFolderElement(folderName) {
//   const folder = document.createElement("div");
//   const folderDetails = document.createElement("div");
//   const addFolderButton = document.createElement("img");
//   folder.classList.add("folder");
//   folderDetails.classList.add("folderDetails");
//   folderDetails.innerHTML = `
//         <img src="./folder.svg" class="folder-icon">
//         <span class="folder-name">${folderName}</span>

//     `;

//   addFolderButton.src = "./folder-add.svg";
//   addFolderButton.classList = "addFolder";
//   folderDetails.appendChild(addFolderButton);

//   addFolderButton.addEventListener("click", () => {
//     const subFolderName = prompt(`Enter subfolder name for ${folderName}:`);
//     if (subFolderName) {
//       const subFolder = createFolderElement(subFolderName);
//       folder.appendChild(subFolder);
//     }
//   });

//   const addFileButton = document.createElement("img");
//   addFileButton.src = "./file-add.svg";
//   addFileButton.classList = "addFile";

//   addFileButton.addEventListener("click", () => {
//     const fileName = prompt(`Enter file name for ${folderName}:`);
//     if (fileName) {
//       const file = createFileElement(fileName);
//       folder.appendChild(file);
//     }
//   });

//   folderDetails.appendChild(addFileButton);
//   folder.appendChild(folderDetails);

//   return folder;
// }

// function createFileElement(fileName) {
//   const file = document.createElement("div");
//   file.classList.add("file");
//   file.innerHTML = `
//         <img src="./file.svg" class="file-icon">
//         <span class="file-name">${fileName}</span>
//     `;
//   return file;
// }

// css -->

// /* styles.css */
// body {
//   font-family: Arial, sans-serif;
// }

// .explorer {
//   max-width: 400px;
//   margin: 0 auto;
//   padding: 20px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
// }

// .actions {
//   margin-bottom: 10px;
// }

// button {
//   padding: 5px;
//   margin-right: 10px;
// }

// .folder {
//   margin-left: 15px;
// }

// .folderDetails {
//   display: flex;
//   align-items: center;
//   margin-bottom: 10px;
// }

// .folder-icon {
//   width: 24px;
//   height: 24px;
//   margin-right: 5px;
// }

// .folder-name {
//   font-weight: bold;
//   cursor: pointer;
// }

// .file {
//   margin-left: 15px;
//   display: flex;
//   align-items: center;
// }

// .file-icon {
//   width: 24px;
//   height: 24px;
//   margin-right: 5px;
// }

// .file-name {
//   cursor: pointer;
// }

// /* .folder {
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   margin-bottom: 10px;
// } */

// .folder button {
//   margin-top: 5px;
// }

// .addFolder {
//   width: 25px;
//   height: 25px;
// }

// .addFile {
//   width: 25px;
//   height: 25px;
// }

// .parentAction {
//   display: none;
// }
