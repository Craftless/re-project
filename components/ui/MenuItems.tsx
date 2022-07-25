import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MoreStackParamList } from "../../screens/MoreStack";
import MenuItem from "./MenuItem";

function MenuItems({
  list,
  navigationProp,
}: {
  list: {
    label: string;
    nav: string;
  }[];
  navigationProp: NativeStackNavigationProp<MoreStackParamList, "Default">;
}) {
  return (
    <>
      {list.map((val) => {
        return (
          <MenuItem
            label={val.label}
            onPress={() => {
              navigationProp.navigate(val.nav as any);
            }}
            key={val.label}
          />
        );
      })}
    </>
  );
}

export default MenuItems;
