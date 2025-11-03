import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import supabase from "@/lib/db"
import { useRouter } from "next/router"
import Toast from "@/components/layout/dialog-components/toast"
import { useToast } from "@/context/toastContext"

const userSchema = z.object({
  email : z.email().min(5, {
    message: "email minimal 5 karakter.",
  }),
  password : z.string().min(8, {
    message : "password minimal 8 karakter "
  })
})

const Login = () => {
    const router = useRouter();
    const {message,duration,onCloseToast,type, setDuration, setIsOpenToast, setMessage, setType} = useToast();

    const form = useForm<z.infer<typeof userSchema>>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            email : "",
            password : ""
    },
    })

    async function onSubmit(values: z.infer<typeof userSchema>) {
        const {data, error} = await supabase.auth.signInWithPassword({
            ...values
        });
        if(error) {
            setIsOpenToast();
            setDuration(2000);
            setType("error");
            setMessage(error.message);
        } else {
            console.log(data);
            router.push("/");
        }
    }

  return (
        <div className="w-full  bg-blue-300 h-screen bg-cover bg-center" style={{ backgroundImage: "url('/Los-Dol.jpg')" }}>
            <div className="flex flex-col items-center justify-center h-full">
            <Card className="w-full max-w-md bg-white/60">
                <div className="flex flex-row gap-[1rem] items-center justify-center">
                        <Image
                            src={"/Komdigi.svg"}
                            alt="Logo Komdigi"
                            width={100}
                            height={100}
                        />
                        <Image
                            src={"/DJID.svg"}
                            className="rounded-md"
                            alt="Logo DJID"
                            width={100}
                            height={100}
                        />
                    </div>  
                <CardHeader>
                    <CardTitle className="font-bold text-2xl text-center text-blue-800">Dashboard Montib Balmon Jambi</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="flex flex-col gap-6">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel className="text-[1rem]">Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="balmonjbi21@gmail.com" {...field} type="email"/>
                                        </FormControl>
                                        <FormMessage className="text-white"/>
                                        </FormItem>
                                    )}
                                />
                                 <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel className="text-[1rem]">Password</FormLabel>
                                        <FormControl>
                                            <Input className="text-black" {...field} type="password" />
                                        </FormControl>
                                        <FormMessage className="text-white" />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <CardFooter className="flex-col gap-2">
                                <Button type="submit" className="w-full">
                                    Login
                                </Button>
                                <Button variant="outline" className="w-full">
                                    Login with Google
                                </Button>
                            </CardFooter>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            </div>
            <Toast duration={duration} type={type} message={message} onClose={onCloseToast}/>
        </div>
  )
}

export default Login;