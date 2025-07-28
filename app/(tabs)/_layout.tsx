import CustomTabs from '@/components/shared/CustomTabs';
import { Screen } from '@/components/shared/Screen';
import React from 'react';

export default function TabLayout() {
  return (
    <Screen withSafeArea={false} withScrollView={false}>
      <CustomTabs />
    </Screen>
  );
}