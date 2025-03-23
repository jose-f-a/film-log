import { drizzle } from "drizzle-orm/expo-sqlite";
import { Stack } from "expo-router";
import { openDatabaseSync, SQLiteProvider } from "expo-sqlite";
import { Suspense, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import migrations from '@/drizzle/migrations';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { addDummyData } from '@/db/addDummyData';

export const DATABASENAME = process.env.DATABASENAME as string;

export default function RootLayout() {
  const expoDB = openDatabaseSync(DATABASENAME);
  const db = drizzle(expoDB);
  const { success, error } = useMigrations(db, migrations);

  useEffect(() => {
    if (success) {
      addDummyData(db);
    }
  })

  return (
    <Suspense fallback={<ActivityIndicator size="large" />}>
      <SQLiteProvider
        databaseName={DATABASENAME}
        options={{ enableChangeListener: true }}
        useSuspense>
        <Stack>
          <Stack.Screen name="index" options={{ title: "Home" }} />
        </Stack>
      </SQLiteProvider>
    </Suspense>
  );
}
