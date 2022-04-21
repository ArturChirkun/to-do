import RadioButton from "../radio-button/radio-button";
import "./category-list.css";

export const CategoryList = ({ categories, handleRadioFocus }) => {
  const withHandleRadioFocus = (e) => {
    return handleRadioFocus(e.target.value);
  };

  return (
    <div className="category-list">
      {categories.map((category) => (
        <RadioButton
          name={category}
          handleRadioFocus={withHandleRadioFocus}
          key={category}
        />
      ))}
    </div>
  );
};
