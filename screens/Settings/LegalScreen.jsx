import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { A } from "@expo/html-elements";
import { ChevronRightIcon } from "react-native-heroicons/solid";
import TabLayout from "../../components/TabLayout";

const LegalScreen = ({ navigation: { navigate, goBack } }) => {
  const tabConfig = { title: "Legal", headerTitle: "Legal" };

  const contactData = [
    {
      title: "Privacy Policy",
      link: "https://proxze.netlify.app/privacy-policy",
      id: "0",
    },
    {
      title: "Terms of Use",
      link: "https://proxze.netlify.app/privacy-policy",
      id: "1",
    },
  ];

  return (
    <TabLayout config={tabConfig}>
      <FlatList
        data={contactData}
        ListHeaderComponent={() => (
          <View className="mb-3 mx-5">
            <View className="mb-7">
              <Text className="text-white text-3xl font-bold">
                {tabConfig.title}
              </Text>
            </View>
          </View>
        )}
        contentContainerStyle={{
          paddingTop: 4,
        }}
        renderItem={({ item, index }) => (
          <A href={item.link}>
            <TouchableOpacity className="mx-5 w-screen bg-neutral-800 p-3 px-5 flex-row justify-between items-center rounded-lg">
              <Text className="text-white font-semibold text-xl">
                {item.title}
              </Text>
              <ChevronRightIcon color="#888" size={17} />
            </TouchableOpacity>
          </A>
        )}
        ItemSeparatorComponent={() => <View className="h-5"></View>}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
      />
    </TabLayout>
  );
};

export default LegalScreen;
