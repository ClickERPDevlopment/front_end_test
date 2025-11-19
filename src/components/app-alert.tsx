import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import { MessageSquare, MessageSquareWarning } from 'lucide-react'

type props = {
    type?: 'default' | 'error',
    message?: string
}

export default function AppAlert({ type, message }: props) {
    if (type == "error") {
        return (
            <Alert variant="destructive" className='border border-gray-400 max-w-screen-sm my-5 text-red'>
                <MessageSquareWarning />
                <AlertTitle>Message!</AlertTitle>
                <AlertDescription>
                    {message}
                </AlertDescription>
            </Alert>
        )
    }
    else {
        return (
            <Alert variant="default">
                <MessageSquare className='text-green-500' />
                <AlertTitle>Message!</AlertTitle>
                <AlertDescription>
                    {message}
                </AlertDescription>
            </Alert>)
    }
}
