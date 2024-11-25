import { FaSquareXTwitter, FaSquareFacebook, FaSquareInstagram, FaDongSign } from 'react-icons/fa6';
import { RiGlobalLine } from 'react-icons/ri';
import Privacy from './Privacy';

const IconsRegistry = {
  Facebook: FaSquareFacebook,
  X: FaSquareXTwitter,
  Instagram: FaSquareInstagram,
  Global: RiGlobalLine,
  Vnd: FaDongSign,
  Privacy,
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
