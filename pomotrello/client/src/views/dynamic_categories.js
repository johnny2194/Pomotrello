var TaskList = require("../models/task_list.js");
var addCategoryModalPopup = require("./add_category_modal_popup.js");

var dynamicCategories = function(categorySelect, currentTaskCategory) {

  var allCategories = {};
  var taskList = new TaskList();
  taskList.all(function (allTasks) {
    allTasks.forEach(function(task) {
      var category = task.category;
      allCategories[category] = allCategories[category] ? allCategories[category]+1 : 1;
    });
  });

  categorySelect.addEventListener("click", function() {
    categorySelect.innerHTML = "";
    for(category in allCategories) {
      var option = document.createElement("option");
      option.value = category;
      option.innerText = category;
      categorySelect.appendChild(option);
    }
    if (currentTaskCategory) {
    categorySelect.value = currentTaskCategory;
  };

    var addNewCategory = document.createElement("option");
    addNewCategory.innerText = "Add new category";
    categorySelect.appendChild(addNewCategory);

    categorySelect.addEventListener("change", function(event) {

      if(event.target.value == "Add new category"){
        addCategoryModalPopup(categorySelect);
      };
    });
  });
};


module.exports = dynamicCategories;
