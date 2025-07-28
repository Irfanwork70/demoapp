import { useCustomTabsStyles } from "@/styles/customTabsStyles";
import { TabList, TabSlot, TabTrigger, Tabs } from "expo-router/ui";
import React from "react";
import CustomTabTrigger from "./CustomTabTrigger";

const CustomTabs: React.FC = () => {
  const tabsStyles = useCustomTabsStyles();

  return (
    <Tabs style={tabsStyles.tabs}>
      <TabSlot />
      <TabList style={tabsStyles.tabList}>
        <TabTrigger name="home" href="/" asChild>
          <CustomTabTrigger
            icon="home"
            label="home"
          />
        </TabTrigger>
        <TabTrigger name="products" href="/products" asChild>
          <CustomTabTrigger
            icon="cart-sharp"
            label="products"
          />
        </TabTrigger>
        <TabTrigger name="settings" href="/settings" asChild>
          <CustomTabTrigger
            icon="settings"
            label="settings"
          />
        </TabTrigger>
      </TabList>
    </Tabs>
  );
};

export default CustomTabs;