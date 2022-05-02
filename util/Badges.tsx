// import Star_athlete from "../assets/badges/svg/star_athlete.svg";
import fire from "../assets/badges/svg/fire.svg";
import award from "../assets/badges/svg/award.svg";
import { SvgProps } from "react-native-svg";
// // import { Asset, useAssets } from "expo-asset";

// // Asset.loadAsync(require("./assets/images/[yoursvgfile].svg"));

const badgesSvg: any = {
  award: award,
  // star_athlete: Star_athlete,
  fire: fire,
};

// // const badgesImage: any = {};
// // const assets = Asset.loadAsync([require("../assets/badges/svg/star_athelete.svg"), require("../assets/badges/svg/fire.svg")]);

function Badge({
  badgeId,
  width = 20,
  height = 20,
}: {
  badgeId?: any;
  width?: number;
  height?: number;
}) {
  // const assets: [Asset[] | undefined, Error | undefined] = useAssets([]);
  // if (badgesSvg[badgeId]) {
  const BadgeIcon: React.FC<SvgProps> = badgesSvg[badgeId];
  // console.log("EUSAHFOIAS");
  return <BadgeIcon width={width} height={height} />;
  // }
  // return <Fire width={width} height={height} />;
}

export default Badge;
