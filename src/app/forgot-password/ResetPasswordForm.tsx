import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth, getAuthErrorFromCode } from "@/utils/firebase-auth";
import Button from "@/components/Button";
import Link from "@/components/Link";

// todo: add forgot password flow
// todo: persist email between sign up / sign in / forgot password
export default function ResetPasswordForm() {
  const formDefaults = {
    email: "",
  };
  const [formData, setFormData] = useState(formDefaults);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  return (
    <>
      {/* todo: transition? */}
      {statusMessage && (
        <p className="py-2 mb-4 bg-b-high px-4 rounded-md text-sm">
          {statusMessage}
        </p>
      )}
      <form
        className="flex flex-col max-w-full gap-2 mb-16"
        onSubmit={(e) => {
          e.preventDefault();
          sendPasswordResetEmail(auth, formData.email)
            .then(() => {
              setStatusMessage(
                "Request submitted. Check your inbox & spam folders for password reset instructions.",
              );
            })
            .catch((error) => {
              setStatusMessage(`Error: ${getAuthErrorFromCode(error.code)}`);
            });
        }}
      >
        <label className="w-full mb-4">
          <h3 className="font-semibold tracking-tighter text-sm mb-2">Email</h3>
          <input
            className="w-full bg-b-low text-f-high text-sm p-2 border-2 border-border rounded-lg hover:border-f-low focus:border-f-low placeholder:text-f-low"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChangeInput}
          ></input>
        </label>
        <Button type="submit">Send email</Button>
      </form>
      <div className="text-sm mb-2">
        Know your login details? &nbsp;
        <Link href="/signin">Sign in</Link>
      </div>
      <div className="text-sm mb-2">
        New here? &nbsp;
        <Link href="/signup">Sign up</Link>
      </div>
    </>
  );
}
