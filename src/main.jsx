import React from 'react'
import ReactDOM from 'react-dom/client'
import {QueryClient, QueryClientProvider} from "react-query";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {RootAdmin} from "./app/admin-intranet/routes/RootAdmin.jsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 10, // 10 seconds
        }
    }
})

const router = createBrowserRouter([
    {
        path: '/admin',
        element: <RootAdmin/>,
    }
])



ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </React.StrictMode>
)
