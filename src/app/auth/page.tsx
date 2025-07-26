"use client";

// Import event types from React for type safety
import {
  useEffect,
  Suspense,
  useState,
  useMemo,
  ChangeEvent,
  FormEvent,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { CheckCircle2, XCircle, Facebook, Instagram } from "lucide-react"; // Added social icons
import { toast } from "sonner";
import Link from "next/link";

// Define a specific interface for the component's props
interface FloatingLabelInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void; // Use ChangeEvent for the event handler
  type?: string;
  required?: boolean;
}

// Apply the new interface to the component's props to remove 'any'
const FloatingLabelInput = ({
  id,
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: FloatingLabelInputProps) => {
  return (
    <div className="relative">
      <Input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        className={`peer h-12 w-full rounded-lg border-2 border-gray-300 px-3 text-gray-900 placeholder-transparent focus:border-green-500 focus:outline-none`}
        placeholder={label}
        required={required}
      />
      <Label
        htmlFor={id}
        className={`absolute left-2 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all 
                     peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                     peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-green-600`}
      >
        {label}
      </Label>
    </div>
  );
};

// New Footer Component matching the final design
const AuthFooter = () => {
  const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );

  return (
    <footer className="w-full bg-[#0A0A0A] text-gray-400 font-montserrat">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Column 1: Logo and Socials */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/u-pro_soccer.png"
                alt="U-PRO Logo"
                width={32}
                height={32}
              />
              <span className="font-bold text-xl text-white">U-Pro</span>
            </Link>
            <div className="flex space-x-4 mt-6">
              <Link href="#" className="hover:text-white">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="hover:text-white">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="hover:text-white">
                <XIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
          {/* Column 2: Support */}
          <div>
            <h3 className="font-bold text-white tracking-wider mb-4">
              Support
            </h3>
            <nav className="flex flex-col space-y-3">
              <Link href="#" className="hover:text-white transition-colors">
                FAQ
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Contact
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terms
              </Link>
            </nav>
          </div>
          {/* Column 3: Community */}
          <div>
            <h3 className="font-bold text-white tracking-wider mb-4">
              Community
            </h3>
            <nav className="flex flex-col space-y-3">
              <Link href="#" className="hover:text-white transition-colors">
                Forum
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Blog
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Instagram
              </Link>
            </nav>
          </div>
          {/* Column 4: Company */}
          <div>
            <h3 className="font-bold text-white tracking-wider mb-4">
              Company
            </h3>
            <nav className="flex flex-col space-y-3">
              <Link
                href="/about"
                className="hover:text-white transition-colors"
              >
                About Us
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Careers
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Press
              </Link>
            </nav>
          </div>
          {/* Column 5: Legal */}
          <div>
            <h3 className="font-bold text-white tracking-wider mb-4">Legal</h3>
            <nav className="flex flex-col space-y-3">
              <Link
                href="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </nav>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-6 text-center text-sm">
          <p>© 2025 U-Pro Soccer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

function AuthPageContent() {
  const { user, loading, signIn, signUp } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isSignUp, setIsSignUp] = useState(
    searchParams.get("type") === "signup"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passwordRequirements = useMemo(() => {
    const minLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return { minLength, hasUppercase, hasLowercase, hasSpecialChar };
  }, [password]);

  const allRequirementsMet = Object.values(passwordRequirements).every(Boolean);

  useEffect(() => {
    if (user && !loading) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  useEffect(() => {
    setIsSignUp(searchParams.get("type") === "signup");
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
  }, [searchParams]);

  const handleAuthAction = async (e: FormEvent) => {
    e.preventDefault();
    if (isSignUp && !allRequirementsMet) {
      toast.error("Password does not meet all requirements.");
      return;
    }
    setIsSubmitting(true);

    let authError = null;

    if (isSignUp) {
      const { error } = await signUp(email, password, firstName, lastName);
      authError = error;
      if (!error) {
        toast("Account created successfully!", {
          description: "You will be redirected to the dashboard.",
        });
      }
    } else {
      const { error } = await signIn(email, password);
      authError = error;
    }

    if (authError) {
      toast.error(authError.message);
    }

    setIsSubmitting(false);
  };

  const toggleForm = () => {
    const newType = isSignUp ? "login" : "signup";
    router.push(`/auth?type=${newType}`);
  };

  const Requirement = ({ met, text }: { met: boolean; text: string }) => (
    <div
      className={`flex items-center text-sm transition-colors ${met ? "text-green-600" : "text-gray-500"}`}
    >
      {met ? (
        <CheckCircle2 className="mr-2 h-4 w-4 flex-shrink-0" />
      ) : (
        <XCircle className="mr-2 h-4 w-4 flex-shrink-0" />
      )}
      {text}
    </div>
  );

  if (loading || user) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col">
      <main
        className="relative z-10 w-full flex-grow flex flex-col items-center justify-center p-4 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(10, 10, 10, 0.6), rgba(10, 10, 10, 0.9)), url('/football.jpeg')",
        }}
      >
        <Card className="p-4 sm:p-6 rounded-2xl shadow-xl bg-white w-full max-w-md">
          <CardHeader className="flex flex-col items-center pb-4 text-center">
            <Image
              src="/u-pro_soccer.png"
              alt="U-PRO SOCCER Logo"
              width={60}
              height={60}
            />
            <CardTitle className="mt-4 text-3xl font-bold text-gray-800 font-built-titling">
              {isSignUp ? "Create Your Account" : "Welcome Back"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleAuthAction}
              className="space-y-6 pt-4 font-montserrat"
            >
              {isSignUp && (
                <>
                  <FloatingLabelInput
                    id="firstName"
                    label="First Name"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    required
                  />
                  <FloatingLabelInput
                    id="lastName"
                    label="Last Name"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    required
                  />
                </>
              )}
              <FloatingLabelInput
                id="email"
                type="email"
                label="Email Address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <FloatingLabelInput
                id="password"
                type="password"
                label="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />

              {isSignUp && password.length > 0 && (
                <div className="p-3 bg-gray-50 rounded-lg space-y-2 border border-gray-200">
                  <p className="text-sm font-semibold text-gray-700">
                    Password must contain:
                  </p>
                  <Requirement
                    met={passwordRequirements.minLength}
                    text="At least 8 characters"
                  />
                  <Requirement
                    met={passwordRequirements.hasLowercase}
                    text="One lowercase letter (a-z)"
                  />
                  <Requirement
                    met={passwordRequirements.hasUppercase}
                    text="One uppercase letter (A-Z)"
                  />
                  <Requirement
                    met={passwordRequirements.hasSpecialChar}
                    text="One special symbol (!@#...)"
                  />
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-[#0D9447] hover:bg-[#096349] text-white font-bold py-3 rounded-lg text-lg transition-all"
                disabled={isSubmitting || (isSignUp && !allRequirementsMet)}
              >
                {isSubmitting
                  ? isSignUp
                    ? "CREATING..."
                    : "LOGGING IN..."
                  : isSignUp
                    ? "CREATE ACCOUNT"
                    : "LOGIN"}
              </Button>
            </form>
          </CardContent>
        </Card>
        <div className="mt-6 text-center">
          <Button
            variant="link"
            onClick={toggleForm}
            className="text-white hover:text-gray-200 font-semibold"
          >
            {isSignUp
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}
          </Button>
        </div>
      </main>

      <AuthFooter />
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense>
      <AuthPageContent />
    </Suspense>
  );
}
