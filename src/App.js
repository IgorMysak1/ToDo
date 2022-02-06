import React from "react";
import { Header } from "./components/Header";
import { CategoryList } from "./components/CategoryList";
import { AppProvider } from "./AppProvider";

export const App = () => {
  return (
    <AppProvider>
      <div className="_container">
        <Header />
        <CategoryList />
      </div>
    </AppProvider>
  );
};
