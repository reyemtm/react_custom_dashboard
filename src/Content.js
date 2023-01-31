import { useState } from "react";
import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
import { withSize } from "react-sizeme";
import TopBar from "./TopBar";
import Widget from "./Widget";
import { Widgets } from "./Widgets";
// const originalItems = [
//   {
//     id: "a",
//   },
//   {
//     id: "b",
//   },
//   {
//     id: "c",
//   },
//   {
//     id: "d",
//   },
// ];

const initialLayouts = {
  lg: [
    { i: "a", x: 0, y: 0, w: 1, h: 4 },
    { i: "b", x: 1, y: 0, w: 3, h: 4 },
    { i: "c", x: 4, y: 0, w: 1, h: 4 },
    { i: "d", x: 0, y: 4, w: 2, h: 4 },
  ],
};
function Content({ size: { width } }) {
  const [items, setItems] = useState(Widgets);
  const [layouts, setLayouts] = useState(
    getFromLS("layouts") || initialLayouts
  );
  const onLayoutChange = (_, allLayouts) => {
    setLayouts(allLayouts);
  };
  const onLayoutSave = () => {
    saveToLS("layouts", layouts);
  };
  const onRemoveItem = (itemId) => {
    setItems(items.filter((i) => i.id !== itemId));
  };
  const onAddItem = (itemId) => {
    setItems([...items, { id: itemId }]);
  };

  return (
    <>
      <TopBar
        onLayoutSave={onLayoutSave}
        items={items.reduce((i, v) => [...i, v.id], [])}
        onRemoveItem={onRemoveItem}
        onAddItem={onAddItem}
        originalItems={Widgets.reduce((i, v) => [...i, v.id], [])}
      />
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={100}
        width={width}
        onLayoutChange={onLayoutChange}
      >
        {items.map(({ id, widget }) => (
          <div
            key={id}
            className="widget"
            data-grid={{ w: 3, h: 2, x: 0, y: Infinity }}
          >
            <Widget
              id={id}
              onRemoveItem={onRemoveItem}
              backgroundColor="#867ae9"
            >{widget}</Widget>
          </div>
        ))}
      </ResponsiveGridLayout>
    </>
  );
}

export default withSize({ refreshMode: "debounce", refreshRate: 60 })(Content);

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
    } catch (e) {}
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "rgl-8",
      JSON.stringify({
        [key]: value,
      })
    );
  }
}
