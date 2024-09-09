import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"
import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4 mt-28">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">SparkleWash</h3>
          <p className="text-sm">Keeping your car clean and shiny since 2005. Quality service you can trust.</p>
          <div className="flex space-x-4">
            <Link to="#" className="hover:text-white"><Facebook size={20} /></Link>
            <Link to="#" className="hover:text-white"><Twitter size={20} /></Link>
            <Link to="#" className="hover:text-white"><Instagram size={20} /></Link>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Our Services</h4>
          <ul className="space-y-2">
            <li><Link to="#" className="hover:text-white">Basic Wash</Link></li>
            <li><Link to="#" className="hover:text-white">Premium Detailing</Link></li>
            <li><Link to="#" className="hover:text-white">Interior Cleaning</Link></li>
            <li><Link to="#" className="hover:text-white">Waxing & Polishing</Link></li>
            <li><Link to="#" className="hover:text-white">Tire & Rim Care</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
          <ul className="space-y-2">
            <li className="flex items-center"><Mail size={16} className="mr-2" /> info@sparklewash.com</li>
            <li className="flex items-center"><Phone size={16} className="mr-2" /> (555) 123-4567</li>
            <li className="flex items-center"><MapPin size={16} className="mr-2" /> 123 Clean St, Shine City, ST 12345</li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Newsletter</h4>
          <p className="text-sm mb-4">Subscribe for special offers and tips!</p>
          <form className="space-y-2">
            <Input type="email" placeholder="Your email" className="bg-gray-800 border-gray-700 text-white" />
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">Subscribe</Button>
          </form>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} SparkleWash. All rights reserved.</p>
      </div>
    </footer>
  )
}