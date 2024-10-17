import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ChevronRight, Zap, Shield, Rocket } from "lucide-react"

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">ShadcnUI Demo</h1>
        <nav>
          <Button variant="ghost">Features</Button>
          <Button variant="ghost">Pricing</Button>
          <Button variant="ghost">Contact</Button>
        </nav>
      </header>

      <main className="container mx-auto px-4">
        <section className="py-20 text-center">
          <h2 className="text-5xl font-extrabold mb-4">Welcome to ShadcnUI Demo</h2>
          <p className="text-xl mb-8">Experience the power of beautiful and customizable UI components</p>
          <Button size="lg">
            Get Started
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </section>

        <Separator className="my-12" />

        <section className="py-12">
          <h3 className="text-3xl font-bold text-center mb-12">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="h-12 w-12 text-primary" />}
              title="Fast & Efficient"
              description="Build your UI quickly with pre-built components"
            />
            <FeatureCard
              icon={<Shield className="h-12 w-12 text-primary" />}
              title="Customizable"
              description="Easily modify components to fit your design needs"
            />
            <FeatureCard
              icon={<Rocket className="h-12 w-12 text-primary" />}
              title="Modern Design"
              description="Stay up-to-date with the latest UI/UX trends"
            />
          </div>
        </section>
      </main>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-4">
          {icon}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

export default App