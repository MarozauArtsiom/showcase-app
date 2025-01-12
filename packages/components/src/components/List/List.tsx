import "./List.scss";

export interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
}

const List = <T,>({ items, renderItem, className = "" }: ListProps<T>) => {
  return (
    <ul className={`cc-list ${className}`}>
      {items.map((item, index) => (
        <li key={index} className="cc-list__item">
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  );
};

export default List;
