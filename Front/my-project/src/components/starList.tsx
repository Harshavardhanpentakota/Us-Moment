import Star from "./star";
const StarList = ({ count }: { count: number }) => {
  return (
    <div>
      <ul className="flex gap-2">
        <li>
          <Star match={count >= 1} />
        </li>
        <li>
          <Star match={count >= 2} />
        </li>
        <li>
          <Star match={count >= 3} />
        </li>
        <li>
          <Star match={count >= 4} />
        </li>
        <li>
          <Star match={count >= 5} />
        </li>
      </ul>
    </div>
  );
};

export default StarList;
