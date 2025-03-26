import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { Suspense } from "react";
import { ActivityIndicator } from "react-native";
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '@/drizzle/migrations';
import {db, DATABASENAME} from '@/db/db';
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';

// import { addDummyData } from '@/db/addDummyData';

export default function RootLayout() {
  const { success, error } = useMigrations(db, migrations);
  useDrizzleStudio(db);

  // useEffect(() => {
  //   if (success) {
  //     addDummyData(db);
  //   }
  // }, [success]);

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
