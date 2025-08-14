import React, { useState } from 'react';

interface FilterItem {
  id: number;
  title: string;
}

interface FilterAccordionProps {
  title: string;
  items: FilterItem[];
  filterKey: string;
  selectedItems: (number | string)[];
  onChange: (filterKey: string, selectedIds: (number | string)[]) => void;
}

const FilterAccordion: React.FC<FilterAccordionProps> = ({
  title,
  items,
  filterKey,
  selectedItems,
  onChange,
}) => {
  const [showAll, setShowAll] = useState(false);
  const visibleItems = showAll ? items : items.slice(0, 8);

  const useTitleAsKey = filterKey === 'complaints' || filterKey === 'effects';

const handleCheckboxChange = (value: number | string) => {
  let newSelectedItems: (number | string)[];

  if (filterKey === 'categories') {
    if (selectedItems.includes(value)) {
      newSelectedItems = [];
    } else {
      newSelectedItems = [value];
    }
  } else {
    newSelectedItems = selectedItems.includes(value)
      ? selectedItems.filter(item => item !== value)
      : [...selectedItems, value];
  }

  onChange(filterKey, newSelectedItems);
};


  return (
    <div className="accordion-item">
      <button
        className="accordion-button f-w-SB clr-black"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target={`#${filterKey}`}
        aria-expanded="true"
        aria-controls={filterKey}
      >
        {title}
      </button>
      <div id={filterKey} className="accordion-collapse collapse show">
        <div className="accordion-body">
          <ul className="list-unstyled">
            {visibleItems.map(item => {
              const value = useTitleAsKey ? item.title : item.id;
              return (
                <li className="flr-checkItem mb__15" key={value}>
                  <label className="ctm-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(value)}
                      onChange={() => handleCheckboxChange(value)}
                    />
                    <span className="checkbox"></span>
                    <span className="checkboxTxt clr-black f-size-14">{item.title}</span>
                  </label>
                </li>
              );
            })}
          </ul>
          {items.length > 8 && (
            <button className="btn btn-link p-0 clr-green" onClick={() => setShowAll(!showAll)}>
              {showAll ? 'Show Less' : 'Show More'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterAccordion;
