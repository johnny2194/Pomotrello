var addCategoryModalPopup = function(categorySelect) {
  console.log("categorySelect in addCategoryModalPopup", categorySelect);
  var addCategoryModal = document.getElementById("add-category-modal-popup");
  addCategoryModal.style.display = "block";
  var addCategoryForm = document.getElementById("add-category-form");
  var addCategoryInput = document.getElementById("new-category-input");
  addCategoryInput.autofocus = true;

  addCategoryForm.addEventListener("submit", function (event) {
    event.preventDefault();  //this stops redirect to new page

    var newCategoryValue = addCategoryForm["new-category-input"].value;

    var newCategoryOption = document.createElement("option");
    newCategoryOption.value = newCategoryValue;
    newCategoryOption.innerText = newCategoryValue;
    newCategoryOption.setAttribute("selected", true);
    categorySelect.appendChild(newCategoryOption);

    addCategoryModal.style.display = "none";

    return false;
  })

  var addCategorySpan = document.getElementById("close-add-category-modal-popup");
  // When the user clicks on <span> (x), close the modal
  addCategorySpan.onclick = function() {
    addCategoryModal.style.display = "none";
  };
  // When the user clicks anywhere outside of the modal, close it
  addCategoryModal.onclick = function(event) {
    if (event.target == addCategoryModal) {
      addCategoryModal.style.display = "none";
    };
  };
};
module.exports = addCategoryModalPopup;
