import { FC, ReactNode, MouseEvent } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/react";
import "./List.scss";

/**
 * Describes an individual action for a list option.
 * The `icon` could be a React element (e.g., <svg> or <IconComponent />).
 * The `onClick` handler receives the associated option so that the action
 * can reference its `id` or `name`.
 */
export interface OptionAction {
  icon: ReactNode;
  onClick: (option: Option) => void;
}

export interface Option {
  id: number | string;
  name: string;
  /**
   * Zero or more actions to display at the end of this option line.
   * Clicking an action does NOT close the list or change selection.
   */
  actions?: OptionAction[];
}

export interface ListProps {
  /**
   * The currently selected option (controlled).
   * If null or undefined, the placeholder is shown.
   */
  value?: Option | null;
  /**
   * Callback invoked when the user selects a new option.
   * Receives the selected option { id, name, actions }.
   */
  onChange: (option: Option) => void;
  /** Array of items to display in the dropdown (each { id, name, actions }) */
  options: Option[];
  /** Optional placeholder text if value is null/undefined */
  placeholder?: string;
}

const List: FC<ListProps> = ({
  value,
  onChange,
  options,
  placeholder = "Select an option...",
}) => {
  // Click handler for an action icon. Prevents option selection.
  const handleActionClick = (
    e: MouseEvent<HTMLButtonElement>,
    actionOnClick: (option: Option) => void,
    option: Option
  ) => {
    e.stopPropagation(); // Prevent closing or selecting the option
    actionOnClick(option);
  };

  return (
    <div className="cc-list-wrapper">
      <Listbox value={value} onChange={onChange}>
        <ListboxButton className="cc-list-btn">
          {value ? value.name : placeholder}
        </ListboxButton>

        <ListboxOptions anchor="bottom" className="cc-list-options">
          {options.map((option) => (
            <ListboxOption
              key={option.id}
              value={option}
              className="cc-list-option"
            >
              <div className="cc-list-option__content">
                <span className="cc-list-option__name">{option.name}</span>

                {option.actions?.length ? (
                  <div className="cc-list-option__actions">
                    {option.actions.map((action, index) => (
                      <button
                        key={index}
                        type="button"
                        className="cc-list-option__action-btn"
                        onClick={(e) =>
                          handleActionClick(e, action.onClick, option)
                        }
                      >
                        {action.icon}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
};

export default List;
