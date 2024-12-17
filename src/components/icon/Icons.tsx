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
import { type IconBaseProps } from 'react-icons';
import Privacy from './Privacy';
import Airbnb from './Airbnb';
import BlankAvatar from './BlankAvatar';
import { cn } from '@/lib/utils';

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
  BlankAvatar,
} as const;

export type IconName = keyof typeof IconsRegistry;

interface IconProps extends IconBaseProps {
  name: IconName;
  className?: string;
}
const Icon = ({ name, className, ...props }: IconProps): JSX.Element => {
  const IconComponent = IconsRegistry[name];
  return <IconComponent {...props} className={cn(className)} />;
};

export default Icon;
