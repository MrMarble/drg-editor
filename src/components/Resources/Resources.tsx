import {
  CATEGORIES,
  EXPANDED_RESOURCE_NAMES,
  ITEMS,
  RESOURCES,
} from "../../constant/resources";
import ResourceInput from "./ResourceInput";

export const Resources = () => {
  return (
    <div className="w-full">
      {Object.entries(CATEGORIES).map(([category, items]) => {
        return (
          <div className="not-first:mt-10" key={category}>
            <span className="border-b-2 border-drg-primary-500 capitalize">
              {category}
            </span>
            <div className="mt-3 md:w-auto grid grid-cols grid-rows-1 gap-2 md:grid-cols-2 lg:grid-cols-2 lg:gap-x-10 xl:grid-cols-3">
              {items.map((item: ITEMS) => (
                <ResourceInput
                  key={item}
                  item={item}
                  name={EXPANDED_RESOURCE_NAMES[item] ?? item}
                  uuid={RESOURCES[item]}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Resources;
