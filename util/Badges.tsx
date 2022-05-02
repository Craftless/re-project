import star_athelete from "../assets/badges/images/star_athelete.svg";
import fire from "../assets/badges/images/fire.svg";
import { SvgProps } from "react-native-svg";

const badges: any = {
  star_athelete: star_athelete,
  fire: fire,
}

function Badge({badgeId, width, height}: {badgeId: any, width: number, height: number}) {
  const BadgeIcon: React.FC<SvgProps> = badges[badgeId];
  return <BadgeIcon width={width} height={height} />
}

export default Badge;