
import GuestLayout from '@/Layouts/GuestLayout'
import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { Link, useForm } from '@inertiajs/react'
import { Label } from '@/Components/ui/label';
import { z } from 'zod'
import { CaptionError } from '@/Components/ui/typography'
import SocialLogin from './Partials/SocialLogin';

export default function Register() {
    const formSchema = z.object({
        email: z.string().email(),
    })

    type FormValues = z.infer<typeof formSchema>
    const form = useForm<FormValues>({
        email: '',
    })

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        try {
            const validData = formSchema.parse(form.data)
            form.transform(() => validData)
            form.clearErrors()
            form.post(route('signIn', [{
                prompt: "create",
                provider: "email"
            }]))
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errors = error.flatten().fieldErrors
                Object.keys(errors).forEach((key) => {
                    if (errors[key]) {
                        form.setError(key as keyof FormValues, errors[key]![0])
                    }
                })
            } else {
                console.error(error)
            }
        }
    }

    return (
        <GuestLayout>
            <div className='w-full h-full flex flex-col gap-4 justify-start items-center lg:justify-center overflow-y-auto [&::-webkit-scrollbar]:hidden px-6 py-6'>
                <h1 className='text-2xl font-bold'>Cadastre para continuar</h1>

                <form
                    onSubmit={onSubmit}
                    className='w-full flex flex-col gap-2'>
                    <div>
                        <Label htmlFor='email'>Email</Label>
                        <Input
                            name='email'
                            value={form.data.email}
                            onChange={e => form.setData('email', e.target.value)}
                        />
                        <CaptionError>{form.errors.email}</CaptionError>
                    </div>
                    <Button
                        isLoading={form.processing}
                        className='w-full'
                    >Registrar</Button>
                </form>

                <SocialLogin />

                <div className='w-full flex gap-1 justify-center items-center'>
                    <p className='text-sm text-muted-foreground'>Já possui conta?</p>
                    <Link
                        href={route('login')}
                        className='text-sm text-primary'>Entre
                    </Link>
                </div>
            </div>
        </GuestLayout>
    )
}