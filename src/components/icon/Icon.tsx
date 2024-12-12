import {
  BookOpen,
  BriefcaseBusiness,
  GraduationCap,
  HandPlatter,
  Heart,
  Languages,
  Music,
  PawPrint,
  Sparkles,
  Star,
  Utensils,
  Check,
  Flag,
  LogOut,
  ShieldCheck,
  Dot,
  Eye,
  EyeOff,
  Phone,
  Upload,
  Calendar,
  Mail,
  PencilLine,
  Plus,
  Minus,
  Globe,
  Menu,
  X,
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  LockKeyhole,
  Shield,
  CreditCard,
  BadgeCheck,
  Settings,
} from 'lucide-react';
import type { LucideProps } from 'lucide-react';

const IconsRegistry = {
  BookOpen,
  BriefcaseBusiness,
  GraduationCap,
  HandPlatter,
  Heart,
  Languages,
  Music,
  PawPrint,
  Sparkles,
  Star,
  Utensils,
  Check,
  Flag,
  LogOut,
  ShieldCheck,
  Dot,
  Eye,
  EyeOff,
  Phone,
  Upload,
  Calendar,
  Mail,
  PencilLine,
  Plus,
  Minus,
  Globe,
  Menu,
  X,
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  LockKeyhole,
  Shield,
  CreditCard,
  BadgeCheck,
  Settings,
} as const;

export type IconName = keyof typeof IconsRegistry;
interface IconProps extends LucideProps {
  name: IconName;
}
const Icon = ({ name, ...props }: IconProps) => {
  const LucideIcon = IconsRegistry[name];

  return <LucideIcon {...props} />;
};

export default Icon;
