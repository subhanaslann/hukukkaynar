import {
  Scale,
  Heart,
  Briefcase,
  Building2,
  Landmark,
  Home,
  Laptop,
  DollarSign,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  ChevronDown,
  Check,
  AlertCircle,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Gavel,
  FileText,
  Globe,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  Shield,
  Calendar,
  MessageCircle,
  Languages,
  type LucideIcon
} from 'lucide-react';

export const Icons = {
  // Practice Areas
  scale: Scale,
  heart: Heart,
  briefcase: Briefcase,
  building: Building2,
  landmark: Landmark,
  home: Home,
  laptop: Laptop,
  dollar: DollarSign,
  gavel: Gavel,
  fileText: FileText,
  globe: Globe,
  shield: Shield,
  calendar: Calendar,

  // Contact
  phone: Phone,
  mail: Mail,
  mapPin: MapPin,
  whatsapp: MessageCircle,

  // UI
  menu: Menu,
  close: X,
  chevronDown: ChevronDown,
  check: Check,
  alert: AlertCircle,
  alertCircle: AlertCircle,
  send: Send,
  arrowRight: ArrowRight,
  arrowLeft: ArrowLeft,
  helpCircle: HelpCircle,
  languages: Languages,

  // Social
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin
} as const;

export type IconName = keyof typeof Icons;

interface IconProps extends React.HTMLAttributes<SVGElement> {
  name: IconName;
  className?: string;
}

export function Icon({ name, className, ...props }: IconProps) {
  const LucideIcon = Icons[name];
  return <LucideIcon className={className} {...props} />;
}
