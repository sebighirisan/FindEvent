import { ErrorResponse } from "@/model/error.model";
import { useFetchEventTypesQuery } from "@/store/features/events/event-api";
import { getColorByEventType, getIconByEventType } from "@/utils/color.util";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "../styles/UITheme";

interface GroupedData {
  title: string;
  data: string[];
}

interface GroupedSelectProps {
  onChangeCategory: (newCategory: string) => void;
}

export default function GroupedSelect({ onChangeCategory }: GroupedSelectProps) {
  const { data, isLoading, error } = useFetchEventTypesQuery();

  const [groupedData, setGroupedData] = useState<GroupedData[]>();
  const [categoryTypeRecord, setCategoryTypeRecord] =
    useState<Record<string, string>>();

  const [errorMessage, setErrorMessage] = useState<string>();

  const [selected, setSelected] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (error && "data" in error) {
      const errorResponse = JSON.parse(error.data as string) as ErrorResponse;

      setErrorMessage(errorResponse.message);
    }
  }, [error]);

  useEffect(() => {
    if (!data) return;

    // Build grouped data and categoryTypeMap in one pass
    const { groupedCategories, categoryTypeMap } = data.reduce(
      (acc, eventCategory) => {
        const categories: string[] = [];

        for (const eventCategoryType of eventCategory.types) {
          categories.push(eventCategoryType.name);

          acc.categoryTypeMap[eventCategoryType.name] = eventCategoryType.value;
        }

        acc.groupedCategories.push({
          title: eventCategory.category,
          data: categories,
        });

        return acc;
      },
      {
        groupedCategories: [] as GroupedData[],
        categoryTypeMap: {} as Record<string, string>,
      }
    );

    setCategoryTypeRecord(categoryTypeMap);
    setGroupedData(groupedCategories);
  }, [data]);

  const onChooseCategory = (item: string) => {
    onChangeCategory(item);

    setSelected(categoryTypeRecord?.[item] ?? "");
    setOpen(false);
  };

  return (
    <View style={styles.input}>
      <TouchableOpacity onPress={() => setOpen(true)}>
        <Text style={styles.inputLabel}>{"Select an option"}</Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Music Festival"
        placeholderTextColor="#94a3b8"
        style={styles.inputDark}
        value={selected}
        autoCapitalize="words"
        editable={false}
        autoCorrect={false}
        clearButtonMode="while-editing"
      />

      <Modal visible={open} transparent animationType="slide">
        <View style={localStyles.modalOverlay}>
          <View style={localStyles.modalContent}>
            {isLoading && <ActivityIndicator color="#fff" />}

            {groupedData && categoryTypeRecord && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <View
                  style={{
                    backgroundColor: "#182333",
                    margin: 20,
                    borderRadius: 8,
                  }}
                >
                  <SectionList
                    sections={groupedData}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => (
                      <TouchableOpacity onPress={() => onChooseCategory(item)}>
                        <View
                          style={{
                            padding: 10,
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Ionicons
                            name="chevron-forward"
                            size={16}
                            color="#fff"
                          />
                          <Text
                            style={{
                              color: "#fff",
                              fontWeight: "bold",
                              marginStart: 5,
                            }}
                          >
                            {categoryTypeRecord[item]}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )}
                    renderSectionHeader={({ section: { title } }) => (
                      <View style={localStyles.typeContainer}>
                        <Ionicons
                          name={getIconByEventType(title)}
                          size={20}
                          color={getColorByEventType(title)}
                        />
                        <Text
                          style={{
                            ...localStyles.type,
                            color: getColorByEventType(title),
                          }}
                        >
                          {title}
                        </Text>
                      </View>
                    )}
                  />
                </View>
              </ScrollView>
            )}

            {!!errorMessage && (
              <View>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const localStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    maxHeight: "70%",
    backgroundColor: "#182333",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#fff",
  },

  typeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  type: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#999",
    fontStyle: "italic",
    marginStart: 5,
  },
});
