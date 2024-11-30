import {
  FaSquareXTwitter,
  FaSquareFacebook,
  FaSquareInstagram,
  FaDongSign,
  FaStar,
  FaHeart,
  FaBars,
  FaXmark,
} from 'react-icons/fa6';
import { RiGlobalLine, RiSearchLine } from 'react-icons/ri';
import { TbAdjustmentsHorizontal } from 'react-icons/tb';
import { IoPersonCircle } from 'react-icons/io5';
import { RxMinusCircled, RxPlusCircled } from 'react-icons/rx';
import Privacy from './Privacy';
import Airbnb from './Airbnb';

const IconsRegistry = {
  Facebook: FaSquareFacebook,
  X: FaSquareXTwitter,
  Instagram: FaSquareInstagram,
  Global: RiGlobalLine,
  Vnd: FaDongSign,
  Privacy,
  Star: FaStar,
  Heart: FaHeart,
  Adjust: TbAdjustmentsHorizontal,
  Bars: FaBars,
  Airbnb,
  Search: RiSearchLine,
  Person: IoPersonCircle,
  Plus: RxPlusCircled,
  Minus: RxMinusCircled,
  Xmark: FaXmark,
} as const;

export type IconName = keyof typeof IconsRegistry;

interface IconProps {
  name: IconName;
  className?: string;
}
const Icon = ({ name, ...props }: IconProps) => {
  const isValidIcon = (name: string): name is IconName => name in IconsRegistry;

  if (!isValidIcon(name)) return null;
  const IconComponent = IconsRegistry[name];
  return <IconComponent {...props} />;
};

export default Icon;
