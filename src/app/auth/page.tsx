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
import { CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";

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

  // Use the specific FormEvent type for the form's submit event
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
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-cover bg-center"
      style={{ backgroundImage: "url('/football.jpeg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 w-full max-w-md">
        <Card className="p-4 sm:p-6 rounded-2xl shadow-xl bg-white">
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
      </div>
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
