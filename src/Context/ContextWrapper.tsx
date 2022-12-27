import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { TabBarVisibilityProvider } from "./BottomTabBarVisibility";
import { ToastProvider } from "./Toast";

const ContextWrapper: FC = ({ children }) => {
  return (
    <ToastProvider>
        <TabBarVisibilityProvider>{children}</TabBarVisibilityProvider>
    </ToastProvider>
  );
};

export default ContextWrapper;

const styles = StyleSheet.create({});
