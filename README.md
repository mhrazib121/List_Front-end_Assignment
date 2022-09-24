### `Question - 1: Explain what the simple List component does.`

Answare:
List component is used to store all items. Bassically items is an array of object. In this component memo method are used. List items are memorized by memo(WrappedListComponent).
In WrappedListComponent, map function is used for getting single item and single item are passed to SingleListItem with key, onClickHandler functiona and
index. In SingleListItem onClick event are used to call onClickHandeler function sothat it can select or not. 
If item is selected then background color of list will green and if not selected then bckground color will be red.


### `Question -2-What problems / warnings are there with code?`


### Problem 1 Syntax mistake

const [setSelectedIndex, selectedIndex] = useState();

### Problem 2- onClickHandler are called directly. It should call with a callback function
onClick={onClickHandler(index)}

### Problem 3- Each child in a list should have a unique "key" prop.

<ul style={{ textAlign: "left" }}> 
            {items.map((item, index) => (
                <SingleListItem
                    onClickHandler={() => handleClick(index)}
                    text={item.text}
                    index={index}
                    isSelected={selectedIndex}
                    key={index}
                    />
        ))}
</ul>

### Problem 4-: PropTypes was wrrong. array should be arrayOf and shapeOf should be shape.

WrappedListComponent.propTypes = {
  items: PropTypes.array(PropTypes.shapeOf({
    text: PropTypes.string.isRequired,
  })),
};

### Problem 5: items was declere as null. So map Cannot read properties of null

WrappedListComponent.defaultProps = {
  items: null,
};




======================================================

### Question 3: Please fix, optimize, and/or modify the component as much as you think is necessary.

```sh

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

  const [newItems, setNewItems,] = useState([]);

  useEffect(() => {
    setNewItems(items);
  }, [items]);

  const handleClick = (index) => {
    let newArray = [...newItems];
    newArray[index].isSelected = !newArray[index].isSelected
    setNewItems(newArray);
  };

  return (
    <ul style={{ textAlign: 'left' }}>
      {newItems.map((item, index) => (
        <SingleListItem
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

  items: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    isSelected: PropTypes.bool,
  })),
};

WrappedListComponent.defaultProps = {
    
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

```
