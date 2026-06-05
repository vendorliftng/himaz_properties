import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import PropertyQuiz from '@/components/PropertyQuiz'
import PropertyGrid from '@/components/PropertyGrid'
import ROICalculator from '@/components/ROICalculator'
import VIPAlerts from '@/components/VIPAlerts'
import ContactForm from '@/components/ContactForm'
import BlogSection from '@/components/BlogSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <PropertyGrid />
      <PropertyQuiz />
      <ROICalculator />
      <VIPAlerts />
      <ContactForm />
      <BlogSection />
      <Footer />
    </main>
  )
}
