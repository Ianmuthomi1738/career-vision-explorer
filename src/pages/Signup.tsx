import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/components/layout/Layout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Linkedin, Upload, Video, User, Camera, Phone, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import OnboardingWizard from "@/components/onboarding/OnboardingWizard";

const countryCodes = [
  { code: "+1", country: "United States", flag: "🇺🇸", iso: "US" },
  { code: "+1", country: "Canada", flag: "🇨🇦", iso: "CA" },
  { code: "+7", country: "Russia", flag: "🇷🇺", iso: "RU" },
  { code: "+20", country: "Egypt", flag: "🇪🇬", iso: "EG" },
  { code: "+27", country: "South Africa", flag: "🇿🇦", iso: "ZA" },
  { code: "+30", country: "Greece", flag: "🇬🇷", iso: "GR" },
  { code: "+31", country: "Netherlands", flag: "🇳🇱", iso: "NL" },
  { code: "+32", country: "Belgium", flag: "🇧🇪", iso: "BE" },
  { code: "+33", country: "France", flag: "🇫🇷", iso: "FR" },
  { code: "+34", country: "Spain", flag: "🇪🇸", iso: "ES" },
  { code: "+36", country: "Hungary", flag: "🇭🇺", iso: "HU" },
  { code: "+39", country: "Italy", flag: "🇮🇹", iso: "IT" },
  { code: "+40", country: "Romania", flag: "🇷🇴", iso: "RO" },
  { code: "+41", country: "Switzerland", flag: "🇨🇭", iso: "CH" },
  { code: "+43", country: "Austria", flag: "🇦🇹", iso: "AT" },
  { code: "+44", country: "United Kingdom", flag: "🇬🇧", iso: "GB" },
  { code: "+45", country: "Denmark", flag: "🇩🇰", iso: "DK" },
  { code: "+46", country: "Sweden", flag: "🇸🇪", iso: "SE" },
  { code: "+47", country: "Norway", flag: "🇳🇴", iso: "NO" },
  { code: "+48", country: "Poland", flag: "🇵🇱", iso: "PL" },
  { code: "+49", country: "Germany", flag: "🇩🇪", iso: "DE" },
  { code: "+51", country: "Peru", flag: "🇵🇪", iso: "PE" },
  { code: "+52", country: "Mexico", flag: "🇲🇽", iso: "MX" },
  { code: "+53", country: "Cuba", flag: "🇨🇺", iso: "CU" },
  { code: "+54", country: "Argentina", flag: "🇦🇷", iso: "AR" },
  { code: "+55", country: "Brazil", flag: "🇧🇷", iso: "BR" },
  { code: "+56", country: "Chile", flag: "🇨🇱", iso: "CL" },
  { code: "+57", country: "Colombia", flag: "🇨🇴", iso: "CO" },
  { code: "+58", country: "Venezuela", flag: "🇻🇪", iso: "VE" },
  { code: "+60", country: "Malaysia", flag: "🇲🇾", iso: "MY" },
  { code: "+61", country: "Australia", flag: "🇦🇺", iso: "AU" },
  { code: "+62", country: "Indonesia", flag: "🇮🇩", iso: "ID" },
  { code: "+63", country: "Philippines", flag: "🇵🇭", iso: "PH" },
  { code: "+64", country: "New Zealand", flag: "🇳🇿", iso: "NZ" },
  { code: "+65", country: "Singapore", flag: "🇸🇬", iso: "SG" },
  { code: "+66", country: "Thailand", flag: "🇹🇭", iso: "TH" },
  { code: "+81", country: "Japan", flag: "🇯🇵", iso: "JP" },
  { code: "+82", country: "South Korea", flag: "🇰🇷", iso: "KR" },
  { code: "+84", country: "Vietnam", flag: "🇻🇳", iso: "VN" },
  { code: "+86", country: "China", flag: "🇨🇳", iso: "CN" },
  { code: "+90", country: "Turkey", flag: "🇹🇷", iso: "TR" },
  { code: "+91", country: "India", flag: "🇮🇳", iso: "IN" },
  { code: "+92", country: "Pakistan", flag: "🇵🇰", iso: "PK" },
  { code: "+93", country: "Afghanistan", flag: "🇦🇫", iso: "AF" },
  { code: "+94", country: "Sri Lanka", flag: "🇱🇰", iso: "LK" },
  { code: "+95", country: "Myanmar", flag: "🇲🇲", iso: "MM" },
  { code: "+98", country: "Iran", flag: "🇮🇷", iso: "IR" },
  { code: "+212", country: "Morocco", flag: "🇲🇦", iso: "MA" },
  { code: "+213", country: "Algeria", flag: "🇩🇿", iso: "DZ" },
  { code: "+216", country: "Tunisia", flag: "🇹🇳", iso: "TN" },
  { code: "+218", country: "Libya", flag: "🇱🇾", iso: "LY" },
  { code: "+220", country: "Gambia", flag: "🇬🇲", iso: "GM" },
  { code: "+221", country: "Senegal", flag: "🇸🇳", iso: "SN" },
  { code: "+222", country: "Mauritania", flag: "🇲🇷", iso: "MR" },
  { code: "+223", country: "Mali", flag: "🇲🇱", iso: "ML" },
  { code: "+224", country: "Guinea", flag: "🇬🇳", iso: "GN" },
  { code: "+225", country: "Ivory Coast", flag: "🇨🇮", iso: "CI" },
  { code: "+226", country: "Burkina Faso", flag: "🇧🇫", iso: "BF" },
  { code: "+227", country: "Niger", flag: "🇳🇪", iso: "NE" },
  { code: "+228", country: "Togo", flag: "🇹🇬", iso: "TG" },
  { code: "+229", country: "Benin", flag: "🇧🇯", iso: "BJ" },
  { code: "+230", country: "Mauritius", flag: "🇲🇺", iso: "MU" },
  { code: "+231", country: "Liberia", flag: "🇱🇷", iso: "LR" },
  { code: "+232", country: "Sierra Leone", flag: "🇸🇱", iso: "SL" },
  { code: "+233", country: "Ghana", flag: "🇬🇭", iso: "GH" },
  { code: "+234", country: "Nigeria", flag: "🇳🇬", iso: "NG" },
  { code: "+235", country: "Chad", flag: "🇹🇩", iso: "TD" },
  { code: "+236", country: "Central African Republic", flag: "🇨🇫", iso: "CF" },
  { code: "+237", country: "Cameroon", flag: "🇨🇲", iso: "CM" },
  { code: "+238", country: "Cape Verde", flag: "🇨🇻", iso: "CV" },
  { code: "+239", country: "São Tomé and Príncipe", flag: "🇸🇹", iso: "ST" },
  { code: "+240", country: "Equatorial Guinea", flag: "🇬🇶", iso: "GQ" },
  { code: "+241", country: "Gabon", flag: "🇬🇦", iso: "GA" },
  { code: "+242", country: "Republic of the Congo", flag: "🇨🇬", iso: "CG" },
  { code: "+243", country: "Democratic Republic of the Congo", flag: "🇨🇩", iso: "CD" },
  { code: "+244", country: "Angola", flag: "🇦🇴", iso: "AO" },
  { code: "+245", country: "Guinea-Bissau", flag: "🇬🇼", iso: "GW" },
  { code: "+246", country: "British Indian Ocean Territory", flag: "🇮🇴", iso: "IO" },
  { code: "+248", country: "Seychelles", flag: "🇸🇨", iso: "SC" },
  { code: "+249", country: "Sudan", flag: "🇸🇩", iso: "SD" },
  { code: "+250", country: "Rwanda", flag: "🇷🇼", iso: "RW" },
  { code: "+251", country: "Ethiopia", flag: "🇪🇹", iso: "ET" },
  { code: "+252", country: "Somalia", flag: "🇸🇴", iso: "SO" },
  { code: "+253", country: "Djibouti", flag: "🇩🇯", iso: "DJ" },
  { code: "+254", country: "Kenya", flag: "🇰🇪", iso: "KE" },
  { code: "+255", country: "Tanzania", flag: "🇹🇿", iso: "TZ" },
  { code: "+256", country: "Uganda", flag: "🇺🇬", iso: "UG" },
  { code: "+257", country: "Burundi", flag: "🇧🇮", iso: "BI" },
  { code: "+258", country: "Mozambique", flag: "🇲🇿", iso: "MZ" },
  { code: "+260", country: "Zambia", flag: "🇿🇲", iso: "ZM" },
  { code: "+261", country: "Madagascar", flag: "🇲🇬", iso: "MG" },
  { code: "+262", country: "Réunion", flag: "🇷🇪", iso: "RE" },
  { code: "+263", country: "Zimbabwe", flag: "🇿🇼", iso: "ZW" },
  { code: "+264", country: "Namibia", flag: "🇳🇦", iso: "NA" },
  { code: "+265", country: "Malawi", flag: "🇲🇼", iso: "MW" },
  { code: "+266", country: "Lesotho", flag: "🇱🇸", iso: "LS" },
  { code: "+267", country: "Botswana", flag: "🇧🇼", iso: "BW" },
  { code: "+268", country: "Eswatini", flag: "🇸🇿", iso: "SZ" },
  { code: "+269", country: "Comoros", flag: "🇰🇲", iso: "KM" },
  { code: "+290", country: "Saint Helena", flag: "🇸🇭", iso: "SH" },
  { code: "+291", country: "Eritrea", flag: "🇪🇷", iso: "ER" },
  { code: "+297", country: "Aruba", flag: "🇦🇼", iso: "AW" },
  { code: "+298", country: "Faroe Islands", flag: "🇫🇴", iso: "FO" },
  { code: "+299", country: "Greenland", flag: "🇬🇱", iso: "GL" },
  { code: "+350", country: "Gibraltar", flag: "🇬🇮", iso: "GI" },
  { code: "+351", country: "Portugal", flag: "🇵🇹", iso: "PT" },
  { code: "+352", country: "Luxembourg", flag: "🇱🇺", iso: "LU" },
  { code: "+353", country: "Ireland", flag: "🇮🇪", iso: "IE" },
  { code: "+354", country: "Iceland", flag: "🇮🇸", iso: "IS" },
  { code: "+355", country: "Albania", flag: "🇦🇱", iso: "AL" },
  { code: "+356", country: "Malta", flag: "🇲🇹", iso: "MT" },
  { code: "+357", country: "Cyprus", flag: "🇨🇾", iso: "CY" },
  { code: "+358", country: "Finland", flag: "🇫🇮", iso: "FI" },
  { code: "+359", country: "Bulgaria", flag: "🇧🇬", iso: "BG" },
  { code: "+370", country: "Lithuania", flag: "🇱🇹", iso: "LT" },
  { code: "+371", country: "Latvia", flag: "🇱🇻", iso: "LV" },
  { code: "+372", country: "Estonia", flag: "🇪🇪", iso: "EE" },
  { code: "+373", country: "Moldova", flag: "🇲🇩", iso: "MD" },
  { code: "+374", country: "Armenia", flag: "🇦🇲", iso: "AM" },
  { code: "+375", country: "Belarus", flag: "🇧🇾", iso: "BY" },
  { code: "+376", country: "Andorra", flag: "🇦🇩", iso: "AD" },
  { code: "+377", country: "Monaco", flag: "🇲🇨", iso: "MC" },
  { code: "+378", country: "San Marino", flag: "🇸🇲", iso: "SM" },
  { code: "+380", country: "Ukraine", flag: "🇺🇦", iso: "UA" },
  { code: "+381", country: "Serbia", flag: "🇷🇸", iso: "RS" },
  { code: "+382", country: "Montenegro", flag: "🇲🇪", iso: "ME" },
  { code: "+383", country: "Kosovo", flag: "🇽🇰", iso: "XK" },
  { code: "+385", country: "Croatia", flag: "🇭🇷", iso: "HR" },
  { code: "+386", country: "Slovenia", flag: "🇸🇮", iso: "SI" },
  { code: "+387", country: "Bosnia and Herzegovina", flag: "🇧🇦", iso: "BA" },
  { code: "+389", country: "North Macedonia", flag: "🇲🇰", iso: "MK" },
  { code: "+420", country: "Czech Republic", flag: "🇨🇿", iso: "CZ" },
  { code: "+421", country: "Slovakia", flag: "🇸🇰", iso: "SK" },
  { code: "+423", country: "Liechtenstein", flag: "🇱🇮", iso: "LI" },
  { code: "+500", country: "Falkland Islands", flag: "🇫🇰", iso: "FK" },
  { code: "+501", country: "Belize", flag: "🇧🇿", iso: "BZ" },
  { code: "+502", country: "Guatemala", flag: "🇬🇹", iso: "GT" },
  { code: "+503", country: "El Salvador", flag: "🇸🇻", iso: "SV" },
  { code: "+504", country: "Honduras", flag: "🇭🇳", iso: "HN" },
  { code: "+505", country: "Nicaragua", flag: "🇳🇮", iso: "NI" },
  { code: "+506", country: "Costa Rica", flag: "🇨🇷", iso: "CR" },
  { code: "+507", country: "Panama", flag: "🇵🇦", iso: "PA" },
  { code: "+508", country: "Saint Pierre and Miquelon", flag: "🇵🇲", iso: "PM" },
  { code: "+509", country: "Haiti", flag: "🇭🇹", iso: "HT" },
  { code: "+590", country: "Guadeloupe", flag: "🇬🇵", iso: "GP" },
  { code: "+591", country: "Bolivia", flag: "🇧🇴", iso: "BO" },
  { code: "+592", country: "Guyana", flag: "🇬🇾", iso: "GY" },
  { code: "+593", country: "Ecuador", flag: "🇪🇨", iso: "EC" },
  { code: "+594", country: "French Guiana", flag: "🇬🇫", iso: "GF" },
  { code: "+595", country: "Paraguay", flag: "🇵🇾", iso: "PY" },
  { code: "+596", country: "Martinique", flag: "🇲🇶", iso: "MQ" },
  { code: "+597", country: "Suriname", flag: "🇸🇷", iso: "SR" },
  { code: "+598", country: "Uruguay", flag: "🇺🇾", iso: "UY" },
  { code: "+599", country: "Netherlands Antilles", flag: "🇧🇶", iso: "BQ" },
  { code: "+670", country: "East Timor", flag: "🇹🇱", iso: "TL" },
  { code: "+672", country: "Antarctica", flag: "🇦🇶", iso: "AQ" },
  { code: "+673", country: "Brunei", flag: "🇧🇳", iso: "BN" },
  { code: "+674", country: "Nauru", flag: "🇳🇷", iso: "NR" },
  { code: "+675", country: "Papua New Guinea", flag: "🇵🇬", iso: "PG" },
  { code: "+676", country: "Tonga", flag: "🇹🇴", iso: "TO" },
  { code: "+677", country: "Solomon Islands", flag: "🇸🇧", iso: "SB" },
  { code: "+678", country: "Vanuatu", flag: "🇻🇺", iso: "VU" },
  { code: "+679", country: "Fiji", flag: "🇫🇯", iso: "FJ" },
  { code: "+680", country: "Palau", flag: "🇵🇼", iso: "PW" },
  { code: "+681", country: "Wallis and Futuna", flag: "🇼🇫", iso: "WF" },
  { code: "+682", country: "Cook Islands", flag: "🇨🇰", iso: "CK" },
  { code: "+683", country: "Niue", flag: "🇳🇺", iso: "NU" },
  { code: "+684", country: "American Samoa", flag: "🇦🇸", iso: "AS" },
  { code: "+685", country: "Samoa", flag: "🇼🇸", iso: "WS" },
  { code: "+686", country: "Kiribati", flag: "🇰🇮", iso: "KI" },
  { code: "+687", country: "New Caledonia", flag: "🇳🇨", iso: "NC" },
  { code: "+688", country: "Tuvalu", flag: "🇹🇻", iso: "TV" },
  { code: "+689", country: "French Polynesia", flag: "🇵🇫", iso: "PF" },
  { code: "+690", country: "Tokelau", flag: "🇹🇰", iso: "TK" },
  { code: "+691", country: "Micronesia", flag: "🇫🇲", iso: "FM" },
  { code: "+692", country: "Marshall Islands", flag: "🇲🇭", iso: "MH" },
  { code: "+850", country: "North Korea", flag: "🇰🇵", iso: "KP" },
  { code: "+852", country: "Hong Kong", flag: "🇭🇰", iso: "HK" },
  { code: "+853", country: "Macau", flag: "🇲🇴", iso: "MO" },
  { code: "+855", country: "Cambodia", flag: "🇰🇭", iso: "KH" },
  { code: "+856", country: "Laos", flag: "🇱🇦", iso: "LA" },
  { code: "+880", country: "Bangladesh", flag: "🇧🇩", iso: "BD" },
  { code: "+886", country: "Taiwan", flag: "🇹🇼", iso: "TW" },
  { code: "+960", country: "Maldives", flag: "🇲🇻", iso: "MV" },
  { code: "+961", country: "Lebanon", flag: "🇱🇧", iso: "LB" },
  { code: "+962", country: "Jordan", flag: "🇯🇴", iso: "JO" },
  { code: "+963", country: "Syria", flag: "🇸🇾", iso: "SY" },
  { code: "+964", country: "Iraq", flag: "🇮🇶", iso: "IQ" },
  { code: "+965", country: "Kuwait", flag: "🇰🇼", iso: "KW" },
  { code: "+966", country: "Saudi Arabia", flag: "🇸🇦", iso: "SA" },
  { code: "+967", country: "Yemen", flag: "🇾🇪", iso: "YE" },
  { code: "+968", country: "Oman", flag: "🇴🇲", iso: "OM" },
  { code: "+970", country: "Palestine", flag: "🇵🇸", iso: "PS" },
  { code: "+971", country: "United Arab Emirates", flag: "🇦🇪", iso: "AE" },
  { code: "+972", country: "Israel", flag: "🇮🇱", iso: "IL" },
  { code: "+973", country: "Bahrain", flag: "🇧🇭", iso: "BH" },
  { code: "+974", country: "Qatar", flag: "🇶🇦", iso: "QA" },
  { code: "+975", country: "Bhutan", flag: "🇧🇹", iso: "BT" },
  { code: "+976", country: "Mongolia", flag: "🇲🇳", iso: "MN" },
  { code: "+977", country: "Nepal", flag: "🇳🇵", iso: "NP" },
  { code: "+992", country: "Tajikistan", flag: "🇹🇯", iso: "TJ" },
  { code: "+993", country: "Turkmenistan", flag: "🇹🇲", iso: "TM" },
  { code: "+994", country: "Azerbaijan", flag: "🇦🇿", iso: "AZ" },
  { code: "+995", country: "Georgia", flag: "🇬🇪", iso: "GE" },
  { code: "+996", country: "Kyrgyzstan", flag: "🇰🇬", iso: "KG" },
  { code: "+998", country: "Uzbekistan", flag: "🇺🇿", iso: "UZ" },
];

const signupSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  role: z.enum(["jobseeker", "employer"], {
    required_error: "Please select your role.",
  }),
  countryCode: z.string().min(1, {
    message: "Please select a country code.",
  }),
  phoneNumber: z.string().min(1, {
    message: "Phone number is required.",
  }).regex(/^\d+$/, {
    message: "Phone number must contain only digits.",
  }),
  profileImage: z.string().optional(),
});

const Signup = () => {
  const { toast } = useToast();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [linkedInImportOpen, setLinkedInImportOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string>("");
  const [countryCodeOpen, setCountryCodeOpen] = useState(false);
  
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "jobseeker",
      countryCode: "+254",
      phoneNumber: "",
      profileImage: "",
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select a valid image file",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image size must be less than 5MB",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setProfileImage(result);
      form.setValue('profileImage', result);
    };
    reader.readAsDataURL(file);
  };
  
  const onSubmit = (values: z.infer<typeof signupSchema>) => {
    setIsLoading(true);
    console.log(values);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Account created!",
        description: "Let's set up your profile to find the perfect opportunities.",
      });
      setShowOnboarding(true);
    }, 1000);
  };

  const handleLinkedInSignup = () => {
    setLinkedInImportOpen(true);
  };

  const handleLinkedInConnect = () => {
    setIsLoading(true);
    toast({
      title: "LinkedIn Import Initiated",
      description: "Please complete authorization in the popup window.",
    });
    setTimeout(() => {
      setIsLoading(false);
      setLinkedInImportOpen(false);
      setShowOnboarding(true);
    }, 1500);
  };
  
  return (
    <Layout>
      <div className="max-w-md mx-auto px-4 py-12">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
            <CardDescription className="text-center">
              Join Visiondrill to explore career opportunities tailored to your skills and goals.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Profile Image Upload */}
                <div className="flex flex-col items-center space-y-4 pb-4">
                  <div className="relative">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={profileImage} alt="Profile" />
                      <AvatarFallback className="bg-gray-100">
                        <User className="h-8 w-8 text-gray-500" />
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      type="button"
                      size="sm"
                      className="absolute bottom-0 right-0 rounded-full h-8 w-8 p-0"
                      onClick={() => document.getElementById('signup-image-input')?.click()}
                    >
                      <Camera className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 text-center">
                    Add a profile photo (optional)
                  </p>
                  <input
                    id="signup-image-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="John Doe" 
                          {...field}
                          className="transition-all focus:ring-2 focus:ring-career-blue"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="john@example.com" 
                          {...field}
                          className="transition-all focus:ring-2 focus:ring-career-blue"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>I am a</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="transition-all focus:ring-2 focus:ring-career-blue">
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="jobseeker">Job Seeker</SelectItem>
                          <SelectItem value="employer">Employer</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone Number Section with Enhanced Country Code Selector */}
                <div className="space-y-2">
                  <FormLabel>Phone Number</FormLabel>
                  <div className="flex gap-2">
                    <FormField
                      control={form.control}
                      name="countryCode"
                      render={({ field }) => (
                        <FormItem className="flex-shrink-0">
                          <Popover open={countryCodeOpen} onOpenChange={setCountryCodeOpen}>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  aria-expanded={countryCodeOpen}
                                  className="w-32 justify-between"
                                >
                                  {field.value ? (
                                    <span className="flex items-center gap-2">
                                      <span>{countryCodes.find((country) => country.code === field.value)?.flag}</span>
                                      <span>{field.value}</span>
                                    </span>
                                  ) : (
                                    "Select..."
                                  )}
                                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 p-0">
                              <Command>
                                <CommandInput placeholder="Search country..." />
                                <CommandEmpty>No country found.</CommandEmpty>
                                <CommandGroup>
                                  <CommandList className="max-h-64">
                                    {countryCodes.map((country) => (
                                      <CommandItem
                                        key={`${country.code}-${country.iso}`}
                                        value={`${country.country} ${country.code}`}
                                        onSelect={() => {
                                          form.setValue("countryCode", country.code);
                                          setCountryCodeOpen(false);
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            field.value === country.code ? "opacity-100" : "opacity-0"
                                          )}
                                        />
                                        <span className="flex items-center gap-2">
                                          <span>{country.flag}</span>
                                          <span className="flex-1">{country.country}</span>
                                          <span className="text-muted-foreground">{country.code}</span>
                                        </span>
                                      </CommandItem>
                                    ))}
                                  </CommandList>
                                </CommandGroup>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input 
                              placeholder="700123456" 
                              {...field}
                              className="transition-all focus:ring-2 focus:ring-career-blue"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="text-xs text-red-500">
                    {form.formState.errors.countryCode?.message || form.formState.errors.phoneNumber?.message}
                  </div>
                </div>
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="••••••••" 
                          {...field}
                          className="transition-all focus:ring-2 focus:ring-career-blue"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-career-blue hover:bg-career-blue/90 transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
                
                <div className="text-center">
                  <p className="text-sm text-gray-500">Or sign up with</p>
                  <div className="mt-2">
                    <Button 
                      variant="outline" 
                      onClick={handleLinkedInSignup}
                      className="w-full flex items-center justify-center gap-2 transition-colors hover:bg-gray-50"
                      disabled={isLoading}
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </Button>
                  </div>
                </div>
                
                <div className="text-center mt-4">
                  <p className="text-sm text-gray-500">
                    Already have an account?{" "}
                    <Link to="/login" className="text-career-blue hover:underline transition-colors">
                      Log in
                    </Link>
                  </p>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        {showOnboarding && <OnboardingWizard onComplete={() => setShowOnboarding(false)} />}
        
        <Dialog open={linkedInImportOpen} onOpenChange={setLinkedInImportOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Import LinkedIn Profile</DialogTitle>
              <DialogDescription>
                We'll use your LinkedIn profile data to automatically create your Visiondrill profile.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Authorize Visiondrill to access your LinkedIn profile data:
              </p>
              <Button 
                className="w-full bg-[#0077B5] hover:bg-[#0077B5]/90 transition-colors"
                onClick={handleLinkedInConnect}
                disabled={isLoading}
              >
                <Linkedin className="mr-2 h-4 w-4" /> 
                {isLoading ? "Connecting..." : "Connect with LinkedIn"}
              </Button>
              <Button 
                variant="outline" 
                className="w-full transition-colors" 
                onClick={() => setLinkedInImportOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Signup;
