"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TypographyH3 } from "@/components/custom/typography";

export default function EditAccount() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const router = useRouter();

  async function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrors([]);

    const form = new FormData(e.currentTarget);
    // const email = form.get("email") as string;
    // const password = form.get("password") as string;

    // const { error } = await authClient.signIn.email({
    //   email: email,
    //   password: password,
    //   rememberMe: true,
    //   callbackURL: '/pages/transactions',
    // });

    // if (error) {
    //   setErrors([error.message || "Unknown Error"]);
    //   setLoading(false);
    // };
    
    setLoading(false);
  };

  return (
    <main className='flex flex-col space-y-4 p-3'>
      <TypographyH3 className="font-bold text-center">
        Edit Account
      </TypographyH3>
      <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
        <div>
          <Label htmlFor="name" className="text-md font-medium">
            Account Name
          </Label>
          <Input
            id="name"
            name="name"
            type="name"
            required
            className="mt-1 h-9 
            rounded-lg border-2 
            border-black bg-white"
          />
        </div>
        <div>
          <Label htmlFor="type" className="text-md font-medium">
            Account Type
          </Label>
          <Select>
            <SelectTrigger className="w-[180px] bg-white border-2 border-black w-full h-9">
              <SelectValue placeholder="Select Account Type..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cash">Cash</SelectItem>
              <SelectItem value="digital">Digital</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="description" className="text-md font-medium">
            Description
          </Label>
          <Textarea
            id="description"
            name="description"
            rows={2}
            required
            className="mt-1 rounded-lg 
            border-2 border-black 
            bg-white text-[16px]"
          />
        </div>
      </form>
      <div className='flex flex-row justify-between'>
        <Button 
          onClick={() => router.back()}
          className="bg-red-500 border-2 hover:none">
          Cancel
        </Button>
        <Button className="border-2">
          Submit
        </Button>
      </div>
    </main>
  );
};