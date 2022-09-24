import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';

// Single List Item
const WrappedSingleListItem = ({
  index,
  isSelected,
  onClickHandler,
  text
}) => {
  return (
    <li
      style={{ backgroundColor: isSelected === true ? 'green' : 'red' }}
      // Problem -1: (Have to create a callback function)
      // onClick={onClickHandler(index)}
      onClick={() => onClickHandler(index)}
    >
      {text}
    </li>
  );
};

WrappedSingleListItem.propTypes = {
  index: PropTypes.number,
  isSelected: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

const SingleListItem = memo(WrappedSingleListItem);

// List Component
const WrappedListComponent = ({
  items,
}) => {
  // problem-2 : (useState() syntex was wrrong and useState is changed for obtimization)
  // const [setSelectedIndex, selectedIndex] = useState();

  const [newItems, setNewItems,] = useState([]);

  useEffect(() => {
    // problem -3: Changed for modify.
    // setSelectedIndex(null);
    setNewItems(items);
  }, [items]);

  
// Problem - 4: changed handleClick functionality for optimization
// const handleClick = index => {
//   setSelectedIndex(index);
// };
  const handleClick = (index) => {
    let newArray = [...newItems];
    newArray[index].isSelected = !newArray[index].isSelected
    setNewItems(newArray);
  };

  return (
    <ul style={{ textAlign: 'left' }}>
      {newItems.map((item, index) => (
        <SingleListItem
        // Problem - 5: Add key for fixing an error
          key={index}
          onClickHandler={handleClick}
          text={item.text}
          index={index}
          isSelected={item?.isSelected}
        />
      ))}
    </ul>
  )
};

WrappedListComponent.propTypes = {
  // Problem -6: array should be arrayOf and shapeOf should be shape
  // items: PropTypes.array(PropTypes.shapeOf({
  items: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    isSelected: PropTypes.bool,
  })),
};

WrappedListComponent.defaultProps = {
  // Problem-7: Items can't be null. Because map function can't work in null array
  // items: null,
  items: [
    {
      text: "Test-1",
      isSelected: false,
    },
    {
      text: "Test-2",
      isSelected: true,
    },
    {
      text: "Test-3",
      isSelected: false,
    },
    {
      text: "Test-4",
      isSelected: true,
    }
  ],
};

const List = memo(WrappedListComponent);

export default List;
