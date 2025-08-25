import { Event } from "@/model/event.model";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Alert,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View
} from "react-native";
import style from "./styles/UITheme";

const History = () => {
  const [items, setItems] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const list: Event[] = [];

    // Optional: newest first
    list.sort((a, b) => {
      const ta = a.startDate ? new Date(a.startDate).getTime() : 0;
      const tb = b.startDate ? new Date(b.startDate).getTime() : 0;
      return tb - ta;
    });
    setItems(list);
    setLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }, [load]);

  const openEvent = (ev: Event) => {
    router.push({
      pathname: "/EventPage",
      // params: {
      //   id: ev.id,
      //   title: ev.title,
      //   location: ev.location,
      //   category: ev.category,
      //   startAt: ev.startAt,
      //   price: ev.price,
      //   description: ev.description,
      // },
    });
  };

  const confirmRemove = (ev: Event) => {
    Alert.alert("Remove", `Remove "${ev.name}" from History?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: async () => {
          // Remove event from history
          load();
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={style.rootDark}>
      {/* Fixed header */}
      <View style={style.fixedHeaderWrap}>
        <View
          style={[
            style.headerDark,
            { paddingHorizontal: 16, alignItems: "center" },
          ]}
        >
          <Text style={style.titleDark}>History</Text>
          <Text style={{ color: "#9CA3AF", marginTop: 4 }}>
            {loading ? "Loading…" : `${items.length} joined`}
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[
          style.listWrap,
          { paddingTop: 16, paddingBottom: 32 },
        ]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#fff"
          />
        }
      >
        {loading ? (
          <Text
            style={{ color: "#9CA3AF", textAlign: "center", marginTop: 16 }}
          >
            Loading…
          </Text>
        ) : items.length === 0 ? (
          <View style={style.emptyWrap}>
            <Text style={style.emptyText}>No joined events yet.</Text>
            <Text
              style={[
                style.eventSubtitle,
                { marginTop: 6, textAlign: "center" },
              ]}
            >
              Tap “Join Event” on an event — it will show up here.
            </Text>
          </View>
        ) : (
          // items.map((ev) => {
          //   const niceDate = ev.startAt
          //     ? new Date(ev.startAt).toLocaleString()
          //     : undefined;
          //   const joinedWhen = ev.joinedAt
          //     ? new Date(ev.joinedAt).toLocaleString()
          //     : undefined;

          //   return (
          //     <View key={ev.id} style={style.eventCard}>
          //       <TouchableOpacity
          //         activeOpacity={0.85}
          //         onPress={() => openEvent(ev)}
          //       >
          //         <Text style={style.eventTitle} numberOfLines={1}>
          //           {ev.title}
          //         </Text>
          //         {!!ev.location && (
          //           <Text style={style.eventSubtitle} numberOfLines={1}>
          //             {ev.location}
          //           </Text>
          //         )}
          //       </TouchableOpacity>

          //       {/* Chips */}
          //       <View style={[style.eventChipsRow, { marginTop: 10 }]}>
          //         {!!ev.category && (
          //           <View style={style.eventChip}>
          //             <Text style={style.eventChipText}>{ev.category}</Text>
          //           </View>
          //         )}
          //         {!!niceDate && (
          //           <View style={style.eventChip}>
          //             <Text style={style.eventChipText}>{niceDate}</Text>
          //           </View>
          //         )}
          //         {!!ev.price && (
          //           <View style={style.eventChip}>
          //             <Text style={style.eventChipText}>{ev.price}</Text>
          //           </View>
          //         )}
          //         {!!joinedWhen && (
          //           <View style={style.eventChipMuted}>
          //             <Text style={style.eventChipMutedText}>
          //               Joined {joinedWhen}
          //             </Text>
          //           </View>
          //         )}
          //       </View>

          //       {/* Actions */}
          //       <View style={{ flexDirection: "row", gap: 10, marginTop: 12 }}>
          //         <TouchableOpacity
          //           activeOpacity={0.85}
          //           style={style.eventPrimaryBtn}
          //           onPress={() => openEvent(ev)}
          //         >
          //           <Text style={style.eventPrimaryBtnText}>Open</Text>
          //         </TouchableOpacity>

          //         <TouchableOpacity
          //           activeOpacity={0.85}
          //           style={style.eventSecondaryBtn}
          //           onPress={() => confirmRemove(ev)}
          //         >
          //           <Text style={style.eventSecondaryBtnText}>Remove</Text>
          //         </TouchableOpacity>
          //       </View>
          //     </View>
          //   );
          // })
          <></>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default History;
