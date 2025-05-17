const explorerData = [];

const parentContainer = document.querySelector(".parentContainer");
const parentFolder = document.getElementById("parentFolder");
const parentFile = document.getElementById("parentFile");

function createFolderOrFileElement(item, type = null, isFirstlevel) {
  const explorerDiv = document.createElement("div");
  explorerDiv.className = "item";
  if (isFirstlevel) {
    explorerDiv.style.marginLeft = type === "file" && "30px";
  } else {
    explorerDiv.style.marginLeft = type === "file" ? "60px" : "30px";
  }

  if (type === "file") {
    explorerDiv.innerHTML = `
    <div class="container">
    <div class="file-info">
    <img src="./file.svg" class="file"/>
    <p>${item.text}</p>
    </div>

    <div class="actions">
    <img src="./edit.svg" class="edit-btn"/>
    <img src="./delete.svg" class="delete-btn"/>
    </div>
    </div>
`;
  } else {
    explorerDiv.innerHTML = `
    <div class="container">
    <div class="folder-info">
    <img src="./arrow-up.svg" class="arrow" id="up"/>
    <img src="./folder.svg" class="folder"/>
    <p>${item.text}</p>
    </div>

    <div class="actions">
    <img src="./folder-add.svg" class="addFolder"/>
    <img src="./file-add.svg" class="addFile"/>
    <img src="./edit.svg" class="edit-btn"/>
    <img src="./delete.svg" class="delete-btn"/>
    </div>
    </div>
    <div class="items-container"></div>
`;
  }

  const itemsContainer = explorerDiv.querySelector(".items-container");
  const arrow = explorerDiv.querySelector(".arrow");
  const folderInfo = explorerDiv.querySelector(".folder-info");
  folderInfo?.addEventListener("click", () => {
    if (!itemsContainer.innerHTML) {
      console.log("a");
      if (arrow.id === "up") {
        arrow.src = "./arrow-down.svg";
        arrow.id = "down";
      } else if (arrow.id === "down") {
        arrow.src = "./arrow-up.svg";
        arrow.id = "up";
      }

      return;
    }

    if (itemsContainer.style.display === "none") {
      arrow.src = "./arrow-down.svg";
      itemsContainer.style.display = "block";
    } else {
      arrow.src = "./arrow-up.svg";
      itemsContainer.style.display = "none";
    }
  });

  const addFolderBtn = explorerDiv?.querySelector(".addFolder");
  addFolderBtn?.addEventListener("click", () => {
    arrow.src = "./arrow-down.svg";
    explorerDiv
      .querySelector(".items-container")
      .appendChild(createItemInput(item, explorerDiv));
  });

  const addFileBtn = explorerDiv?.querySelector(".addFile");
  addFileBtn?.addEventListener("click", () => {
    arrow.src = "./arrow-down.svg";
    explorerDiv
      .querySelector(".items-container")
      .appendChild(createItemInput(item, explorerDiv, "file"));
  });

  const editBtn = explorerDiv.querySelector(".edit-btn");
  editBtn.addEventListener("click", () => {
    // removes any existing save & cancel btn if present
    if (document.querySelector(".save-btn")) {
      document.querySelector(".save-btn").remove();
      document.querySelector(".cancel-btn").remove();
    }

    let saveBtn = document.createElement("button");
    let cancelBtn = document.createElement("button");
    saveBtn.classList.add("save-btn");
    saveBtn.textContent = "Save";
    cancelBtn.textContent = "Cancel";
    cancelBtn.classList.add("cancel-btn");
    explorerDiv.insertBefore(saveBtn, itemsContainer);
    explorerDiv.insertBefore(cancelBtn, itemsContainer);

    let itemName = explorerDiv.querySelector("p");
    itemName.contentEditable = true;
    itemName.focus();

    cancelBtn.addEventListener("click", () => {
      itemName.contentEditable = false;
      itemName.textContent = item.text;
      explorerDiv.removeChild(cancelBtn);
      explorerDiv.removeChild(saveBtn);
      console.log("explorerData", explorerData);
    });

    saveBtn.addEventListener("click", () => {
      item.text = itemName.textContent;
      itemName.contentEditable = false;
      explorerDiv.removeChild(cancelBtn);
      explorerDiv.removeChild(saveBtn);
    });
  });

  const deleteBtn = explorerDiv.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", () => {
    function deleteObjectById(array, targetId) {
      for (let i = 0; i < array.length; i++) {
        if (array[i].id === targetId) {
          array.splice(i, 1);
          return true; // Object found and deleted
        }

        if (array[i].items && array[i].items.length > 0) {
          // Recursively search in items
          if (deleteObjectById(array[i].items, targetId)) {
            return true; // Object found and deleted in items
          }
        }
      }

      return false; // Object not found
    }
    deleteObjectById(explorerData, item.id);
    explorerDiv.remove();
  });

  return explorerDiv;
}

parentFolder.addEventListener("click", () => {
  const item = createItemInput(explorerData, parentContainer, null, true);
  parentContainer.appendChild(item);
});

parentFile.addEventListener("click", () => {
  const item = createItemInput(explorerData, parentContainer, "file", true);
  parentContainer.appendChild(item);
});

function createItemInput(item, parentContainer, type, isFirstlevel) {
  // removes any existing folder or file input container if present
  if (document.querySelector(".createItemContainer")) {
    document.querySelector(".createItemContainer").remove();
  }

  const itemInput = document.createElement("input");
  itemInput.type = "text";
  itemInput.placeholder = type === "file" ? "File name..." : "Folder name...";

  const addButton = document.createElement("button");
  addButton.textContent = type === "file" ? "Add file" : "Add Folder";

  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Cancel";

  const createItemContainer = document.createElement("div");
  createItemContainer.className = "createItemContainer";
  createItemContainer.appendChild(itemInput);
  createItemContainer.appendChild(addButton);
  createItemContainer.appendChild(cancelButton);
  createItemContainer.style.marginLeft = !isFirstlevel && "20px";

  addButton.addEventListener("click", () => {
    const itemText = itemInput.value.trim();

    if (itemText) {
      const newItem =
        type === "file"
          ? { id: Date.now(), text: itemText }
          : { id: Date.now(), text: itemText, items: [] };

      isFirstlevel ? item.push(newItem) : item.items.push(newItem);
      createItemContainer.remove();

      if (isFirstlevel) {
        parentContainer.appendChild(
          createFolderOrFileElement(
            newItem,
            type === "file" && "file",
            isFirstlevel
          )
        );
      } else {
        parentContainer
          .querySelector(".items-container")
          .appendChild(
            createFolderOrFileElement(newItem, type === "file" && "file")
          );
      }
    }
  });

  cancelButton.addEventListener("click", () => {
    createItemContainer.remove();
  });

  return createItemContainer;
}
