import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'


export default function App() {
  return (
    <div>
      <Header />

      <main className="p-6">
        <h1 className="text-2xl font-bold">
          Welcome to my app
        </h1>
      </main>

      <Footer />
    </div>
  )
}
