import { Text, View } from "react-native";
import { FilmSession }  from "@/db/schema";
import { useEffect, useState } from "react";
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import { getActiveSessions } from "@/db/db";

export default function Index() {
  const [session, setSession] = useState<FilmSession[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await getActiveSessions(true);
        console.log(data);
        setSession(data);
      } catch (error) {
        console.error(error);
      }
    }
    load();
  }, [])
  

  return (
    <View>
      {session.map((s) => {
        return <Text key={s.uidFilmSession}>{s.uidFilmSession} - {s.active.toString()} </Text>;
      })}
    </View>
  );
}
