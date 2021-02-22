import React, { useContext, useEffect, useState } from "react";
import { CategoryContext } from "./CategoryProvider";

export const CategoryForm = (props) => {
  const { categories, addCategory, getCategories, updateCategory } = useContext(
    CategoryContext
  );
  const [category, setCategory] = useState({});

  const editMode = props.match.params.hasOwnProperty("categoryId");

  // console.log(props)

  const handleControlledInputChange = (event) => {
    /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
    const newCategory = Object.assign({}, category);
    newCategory[event.target.name] = event.target.value;
    setCategory(newCategory);
  };

  const getCategoryInEditMode = () => {
    if (editMode) {
      const categoryId = parseInt(props.match.params.categoryId);
      const selectedCategory =
        categories.find((c) => c.id === categoryId) || {};
      setCategory(selectedCategory);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getCategoryInEditMode();
  }, [categories]);

  const constructNewCategory = () => {
    if (editMode) {
      updateCategory({
        id: category.id,
        label: category.label,
      }).then(() => props.history.push("/categories"));
    } else {
      addCategory({
        label: category.label,
      }).then(() => props.history.push("/categories"));
    }
  };

  return (
    <form className="categoryForm">
      <h2 className="categoryForm__title">
        {editMode ? "Update Category" : "Add Category"}
      </h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="label">Create a new category</label>
          <input
            type="text"
            name="label"
            required
            autoFocus
            className="form-control"
            proptype="varchar"
            placeholder="Add text"
            defaultValue={category.label}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <button
        type="submit"
        onClick={(evt) => {
          evt.preventDefault(); // Prevent browser from submitting the form
          constructNewCategory();
        }}
        className="btn btn-primary"
      >
        {editMode ? "Save Update" : "Save"}
      </button>
      <button
        onClick={() => {
          props.history.push(`/categories`);
        }}
      >
        Back
      </button>
    </form>
  );
};
