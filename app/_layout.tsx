import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Slot } from "expo-router"

const queryClient = new QueryClient()

const RootLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Slot />
    </QueryClientProvider>
  )
}

export default RootLayout
