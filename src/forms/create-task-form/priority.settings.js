import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";

const priorityList = [
  {
    icon: <AiOutlineArrowUp />,
    color: "#f5222d",
    type: "High",
    value: 1,
  },
  {
    icon: <AiOutlineArrowUp />,
    color: "#ffa940",
    type: "Medium",
    value: 2,
  },
  {
    icon: <AiOutlineArrowUp />,
    color: "#237804",
    type: "Low",
    value: 3,
  },
  {
    icon: <AiOutlineArrowUp />,
    color: "#73d13d",
    type: "Lowest",
    value: 4,
  },
];

export { priorityList };

export const renderPriority = (taskPriority) => {
  return priorityList.map((each) => {
    if (each.type === taskPriority) {
      if (each.type === "High" || each.type === "Medium") {
        return (
          <>
            <AiOutlineArrowUp
              key={each.type}
              style={{ color: each.color, fontSize: "25px" }}
            />
            {each.type}
          </>
        );
      } else {
        return (
          <>
            <AiOutlineArrowDown
              key={each.type}
              style={{ color: each.color, fontSize: "25px" }}
            />
            {each.type}
          </>
        );
      }
    }
  });
};
