import { createSignal, type JSX } from "solid-js";
import {
  GridPositionProvider,
  gridHandler,
  horizontalHandler,
  verticalHandler,
  spatialHandler,
  itemHandler,
} from "@fiveway/core";
import {
  NavigationContainer,
  NavigationItem,
  createNavigationContainer,
  createNavigationItem,
} from "@fiveway/solid";
import css from "./Showcase.module.css";

export function Showcase() {
  const nav = createNavigationContainer({
    id: "showcase",
    handler: gridHandler,
  });

  return (
    <div class={css.page}>
      <h1>fiveway: Solid example</h1>

      <div class={css.layout}>
        <nav.Context>
          <NavigationContainer id="verticalList">
            {(node) => {
              node.provide(GridPositionProvider, () => ({ row: 1, col: 1 }));
              return <ListShowcase type="vertical" />;
            }}
          </NavigationContainer>

          <NavigationContainer id="horizontalList">
            {(node) => {
              node.provide(GridPositionProvider, () => ({ row: 1, col: 2 }));
              return <ListShowcase type="horizontal" />;
            }}
          </NavigationContainer>

          <NavigationContainer id="spatial">
            {(node) => {
              node.provide(GridPositionProvider, () => ({ row: 1, col: 3 }));
              return <SpatialShowcase />;
            }}
          </NavigationContainer>
        </nav.Context>
      </div>
    </div>
  );
}

function ListShowcase(props: { type: "vertical" | "horizontal" }) {
  const nav = createNavigationContainer({
    id: "list",
    handler: props.type === "vertical" ? verticalHandler : horizontalHandler,
  });

  return (
    <div class={css.section} data-is-focused={nav.isFocused()}>
      <ul class={css.list} data-type={props.type}>
        <nav.Context>
          <NavigationItem id="item1">
            {(node) => (
              <li class={css.item} data-is-focused={node.isFocused()}>
                Item 1
              </li>
            )}
          </NavigationItem>
          <NavigationItem id="item2">
            {(node) => (
              <li class={css.item} data-is-focused={node.isFocused()}>
                Item 2
              </li>
            )}
          </NavigationItem>
          <NavigationItem id="item3">
            {(node) => (
              <li class={css.item} data-is-focused={node.isFocused()}>
                Item 3
              </li>
            )}
          </NavigationItem>
        </nav.Context>
      </ul>
    </div>
  );
}

function SpatialShowcase() {
  const [isFocusable, setFocusable] = createSignal(true);
  const nav = createNavigationContainer({
    id: "spatial",
    handler: spatialHandler,
  });

  return (
    <div
      class={css.section}
      data-is-focused={nav.isFocused()}
      style={{ position: "relative", "min-height": "250px" }}
    >
      <nav.Context>
        <NavigationItem id="toggle" onSelect={() => setFocusable((on) => !on)}>
          {(node) => (
            <li
              class={css.item}
              ref={node.registerElement}
              data-is-focused={node.isFocused()}
            >
              toggle spatial
            </li>
          )}
        </NavigationItem>
        <SpatialItem
          navId="item1"
          focusable={isFocusable()}
          style={{
            position: "absolute",
            left: "50px",
            top: "150px",
            color: isFocusable() ? "#000" : "#ccc",
          }}
        />
        <SpatialItem
          navId="item2"
          focusable={isFocusable()}
          style={{
            position: "absolute",
            left: "150px",
            top: "50px",
            color: isFocusable() ? "#000" : "#ccc",
          }}
        />
        <SpatialItem
          navId="item3"
          focusable={isFocusable()}
          style={{
            position: "absolute",
            left: "250px",
            top: "200px",
            color: isFocusable() ? "#000" : "#ccc",
          }}
        />
      </nav.Context>
    </div>
  );
}

function SpatialItem(props: {
  navId: string;
  focusable: boolean;
  style: JSX.CSSProperties;
}) {
  const nav = createNavigationItem({
    id: props.navId,
    handler: itemHandler.prepend((n, a, next) =>
      props.focusable ? next() : null
    ),
  });

  return (
    <div
      class={css.item}
      ref={nav.registerElement}
      data-is-focused={nav.isFocused()}
      style={props.style}
    >
      {props.navId}
    </div>
  );
}
