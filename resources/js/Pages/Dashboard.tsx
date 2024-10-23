import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { H2 } from '@/Components/ui/typography';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const user = usePage().props.auth.user;

    return (
        <AuthenticatedLayout
            breadcrumbNav={
                [
                    { label: 'Dashboard', route: 'dashboard' },
                    { label: 'Dashboard2', route: 'dashboard' }
                ]
            }
        >
            <Head title="Dashboard" />
            <Card className='max-w-screen-sm w-full mx-auto'>
                <CardHeader>
                    <CardTitle>Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                    <H2>Bem vindo de volta, {user.name}!</H2>
                    <Button >Hello</Button>
                    <Button variant="destructive">Hello</Button>
                    <Button variant="secondary">Hello</Button>
                    <Button variant="ghost">Hello</Button>
                    <Button variant="outline">Hello</Button>
                    <Button variant="muted">Hello</Button>
                    <Button variant="tertiary">Tert</Button>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
