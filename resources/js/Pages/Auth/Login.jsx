import { Head, Link, useForm } from "@inertiajs/react";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Checkbox } from "@/Components/ui/checkbox";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/Components/ui/card";
import { AtSign, Lock } from "lucide-react";
import { Button } from "@headlessui/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), { onFinish: () => reset("password") });
    };

    return (
        <>
            <Head title="Log in" />
            <div className="flex items-center justify-center min-h-screen bg-background">
                <Card className="w-1/3 space-y-6 shadow-lg">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold">
                            Log In
                        </CardTitle>
                        <CardDescription>Access your account</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {status && (
                            <div className="p-3 text-sm font-medium text-green-600 rounded-lg bg-green-50">
                                {status}
                            </div>
                        )}
                        <form onSubmit={submit} className="space-y-4">
                            <div className="space-y-2">
                                <Label
                                    htmlFor="email"
                                    className="flex items-center gap-2"
                                >
                                    <AtSign className="w-4 h-4" />
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    required
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-600">
                                        {errors.email}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label
                                    htmlFor="password"
                                    className="flex items-center gap-2"
                                >
                                    <Lock className="w-4 h-4" />
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    required
                                />
                                {errors.password && (
                                    <p className="text-sm text-red-600">
                                        {errors.password}
                                    </p>
                                )}
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="remember"
                                        name="remember"
                                        checked={data.remember}
                                        onCheckedChange={(checked) =>
                                            setData("remember", checked)
                                        }
                                    />
                                    <Label htmlFor="remember">
                                        Remember me
                                    </Label>
                                </div>
                                {canResetPassword && (
                                    <Link
                                        href={route("password.request")}
                                        className="text-sm hover:underline"
                                    >
                                        Forgot password?
                                    </Link>
                                )}
                            </div>
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={processing}
                            >
                                Sign In
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <p className="text-sm">
                            Don't have an account?{" "}
                            <Link
                                href={route("register")}
                                className="font-medium hover:underline"
                            >
                                Sign up
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}
