"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async () => {
    setError("");
    try {
      const res = await loginUser(email, password);
      login(res.data.access_token, res.data.refresh_token, res.data.user);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      
<fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
  <legend className="fieldset-legend">Login</legend>
 {error && <p>{error}</p>}
  <label className="label" >Email</label>
  <input className="input" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />

  <label className="label">Password</label>
  <input className="input"  placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)}/>

  <button className="btn btn-neutral mt-4" onClick={handleSubmit}>Login</button>
</fieldset>

    </div>

    
  );
}