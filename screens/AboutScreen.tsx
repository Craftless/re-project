import { ScrollView, View } from "react-native";
import { useTheme } from "react-native-paper";
import AppText from "../components/ui/AppText";

function AboutScreen() {
  const theme = useTheme();
  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: "center",
        flex: 1,
        margin: 8,
        padding: 8,
      }}
    >
      <AppText style={{textAlign: "center"}}>
        This application was made as the research product of a Research
        Education project.
      </AppText>
      <View style={{ padding: 8, margin: 8, borderColor: theme.colors.placeholder, borderWidth: 1 }}>
        <AppText>
          Programmer and Main Designer: Javier{"\n"}Badge Designer: Jonathan
          {"\n"}Home Screen Designer: Mattheaus
        </AppText>
      </View>
    </ScrollView>
  );
}

export default AboutScreen;
