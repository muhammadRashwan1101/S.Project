import { Upload, X, Shield, LogIn, Check, MapPin, Navigation, Edit, AlertTriangle, Plus, Trash2, Users, Camera, Home, Monitor, Package, BookOpen, ChevronRight, Calendar, Pill, CheckSquare, Users as UsersGroup, AlertCircle, Clock, Brain, Heart, Activity, Phone, Clipboard, Handshake, Search, Lock, Play, Pause, Eye, EyeOff, RotateCcw, User, Map, Mail, Key, Sparkles, Radio, Sun, Moon, Globe } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const iconStyle = {
  filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1)) drop-shadow(0 2px 4px rgba(0,0,0,0.05))',
  transition: 'all 0.2s ease'
};

export const UploadIcon = () => <Upload size={28} style={iconStyle} strokeWidth={1.8} />;
export const XIcon = () => <X size={36} style={iconStyle} strokeWidth={1.8} />;
export const ShieldIcon = () => <Radio size={40} style={iconStyle} strokeWidth={1.8} />;
export const LogInIcon = () => <LogIn size={24} style={iconStyle} strokeWidth={1.8} />;
export const CheckIcon = () => <Check size={24} style={iconStyle} strokeWidth={3} />;
export const MapPinIcon = () => <MapPin size={28} style={iconStyle} strokeWidth={1.8} />;
export const NavigationIcon = () => <Navigation size={24} style={iconStyle} strokeWidth={1.8} />;
export const EditIcon = () => {
  const { theme } = useTheme();
  return <Edit size={24} style={iconStyle} strokeWidth={1.8} color={theme === 'dark' ? 'white' : 'black'} />;
};
export const AlertIcon = () => <AlertTriangle size={24} style={iconStyle} strokeWidth={1.8} />;
export const WarningIcon = () => <AlertTriangle size={48} style={iconStyle} strokeWidth={1.8} />;
export const PlusIcon = () => <Plus size={28} style={iconStyle} strokeWidth={1.8} />;
export const TrashIcon = () => <Trash2 size={20} style={iconStyle} strokeWidth={1.8} />;
export const UsersIcon = () => <Users size={24} style={iconStyle} strokeWidth={1.8} />;
export const CameraIcon = () => <Camera size={28} style={iconStyle} strokeWidth={1.8} />;
export const HomeIcon = () => <Home size={24} style={iconStyle} strokeWidth={1.8} />;
export const SubscriptionIcon = () => <Monitor size={24} style={iconStyle} strokeWidth={1.8} />;
export const ProductIcon = () => <Package size={24} style={iconStyle} strokeWidth={1.8} />;
export const CareGuideIcon = () => <BookOpen size={24} style={iconStyle} strokeWidth={1.8} />;
export const ChevronRightIcon = () => <ChevronRight size={24} style={iconStyle} strokeWidth={1.8} />;
export const CalendarIcon = () => <Calendar size={24} style={iconStyle} strokeWidth={1.8} />;
export const PillIcon = () => <Pill size={24} style={iconStyle} strokeWidth={1.8} />;
export const CheckSquareIcon = () => <CheckSquare size={24} style={iconStyle} strokeWidth={1.8} />;
export const UsersGroupIcon = () => <UsersGroup size={24} style={iconStyle} strokeWidth={1.8} />;
export const AlertCircleIcon = () => <AlertCircle size={24} style={iconStyle} strokeWidth={1.8} />;
export const ClockIcon = () => {
  const { theme } = useTheme();
  return <Clock size={24} style={iconStyle} strokeWidth={1.8} color={theme === 'dark' ? 'white' : undefined} />;
};
export const BrainIcon = () => <Brain size={24} style={iconStyle} strokeWidth={1.8} />;
export const HeartIcon = () => <Heart size={24} style={iconStyle} strokeWidth={1.8} />;
export const ActivityIcon = () => <Activity size={24} style={iconStyle} strokeWidth={1.8} />;
export const PhoneIcon = () => <Phone size={24} style={iconStyle} strokeWidth={1.8} />;
export const ClipboardIcon = () => <Clipboard size={24} style={iconStyle} strokeWidth={1.8} />;
export const HandshakeIcon = () => <Handshake size={24} style={iconStyle} strokeWidth={1.8} />;
export const SearchIcon = () => <Search size={24} style={iconStyle} strokeWidth={1.8} />;
export const LockIcon = () => <Lock size={24} style={iconStyle} strokeWidth={1.8} />;
export const PlayIcon = () => <Play size={24} style={iconStyle} strokeWidth={1.8} />;
export const PauseIcon = () => <Pause size={24} style={iconStyle} strokeWidth={1.8} />;
export const EyeIcon = () => <Eye size={24} style={iconStyle} strokeWidth={1.8} />;
export const EyeOffIcon = () => <EyeOff size={24} style={iconStyle} strokeWidth={1.8} />;
export const RotateCcwIcon = () => <RotateCcw size={24} style={iconStyle} strokeWidth={1.8} />;
export const UserIcon = () => <User size={24} style={iconStyle} strokeWidth={1.8} />;
export const MapIcon = () => <Map size={24} style={iconStyle} strokeWidth={1.8} />;
export const MailIcon = () => <Mail size={24} style={iconStyle} strokeWidth={1.8} />;
export const KeyIcon = () => <Key size={24} style={iconStyle} strokeWidth={1.8} />;
export const SparklesIcon = () => <Sparkles size={24} style={iconStyle} strokeWidth={1.8} />;
export const SunIcon = () => <Sun size={24} style={iconStyle} strokeWidth={1.8} />;
export const MoonIcon = () => <Moon size={24} style={iconStyle} strokeWidth={1.8} />;
export const GlobeIcon = () => <Globe size={20} style={iconStyle} strokeWidth={1.8} />;
